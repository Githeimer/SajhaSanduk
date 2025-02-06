import supabase from "@/config/dbConfig";

interface CartProduct {
  product_id: number;
  rental_days?: number | null;
}

export default async function addToCart(user_id: string, cartProduct: CartProduct) {
  try {
    // First get the current cart array
    const { data: currentData, error: fetchError } = await supabase
      .from('user_info')
      .select('cart')
      .eq('id', user_id)
      .single();

    if (fetchError) {
      throw new Error('Failed to fetch current cart');
    }

    const currentCart = currentData.cart || [];

    currentCart.push({
      product_id: cartProduct.product_id,
      rental_days: cartProduct.rental_days || null
    });

    const { data: updatedData, error: updateError } = await supabase
      .from('user_info')
      .update({ cart: currentCart })
      .eq('id', user_id)
      .select();

    if (updateError) {
      throw new Error('Failed to update cart');
    }

    return {
      success: true,
      data: updatedData[0],
      message: 'Product added to cart successfully'
    };

  } catch (error) {
    console.error('Error in addToCart:', error);
    throw error;
  }
}