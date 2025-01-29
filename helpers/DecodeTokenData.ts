import jwt from "jsonwebtoken";

export default async function DecodeTokenData(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

    return { success: true, data: decoded };
  } catch (error) {
    console.error("Token decoding failed:", error);

    return { success: false, message: "Invalid or expired token" };
  }
}
