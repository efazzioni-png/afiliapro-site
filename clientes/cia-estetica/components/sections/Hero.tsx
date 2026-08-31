import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { StarRating } from '@/components/ui/StarRating';
import { siteConfig } from '@/data/site';
import { whatsappUrlFor } from '@/lib/whatsapp';

/**
 * Hero da home (requisito 8).
 * Mobile: empilhado, imagem depois do texto. Desktop: duas colunas.
 * A imagem usa `priority` por ser o LCP da página.
 */
export function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-cream pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-44">
      {/* Halo champagne discreto ao fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(198,165,107,0.16),transparent_66%)] blur-2xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* ---------- Texto ---------- */}
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow">Escola de profissionais de beleza · Barra da Tijuca</p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-7 text-[2.5rem] leading-[1.06] sm:text-[3.4rem] lg:text-[4rem]">
                Transforme sua paixão pela beleza em uma{' '}
                <em className="font-normal not-italic text-champagne-deep">profissão</em>.
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-ink-muted sm:text-lg">
                Aprenda técnicas profissionais, desenvolva novas habilidades e prepare-se para atuar
                no mercado da estética com conhecimento, prática e confiança.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href="/cursos"
                  variant="primary"
                  size="lg"
                  track={{ event: 'click_hero_cta', location: 'hero', item: 'conhecer_cursos' }}
                >
                  Conhecer cursos
                </Button>
                <Button
                  href={whatsappUrlFor('hero')}
                  variant="outline"
                  size="lg"
                  icon={null}
                  track={{ event: 'click_whatsapp', location: 'hero' }}
                >
                  Falar com a Cia Estética
                </Button>
              </div>
            </Reveal>

            {/* Selo de avaliação */}
            <Reveal delay={340}>
              <div className="mt-12 inline-flex items-center gap-5 border-t border-ink/10 pt-7">
                <div>
                  <StarRating
                    rating={siteConfig.reviews.rating}
                    size="md"
                    label={`Avaliação ${siteConfig.reviews.rating} de 5 no Google`}
                  />
                  <p className="mt-2 text-sm font-medium text-ink">
                    {siteConfig.reviews.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} no
                    Google
                  </p>
                </div>
                <div className="h-10 w-px bg-ink/10" aria-hidden="true" />
                <p className="text-sm text-stone">
                  {siteConfig.reviews.displayCount} avaliações
                  <br />
                  de alunos
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---------- Imagem ---------- */}
          <Reveal direction="scale" delay={140} className="relative">
            <div className="relative">
              {/* Moldura champagne deslocada */}
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -right-5 hidden h-full w-full border border-champagne/45 sm:block"
              />

              <div className="relative aspect-4/5 w-full overflow-hidden bg-cream-deep sm:aspect-3/4 lg:aspect-4/5">
                <Image
                  src="/images/hero-cia-estetica.jpg"
                  alt="Profissional de estética conduzindo um procedimento em ambiente clínico da Cia Estética"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>

              {/* Cartão flutuante de reforço */}
              <div className="absolute -bottom-8 left-4 hidden max-w-[15rem] bg-ink px-6 py-5 text-cream shadow-[var(--shadow-float)] sm:block lg:-left-8">
                <p className="font-display text-[1.35rem] leading-tight">Aprenda. Pratique. Evolua.</p>
                <p className="mt-2 text-xs leading-relaxed text-cream/60">
                  Formação profissional para o mercado da beleza.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
