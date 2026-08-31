import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { homeFaqs } from '@/data/faq';
import { whatsappUrlFor } from '@/lib/whatsapp';

/** FAQ da home (requisito 24). O JSON-LD FAQPage é emitido pela página. */
export function FaqSection() {
  return (
    <Section tone="white" space="lg" id="faq">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Dúvidas frequentes"
              title="Perguntas que recebemos com frequência"
              maxWidth="max-w-sm"
            />

            <Reveal delay={200}>
              <div className="mt-9 space-y-4">
                <p className="max-w-xs text-[0.95rem] leading-relaxed text-ink-muted">
                  Não encontrou a sua dúvida? A equipe responde direto pelo WhatsApp.
                </p>
                <Button
                  href={whatsappUrlFor('contact')}
                  variant="outline"
                  size="md"
                  track={{ event: 'click_whatsapp', location: 'faq' }}
                >
                  Falar com a equipe
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Accordion items={homeFaqs} />
            <p className="mt-8">
              <Button href="/faq" variant="ghost" size="link">
                Ver todas as perguntas
              </Button>
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
