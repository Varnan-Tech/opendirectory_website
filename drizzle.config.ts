import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL!;
const urlWithSsl = databaseUrl.includes("sslmode=") 
  ? databaseUrl 
  : `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}sslmode=require`;

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: urlWithSsl,
  },
});
