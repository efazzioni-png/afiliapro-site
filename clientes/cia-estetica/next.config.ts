import type { NextConfig } from 'next';

/**
 * Duas formas de build:
 *  - `npm run build`         -> build padrão (Vercel, Node, Docker). Otimiza imagens.
 *  - `npm run build:static`  -> exporta HTML estático em /out (GitHub Pages, S3, Hostinger...).
 *
 * `NEXT_PUBLIC_BASE_PATH` só é necessário quando o site é servido em um subdiretório
 * (ex.: usuario.github.io/cia-estetica). Em domínio próprio, deixe vazio.
 */
const isStaticExport = process.env.NEXT_OUTPUT === 'export';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  ...(isStaticExport
    ? { output: 'export' as const, trailingSlash: true, images: { unoptimized: true } }
    : {
        images: {
          formats: ['image/avif', 'image/webp'],
          deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1600, 1920],
        },
      }),
};

export default nextConfig;
