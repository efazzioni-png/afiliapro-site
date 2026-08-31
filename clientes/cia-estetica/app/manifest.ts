import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: `${siteConfig.basePath}/`,
    display: 'standalone',
    background_color: '#F8F6F2',
    theme_color: '#151515',
    lang: 'pt-BR',
    categories: ['education', 'beauty'],
    icons: [
      { src: `${siteConfig.basePath}/icon.svg`, sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
