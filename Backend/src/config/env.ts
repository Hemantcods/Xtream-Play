import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "3000",
  MONGO_URI: process.env.MONGO_URI || "",
  ACCESS_SECRET:process.env.JWT_ACCESS_SECRET || '',
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
  SMTP_EMAIL:process.env.SMTP_EMAIL,
  SMTP_PASSWORD:process.env.SMTP_PASSWORD
};