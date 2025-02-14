import axios from "axios";
import crypto from "crypto";

interface EsewaPaymentHashParams {
  amount: number;
  transaction_uuid: string;
}

interface EsewaPaymentHashResponse {
  signature: string;
  signed_field_names: string;
}

async function getEsewaPaymentHash({
  amount,
  transaction_uuid,
}: EsewaPaymentHashParams): Promise<EsewaPaymentHashResponse> {
  try {
    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;

    const secretKey = process.env.ESEWA_SECRET_KEY || "";
    const hash = crypto.createHmac("sha256", secretKey).update(data).digest("base64");

    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };
  } catch (error) {
    throw new Error(`Failed to generate eSewa payment hash: ${(error as Error).message}`);
  }
}


//verify esewa payment


interface DecodedData {
    transaction_code: string;
    status: string;
    total_amount: number;
    transaction_uuid: string;
    product_code: string;
    signed_field_names: string;
    signature: string;
}

interface VerifyEsewaPaymentResponse {
    response: Record<string, any>;
    decodedData: DecodedData;
}

async function verifyEsewaPayment(encodedData: string): Promise<VerifyEsewaPaymentResponse> {
    try {
        // Decoding Base64-encoded data received from eSewa
        let decodedData: DecodedData = JSON.parse(atob(encodedData));
        
        const headersList = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        
        const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;
        
        const secretKey = process.env.ESEWA_SECRET_KEY || "";
        const hash = crypto.createHmac("sha256", secretKey).update(data).digest("base64");
        
        console.log(hash);
        console.log(decodedData.signature);
        
        const reqOptions = {
            url: `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
            method: "GET" as const,
            headers: headersList,
        };
        
        if (hash !== decodedData.signature) {
            throw { message: "Invalid Info", decodedData };
        }
        
        const response = await axios.request(reqOptions);
        
        if (
            response.data.status !== "COMPLETE" ||
            response.data.transaction_uuid !== decodedData.transaction_uuid ||
            Number(response.data.total_amount) !== Number(decodedData.total_amount)
        ) {
            throw { message: "Invalid Info", decodedData };
        }
        
        return { response: response.data, decodedData };
    } catch (error) {
        throw new Error(`Error verifying eSewa payment: ${(error as Error).message}`);
    }
}

export { getEsewaPaymentHash, verifyEsewaPayment };