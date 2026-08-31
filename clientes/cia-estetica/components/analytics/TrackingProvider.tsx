'use client';

import { useEffect } from 'react';
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics';

/**
 * Um único listener de clique para TODO o site.
 *
 * Qualquer elemento com `data-track-event` dispara o evento correspondente.
 * Isso mantém todos os botões e links como Server Components (zero JS por
 * CTA) e centraliza o rastreamento de conversão em um lugar só.
 *
 * Ver `components/ui/Button.tsx` (prop `track`).
 */
export function TrackingProvider() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const element = target?.closest<HTMLElement>('[data-track-event]');
      if (!element) return;

      trackEvent(element.dataset.trackEvent as AnalyticsEvent, {
        location: element.dataset.trackLocation,
        item: element.dataset.trackItem,
      });
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

/** Dispara um evento na montagem — usado para `view_course`. */
export function TrackView({ event, item }: { event: AnalyticsEvent; item?: string }) {
  useEffect(() => {
    trackEvent(event, { item });
  }, [event, item]);

  return null;
}
