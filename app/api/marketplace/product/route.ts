import { NextRequest,NextResponse } from "next/server";
import ProductDetailfromSlug from "@/helpers/db/ProductsAsPerSlug";
import DeleteProductBySlug from "@/helpers/db/vendor/DeleteProduct";

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

  
  export async function DELETE(request: NextRequest) {
      try {
          const product_slug = request.nextUrl.searchParams.get("product_slug");
          
          if (!product_slug) {
              return NextResponse.json({
                  message: "Product slug is required",
                  success: false
              }, { status: 400 });
          }
  
          const response = await DeleteProductBySlug(product_slug);
  
          if (!response.success) {
              return NextResponse.json({
                  message: response.message,
                  error: response.error,
                  success: false
              }, { status: 400 });
          }
  
          return NextResponse.json({
              message: "Product deleted successfully",
              success: true
          }, { status: 200 });
  
      } catch (error: any) {
          console.error('Unexpected error:', error);
          return NextResponse.json({
              message: "Unexpected Deleting Product Error",
              error: error.message,
              success: false
          }, { status: 500 });
      }
  }
  
