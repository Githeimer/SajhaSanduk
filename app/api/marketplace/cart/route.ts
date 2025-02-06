import { NextRequest, NextResponse } from "next/server";
import addToCart  from "@/helpers/db/AddProductToCart";

export async function PATCH(request: NextRequest) {
  try {
    const user_id = request.nextUrl.searchParams.get("id");
    const product_id = request.nextUrl.searchParams.get("pid");
    const rental_days = request.nextUrl.searchParams.get("rental_days");

    if (!user_id || !product_id) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const cartProduct = {
      product_id: parseInt(product_id),
      rental_days: rental_days ? parseInt(rental_days) : null
    };

    const response = await addToCart(user_id, cartProduct);

    return NextResponse.json(response, { status: 200 });
    
  } catch (error: any) {
    console.error('Cart update error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}