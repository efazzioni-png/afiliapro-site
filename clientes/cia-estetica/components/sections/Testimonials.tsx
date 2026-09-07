'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TestimonialCard } from '@/components/TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/utils';

/**
 * Carrossel de depoimentos (requisito 15).
 *
 * Usa scroll nativo com scroll-snap: funciona por toque no mobile, por teclado
 * (o container é focável) e pelos botões no desktop — sem biblioteca de
 * carrossel. Os controles somem quando não há o que rolar.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateControls = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const maxScroll = node.scrollWidth - node.clientWidth;
    setCanScrollLeft(node.scrollLeft > 8);
    setCanScrollRight(node.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    // A medição inicial espera o próximo frame: o layout já está estável e
    // não há setState síncrono dentro do efeito.
    const frame = requestAnimationFrame(updateControls);
    node.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);

    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, [updateControls]);

  const scrollByCard = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 24 : node.clientWidth * 0.8;
    node.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  const hasControls = canScrollLeft || canScrollRight;

  return (
    <Section tone="deep" space="lg" id="depoimentos">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Depoimentos"
            title="Quem aprende com a Cia Estética, recomenda."
            lead="Avaliações publicadas por alunos no Google."
            maxWidth="max-w-2xl"
          />

          {hasControls && (
            <Reveal delay={180} className="hidden shrink-0 gap-3 md:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollLeft}
                aria-label="Depoimento anterior"
                className={cn(
                  'grid size-12 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300',
                  canScrollLeft ? 'hover:border-ink hover:bg-ink hover:text-cream' : 'cursor-not-allowed opacity-30',
                )}
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollRight}
                aria-label="Próximo depoimento"
                className={cn(
                  'grid size-12 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300',
                  canScrollRight ? 'hover:border-ink hover:bg-ink hover:text-cream' : 'cursor-not-allowed opacity-30',
                )}
              >
                <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </Reveal>
          )}
        </div>

        <div
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-label="Depoimentos de alunos — role para ver todos"
          className="no-scrollbar mt-14 -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
        >
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.quote}
              delay={index * 110}
              data-card
              className="w-[84vw] max-w-[26rem] shrink-0 snap-start sm:w-[52vw] lg:w-[calc((100%-3rem)/3)] lg:max-w-none"
            >
              <TestimonialCard testimonial={testimonial} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
