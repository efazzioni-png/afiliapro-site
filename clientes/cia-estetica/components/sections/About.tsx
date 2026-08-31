import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { about } from '@/data/about';

/** Seção "Sobre a Cia Estética" na home (requisito 13). */
export function About() {
  return (
    <Section tone="cream" space="lg" id="sobre">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Imagens */}
          <Reveal direction="left" className="relative order-last lg:order-first">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-cream-deep sm:aspect-3/2 lg:aspect-4/5">
              <Image
                src={about.image}
                alt={about.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>

            {/* Selo sobreposto */}
            <div className="absolute -right-3 bottom-6 bg-ink px-7 py-6 text-cream shadow-[var(--shadow-float)] sm:-right-6 lg:-right-10">
              <p className="font-display text-[2.4rem] leading-none text-champagne">100%</p>
              <p className="mt-2 max-w-[8rem] text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-cream/60">
                Foco em formação profissional
              </p>
            </div>
          </Reveal>

          {/* Texto */}
          <div>
            <Reveal>
              <p className="eyebrow">{about.eyebrow}</p>
            </Reveal>

            <Reveal delay={90}>
              <h2 className="mt-6 text-[2rem] leading-[1.12] sm:text-[2.6rem] lg:text-[2.9rem]">
                {about.title}
              </h2>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-ink-muted">{about.lead}</p>
            </Reveal>

            {about.paragraphs.slice(0, 2).map((paragraph, index) => (
              <Reveal key={paragraph} delay={240 + index * 70}>
                <p className="mt-5 leading-relaxed text-ink-muted">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={420}>
              <div className="mt-11">
                <Button href="/sobre" variant="outline" size="lg">
                  Conheça a Cia Estética
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
