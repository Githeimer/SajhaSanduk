import supabase from "@/config/dbConfig";

export async function removeFromCart(user_id: string, product_id: number) {
  try {
    const { data, error } = await supabase
      .from('user_info')
      .select('CART')
      .eq('id', user_id)
      .single();
    
    if (error) {
      throw new Error('Failed to fetch current cart');
    }

    const currentCart = data.CART || [];
    const updatedCart = currentCart.filter(
      (item: { product_id: number }) => item.product_id !== product_id
    );

    const { data: updatedData, error: updateError } = await supabase
      .from('user_info')
      .update({ CART: updatedCart })
      .eq('id', user_id)
      .select();

    if (updateError) {
      throw new Error('Failed to update cart');
    }

    return {
      success: true,
      data: updatedData[0],
      message: 'Product removed from cart successfully'
    };

  } catch (error) {
    console.error('Error in removeFromCart:', error);
    throw error;
  }
}