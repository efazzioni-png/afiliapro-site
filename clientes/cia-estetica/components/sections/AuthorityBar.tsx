import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { siteConfig } from '@/data/site';
import { authorityHeadline, microcopy } from '@/data/about';

/**
 * Barra de autoridade (requisito 9): números animados sobre fundo escuro.
 * Todos os valores vêm de `siteConfig.stats` — nenhum número é inventado no
 * componente. Ver a nota editorial em data/about.ts sobre o título.
 */
export function AuthorityBar() {
  return (
    <section className="grain relative bg-ink py-16 text-cream sm:py-20" aria-labelledby="autoridade">
      <Container>
        <Reveal>
          <h2
            id="autoridade"
            className="text-center font-display text-xl font-normal tracking-wide text-cream/70 sm:text-2xl"
          >
            {authorityHeadline}
          </h2>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-y-12 sm:gap-y-14 lg:grid-cols-4">
          {siteConfig.stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 90}
              className="relative px-4 text-center lg:px-6"
            >
              {/* Fio separador vertical entre as colunas */}
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-cream/12 lg:block"
                />
              )}
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-[2.75rem] leading-none text-champagne sm:text-[3.25rem]">
                  <Counter
                    value={stat.value}
                    decimals={'decimals' in stat ? stat.decimals : 0}
                    prefix={'prefix' in stat ? stat.prefix : ''}
                    suffix={'suffix' in stat ? stat.suffix : ''}
                    plain={'plain' in stat ? stat.plain : false}
                  />
                </span>
                <span className="mt-4 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cream/50">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>

      {/* Faixa de microcopy em movimento — luxo discreto */}
      <div className="relative mt-16 overflow-hidden border-y border-cream/10 py-4">
        <div className="animate-marquee flex w-max gap-14 whitespace-nowrap">
          {Array.from({ length: 2 }, (_, loop) => (
            <div key={loop} className="flex shrink-0 gap-14" aria-hidden={loop === 1}>
              {Object.values(microcopy).map((phrase) => (
                <span
                  key={phrase}
                  className="flex items-center gap-14 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-cream/35"
                >
                  {phrase}
                  <span className="size-1 rounded-full bg-champagne/60" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
