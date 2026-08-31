'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type RevealDirection = 'up' | 'fade' | 'left' | 'right' | 'scale';

/**
 * Scroll reveal com IntersectionObserver.
 *
 * Toda a animação vive no CSS (ver globals.css); este componente apenas
 * adiciona a classe `is-visible` quando o elemento entra na viewport.
 * Custo: ~1KB de JS, sem biblioteca de animação — e respeita
 * automaticamente `prefers-reduced-motion` pelo CSS.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  as: Tag = 'div',
  threshold = 0.15,
  ...rest
}: {
  children: React.ReactNode;
  /** Atraso em milissegundos, para escalonar a entrada de listas. */
  delay?: number;
  direction?: RevealDirection;
  className?: string;
  as?: 'div' | 'li' | 'span' | 'article';
  threshold?: number;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Sem suporte a IntersectionObserver: revela o conteúdo mesmo assim,
      // Fallback aplicado no próximo frame (e não durante o efeito), para
      // não disparar uma cascata de renders na montagem.
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={direction === 'up' ? '' : direction}
      className={cn(visible && 'is-visible', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
