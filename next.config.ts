import type { NextConfig } from "next";

// En GitHub Pages la página vive en /nombre-del-repo; el flujo de publicación pasa esa ruta aquí.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Exporta HTML estático: se puede alojar en cualquier servidor (Vercel, GitHub Pages o uno propio)
  output: "export",
  images: {
    // Las fotos ya van comprimidas en WebP (public/images/), no hace falta optimizarlas otra vez
    unoptimized: true,
  },
};

export default nextConfig;
