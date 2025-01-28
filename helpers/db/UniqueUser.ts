import {supabase} from "@/config/dbConfig";

export default async function FindingUserByEmail(email: string) {
  try {
    // Perform the query to Supabase
    const { data, error } = await supabase
      .from("user_info")
      .select("*")
      .eq("email", email)
      .single();

    // Handle any errors that occur in the query
    if (error) {
      console.error("Supabase Error:", error.message);
      return {
        ok: false,
        message: "Error while finding user by email.",
        error: error.message,
      };
    }

    // Handle case where no data is returned
    if (!data) {
      return {
        ok: false,
        message: `No user found with email: ${email}`,
        data: null,
      };
    }

    // Return the found data
    return {
      ok: true,
      message: "User found successfully.",
      data,
    };
  } catch (error: any) {
    // Log unexpected errors
    console.error("Unexpected Error while finding user by email:", error.message);

    return {
      ok: false,
      message: "Unexpected error occurred.",
      error: error.message,
    };
  }
}
