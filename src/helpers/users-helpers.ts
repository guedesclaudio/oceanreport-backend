import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function encryptedPassword(password: string) {
  return bcrypt.hash(password, 12);
}
  
export function comparePassword(password: string, userPassword: string) {
  return bcrypt.compare(password, userPassword);
}

export function generateToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
}
