import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { Benefits } from '@/components/sections/Benefits';
import { GoogleReviews } from '@/components/sections/GoogleReviews';
import { Location } from '@/components/sections/Location';
import { CtaBand } from '@/components/sections/CtaBand';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, breadcrumbSchema } from '@/lib/schema';
import { about } from '@/data/about';
import { whatsappUrlFor, whatsappMessages } from '@/lib/whatsapp';

export const metadata: Metadata = buildMetadata({
  title: 'Sobre a Cia Estética | Escola de Beleza na Barra da Tijuca',
  description:
    'Conheça a Cia Estética: escola de profissionais de beleza na Barra da Tijuca, Rio de Janeiro, com formação técnica voltada à prática e ao mercado da estética.',
  path: '/sobre',
  keywords: [
    'Cia Estética Barra da Tijuca',
    'escola de estética no Rio de Janeiro',
    'escola de beleza Barra da Tijuca',
  ],
});

const trail = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/sobre' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        lead={about.lead}
        trail={trail}
      >
        <Button
          href={whatsappUrlFor('visit')}
          variant="gold"
          size="lg"
          track={{ event: 'click_whatsapp', location: 'about_hero' }}
        >
          Conhecer a escola
        </Button>
        <Button href="/cursos" variant="outlineLight" size="lg" icon={null}>
          Ver cursos
        </Button>
      </PageHero>

      <Section tone="cream" space="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="left">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-cream-deep">
                <Image
                  src={about.image}
                  alt={about.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="lg:pt-6">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 80}>
                  <p className="mb-6 text-[1.0625rem] leading-[1.75] text-ink-muted last:mb-0">
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={280}>
                <blockquote className="mt-10 border-l-2 border-champagne pl-7">
                  <p className="font-display text-[1.5rem] leading-snug text-ink sm:text-[1.75rem]">
                    Conhecimento que transforma técnica em profissão.
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Valores */}
      <Section tone="white" space="lg">
        <Container>
          <SectionHeading
            eyebrow="Como trabalhamos"
            title="O que sustenta a formação na Cia Estética"
            align="center"
            maxWidth="max-w-2xl"
          />

          <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((value, index) => (
              <Reveal key={value.title} as="li" delay={(index % 3) * 100} className="group">
                <div className="flex size-12 items-center justify-center border border-champagne/40 text-champagne-deep transition-colors duration-500 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink">
                  <Icon name={value.icon} className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{value.description}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Benefits />
      <GoogleReviews />
      <Location />

      <CtaBand
        title="Venha conhecer a Cia Estética."
        text="Agende uma conversa com a equipe e conheça de perto a estrutura e as formações da escola."
        buttonLabel="Agendar uma visita"
        message={whatsappMessages.visit}
        location="about_footer"
        secondary={{ label: 'Ver cursos', href: '/cursos' }}
      />
    </>
  );
}
