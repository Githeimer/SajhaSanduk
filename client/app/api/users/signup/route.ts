import supabase from "@/config/dbConfig";
import { NextResponse,NextRequest } from "next/server";

export async function POST(request:NextRequest)
{
    try {
        const reqBody=await request.json();
        console.log(reqBody);

        return NextResponse.json({message:"Signup Success",data:reqBody},{status:200});
    } catch (error) {
        return NextResponse.json({message:"Signup Error",error:"errorshi"},{status:400});
    }
}
