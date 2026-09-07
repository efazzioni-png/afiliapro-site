import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ContentBlocks } from '@/components/ContentBlocks';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, breadcrumbSchema } from '@/lib/schema';
import { termsOfUse } from '@/data/legal';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Termos de Uso | Cia Estética',
  description: 'Condições de uso do site da Cia Estética | Beleza Profissional.',
  path: '/termos-de-uso',
});

const trail = [
  { name: 'Início', href: '/' },
  { name: 'Termos de Uso', href: '/termos-de-uso' },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow="Legal"
        title="Termos de Uso"
        lead={`Última atualização em ${formatDate(termsOfUse.updatedAt)}.`}
        trail={trail}
      />

      <Section tone="cream" space="lg">
        <Container size="prose">
          <ContentBlocks blocks={termsOfUse.blocks} />
        </Container>
      </Section>
    </>
  );
}
