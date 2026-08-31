import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { faqs } from '@/data/faq';

export const metadata: Metadata = buildMetadata({
  title: 'Perguntas Frequentes | Cia Estética Barra da Tijuca',
  description:
    'Dúvidas sobre cursos, matrícula, turmas, aulas práticas, produtos e localização da Cia Estética, escola de profissionais de beleza na Barra da Tijuca, RJ.',
  path: '/faq',
  keywords: ['dúvidas curso de estética RJ', 'Cia Estética perguntas frequentes'],
});

const trail = [
  { name: 'Início', href: '/' },
  { name: 'Perguntas frequentes', href: '/faq' },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail), faqSchema(faqs))} />

      <PageHero
        eyebrow="Dúvidas frequentes"
        title="Perguntas frequentes"
        lead="As respostas para o que mais nos perguntam sobre cursos, turmas, matrícula e a unidade da Barra da Tijuca."
        trail={trail}
      />

      <Section tone="cream" space="lg">
        <Container size="narrow">
          <Reveal>
            {/* defaultOpen={-1}: em uma página dedicada, o visitante escolhe o que abrir. */}
            <Accordion items={faqs} defaultOpen={-1} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Ficou alguma dúvida?"
        text="A equipe da Cia Estética responde direto pelo WhatsApp, de segunda a sexta, das 09h às 18h."
        location="faq_footer"
        secondary={{ label: 'Ver cursos', href: '/cursos' }}
      />
    </>
  );
}
