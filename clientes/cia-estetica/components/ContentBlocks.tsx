import { Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import type { ContentBlock } from '@/data/blog';

/**
 * Renderiza blocos de conteúdo estruturado (artigos do blog e páginas legais).
 *
 * Usamos uma estrutura tipada em vez de Markdown: mantém a hierarquia semântica
 * correta para SEO (h2/h3), evita uma dependência de parser e impede que HTML
 * arbitrário entre na página.
 */
export function ContentBlocks({
  blocks,
  headingLevel = 'h2',
  className,
}: {
  blocks: ContentBlock[];
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  const Heading = headingLevel;

  return (
    <div className={cn('space-y-10', className)}>
      {blocks.map((block, index) => (
        <Reveal key={block.heading ?? `bloco-${index}`} delay={40}>
          {block.heading && (
            <Heading className="mb-4 text-[1.5rem] leading-snug sm:text-[1.75rem]">
              {block.heading}
            </Heading>
          )}

          {block.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mb-4 leading-[1.75] text-ink-muted last:mb-0">
              {paragraph}
            </p>
          ))}

          {block.list && (
            <ul className="mt-5 space-y-3">
              {block.list.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <Check
                    className="mt-1 size-4 shrink-0 text-champagne-deep"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed text-ink-muted">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </div>
  );
}
