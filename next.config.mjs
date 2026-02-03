/** @type {import('next').NextConfig} */
const nextConfig = {
  // 构建时若无 .env.local，使用占位值以保证 build 通过；运行时有 .env.local 则用真实值
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key",
  },
};

export default nextConfig;
