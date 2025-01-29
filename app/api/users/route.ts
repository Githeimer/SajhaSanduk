import { NextRequest,NextResponse } from "next/server";
import UserDetailById from "@/helpers/db/UserDetailsById";

export async function GET(request:NextRequest)
{
    try {
        const user_id:any = request.nextUrl.searchParams.get("uid");
        console.log("received User ID:",user_id);
        console.log("type of id:",isNaN(user_id));

        const response:any=await UserDetailById(user_id);

        if(!response.data.success)
        {
            return NextResponse.json({
                success:false,
                messasge:"Cannot Retrieve User"
            })
        }

        return NextResponse.json({
            success:true,
            message:"User Found",
            data:response.data.data
        })

    } catch (error:any) {
        console.error("Unexpected error during User Detail:", error.message);
        return NextResponse.json(
          { message: "An unexpected error occurred.", error: error.message || "Unknown error", success: false },
          { status: 500 }
        );
    }
}