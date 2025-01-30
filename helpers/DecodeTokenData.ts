import jwt from "jsonwebtoken";
const TOKEN="NIGAHIGA"

export default async function DecodeTokenData(token: string) {
  try {
    
    const decoded = jwt.verify(token, TOKEN);
    console.log(decoded);

    return { success: true, data: decoded };
  } catch (error) {
    console.error("Token decoding failed:", error);
    return { success: false, message: "Invalid or expired token" };
  }
}
