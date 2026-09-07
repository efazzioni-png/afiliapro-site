'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { mainNav, secondaryNav } from '@/data/navigation';
import { siteConfig } from '@/data/site';
import { whatsappUrlFor } from '@/lib/whatsapp';
import { useScrolledPast } from '@/lib/hooks/useScrolledPast';
import { cn } from '@/lib/utils';

/**
 * Header fixo que encolhe ao rolar (requisito 7) e menu mobile em tela cheia.
 *
 * Acessibilidade: o botão do menu controla um dialog com aria-modal, o foco
 * vai para o botão de fechar ao abrir e retorna ao gatilho ao fechar, Escape
 * fecha e o scroll do corpo fica travado enquanto o menu está aberto.
 */
export function Header() {
  const scrolled = useScrolledPast(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [menuPathname, setMenuPathname] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Fecha o menu ao navegar para outra rota.
  // Ajuste de estado durante a renderização — o padrão recomendado pelo React
  // para reagir a uma mudança de prop, sem o custo de um efeito extra.
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  // Trava o scroll do corpo e habilita Escape enquanto o menu está aberto.
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-cream"
      >
        Ir para o conteúdo
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          scrolled
            ? 'border-b border-ink/8 bg-cream/85 py-3 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-5 sm:py-7',
        )}
      >
        <Container className="flex items-center justify-between gap-6">
          <Logo compact={scrolled} />

          <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'link-underline text-[0.8rem] font-medium tracking-wide transition-colors duration-300',
                  isActive(item.href) ? 'text-champagne-deep' : 'text-ink-muted hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="hidden items-center gap-2 text-[0.8rem] font-medium text-ink-muted transition-colors hover:text-ink xl:flex"
              data-track-event="click_phone"
              data-track-location="header"
            >
              <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>

            {/* Desktop e tablet: CTA completo */}
            <div className="hidden sm:block">
              <Button
                href={whatsappUrlFor('default')}
                variant="primary"
                size="sm"
                icon={null}
                track={{ event: 'click_whatsapp', location: 'header' }}
              >
                Falar no WhatsApp
              </Button>
            </div>

            {/* Mobile: mesmo CTA em versão compacta, sem apertar a marca */}
            <a
              href={whatsappUrlFor('default')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a Cia Estética no WhatsApp"
              data-track-event="click_whatsapp"
              data-track-location="header_mobile"
              className="grid size-11 place-items-center rounded-[2px] bg-ink text-cream transition-colors duration-300 hover:bg-ink-soft sm:hidden"
            >
              <WhatsAppGlyph className="size-5" />
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="grid size-11 place-items-center rounded-[2px] border border-ink/15 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="animate-fade-in fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <Logo tone="light" />
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="grid size-11 place-items-center rounded-[2px] border border-cream/20 text-cream transition-colors duration-300 hover:border-champagne hover:bg-champagne hover:text-ink"
            >
              <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Navegação principal (mobile)"
            className="flex-1 overflow-y-auto px-5 pb-8 pt-6 sm:px-8"
          >
            <ul className="space-y-1">
              {mainNav.map((item, index) => (
                <li
                  key={item.href}
                  className="animate-fade-in border-b border-cream/10"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block py-4 font-display text-3xl transition-colors duration-300',
                      isActive(item.href) ? 'text-champagne' : 'text-cream hover:text-champagne-light',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 text-sm text-cream/60 transition-colors hover:text-champagne-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-cream/10 px-5 py-6 sm:px-8">
            <Button
              href={whatsappUrlFor('default')}
              variant="gold"
              size="lg"
              fullWidth
              track={{ event: 'click_whatsapp', location: 'mobile_menu' }}
            >
              Falar no WhatsApp
            </Button>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2 text-sm text-cream/70 transition-colors hover:text-cream"
              data-track-event="click_phone"
              data-track-location="mobile_menu"
            >
              <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
