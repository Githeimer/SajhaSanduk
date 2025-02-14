import supabase from "@/config/dbConfig";

interface CartProduct {
  product_id: number;
  rental_days: number | null;
}

export async function getCartItems(user_id: string) {
  try {
   
    const { data: userCartData, error: userError } = await supabase
      .from("user_info")
      .select("CART")
      .eq("id", user_id)
      .single(); 

    if (userError) {
      console.error("Error fetching cart:", userError);
      throw new Error("Failed to fetch cart");
    }

    if (!userCartData?.CART || userCartData.CART.length === 0) {
      return {
        success: true,
        data: [],
        message: "Cart is empty",
      };
    }

    const cartItems: CartProduct[] = userCartData.CART;
    const productIds = cartItems.map((item) => item.product_id);

 
    const { data: productsData, error: productsError } = await supabase
      .from("product_detail")
      .select("id, name, amount, photos, is_rentable")
      .in("id", productIds);

    if (productsError) {
      console.error("Error fetching product details:", productsError);
      throw new Error("Failed to fetch product details");
    }

  
    const cartDetails = productsData.map((product) => {
      const cartItem = cartItems.find((item) => item.product_id === product.id);
      const rentalDays = cartItem?.rental_days ?? 0;
      const payableAmount = product.is_rentable
        ? product.amount * rentalDays
        : product.amount;

      return {
        id: product.id,
        name: product.name,
        price: product.amount,
        image: product.photos[0] || null,
        isRentable: product.is_rentable,
        rentalDays,
        payableAmount,
      };
    });

    return {
      success: true,
      data: cartDetails,
      message: "Cart items fetched successfully",
    };
  } catch (error) {
    console.error("Error in getCartItems:", error);
    throw error;
  }
}
