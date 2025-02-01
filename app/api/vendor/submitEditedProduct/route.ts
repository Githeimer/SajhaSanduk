import { NextRequest, NextResponse } from "next/server";
import { updateProduct } from "@/helpers/db/vendor/PatchProduct";

export async function PATCH(request: NextRequest) {
    try {
        const updatedData = await request.json();

        if (!updatedData.id) {
            return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
        }

        const result = await updateProduct(updatedData.id, updatedData);

        if (!result.success) {
            return NextResponse.json({ success: false, message: result.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Product updated successfully", product: result.product });
    } catch (error) {
        console.error("Error handling PATCH request:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
