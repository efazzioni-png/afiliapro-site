import { cn } from '@/lib/utils';

/** Largura máxima e respiro lateral consistentes em todo o site. */
export function Container({
  children,
  className,
  size = 'default',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow' | 'prose';
  as?: 'div' | 'section' | 'header' | 'footer' | 'article' | 'nav';
}) {
  const widths = {
    narrow: 'max-w-4xl',
    prose: 'max-w-[46rem]',
    default: 'max-w-[80rem]',
    wide: 'max-w-[90rem]',
  };

  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', widths[size], className)}>
      {children}
    </Tag>
  );
}
