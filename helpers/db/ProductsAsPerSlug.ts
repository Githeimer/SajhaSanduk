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
}

interface ProductsResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export default async function ProductDetailfromSlug(product_slug: String): Promise<ProductsResponse> {
  try {
    // Querying the product details
    const { data, error } = await supabase.from("product_detail").select("*").eq("product_slug", product_slug);

    // Handle Supabase query error
    if (error) {
      return {
        success: false,
        message: "Error occurred while fetching product details",
        error: error.message || error,
      };
    }

    // Check if data is empty
    if (!data || data.length === 0) {
      return {
        success: false,
        message: `No product found with the slug: ${product_slug}`,
      };
    }

    // Safely access `listed_by` from the first result
    const listedBy = data[0].listed_by;

    // Fetch user details
    const userDetails = await UserDetailById(listedBy);

    // Handle user details fetching error
    if (!userDetails.success) {
      return {
        success: true,
        message: "Product found, but failed to fetch user details",
        data: {
          productDetail: data,
        },
      };
    }

    // Successful response
    return {
      success: true,
      message: "Product found",
      data: {
        productDetail: data,
        listerDetail: userDetails.data,
      },
    };

  } catch (error: any) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "Unexpected error while fetching product details",
      error: error.message || error,
    };
  }
}
