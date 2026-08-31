/**
 * Helpers de SEO: URLs absolutas e geração de metadata por página.
 * Cada página do site exporta seu próprio `metadata` usando `buildMetadata`,
 * garantindo title, description e canonical únicos (requisito 49).
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';

/** Junta domínio + basePath + caminho, sem barras duplicadas. */
export const absoluteUrl = (path = '/'): string => {
  const base = `${siteConfig.url.replace(/\/$/, '')}${siteConfig.basePath}`;
  const clean = path === '/' ? '' : `/${path.replace(/^\/|\/$/g, '')}`;
  return `${base}${clean}` || `${base}/`;
};

/** Resolve um caminho de asset respeitando o basePath (GitHub Pages etc.). */
export const assetPath = (path: string): string =>
  `${siteConfig.basePath}${path.startsWith('/') ? path : `/${path}`}`;

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Caminho relativo, ex.: '/cursos/micropigmentacao'. */
  path?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = siteConfig.ogImage,
  type = 'website',
  publishedTime,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : `${absoluteUrl('/')}${image.replace(/^\//, '')}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.legalName,
      locale: 'pt_BR',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
