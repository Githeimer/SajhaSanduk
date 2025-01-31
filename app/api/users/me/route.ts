import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import UserDetailById from "@/helpers/db/UserDetailsById";

export async function GET(request:NextRequest)
{
  
    try {
        const token:any=request.cookies.get("token")?.value;
        console.log(token);
        const token_validation:any=jwt.verify(token,process.env.TOKEN_SECRET!);
        console.log(token_validation);

        const id=token_validation.id;

        const data=await UserDetailById(id);

        if(!data.success)
        {
            throw new Error("User Not Found");
        }

        return NextResponse.json({message:"User Found",data:data.data},{status:200});

    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}