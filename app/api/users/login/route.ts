import supabase from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import FindingUserByEmail from "@/helpers/db/UniqueUser";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const userResponse = await FindingUserByEmail(email);

    if (!userResponse.ok || !userResponse.data) {
      return NextResponse.json(
        {
          message: "Login Error",
          error: "User with this email does not exist.",
          success: false,
        },
        { status: 404 } 
      );
    }

    const foundUser = userResponse.data;

    const isPasswordValid = await bcryptjs.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Login Error",
          error: "Incorrect password.",
          success: false,
        },
        { status: 401 } 
      );
    }

    const tokenData = {
      id: foundUser.id,
      username: foundUser.name,
      email: foundUser.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    const loginResponse = NextResponse.json({
      message: "Login Successful",
      success: true,
      data: {
        profile: tokenData,
      },
    });

    loginResponse.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, 
    });

    return loginResponse;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Login Error",
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
