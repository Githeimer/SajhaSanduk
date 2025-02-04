import supabase from "@/config/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, location, password } = await request.json();

    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields (except location) are required.", success: false },
        { status: 400 }
      );
    }

 

    const { data: userByEmail } = await supabase
      .from("user_info")
      .select("*")
      .eq("email", email)
      .single();

    if (userByEmail) {
      return NextResponse.json(
        { message: "Email is already in use.", success: false },
        { status: 409 }
      );
    }

    const { data: userByPhone } = await supabase
      .from("user_info")
      .select("*")
      .eq("phonenumber", phone)
      .single();

    if (userByPhone) {
      return NextResponse.json(
        { message: "Phone number is already in use.", success: false },
        { status: 409 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userData = {
      name: fullName,
      email,
      phonenumber: phone,
      location: location || null,
      password: hashedPassword,
    };


    const { data, error } = await supabase
      .from("user_info")
      .insert([userData])
      .select("*");

    if (error) {
      return NextResponse.json(
        { message: "Failed to register user.", error: error.message, success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Signup successful.", success: true, data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Unexpected error during signup:", error.message);
    return NextResponse.json(
      { message: "An unexpected error occurred.", error: error.message || "Unknown error", success: false },
      { status: 500 }
    );
  }
}
