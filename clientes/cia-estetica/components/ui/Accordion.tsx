'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Accordion acessível: cada pergunta é um <button> com aria-expanded e
 * aria-controls, e a resposta é uma região rotulada pelo botão.
 * A altura anima via grid-template-rows (sem medir o DOM, sem salto).
 */
export function Accordion({
  items,
  tone = 'dark',
  className,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  tone?: 'dark' | 'light';
  className?: string;
  /** Índice aberto ao carregar. Use -1 para começar tudo fechado. */
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number>(defaultOpen);
  const baseId = useId();
  const light = tone === 'light';

  return (
    <div className={cn('divide-y', light ? 'divide-cream/15' : 'divide-ink/10', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className={cn(
                  'flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300',
                  light ? 'text-cream hover:text-champagne-light' : 'text-ink hover:text-champagne-deep',
                )}
              >
                <span className="font-display text-lg leading-snug sm:text-xl">{item.question}</span>
                <span
                  className={cn(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-400',
                    light ? 'border-cream/25' : 'border-ink/15',
                    isOpen && 'rotate-180 border-champagne bg-champagne text-ink',
                  )}
                >
                  <ChevronDown className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    'pb-7 pr-10 text-[0.975rem] leading-relaxed',
                    light ? 'text-cream/70' : 'text-ink-muted',
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
