'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { maps } from '@/data/site';

/**
 * Mapa interativo com carregamento adiado.
 *
 * O iframe do Google Maps é pesado e, carregado de imediato, derruba o
 * Lighthouse. Aqui ele só é inserido quando a seção entra na viewport —
 * continua sendo um mapa interativo de verdade, sem custo na primeira carga.
 */
export function MapEmbed({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Sem IntersectionObserver, carrega o mapa assim mesmo.
      // Fallback aplicado no próximo frame (e não durante o efeito), para
      // não disparar uma cascata de renders na montagem.
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setLoad(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full min-h-[20rem] w-full bg-cream-deep">
      {load ? (
        <iframe
          src={maps.embed}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0 grayscale-[35%]"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-stone">
          <MapPin className="size-8 animate-pulse" strokeWidth={1.25} aria-hidden="true" />
          <span className="sr-only">Carregando mapa…</span>
        </div>
      )}
    </div>
  );
}
