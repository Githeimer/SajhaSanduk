import {NextResponse } from "next/server";

export async function GET()
{
    try {
        const response=NextResponse.json({
            message:"Logout Sucessful",
            success:true
        },
        {status:200});
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message,success:false},{status:500});
    }
} 

// Dummy