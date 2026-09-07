import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { whatsappUrlFor } from '@/lib/whatsapp';

/** CTA final (requisito 45): último ponto de conversão antes do rodapé. */
export function FinalCta() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(198,165,107,0.13),transparent_62%)]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow eyebrow-center justify-center text-champagne">
              Seu próximo passo
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="mt-7 text-[2.4rem] leading-[1.08] sm:text-[3.2rem] lg:text-[3.6rem]">
              Seu próximo passo começa agora.
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-cream/70">
              Descubra como a Cia Estética pode ajudar você a desenvolver novas habilidades e avançar
              profissionalmente na área da beleza.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                href={whatsappUrlFor('default')}
                variant="gold"
                size="lg"
                track={{ event: 'click_whatsapp', location: 'final_cta' }}
              >
                Falar com a Cia Estética
              </Button>
              <Button href="/cursos" variant="outlineLight" size="lg" icon={null}>
                Ver cursos
              </Button>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-10 text-sm text-cream/45">
              Atendimento de segunda a sexta, das 09h às 18h.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
