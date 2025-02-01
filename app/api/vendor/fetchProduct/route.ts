import { FetchProductsById } from "@/helpers/db/vendor/ProductListed";
import {NextRequest, NextResponse } from "next/server";

interface ProductsData {
    success: boolean;
    message: string;
    data?: any[];  
    error?: any;
  }

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
       const url=new URL(request.url);
     

       const user_id=url.searchParams.get("id");
       console.log("Received Product id",user_id);

       if (!user_id) {
        return NextResponse.json(
          { success: false, message: "User ID is required" },
          { status: 400 }
        )
      }
       const productData:ProductsData=await FetchProductsById(Number(user_id))
      
       if (!productData.success) {
        return NextResponse.json(
          { success: false, message: productData.message, error: productData.error },
          { status: 500 }
        )
      }
  
      return NextResponse.json(productData)


    } catch (error:any) {
        return NextResponse.json({error:error.message,success:false},{status:500});
    }
} 

