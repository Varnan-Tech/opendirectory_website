import { createDualmarkMiddleware } from "@dualmark/nextjs";
import { middlewareConfig } from "@/lib/dualmark.config";

export default createDualmarkMiddleware(middlewareConfig);

export const config = {
  matcher: [
    {
      source: "/((?!_next/|favicon.ico|md/|api/|claim/).*)",
      missing: [{ type: "header", key: "next-router-prefetch" }],
    },
  ],
};
