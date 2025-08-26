import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAuth() {
  const cookieStore = cookies();
  const token =await cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // contains { id: ... }
  } catch (err) {
    return null;
  }
}
