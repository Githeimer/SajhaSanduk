import supabase from "@/config/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import FindingUserByEmail from "@/helpers/db/UniqueUser"
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, location, password } = await request.json();

    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        {
          message: "All fields (except location) are required.",
          success: false,
        },
        { status: 400 }
      );
    }

    if (location && (!Array.isArray(location) || location.length !== 2)) {
      return NextResponse.json(
        {
          message: "Invalid location. It must be an array of two numeric values (latitude and longitude).",
          success: false,
        },
        { status: 400 }
      );
    }

    //  if user already exists
    const userCheck = await FindingUserByEmail(email);
    if (userCheck.ok && userCheck.data) {
      return NextResponse.json(
        {
          message: "Error while registering user.",
          error: `User already exists with email: ${email}`,
          success: false,
        },
        { status: 409 } 
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    
    const userData = {
      name: fullName,
      email: email,
      phonenumber: phone,
      location: location || null, 
      password: hashedPassword,
    };

    // Insert user data into Supabase
    const { data, error } = await supabase
      .from("user_info")
      .insert([userData])
      .select("*");

    if (error) {
      return NextResponse.json(
        {
          message: "Error while registering user.",
          error: error.message,
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Signup successful.",
        data: data,
        success: true,
      },
      { status: 201 } 
    );
  } catch (error: any) {
    console.error("Unexpected error during signup:", error.message);

    return NextResponse.json(
      {
        message: "An unexpected error occurred during signup.",
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

