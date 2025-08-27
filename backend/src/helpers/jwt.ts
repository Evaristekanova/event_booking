import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

if (!SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Generate JWT token
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

// Verify JWT token
export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};
