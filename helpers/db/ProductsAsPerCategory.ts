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
  user_details?: any; // Add this to store user details
}

interface ProductsResponse {
  success: boolean;
  message: string;
  data?: ProductDetail[];
  error?: any;
}

const categories = ["Electronics", "Mechanical", "Books", "Tools and diy", "Music"];

async function fetchUserDetailsForProducts(products: ProductDetail[]): Promise<ProductDetail[]> {
  const userDetailPromises = products.map(async (product) => {
    const userResponse = await UserDetailById(product.listed_by);
    if (userResponse.success) {
      product.user_details = userResponse.data; 
    } else {
      product.user_details = null; 
    }
    return product;
  });

  return Promise.all(userDetailPromises);
}

export default async function ExtractProductsfromDB(category: string): Promise<ProductsResponse> {
  try {
    let totalProducts: ProductDetail[] = [];

    if (category === "default") {
      const categoryPromises = categories.map(async (cat) => {
        const { data, error } = await supabase
          .from("product_detail")
          .select("*")
          .gt("rating", 0)
          .eq("Category", cat)
          .limit(6);
        if (error) {
          console.error(`Error fetching category ${cat}: `, error.message);
          return [];
        }
        return data || [];
      });

      const categoryData = await Promise.all(categoryPromises);

      categoryData.forEach((data) => {
        if (Array.isArray(data)) {
          totalProducts = [...totalProducts, ...data];
        }
      });
    } else {
      const { data, error } = await supabase
        .from("product_detail")
        .select("*")
        .eq("Category", category)
        .limit(15);

      if (error) {
        return {
          success: false,
          message: "Failed Fetching data of category: " + category,
          error: error.message || error,
        };
      }
      totalProducts = data || [];
    }

    if (totalProducts.length <= 0) {
      return {
        success: false,
        message: "No data found for Category: " + category,
      };
    }

    // Fetch user details for all products
    totalProducts = await fetchUserDetailsForProducts(totalProducts);

    return {
      success: true,
      message: "Data fetched successfully",
      data: totalProducts,
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
