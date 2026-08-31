import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Crumb {
  name: string;
  href: string;
}

/** Trilha de navegação. O JSON-LD correspondente é emitido pela própria página. */
export function Breadcrumbs({
  trail,
  tone = 'dark',
  className,
}: {
  trail: Crumb[];
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const light = tone === 'light';

  return (
    <nav aria-label="Você está aqui" className={cn('text-xs', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  className={cn('size-3.5', light ? 'text-cream/40' : 'text-ink/30')}
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span aria-current="page" className={cn('inline-block py-1.5', light ? 'text-cream/60' : 'text-stone')}>
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn(
                    'link-underline inline-block py-1.5 transition-colors',
                    light ? 'text-cream/70 hover:text-champagne-light' : 'text-ink-muted hover:text-champagne-deep',
                  )}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
