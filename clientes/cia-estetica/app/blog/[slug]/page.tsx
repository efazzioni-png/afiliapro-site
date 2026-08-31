import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ContentBlocks } from '@/components/ContentBlocks';
import { PostCard } from '@/components/PostCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';

import { posts, getPostBySlug, getRelatedPosts } from '@/data/blog';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, articleSchema, breadcrumbSchema } from '@/lib/schema';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: 'Artigo não encontrado',
      description: 'O artigo que você procura não está disponível.',
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.seo.title,
    description: post.seo.description,
    path: `/blog/${post.slug}`,
    keywords: post.seo.keywords,
    image: post.image,
    type: 'article',
    publishedTime: post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  const trail = [
    { name: 'Início', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail), articleSchema(post))} />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        lead={post.excerpt}
        trail={trail}
      >
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-cream/50">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min de leitura</span>
          <span aria-hidden="true">·</span>
          <span>{post.author}</span>
        </p>
      </PageHero>

      <Section tone="cream" space="lg">
        <Container size="prose">
          <Reveal direction="scale">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-cream-deep">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 46rem"
                className="object-cover"
              />
            </div>
          </Reveal>

          <article className="mt-14">
            <ContentBlocks blocks={post.content} />
          </article>

          <Reveal>
            <div className="mt-16 border-t border-ink/10 pt-8 text-sm text-stone">
              Publicado em{' '}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.category}
            </div>
          </Reveal>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="white" space="md">
          <Container>
            <SectionHeading eyebrow="Continue lendo" title="Artigos relacionados" />
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 110}>
                  <PostCard post={item} className="h-full" />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand
        title="Quer transformar isso em profissão?"
        text="A equipe da Cia Estética orienta você sobre a formação mais adequada ao seu momento."
        location="article_footer"
        secondary={{ label: 'Ver cursos', href: '/cursos' }}
      />
    </>
  );
}
