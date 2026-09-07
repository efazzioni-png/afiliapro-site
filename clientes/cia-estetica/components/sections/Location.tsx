import { MapPin, Phone, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { MapEmbed } from '@/components/MapEmbed';
import { siteConfig, addressLines, maps } from '@/data/site';

/** "Venha conhecer a Cia Estética" (requisito 21). */
export function Location() {
  return (
    <Section tone="cream" space="lg" id="localizacao">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Localização"
              title="Venha conhecer a Cia Estética"
              lead="A unidade fica no Condomínio Downtown, um dos endereços mais conhecidos da Barra da Tijuca."
              maxWidth="max-w-lg"
            />

            <dl className="mt-11 space-y-7">
              <Reveal className="flex gap-5">
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
                </dd>
              </Reveal>

              <Reveal delay={90} className="flex gap-5">
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
                    data-track-location="location"
                    className="link-underline text-lg text-ink"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </dd>
              </Reveal>

              <Reveal delay={180} className="flex gap-5">
                <dt className="shrink-0">
                  <span className="grid size-11 place-items-center border border-champagne/40 text-champagne-deep">
                    <Clock className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="sr-only">Horário de atendimento</span>
                </dt>
                <dd className="text-ink-muted">
                  <p>{siteConfig.hours.summary}</p>
                  {siteConfig.hours.note && (
                    <p className="mt-1 text-sm text-stone">{siteConfig.hours.note}</p>
                  )}
                </dd>
              </Reveal>
            </dl>

            <Reveal delay={260}>
              <div className="mt-11">
                <Button
                  href={maps.directions}
                  variant="primary"
                  size="lg"
                  icon="ArrowUpRight"
                  track={{ event: 'click_maps', location: 'location_section' }}
                >
                  Como chegar
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" delay={120}>
            <div className="relative aspect-4/3 w-full overflow-hidden border border-ink/10 lg:aspect-square">
              <MapEmbed title="Mapa com a localização da Cia Estética na Barra da Tijuca" />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
