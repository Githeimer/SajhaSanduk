import { NextRequest,NextResponse } from "next/server";
import UserDetailById from "@/helpers/db/UserDetailsById";
import { updateUserProfile } from "@/helpers/db/EditUserProfile";

export async function GET(request:NextRequest)
{
    try {
        const user_id:any = request.nextUrl.searchParams.get("uid");
        console.log("received User ID:",user_id);

        const response:any=await UserDetailById(user_id);
        
        if(!response.success)
        {
            return NextResponse.json({
                success:false,
                messasge:"Cannot Retrieve User"
            })
        }

        return NextResponse.json({
            success:true,
            message:"User Found",
            data:response.data[0]
        })

    } catch (error:any) {
        console.error("Unexpected error during User Detail:", error.message);
        return NextResponse.json(
          { message: "An unexpected error occurred.", error: error.message || "Unknown error", success: false },
          { status: 500 }
        );
    }
}

export async function PATCH(request:NextRequest)
{
    try {
        const user_id:any = request.nextUrl.searchParams.get("uid");
        const data=await request.json();


        const response=await updateUserProfile(user_id,data);

      
        return NextResponse.json(
            { error: 'Data receieved' ,user_info:response.update_user_info,sucess:response.success},
            { status: 200 }
          );
    } catch (error) {
           console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    }
}