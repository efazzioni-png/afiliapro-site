import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { PostCard } from '@/components/PostCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, breadcrumbSchema } from '@/lib/schema';
import { sortedPosts, activeBlogCategories } from '@/data/blog';

export const metadata: Metadata = buildMetadata({
  title: 'Blog | Conteúdo para quem vive de beleza — Cia Estética',
  description:
    'Artigos sobre carreira, técnica e mercado da estética: como começar na profissão, especializações, micropigmentação, laser e escolha de cursos.',
  path: '/blog',
  keywords: [
    'blog de estética',
    'como começar na estética',
    'carreira em estética RJ',
    'mercado da beleza',
  ],
});

const trail = [
  { name: 'Início', href: '/' },
  { name: 'Blog', href: '/blog' },
];

export default function BlogPage() {
  const [featured, ...rest] = sortedPosts;

  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow="Blog"
        title="Conteúdo para quem vive de beleza"
        lead="Orientação prática sobre profissão, técnica e mercado da estética — escrita para quem já atua e para quem está começando."
        trail={trail}
      />

      <Section tone="cream" space="lg">
        <Container>
          {/* Categorias com artigos publicados */}
          <Reveal>
            <ul className="flex flex-wrap gap-2.5">
              {activeBlogCategories.map((category) => (
                <li
                  key={category}
                  className="border border-ink/15 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-muted"
                >
                  {category}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Artigo de abertura */}
          {featured && (
            <Reveal delay={100} className="mt-12 block">
              <div className="border-b border-ink/10 pb-14">
                <PostCard post={featured} priority />
              </div>
            </Reveal>
          )}

          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 110}>
                <PostCard post={post} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Da leitura à prática."
        text="Se um destes temas é o seu próximo passo, converse com a equipe da Cia Estética sobre a formação correspondente."
        location="blog_footer"
        secondary={{ label: 'Ver cursos', href: '/cursos' }}
      />
    </>
  );
}
