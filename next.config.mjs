// Local dev and Vercel run as a normal Next.js server (including /api/chat).
// The GitHub Pages workflow sets STATIC_EXPORT=true to emit plain static files
// into ./out, and NEXT_PUBLIC_BASE_PATH to the repo sub-path (e.g. /ahmed-medo-resume).
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport && { output: "export", trailingSlash: true }),
  ...(basePath && { basePath }),
};

export default nextConfig;
