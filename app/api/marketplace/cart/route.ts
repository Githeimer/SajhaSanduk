import { NextRequest, NextResponse } from "next/server";
import { getCartItems } from "@/helpers/db/cart/GetCartItems";
import { removeFromCart } from "@/helpers/db/cart/RemoveFromCart";
import addToCart from "@/helpers/db/AddProductToCart";

export async function GET(request: NextRequest) {
  try {
    const user_id = request.nextUrl.searchParams.get("uid");

    if (!user_id) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const response = await getCartItems(user_id);
    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    console.error('Cart fetch error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user_id = request.nextUrl.searchParams.get("uid");
    const product_id = request.nextUrl.searchParams.get("pid");
    const rental_days = request.nextUrl.searchParams.get("rentalDays");    

    if (!user_id || !product_id) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const cartProduct = {
      product_id: parseInt(product_id),
      rental_days: rental_days ? parseInt(rental_days) : null
    };

    const response = await addToCart(user_id, cartProduct);
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('Cart update error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user_id = request.nextUrl.searchParams.get("uid");
    const product_id = request.nextUrl.searchParams.get("pid");

    if (!user_id || !product_id) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const response = await removeFromCart(user_id, parseInt(product_id));
    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    console.error('Cart delete error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}