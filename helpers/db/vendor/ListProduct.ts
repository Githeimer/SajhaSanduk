
import supabase from '@/config/dbConfig';
export const generateProductSlug = (name: string): string => {
  const baseSlug = name.toLowerCase().replace(/\s+/g, '_');
  
  // Generate 4 random numbers
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  
  return `${baseSlug}_${randomNumbers}`;
};

export const createProduct = async (productData: any) => {
  try {
    const product_slug = generateProductSlug(productData.name);

    const finalProductData = {
      ...productData,
      product_slug,
      rating: 0.0,
      is_rented: false
    };

    const { data, error } = await supabase
      .from('product_detail')
      .insert(finalProductData)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};