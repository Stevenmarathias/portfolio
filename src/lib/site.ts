// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time; locally we fall back to the live domain.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://stevenmarathias.vercel.app";
