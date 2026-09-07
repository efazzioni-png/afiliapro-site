import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Analytics, GtmNoScript } from '@/components/analytics/Analytics';
import { TrackingProvider } from '@/components/analytics/TrackingProvider';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildGraph, organizationSchema, websiteSchema } from '@/lib/schema';
import { siteConfig } from '@/data/site';
import { absoluteUrl } from '@/lib/seo';

/**
 * Tipografia (requisito 5): contraste entre um display elegante e um texto
 * moderno. `display: 'swap'` evita bloqueio de renderização; next/font
 * hospeda os arquivos junto ao site, sem requisição a terceiros.
 */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: {
    default: 'Cia Estética | Escola de Profissionais de Beleza na Barra da Tijuca - RJ',
    template: '%s | Cia Estética',
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  keywords: [
    'cursos de estética na Barra da Tijuca',
    'curso de estética RJ',
    'curso de micropigmentação Barra da Tijuca',
    'curso de remoção de tatuagem RJ',
    'escola de estética no Rio de Janeiro',
    'curso profissionalizante de estética RJ',
    'Cia Estética Barra da Tijuca',
    'cursos de beleza Barra da Tijuca',
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: { canonical: absoluteUrl('/') },
  category: 'education',
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: absoluteUrl('/'),
    siteName: siteConfig.legalName,
    title: 'Cia Estética | Escola de Profissionais de Beleza na Barra da Tijuca',
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Cia Estética | Beleza Profissional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cia Estética | Escola de Profissionais de Beleza',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#151515',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Dados estruturados globais: escola + negócio local + site */}
        <JsonLd data={buildGraph(organizationSchema(), websiteSchema())} />
      </head>
      <body className="min-h-screen bg-cream antialiased">
        <GtmNoScript />
        <TrackingProvider />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
