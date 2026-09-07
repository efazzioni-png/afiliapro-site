import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Marca da Cia Estética.
 *
 * ⚠️ PLACEHOLDER TIPOGRÁFICO: nenhum arquivo de logo oficial foi fornecido.
 * Este wordmark foi desenhado para funcionar como marca provisória premium.
 *
 * PARA USAR O LOGO OFICIAL:
 *   1. Coloque o arquivo em /public/images/logo.svg (e logo-light.svg).
 *   2. Substitua o bloco <span> abaixo por:
 *        <Image src="/images/logo.svg" alt="Cia Estética" width={168} height={40} priority />
 *   Nada mais no site precisa mudar.
 */
export function Logo({
  tone = 'dark',
  className,
  href = '/',
  compact = false,
}: {
  tone?: 'dark' | 'light';
  className?: string;
  href?: string | null;
  compact?: boolean;
}) {
  const light = tone === 'light';

  const mark = (
    <span className={cn('flex flex-col leading-none', className)}>
      <span
        className={cn(
          'font-display font-medium tracking-[0.01em] transition-all duration-500',
          compact ? 'text-[1.35rem]' : 'text-[1.55rem] sm:text-[1.7rem]',
          light ? 'text-cream' : 'text-ink',
        )}
      >
        Cia<span className="text-champagne">.</span>Estética
      </span>
      <span
        className={cn(
          'mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.42em] transition-all duration-500',
          compact && 'sr-only',
          light ? 'text-cream/55' : 'text-stone',
        )}
      >
        Beleza Profissional
      </span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label="Cia Estética | Beleza Profissional — página inicial" className="shrink-0">
      {mark}
    </Link>
  );
}
