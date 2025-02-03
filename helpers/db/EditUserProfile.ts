import supabase from "@/config/dbConfig";

  
export async function updateUserProfile(user_id: number, updatedData: any) {
    try {
        const { data, error } = await supabase
            .from("user_info")
            .update({
                name: updatedData.name,
                phonenumber:updatedData.phonenumber,
                "Image":updatedData.Image,
                location:updatedData.locaation
            })
            .eq("id",user_id )
            .select("*")
            .single();

        if (error) throw error;

        return { success: true, update_user_info: data };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, message: "Failed to update product", error };
    }
}