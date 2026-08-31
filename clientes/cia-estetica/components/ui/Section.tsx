import { cn } from '@/lib/utils';

type Tone = 'cream' | 'white' | 'deep' | 'ink';
type Space = 'sm' | 'md' | 'lg';

const tones: Record<Tone, string> = {
  cream: 'bg-cream text-ink',
  white: 'bg-white text-ink',
  deep: 'bg-cream-deep text-ink',
  ink: 'bg-ink text-cream',
};

const spacings: Record<Space, string> = {
  sm: 'py-16 sm:py-20',
  md: 'py-20 sm:py-28',
  lg: 'py-24 sm:py-32 lg:py-40',
};

/** Bloco de página com fundo, respiro vertical e id para âncora. */
export function Section({
  children,
  className,
  tone = 'cream',
  space = 'md',
  id,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
  space?: Space;
  id?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn('relative overflow-hidden', tones[tone], spacings[space], className)}
      {...rest}
    >
      {children}
    </section>
  );
}
