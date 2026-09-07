import Link from 'next/link';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { SocialIcon, socialLabels, type SocialName } from '@/components/ui/SocialIcon';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { mainNav, secondaryNav, legalNav } from '@/data/navigation';
import { courses } from '@/data/courses';
import { siteConfig, addressLines, maps } from '@/data/site';
import { whatsappUrlFor } from '@/lib/whatsapp';
import { currentYear } from '@/lib/utils';

export function Footer() {
  /** Só entram as redes efetivamente preenchidas — nada falso vai ao ar. */
  const socials = (Object.entries(siteConfig.social) as [SocialName, string][]).filter(
    ([, url]) => url.length > 0,
  );

  return (
    <footer className="grain relative bg-ink text-cream">
      <div className="rule-gold absolute inset-x-0 top-0 opacity-40" />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              Escola de profissionais de beleza na Barra da Tijuca. Formação técnica para quem quer
              transformar a beleza em profissão.
            </p>

            <a
              href={whatsappUrlFor('default')}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="click_whatsapp"
              data-track-location="footer"
              className="mt-7 inline-flex items-center gap-2.5 rounded-[2px] border border-cream/20 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-champagne hover:bg-champagne hover:text-ink"
            >
              <WhatsAppGlyph className="size-4" />
              Falar no WhatsApp
            </a>

            {socials.length > 0 && (
              <ul className="mt-7 flex items-center gap-3">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLabels[name]}
                      data-track-event="click_social"
                      data-track-item={name}
                      className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors duration-300 hover:border-champagne hover:text-champagne"
                    >
                      <SocialIcon name={name} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé" className="lg:col-span-2">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-champagne">
              Navegação
            </h2>
            <ul className="mt-4 space-y-0.5">
              {[...mainNav, ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 text-sm text-cream/60 transition-colors duration-300 hover:text-champagne-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cursos */}
          <nav aria-label="Cursos" className="lg:col-span-3">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-champagne">
              Cursos
            </h2>
            <ul className="mt-4 space-y-0.5">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/cursos/${course.slug}`}
                    className="inline-block py-1.5 text-sm text-cream/60 transition-colors duration-300 hover:text-champagne-light"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div className="lg:col-span-3">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-champagne">
              Contato
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-cream/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-champagne/70" strokeWidth={1.5} aria-hidden="true" />
                <a
                  href={maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="click_maps"
                  data-track-location="footer"
                  className="not-italic transition-colors duration-300 hover:text-champagne-light"
                >
                  <address className="not-italic">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </a>
              </li>

              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-champagne/70" strokeWidth={1.5} aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  data-track-event="click_phone"
                  data-track-location="footer"
                  className="inline-block py-1 transition-colors duration-300 hover:text-champagne-light"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>

              {siteConfig.contact.email && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-champagne/70" strokeWidth={1.5} aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    data-track-event="click_contact"
                    data-track-location="footer"
                    className="inline-block py-1 transition-colors duration-300 hover:text-champagne-light"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}

              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-champagne/70" strokeWidth={1.5} aria-hidden="true" />
                <span>{siteConfig.hours.summary}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Base */}
        <div className="mt-14 flex flex-col gap-5 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/45">
            © {currentYear()} {siteConfig.legalName}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1.5 text-xs text-cream/45 transition-colors duration-300 hover:text-champagne-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Respiro para a barra fixa de CTA no mobile */}
      <div className="h-16 sm:hidden" aria-hidden="true" />
    </footer>
  );
}
