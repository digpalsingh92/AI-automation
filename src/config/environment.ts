import dotenv from "dotenv";
dotenv.config();


export const config = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_AT: process.env.JWT_EXPIRES_AT
}