'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Contador animado da barra de autoridade.
 * Só anima quando entra na viewport, anima uma única vez e é totalmente
 * desativado quando o usuário pede menos movimento.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  plain = false,
  duration = 1600,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** true = exibe o número como está (ex.: um ano), sem contagem. */
  plain?: boolean;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(plain ? value : 0);

  useEffect(() => {
    const node = ref.current;
    if (!node || plain) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sem animação: mostra o valor final já no próximo frame.
      // Fallback aplicado no próximo frame (e não durante o efeito), para
      // não disparar uma cascata de renders na montagem.
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      const idle = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(idle);
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo: rápido no início, desaceleração elegante no fim.
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration, plain]);

  const formatted = plain
    ? String(value)
    : display.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
