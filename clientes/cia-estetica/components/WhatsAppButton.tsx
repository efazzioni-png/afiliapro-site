'use client';

import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { whatsappUrlFor } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/data/site';
import { useScrolledPast } from '@/lib/hooks/useScrolledPast';
import { cn } from '@/lib/utils';

/**
 * Conversão sempre à mão (requisitos 22 e 43):
 *  • Desktop — botão flutuante no canto inferior direito que expande no hover.
 *  • Mobile  — barra fixa na base com WhatsApp e telefone.
 *
 * Ambos aparecem depois de uma rolagem curta, para não cobrir o hero na
 * primeira impressão.
 */
export function WhatsAppButton() {
  const visible = useScrolledPast(420);

  const href = whatsappUrlFor('default');

  return (
    <>
      {/* ---------- Desktop ---------- */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('click_whatsapp', { location: 'floating' })}
        aria-label="Fale com a Cia Estética no WhatsApp"
        className={cn(
          'group fixed bottom-7 right-7 z-40 hidden items-center gap-3 rounded-full bg-[#1f6f4f] py-3.5 pl-4 pr-5 text-cream shadow-[var(--shadow-float)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#17593f] sm:flex',
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
        )}
      >
        <WhatsAppGlyph className="size-6 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.78rem] font-semibold tracking-wide opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[16rem] group-hover:opacity-100">
          Fale com a Cia Estética
        </span>
      </a>

      {/* ---------- Mobile ---------- */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 flex border-t border-ink/10 bg-cream/95 backdrop-blur-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden',
          visible ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          onClick={() => trackEvent('click_phone', { location: 'mobile_bar' })}
          className="flex min-h-[3.75rem] flex-1 items-center justify-center px-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink"
        >
          Ligar
        </a>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('click_whatsapp', { location: 'mobile_bar' })}
          className="flex min-h-[3.75rem] flex-[2] items-center justify-center gap-2.5 bg-[#1f6f4f] px-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream"
        >
          <WhatsAppGlyph className="size-5 shrink-0" />
          Fale com a Cia Estética
        </a>
      </div>
    </>
  );
}
