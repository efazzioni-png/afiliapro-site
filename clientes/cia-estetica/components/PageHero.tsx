import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { cn } from '@/lib/utils';

/**
 * Cabeçalho padrão das páginas internas.
 * Mantém a mesma altura e ritmo em todo o site, o que dá consistência de marca.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  trail,
  tone = 'ink',
  children,
  align = 'left',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  trail: Crumb[];
  tone?: 'ink' | 'cream';
  children?: React.ReactNode;
  align?: 'left' | 'center';
}) {
  const light = tone === 'ink';
  const centered = align === 'center';

  return (
    <section
      className={cn(
        'grain relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pt-44',
        light ? 'bg-ink text-cream' : 'bg-cream text-ink',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -right-32 -top-40 size-[38rem] rounded-full blur-2xl',
          light
            ? 'bg-[radial-gradient(circle,rgba(198,165,107,0.18),transparent_65%)]'
            : 'bg-[radial-gradient(circle,rgba(198,165,107,0.16),transparent_66%)]',
        )}
      />

      <Container className="relative">
        <Breadcrumbs trail={trail} tone={light ? 'light' : 'dark'} />

        <div className={cn('mt-8 max-w-3xl', centered && 'mx-auto text-center')}>
          {eyebrow && (
            <Reveal>
              <p className={cn('eyebrow', centered && 'eyebrow-center', light && 'text-champagne')}>
                {eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal delay={80}>
            <h1 className="mt-5 text-[2.25rem] leading-[1.08] sm:text-[3rem] lg:text-[3.5rem]">
              {title}
            </h1>
          </Reveal>

          {lead && (
            <Reveal delay={160}>
              <p
                className={cn(
                  'mt-6 max-w-2xl text-[1.0625rem] leading-relaxed sm:text-lg',
                  centered && 'mx-auto',
                  light ? 'text-cream/70' : 'text-ink-muted',
                )}
              >
                {lead}
              </p>
            </Reveal>
          )}

          {children && (
            <Reveal delay={240}>
              <div className={cn('mt-10 flex flex-col gap-3 sm:flex-row', centered && 'sm:justify-center')}>
                {children}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
