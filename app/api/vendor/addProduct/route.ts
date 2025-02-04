import { createProduct } from '@/helpers/db/vendor/ListProduct';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    const { 
      name, 
      description, 
      amount, 
      Category, 
      is_rentable, 
      max_allowable_days, 
      listed_by,
      photos
    } = body;

    // Validate required fields
    if (!name || !description || !amount || !listed_by) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Create the product
    const newProduct = await createProduct(body);

    // Return successful response
    return NextResponse.json(newProduct, { status: 201 });

  } catch (error: any) {
    console.error('Product creation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create product', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}