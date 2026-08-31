import { Quote } from 'lucide-react';
import { StarRating } from '@/components/ui/StarRating';
import { initials, cn } from '@/lib/utils';
import type { Testimonial } from '@/data/testimonials';

/**
 * Card de depoimento.
 * Quando `author` está vazio (nome não informado pela empresa), o card exibe
 * "Avaliação no Google" em vez de inventar um nome.
 */
export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const hasAuthor = testimonial.author.trim().length > 0;

  return (
    <figure
      className={cn(
        'flex h-full flex-col border border-ink/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] sm:p-9',
        className,
      )}
    >
      <Quote className="size-7 text-champagne/50" strokeWidth={1.25} aria-hidden="true" />

      <blockquote className="mt-6 flex-1">
        <p className="font-display text-[1.3rem] leading-relaxed text-ink sm:text-[1.4rem]">
          “{testimonial.quote}”
        </p>
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
        <div className="grid size-11 shrink-0 place-items-center rounded-full border border-champagne/40 bg-cream text-[0.7rem] font-semibold tracking-wider text-champagne-deep">
          {hasAuthor ? initials(testimonial.author) : <Quote className="size-4" strokeWidth={1.5} aria-hidden="true" />}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[0.9rem] font-medium text-ink">
            {hasAuthor ? testimonial.author : `Avaliação no ${testimonial.source}`}
          </p>
          <p className="mt-0.5 truncate text-[0.78rem] text-stone">
            {testimonial.course
              ? testimonial.course
              : hasAuthor
                ? `Avaliação no ${testimonial.source}`
                : 'Aluna da Cia Estética'}
          </p>
        </div>

        <StarRating rating={testimonial.rating} size="sm" className="ml-auto shrink-0" />
      </figcaption>
    </figure>
  );
}
