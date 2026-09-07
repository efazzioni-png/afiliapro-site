import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import type { AnalyticsEvent } from '@/lib/analytics';

type Variant = 'primary' | 'gold' | 'outline' | 'outlineLight' | 'light' | 'ghost' | 'ghostLight';
/** `link` = sem preenchimento lateral, para CTAs textuais dentro de blocos. */
type Size = 'sm' | 'md' | 'lg' | 'link';

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-[2px] font-semibold uppercase ' +
  'tracking-[0.14em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  'disabled:pointer-events-none disabled:opacity-50 select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-cream hover:bg-ink-soft hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]',
  gold: 'bg-champagne text-ink hover:bg-champagne-light hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream',
  outlineLight: 'border border-cream/30 text-cream hover:border-champagne hover:bg-champagne hover:text-ink',
  light: 'bg-cream text-ink hover:bg-white hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]',
  ghost: 'text-ink hover:text-champagne-deep',
  ghostLight: 'text-cream hover:text-champagne-light',
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-3 text-[0.66rem]',
  md: 'px-7 py-4 text-[0.7rem]',
  lg: 'px-8 py-[1.15rem] text-[0.72rem] sm:px-10',
  link: 'py-2 text-[0.7rem]',
};

/**
 * NÃO passe utilidades de display, padding ou largura por `className` neste
 * componente — elas colidem com as classes base. Use `variant`, `size` e
 * `fullWidth`, ou envolva o botão em um elemento com a classe desejada.
 */

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Ícone à direita. Use `null` para nenhum. */
  icon?: string | null;
  iconLeft?: string;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
  /**
   * Rastreamento de conversão. Renderiza atributos `data-track-*` lidos por um
   * ÚNICO listener global (components/analytics/TrackingProvider.tsx).
   * Assim os CTAs continuam sendo Server Components: zero JS por botão.
   */
  track?: { event: AnalyticsEvent; location?: string; item?: string };
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon = 'ArrowRight',
  iconLeft,
  fullWidth,
  className,
  type = 'button',
  disabled,
  track,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  const trackAttrs = track
    ? {
        'data-track-event': track.event,
        ...(track.location ? { 'data-track-location': track.location } : {}),
        ...(track.item ? { 'data-track-item': track.item } : {}),
      }
    : {};

  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} className="size-4 shrink-0" strokeWidth={1.75} />}
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          className="size-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </>
  );

  if (href) {
    if (isExternal(href)) {
      const isHttp = href.startsWith('http');
      return (
        <a
          href={href}
          className={classes}
          {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...trackAttrs}
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...trackAttrs} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...trackAttrs} {...rest}>
      {content}
    </button>
  );
}
