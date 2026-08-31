import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { whatsappUrl, whatsappMessages } from '@/lib/whatsapp';

/**
 * Faixa de CTA reutilizável nas páginas internas (requisito 35: o visitante
 * nunca chega ao fim de uma página sem uma ação disponível).
 */
export function CtaBand({
  title = 'Pronta para dar o próximo passo?',
  text = 'Fale com a equipe da Cia Estética e descubra qual formação combina com o seu momento profissional.',
  buttonLabel = 'Falar com a Cia Estética',
  message = whatsappMessages.default,
  location = 'cta_band',
  secondary,
}: {
  title?: string;
  text?: string;
  buttonLabel?: string;
  message?: string;
  location?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink py-20 text-cream sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-40 mx-auto size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(198,165,107,0.14),transparent_64%)]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-[1.9rem] leading-tight sm:text-[2.5rem]">{title}</h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cream/70">{text}</p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                href={whatsappUrl(message)}
                variant="gold"
                size="lg"
                track={{ event: 'click_whatsapp', location }}
              >
                {buttonLabel}
              </Button>
              {secondary && (
                <Button href={secondary.href} variant="outlineLight" size="lg" icon={null}>
                  {secondary.label}
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
