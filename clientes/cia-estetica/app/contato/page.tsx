import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/ContactForm';
import { MapEmbed } from '@/components/MapEmbed';
import { SocialIcon, socialLabels, type SocialName } from '@/components/ui/SocialIcon';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, breadcrumbSchema } from '@/lib/schema';
import { siteConfig, addressLines, maps } from '@/data/site';
import { whatsappUrlFor } from '@/lib/whatsapp';

export const metadata: Metadata = buildMetadata({
  title: 'Contato | Cia Estética — Barra da Tijuca, Rio de Janeiro',
  description:
    'Fale com a Cia Estética: WhatsApp, telefone (21) 2669-0788 e unidade na Av. das Américas, 500, Sala 304, Barra da Tijuca, Rio de Janeiro.',
  path: '/contato',
  keywords: ['Cia Estética contato', 'escola de estética Barra da Tijuca telefone'],
});

const trail = [
  { name: 'Início', href: '/' },
  { name: 'Contato', href: '/contato' },
];

export default function ContactPage() {
  const socials = (Object.entries(siteConfig.social) as [SocialName, string][]).filter(
    ([, url]) => url.length > 0,
  );

  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow="Contato"
        title="Pronta para dar o próximo passo?"
        lead="Fale com a equipe da Cia Estética. Respondemos de segunda a sexta, das 09h às 18h."
        trail={trail}
      >
        <Button
          href={whatsappUrlFor('contact')}
          variant="gold"
          size="lg"
          track={{ event: 'click_whatsapp', location: 'contact_hero' }}
        >
          Falar no WhatsApp
        </Button>
        <Button
          href={`tel:${siteConfig.contact.phoneRaw}`}
          variant="outlineLight"
          size="lg"
          icon={null}
          iconLeft="Phone"
          track={{ event: 'click_phone', location: 'contact_hero' }}
        >
          {siteConfig.contact.phone}
        </Button>
      </PageHero>

      <Section tone="cream" space="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* Formulário */}
            <Reveal>
              <h2 className="text-[1.75rem] sm:text-[2rem]">Envie uma mensagem</h2>
              <p className="mt-3 max-w-md leading-relaxed text-ink-muted">
                Conte o que você procura e a equipe responde com as informações da turma vigente.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </Reveal>

            {/* Dados de contato */}
            <Reveal direction="right" delay={120}>
              <div className="border border-ink/10 bg-white p-8 sm:p-10">
                <h2 className="text-[1.5rem]">Canais de atendimento</h2>

                <dl className="mt-8 space-y-7">
                  <div className="flex gap-5">
                    <dt className="shrink-0">
                      <span className="grid size-11 place-items-center border border-champagne/40 text-champagne-deep">
                        <MapPin className="size-5" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="sr-only">Endereço</span>
                    </dt>
                    <dd>
                      <address className="not-italic leading-relaxed text-ink-muted">
                        {addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                      <a
                        href={maps.directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-track-event="click_maps"
                        data-track-location="contact_page"
                        className="link-underline mt-1.5 inline-block py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-champagne-deep"
                      >
                        Como chegar
                      </a>
                    </dd>
                  </div>

                  <div className="flex gap-5">
                    <dt className="shrink-0">
                      <span className="grid size-11 place-items-center border border-champagne/40 text-champagne-deep">
                        <Phone className="size-5" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="sr-only">Telefone</span>
                    </dt>
                    <dd>
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        data-track-event="click_phone"
                        data-track-location="contact_page"
                        className="link-underline text-lg text-ink"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </dd>
                  </div>

                  {siteConfig.contact.email && (
                    <div className="flex gap-5">
                      <dt className="shrink-0">
                        <span className="grid size-11 place-items-center border border-champagne/40 text-champagne-deep">
                          <Mail className="size-5" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="sr-only">E-mail</span>
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          data-track-event="click_contact"
                          data-track-location="contact_page"
                          className="link-underline text-ink"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </dd>
                    </div>
                  )}

                  <div className="flex gap-5">
                    <dt className="shrink-0">
                      <span className="grid size-11 place-items-center border border-champagne/40 text-champagne-deep">
                        <Clock className="size-5" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="sr-only">Horário de atendimento</span>
                    </dt>
                    <dd className="text-ink-muted">
                      <ul className="space-y-1">
                        {siteConfig.hours.days.map((day) => (
                          <li key={day.label} className="flex justify-between gap-6">
                            <span>{day.label}</span>
                            <span className="text-ink">{day.value}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                {socials.length > 0 && (
                  <div className="mt-9 border-t border-ink/10 pt-7">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-stone">
                      Redes sociais
                    </p>
                    <ul className="mt-4 flex gap-3">
                      {socials.map(([name, url]) => (
                        <li key={name}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={socialLabels[name]}
                            data-track-event="click_social"
                            data-track-item={name}
                            className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink-muted transition-colors duration-300 hover:border-champagne hover:bg-champagne hover:text-ink"
                          >
                            <SocialIcon name={name} className="size-4" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-9">
                  <Button
                    href={whatsappUrlFor('contact')}
                    variant="primary"
                    size="lg"
                    fullWidth
                    iconLeft="MessageCircle"
                    icon={null}
                    track={{ event: 'click_whatsapp', location: 'contact_card' }}
                  >
                    Falar no WhatsApp
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Mapa em largura total */}
      <section aria-label="Mapa da localização da Cia Estética" className="h-[24rem] w-full sm:h-[30rem]">
        <MapEmbed title="Mapa com a localização da Cia Estética na Barra da Tijuca" />
      </section>
    </>
  );
}
