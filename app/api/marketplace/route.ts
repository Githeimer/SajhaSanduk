import { NextRequest, NextResponse } from "next/server";
import ExtractProductsfromDB from "@/helpers/db/ProductsAsPerCategory";

interface ProductsData {
  success: boolean;
  message: string;
  data?: any[];  
  error?: any;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
      const url = new URL(request.url);
      const product_Category = url.searchParams.get("category");
      
      console.log('Received Category:', product_Category); 
  
      const products_data: ProductsData = await ExtractProductsfromDB(product_Category || "default");
  
      if (!products_data.success) {
        console.log('Error fetching products:', products_data.message); 
        return NextResponse.json(
          {
            message: products_data.message,
            success: products_data.success,
            error: products_data.error,
          },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        {
          message: products_data.message,
          success: products_data.success,
          data: products_data.data,
        },
        { status: 200 }
      );
  
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
  
