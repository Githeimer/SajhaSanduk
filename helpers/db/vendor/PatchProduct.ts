import supabase from "@/config/dbConfig";

export async function updateProduct(productId: number, updatedData: any) {
    try {
        const { data, error } = await supabase
            .from("product_detail")
            .update({
                name: updatedData.name,
                description: updatedData.description,
                amount: updatedData.amount,
                Category: updatedData.Category,
                is_rentable: updatedData.is_rentable,
                max_allowable_days: updatedData.is_rentable ? updatedData.max_allowable_days || 1 : 0,
                photos: updatedData.photos,
            })
            .eq("id", productId)
            .select("*")
            .single();

        if (error) throw error;

        return { success: true, product: data };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, message: "Failed to update product", error };
    }
}