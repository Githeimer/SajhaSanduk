import { NextRequest,NextResponse } from "next/server";
import ProductDetailfromSlug from "@/helpers/db/ProductsAsPerSlug";

interface ProductsData {
    success: boolean;
    message: string;
    data?: any[];  
    error?: any;
  }
  
  export async function GET(request:NextRequest): Promise<NextResponse>{
    try {
        const product_slug:any = request.nextUrl.searchParams.get("product_slug");

        console.log("Received Product Slug"+ product_slug);

        const product_data:ProductsData= await ProductDetailfromSlug(product_slug);

        if(!product_data.success)
        {
            console.log("Error Fetching Product:",product_data.message);

            return NextResponse.json(
                {
                    message:product_data.message,
                    success:product_data.success,
                    error:product_data.error
                },
                {status:404}
            )
        }

        return NextResponse.json(
            {
                message:product_data.message,
                success:product_data.success,
                data:product_data.data
            }
            ,
            {
                status:200
            }
        )

    } catch (error: any) {
        console.error('Unexpected error:', error); 
        return NextResponse.json(
          {
            message: "Unexpected Fetching Error",
            error: error.message,
            success: false,
          },
          { status: 500 }
        );
      }
  }
