import { createDualmarkMiddleware, createDualmarkRouteHandler, createLlmsTxtHandler } from "@dualmark/nextjs";

export const siteUrl = "https://opendirectory.dev";

export const collections = {
  docs: { converter: "docs" as const },
  privacy: { converter: "legal" as const },
  terms: { converter: "legal" as const },
};

/** Shared middleware config — excludes /claim, /api, _next, favicon */
export const middlewareConfig = {
  siteUrl,
};

/** Route handler config — visible public pages only */
export const routeHandlerConfig = {
  siteUrl,
  collections,
};

/** llms.txt config — all public collections + dynamic skills section */
export const llmsTxtConfig = {
  siteUrl,
  collections,
};
