/**
 * ============================================================================
 *  JSON-LD / Schema.org
 * ============================================================================
 *  Todos os blocos de dados estruturados do site são gerados aqui, a partir
 *  dos mesmos arquivos de `data/`. Se a equipe alterar telefone, endereço,
 *  cursos ou FAQ, o Schema acompanha automaticamente.
 *
 *  Tipos emitidos: EducationalOrganization, LocalBusiness, WebSite,
 *  Course, Review, AggregateRating, FAQPage, BreadcrumbList, BlogPosting.
 *
 *  NOTA: `geo` (latitude/longitude) e `hasCourseInstance` (carga horária e
 *  datas de turma) foram deliberadamente omitidos porque esses dados não
 *  foram confirmados. Ver README para ativá-los quando disponíveis.
 * ============================================================================
 */

import { siteConfig } from '@/data/site';
import { courses, type Course } from '@/data/courses';
import { testimonials } from '@/data/testimonials';
import { faqs, type FaqItem } from '@/data/faq';
import type { BlogPost } from '@/data/blog';
import { absoluteUrl } from '@/lib/seo';

type Json = Record<string, unknown>;

const ORG_ID = `${absoluteUrl('/')}#organization`;
const WEBSITE_ID = `${absoluteUrl('/')}#website`;

/** Só entram no `sameAs` as redes efetivamente preenchidas (nada inventado). */
const sameAs = Object.values(siteConfig.social).filter((url) => url.length > 0);

const postalAddress: Json = {
  '@type': 'PostalAddress',
  streetAddress: `${siteConfig.address.street}, ${siteConfig.address.unit} — ${siteConfig.address.venue}`,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.state,
  postalCode: siteConfig.address.zip,
  addressCountry: siteConfig.address.country,
};

const aggregateRating: Json = {
  '@type': 'AggregateRating',
  ratingValue: siteConfig.reviews.rating,
  reviewCount: siteConfig.reviews.count,
  bestRating: 5,
  worstRating: 1,
};

/** Avaliações reais de alunos, sem autor inventado. */
const reviewNodes: Json[] = testimonials.map((testimonial) => ({
  '@type': 'Review',
  reviewRating: {
    '@type': 'Rating',
    ratingValue: testimonial.rating,
    bestRating: 5,
    worstRating: 1,
  },
  reviewBody: testimonial.quote,
  ...(testimonial.author ? { author: { '@type': 'Person', name: testimonial.author } } : {}),
}));

/** Nó principal: é ao mesmo tempo escola e negócio local. */
export const organizationSchema = (): Json => ({
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': ORG_ID,
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  url: absoluteUrl('/'),
  telephone: siteConfig.contact.phoneRaw,
  ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  address: postalAddress,
  areaServed: [
    { '@type': 'City', name: 'Rio de Janeiro' },
    { '@type': 'Place', name: 'Barra da Tijuca' },
  ],
  openingHours: siteConfig.hours.schema,
  priceRange: '$$',
  image: `${absoluteUrl('/')}${siteConfig.ogImage.replace(/^\//, '')}`,
  aggregateRating,
  review: reviewNodes,
  ...(sameAs.length > 0 ? { sameAs } : {}),
  knowsAbout: courses.map((course) => course.name),
});

export const websiteSchema = (): Json => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: absoluteUrl('/'),
  name: siteConfig.legalName,
  description: siteConfig.description,
  inLanguage: 'pt-BR',
  publisher: { '@id': ORG_ID },
});

export const courseSchema = (course: Course): Json => ({
  '@type': 'Course',
  '@id': `${absoluteUrl(`/cursos/${course.slug}`)}#course`,
  name: course.name,
  description: course.shortDescription,
  url: absoluteUrl(`/cursos/${course.slug}`),
  inLanguage: 'pt-BR',
  educationalLevel: course.level,
  teaches: course.learnings,
  provider: { '@id': ORG_ID },
  ...(course.duration ? { timeRequired: course.duration } : {}),
});

export const faqSchema = (items: FaqItem[] = faqs): Json => ({
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

export const breadcrumbSchema = (trail: { name: string; href: string }[]): Json => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.href),
  })),
});

export const articleSchema = (post: BlogPost): Json => ({
  '@type': 'BlogPosting',
  '@id': `${absoluteUrl(`/blog/${post.slug}`)}#article`,
  headline: post.title,
  description: post.excerpt,
  url: absoluteUrl(`/blog/${post.slug}`),
  datePublished: post.publishedAt,
  dateModified: post.updatedAt ?? post.publishedAt,
  inLanguage: 'pt-BR',
  articleSection: post.category,
  image: `${absoluteUrl('/')}${post.image.replace(/^\//, '')}`,
  author: { '@type': 'Organization', name: post.author, '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) },
});

/** Lista de cursos — ajuda o Google a entender o catálogo da escola. */
export const courseListSchema = (): Json => ({
  '@type': 'ItemList',
  name: 'Cursos da Cia Estética',
  itemListElement: courses.map((course, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: absoluteUrl(`/cursos/${course.slug}`),
    name: course.name,
  })),
});

/** Empacota vários nós em um único @graph. */
export const buildGraph = (...nodes: Json[]): Json => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
