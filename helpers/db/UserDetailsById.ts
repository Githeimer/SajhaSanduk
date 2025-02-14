import supabase from "@/config/dbConfig";

export default async function UserDetailById(id:Number)
{
    try {
        const {data,error}=await supabase.from("user_info").select("*").eq("id",id);

        if(error)
        {
            return{
                success:false,
                error:error
            }
        }

        return {
            success:true,
            data:data
        }


    } catch (error:any) {
        return{
            success:false,
            error:error
        }
    }
}

