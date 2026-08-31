import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

/** Cabeçalho padrão das seções: rótulo, título e linha de apoio. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'dark',
  as: Heading = 'h2',
  className,
  maxWidth = 'max-w-2xl',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  maxWidth?: string;
}) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        maxWidth,
        centered && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className={cn('eyebrow', centered && 'eyebrow-center', tone === 'light' && 'text-champagne-light')}>
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Reveal delay={80}>
        <Heading
          className={cn(
            'mt-5 text-[2rem] leading-[1.12] sm:text-[2.6rem] lg:text-[3.15rem]',
            tone === 'light' ? 'text-cream' : 'text-ink',
          )}
        >
          {title}
        </Heading>
      </Reveal>

      {lead && (
        <Reveal delay={160}>
          <p
            className={cn(
              'mt-6 text-[1.0625rem] leading-relaxed sm:text-lg',
              tone === 'light' ? 'text-cream/70' : 'text-ink-muted',
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
