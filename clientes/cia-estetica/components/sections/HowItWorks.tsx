import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { journeySteps } from '@/data/journey';
import { whatsappUrlFor } from '@/lib/whatsapp';

/** "Como funciona" (requisito 17): jornada com linha conectando as etapas. */
export function HowItWorks() {
  return (
    <Section tone="ink" space="lg" id="como-funciona" className="grain">
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Do primeiro contato à sua nova jornada profissional"
          lead="Cinco etapas simples entre a decisão e o começo da prática."
          align="center"
          tone="light"
          maxWidth="max-w-2xl"
        />

        <ol className="relative mt-20 grid gap-14 lg:grid-cols-5 lg:gap-6">
          {/* Linha conectora — some no mobile, onde a leitura é vertical */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent lg:block"
          />

          {journeySteps.map((step, index) => (
            <Reveal
              key={step.number}
              as="li"
              delay={index * 110}
              className="relative flex gap-6 lg:block lg:text-center"
            >
              <div className="relative shrink-0 lg:mx-auto">
                <div className="grid size-14 place-items-center rounded-full border border-champagne/40 bg-ink text-champagne transition-colors duration-500 lg:mx-auto">
                  <Icon name={step.icon} className="size-5" strokeWidth={1.5} />
                </div>
                {/* Linha vertical no mobile */}
                {index < journeySteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-14 h-[calc(100%+2.25rem)] w-px -translate-x-1/2 bg-cream/12 lg:hidden"
                  />
                )}
              </div>

              <div className="pb-2 lg:pb-0">
                <span className="numeral block text-xs tracking-[0.2em] text-champagne lg:mt-6">
                  {step.number}
                </span>
                <h3 className="mt-2 text-xl text-cream lg:mt-3">{step.title}</h3>
                <p className="mt-3 text-[0.925rem] leading-relaxed text-cream/60">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <div className="mt-20 text-center">
            <Button
              href={whatsappUrlFor('enroll')}
              variant="gold"
              size="lg"
              track={{ event: 'click_whatsapp', location: 'how_it_works' }}
            >
              Falar com a equipe
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
