// Route handler (api/products/route.ts)
import { NextRequest, NextResponse } from "next/server";
import ExtractProductsfromDB from "@/helpers/db/ProductsAsPerCategory";

interface ProductsData {
  success: boolean;
  message: string;
  data?: any[];  
  error?: any;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || '';

  try {
    const response = await ExtractProductsfromDB({
      category,
      search
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch products',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
