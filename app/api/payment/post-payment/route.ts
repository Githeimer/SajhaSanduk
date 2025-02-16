import { NextRequest, NextResponse } from "next/server";
import supabase from "@/config/dbConfig";

interface CartProduct {
  product_id: number;
  rental_days: number | null;
}

interface TransactionItem {
  transcation_id: string;
  customer_id: number;
  product_id: number;
  vendor_id: number;
  for_rent: boolean;
  rental_days: number;
}

async function processTransaction(userId: string, transactionId: string) {
  try {
    // Fetch user's cart
    const { data: userCartData, error: cartError } = await supabase
      .from("user_info")
      .select("CART")
      .eq("id", userId)
      .single();

    if (cartError) {
      console.error("Cart fetch error details:", cartError);
      throw new Error("Failed to fetch cart data");
    }

    if (!userCartData?.CART || userCartData.CART.length === 0) {
      return {
        success: true,
        message: "No items in cart to process",
      };
    }

    const cartItems: CartProduct[] = userCartData.CART;
    console.log("Cart Items:", cartItems);

    // Fetch product details to get vendor IDs
    const productIds = cartItems.map(item => item.product_id);
    const { data: productsData, error: productsError } = await supabase
      .from("product_detail")
      .select("id, listed_by")
      .in("id", productIds);

    if (productsError) {
      console.error("Products fetch error details:", productsError);
      throw new Error("Failed to fetch product details");
    }

    if (!productsData) {
      throw new Error("No product data found");
    }

    console.log("Products Data:", productsData);

    // Prepare transaction records
    const transactions: TransactionItem[] = [];
    
    for (const item of cartItems) {
      const product = productsData.find(p => p.id === item.product_id);
      
      if (!product) {
        throw new Error(`Product not found for id: ${item.product_id}`);
      }

      transactions.push({
        transcation_id: transactionId,
        customer_id: parseInt(userId),
        product_id: item.product_id,
        vendor_id: product.listed_by,
        for_rent: item.rental_days ? false : true,
        rental_days: item.rental_days || 0
      });
    }

    console.log("Transactions to insert:", transactions);

    // Insert transactions
    const { error: transactionError } = await supabase
      .from("Transcation")
      .insert(transactions);

    if (transactionError) {
      console.error("Transaction insert error details:", {
        code: transactionError.code,
        message: transactionError.message,
        details: transactionError.details,
        hint: transactionError.hint
      });
      throw new Error(`Failed to insert transactions: ${transactionError.message}`);
    }

    // Clear the user's cart
    const { error: clearCartError } = await supabase
      .from("user_info")
      .update({ CART: [] })
      .eq("id", userId);

    if (clearCartError) {
      console.error("Cart clear error details:", clearCartError);
      throw new Error("Failed to clear cart");
    }

    return {
      success: true,
      message: "Transactions processed successfully",
    };
  } catch (error) {
    console.error("Error in processTransaction:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, transaction_id } = body;

    console.log("Received request with:", { user_id, transaction_id });

    if (!user_id || !transaction_id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User ID and transaction ID are required' 
        },
        { status: 400 }
      );
    }

    const response = await processTransaction(user_id, transaction_id);
    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    console.error('Transaction processing error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}