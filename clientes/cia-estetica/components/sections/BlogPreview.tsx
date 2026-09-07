import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { PostCard } from '@/components/PostCard';
import { sortedPosts } from '@/data/blog';

/** Prévia do blog na home (requisito 19). */
export function BlogPreview() {
  const posts = sortedPosts.slice(0, 3);

  return (
    <Section tone="cream" space="lg" id="blog">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Conteúdo para quem vive de beleza"
            lead="Orientação prática sobre profissão, técnica e mercado da estética."
            maxWidth="max-w-xl"
          />
          <Reveal delay={200} className="shrink-0">
            <Button href="/blog" variant="outline" size="md">
              Ver todos os artigos
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 110}>
              <PostCard post={post} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
