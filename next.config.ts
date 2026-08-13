import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // También añadimos la de Supabase por si luego subes imágenes ahí:
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
