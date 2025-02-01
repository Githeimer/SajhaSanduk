import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserDetailById from "@/helpers/db/UserDetailsById";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found", data: null }, { status: 200 });
    }

    const token_validation: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const id = token_validation.id;

    const data = await UserDetailById(id);

    if (!data.success) {
      return NextResponse.json({ message: "User Not Found", data: null }, { status: 200 });
    }

    return NextResponse.json({ message: "User Found", data: data.data }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: "Invalid Token", data: null }, { status: 401 });
  }
}

export async function PATCH(request:NextRequest)
{
  
}