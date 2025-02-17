import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
import supabase from "@/config/dbConfig";
export async function GET(req: Request) {
  try {
    // Get user_id from query params
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch transactions for the given customer_id
    const { data: transactions, error } = await supabase
      .from("Transcation")
      .select("id, transcation_id, product_id, rental_days, for_rent, created_at")
      .eq("customer_id", user_id);

    if (error) throw error;
    if (!transactions || transactions.length === 0) {
      return NextResponse.json({ message: "No transactions found" });
    }

    // Fetch product details for the transactions
    const productIds = transactions.map((t) => t.product_id);
    const { data: products, error: productError } = await supabase
      .from("product_detail")
      .select("id, name, amount, photos, is_rentable, max_allowable_days")
      .in("id", productIds);

    if (productError) throw productError;

    // Map transactions with product details and calculate total price
    const transactionDetails = transactions.map((t) => {
      const product = products.find((p) => p.id === t.product_id);
      if (!product) return null;

      // Calculate total price
      const totalPrice = t.for_rent ? product.amount * t.rental_days : product.amount;

      return {
        id: t.id,
        transcation_id: t.transcation_id,
        product: {
          id: product.id,
          name: product.name,
          amount: product.amount,
          photos: product.photos,
          is_rentable: product.is_rentable,
          max_allowable_days: product.max_allowable_days,
        },
        rental_days: t.rental_days,
        total_price: totalPrice,
        created_at: t.created_at,
      };
    }).filter(Boolean);

    return NextResponse.json(transactionDetails);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
