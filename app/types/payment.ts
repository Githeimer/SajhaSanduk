export interface CartItem {
    id: number
    name: string
    price: number
    image: string
    isRentable: boolean
    rentalDays: number
  }
  
  export interface EsewaPaymentRequest {
    amount: string
    tax_amount: string
    total_amount: string
    transaction_uuid: string
    product_code: string
    product_service_charge: string
    product_delivery_charge: string
    success_url: string
    failure_url: string
    signed_field_names: string
    signature: string
  }
  
  export interface EsewaPaymentResponse {
    transaction_code: string
    status: string
    total_amount: string
    transaction_uuid: string
    product_code: string
    signed_field_names: string
    signature: string
  }
  
  export interface EsewaVerificationResponse {
    status: "COMPLETE" | "PENDING" | "FAILURE" | "CANCELED" | "NOT_FOUND"
    transaction_uuid: string
    total_amount: number
    product_code: string
    ref_id?: string
  }
  
  export interface PaymentInitialization {
    items: CartItem[]
    total: number
  }