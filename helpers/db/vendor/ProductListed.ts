import supabase from "@/config/dbConfig";

  
  export async function FetchProductsById(user_id:number)
  {
    try {
        const {data,error}=await supabase.from("product_detail").select("*").eq("listed_by",user_id);
        console.log(data);
        
        if(error)
        {
            throw new Error();
        }

        return {
            success:true,
            message:"Datas Retreived from DB",
            data:data
        }
    } catch (error:any) {
        console.log("error while fetching products listed by user");
        return{
            success:false,
            message:"error while fetching products listed by user",
            error:error.message
        }
    }
  }
