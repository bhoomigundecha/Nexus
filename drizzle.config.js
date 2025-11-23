import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./config/schema.js",  // Changed from ./configs/ to ./config/
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL,
  },
});