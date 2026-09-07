import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { ArrowRight } from 'lucide-react';
import { careerPaths } from '@/data/paths';

/** "Escolha seu próximo passo" (requisito 10): três portas de entrada. */
export function PathChoice() {
  return (
    <Section tone="cream" space="lg" id="caminhos">
      <Container>
        <SectionHeading
          eyebrow="Por onde começar"
          title="Escolha o seu próximo passo"
          lead="Cada momento profissional pede um caminho diferente. Identifique o seu e a equipe orienta o resto."
        />

        <div className="mt-16 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {careerPaths.map((path, index) => (
            <Reveal key={path.title} delay={index * 110} className="group bg-cream">
              <Link
                href={path.href}
                className="flex h-full flex-col p-8 transition-colors duration-500 hover:bg-white sm:p-10"
                data-track-event="click_course"
                data-track-location="path_choice"
                data-track-item={path.title}
              >
                <div className="flex items-center justify-between">
                  <span className="numeral text-sm text-champagne">{path.step}</span>
                  <Icon
                    name={path.icon}
                    className="size-7 text-ink/25 transition-colors duration-500 group-hover:text-champagne"
                  />
                </div>

                <h3 className="mt-10 text-[1.6rem] transition-colors duration-500 group-hover:text-champagne-deep">
                  {path.title}
                </h3>

                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-muted">
                  {path.description}
                </p>

                <span className="mt-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink">
                  {path.cta}
                  <ArrowRight
                    className="size-4 transition-transform duration-500 group-hover:translate-x-1.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
