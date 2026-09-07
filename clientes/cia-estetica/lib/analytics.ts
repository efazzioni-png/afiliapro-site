/**
 * ============================================================================
 *  ANALYTICS — eventos de conversão
 * ============================================================================
 *  Um único ponto de disparo que alimenta, ao mesmo tempo:
 *    • Google Analytics 4 (gtag)
 *    • Google Tag Manager (dataLayer)
 *    • Meta Pixel (fbq)
 *
 *  Se um ID não estiver configurado, o script nem é carregado e o disparo
 *  simplesmente não acontece — sem erro no console.
 *
 *  Os IDs ficam em variáveis de ambiente (ver .env.example). Nunca no código.
 * ============================================================================
 */

/** Eventos rastreados no site (requisitos 39 e 40 do briefing). */
export type AnalyticsEvent =
  | 'click_whatsapp'
  | 'click_course'
  | 'click_contact'
  | 'click_maps'
  | 'click_phone'
  | 'click_social'
  | 'click_hero_cta'
  | 'click_products'
  | 'form_submit'
  | 'view_course';

export interface AnalyticsPayload {
  /** Onde o clique aconteceu: 'hero', 'header', 'floating', 'course_card'... */
  location?: string;
  /** Nome do curso, da categoria de produto ou do artigo. */
  item?: string;
  /** Valor livre para segmentações futuras. */
  value?: string;
  [key: string]: string | number | boolean | undefined;
}

/** Eventos do Meta Pixel equivalentes aos eventos internos. */
const META_EVENTS: Partial<Record<AnalyticsEvent, string>> = {
  click_whatsapp: 'Contact',
  click_phone: 'Contact',
  click_contact: 'Contact',
  form_submit: 'Lead',
  view_course: 'ViewContent',
  click_course: 'ViewContent',
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara um evento de conversão para todas as plataformas configuradas.
 * Seguro para chamar em qualquer lugar: não faz nada no servidor.
 */
export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') return;

  const params = { event_category: 'engagement', ...payload };

  window.dataLayer?.push({ event, ...params });
  window.gtag?.('event', event, params);

  const metaEvent = META_EVENTS[event];
  if (metaEvent) {
    window.fbq?.('track', metaEvent, {
      content_name: payload.item,
      source: payload.location,
    });
  }
}

/**
 * Handler pronto para usar em onClick.
 * Ex.: <a onClick={onTrack('click_whatsapp', { location: 'hero' })} />
 */
export const onTrack =
  (event: AnalyticsEvent, payload: AnalyticsPayload = {}) =>
  (): void =>
    trackEvent(event, payload);
