import supabase from "@/config/dbConfig";

export interface DeleteProductResponse {
    success: boolean;
    message: string;
    error?: any;
}

export default async function DeleteProductBySlug(product_slug: string): Promise<DeleteProductResponse> {
    try {
        // First, fetch the product to get its ID
        const { data: product, error: fetchError } = await supabase
            .from("product_detail")
            .select("id")
            .eq("product_slug", product_slug)
            .single();

        if (fetchError || !product) {
            return {
                success: false,
                message: "Product not found",
                error: fetchError
            };
        }

        // Delete the product
        const { error: deleteError } = await supabase
            .from("product_detail")
            .delete()
            .eq("id", product.id);

        if (deleteError) {
            return {
                success: false,
                message: "Failed to delete product",
                error: deleteError
            };
        }

        return {
            success: true,
            message: "Product deleted successfully"
        };

    } catch (error) {
        return {
            success: false,
            message: "An unexpected error occurred",
            error
        };
    }
}