// helpers/db/ProductsAsPerCategory.ts
import supabase from "@/config/dbConfig";
import UserDetailById from "./UserDetailsById";
import { isWithinRadius } from "../HabersineAlgorithm";

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
  recommended?: boolean;
  userId?: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

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
  recommended = false,
  userId,
}: QueryParams): Promise<ProductsResponse> {
  try {
    let query = supabase.from("product_detail").select("*").eq("is_rented", false).eq("is_sold",false);

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

    let productsWithUserDetails = await fetchUserDetailsForProducts(totalProducts);

    // Handle location-based filtering
    if (recommended && userId) {
      // Get user's location array
      const { data: userData, error: userError } = await supabase
        .from('user_info')
        .select('location')
        .eq('id', userId)
        .single();

      if (userError || !userData?.location || userData.location.length < 2) {
        return {
          success: false,
          message: "User location not found",
          error: userError?.message,
        };
      }

      const userCoordinates: Coordinates = {
        latitude: userData.location[0],
        longitude: userData.location[1]
      };

      // Get all seller locations in one query
      const { data: sellerLocations, error: sellerError } = await supabase
        .from('user_info')
        .select('id, location')
        .in('id', productsWithUserDetails.map(p => p.listed_by));

      if (sellerError || !sellerLocations) {
        return {
          success: false,
          message: "Failed to fetch seller locations",
          error: sellerError?.message,
        };
      }

      // Create a map of seller IDs to their locations
      const sellerLocationMap = new Map(
        sellerLocations.map(seller => [
          seller.id,
          {
            latitude: seller.location[0],
            longitude: seller.location[1]
          }
        ])
      );

      // Filter products based on seller locations
      productsWithUserDetails = productsWithUserDetails.filter(product => {
        const sellerLocation = sellerLocationMap.get(product.listed_by);
        
        if (!sellerLocation) return false;

        return isWithinRadius(
          userCoordinates,
          sellerLocation,
          1 // 1km radius
        );
      });
    }

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