import { string } from "joi";

interface Env {
    PORT: string;
    NODE_ENV: string;
    MONGO_URI: string;
    JWT_EXPIRES_IN: string;
    JWT_SECRET: string;
    JWT_COOKIE_EXPIRES_IN: string;
    CLOUDINARY_NAME: string,
    CLOUDINARY_API_KEY: string,
    CLOUDINARY_API_SECRET: string,
    IMAGGA_API_KEY: string,
    IMAGGA_API_SECRET: string,
    IMAGGA_AUTH: string
  }
  
  export default {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    IMAGGA_API_KEY: process.env.IMAGGA_API_KEY,
    IMAGGA_API_SECRET: process.env.IMAGGA_API_SECRET,
    IMAGGA_AUTH: process.env.IMAGGA_AUTH
  } as Env;