import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      {
        source: "/_mintlify/:path*",
        destination: "https://varnan.mintlify.site/_mintlify/:path*",
      },
      {
        source: "/api/request",
        destination: "https://varnan.mintlify.site/_mintlify/api/request",
      },
      {
        source: "/docs",
        destination: "https://varnan.mintlify.site/docs",
      },
      {
        source: "/docs/:match*",
        destination: "https://varnan.mintlify.site/docs/:match*",
      },
      {
        source: "/mintlify-assets/:path+",
        destination: "https://varnan.mintlify.site/mintlify-assets/:path*",
      },
    ];
  },
};

export default nextConfig;
