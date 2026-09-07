import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { TestimonialCard } from '@/components/TestimonialCard';
import { GoogleReviews } from '@/components/sections/GoogleReviews';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, breadcrumbSchema } from '@/lib/schema';
import { testimonials } from '@/data/testimonials';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = buildMetadata({
  title: 'Depoimentos de Alunos | Cia Estética Barra da Tijuca',
  description:
    'Avaliações reais de alunos da Cia Estética, escola de profissionais de beleza na Barra da Tijuca, Rio de Janeiro. 4,9 estrelas no Google.',
  path: '/depoimentos',
  keywords: ['Cia Estética avaliações', 'depoimentos curso de estética RJ'],
});

const trail = [
  { name: 'Início', href: '/' },
  { name: 'Depoimentos', href: '/depoimentos' },
];

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow="Depoimentos"
        title="Quem aprende com a Cia Estética, recomenda."
        lead={`Avaliação ${siteConfig.reviews.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} no Google, com ${siteConfig.reviews.displayCount} avaliações publicadas por alunos.`}
        trail={trail}
      />

      <Section tone="cream" space="lg">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.quote} delay={(index % 3) * 110}>
                <TestimonialCard testimonial={testimonial} className="h-full" />
              </Reveal>
            ))}
          </div>

          {/*
            Só exibimos as avaliações efetivamente fornecidas pela empresa.
            Para acrescentar novas, edite data/testimonials.ts — a página,
            a home e o JSON-LD de Review se atualizam juntos.
          */}
          <Reveal delay={160}>
            <p className="mt-14 text-center text-sm text-stone">
              As avaliações acima foram publicadas por alunos no Google.
            </p>
          </Reveal>
        </Container>
      </Section>

      <GoogleReviews />

      <CtaBand
        title="Faça parte da próxima turma."
        text="Fale com a equipe e descubra qual formação combina com o seu momento profissional."
        location="testimonials_footer"
        secondary={{ label: 'Ver cursos', href: '/cursos' }}
      />
    </>
  );
}
