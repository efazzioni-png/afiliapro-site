import { cn } from '@/lib/utils';

/** Estrelas em SVG próprio — leve e sempre com rótulo acessível. */
export function StarRating({
  rating = 5,
  className,
  size = 'md',
  label,
}: {
  rating?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}) {
  const sizes = { sm: 'size-3.5', md: 'size-4', lg: 'size-5' };
  const rounded = Math.round(rating);

  return (
    <div className={cn('inline-flex items-center gap-1', className)} role="img" aria-label={label ?? `${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          className={cn(sizes[size], index < rounded ? 'fill-champagne' : 'fill-ink/15')}
          aria-hidden="true"
        >
          <path d="M12 2.4l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.25l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95L12 2.4z" />
        </svg>
      ))}
    </div>
  );
}
