import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ContentBlocks } from '@/components/ContentBlocks';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, breadcrumbSchema } from '@/lib/schema';
import { privacyPolicy } from '@/data/legal';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Política de Privacidade | Cia Estética',
  description:
    'Como a Cia Estética coleta, usa e protege os dados pessoais dos visitantes deste site, em conformidade com a LGPD.',
  path: '/politica-de-privacidade',
});

const trail = [
  { name: 'Início', href: '/' },
  { name: 'Política de Privacidade', href: '/politica-de-privacidade' },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow="Legal"
        title="Política de Privacidade"
        lead={`Última atualização em ${formatDate(privacyPolicy.updatedAt)}.`}
        trail={trail}
      />

      <Section tone="cream" space="lg">
        <Container size="prose">
          <ContentBlocks blocks={privacyPolicy.blocks} />
        </Container>
      </Section>
    </>
  );
}
