import supabase from "@/config/dbConfig";
import UserDetailById from "./UserDetailsById";

interface ProductDetail {
  id: number;
  product_slug: string;
  name: string;
  photos: string[];
  listed_by: number;
  description: string;
  rating: number;
  amount: number;
  is_rentable: boolean;
  max_allowable_days: number | null;
  is_rented: boolean;
  category: string;
  user_details?: any;
}

interface ProductsResponse {
  success: boolean;
  message: string;
  data?: ProductDetail[];
  error?: any;
}

interface QueryParams {
  category?: string;
  search?: string;
}

const categories = ["Electronics", "Mechanical", "Books", "Tools and DIY", "Music", "Others"];

async function fetchUserDetailsForProducts(products: ProductDetail[]): Promise<ProductDetail[]> {
  const userDetailPromises = products.map(async (product) => {
    const userResponse = await UserDetailById(product.listed_by);
    product.user_details = userResponse.success ? userResponse.data : null;
    return product;
  });

  return Promise.all(userDetailPromises);
}

export default async function ExtractProductsfromDB({
  category = "All",
  search,
}: QueryParams): Promise<ProductsResponse> {
  try {
    let query = supabase.from("product_detail").select("*").eq("is_rented", false);

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }


    if (category && category !== "All") {
      query = query.eq("Category", category);
    }

    const { data: totalProducts, error } = await query;

    if (error) {
      return {
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      };
    }

    if (!totalProducts || totalProducts.length === 0) {
      return {
        success: false,
        message: "No products found for the specified criteria",
      };
    }

    const productsWithUserDetails = await fetchUserDetailsForProducts(totalProducts);

    return {
      success: true,
      message: "Data fetched successfully",
      data: productsWithUserDetails,
    };
  } catch (error: any) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "Unexpected Error while fetching data",
      error: error.message || error,
    };
  }
}