import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'



require('dotenv').config({path: __dirname + '/.env'})


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const data = searchParams.get('data')
    
    if (!data) throw new Error('No data provided')
    
    // Verify payment
    const decodedData = JSON.parse(Buffer.from(data, 'base64').toString())
    const secretKey = process.env.ESEWA_SECRET_KEY!

    const verificationData = `transaction_code=${decodedData.transaction_code},` +
      `status=${decodedData.status},` +
      `total_amount=${decodedData.total_amount},` +
      `transaction_uuid=${decodedData.transaction_uuid},` +
      `product_code=${process.env.ESEWA_PRODUCT_CODE},` +
      `signed_field_names=${decodedData.signed_field_names}`

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(verificationData)
      .digest('base64')

    if (signature !== decodedData.signature) {
      throw new Error('Invalid signature')
    }

    return NextResponse.json({
      success: true,
      data: decodedData
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "AN unknwinisjdv" },
      { status: 400 }
    )
  }
}