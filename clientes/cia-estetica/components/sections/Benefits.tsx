import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { benefits } from '@/data/benefits';
import { whatsappUrlFor } from '@/lib/whatsapp';

/** "Por que escolher a Cia Estética?" (requisito 14). */
export function Benefits() {
  return (
    <Section tone="white" space="lg" id="diferenciais">
      <Container>
        <SectionHeading
          eyebrow="Diferenciais"
          title="Por que escolher a Cia Estética?"
          lead="Seis pontos que resumem a forma como a escola conduz a formação de novos profissionais."
          align="center"
          maxWidth="max-w-2xl"
        />

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} as="li" delay={(index % 3) * 110} className="group">
              <div className="flex size-12 items-center justify-center border border-champagne/40 text-champagne-deep transition-colors duration-500 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink">
                <Icon name={benefit.icon} className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-xl">{benefit.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                {benefit.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <div className="mt-16 text-center">
            <Button
              href={whatsappUrlFor('courses')}
              variant="primary"
              size="lg"
              track={{ event: 'click_whatsapp', location: 'benefits' }}
            >
              Quero me profissionalizar
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
