'use client';

import { useState, type FormEvent } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { courses } from '@/data/courses';
import { siteConfig } from '@/data/site';
import { formMessage, whatsappUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/**
 * Formulário de contato (requisito 23).
 *
 * DOIS MODOS, sem alterar código:
 *  1. `NEXT_PUBLIC_FORM_ENDPOINT` definido → envia por POST (Formspree, n8n,
 *     API própria...).
 *  2. Vazio (padrão) → monta a mensagem e abre o WhatsApp já preenchido.
 *     Funciona sem back-end e leva o lead direto ao canal de maior conversão.
 *
 * Acessibilidade: todos os campos têm <label> visível, erros são anunciados
 * por aria-live e o campo inválido recebe aria-invalid + aria-describedby.
 */

type Status = 'idle' | 'sending' | 'success' | 'error';

const interests = [
  ...courses.map((course) => course.name),
  'Produtos profissionais',
  'Outro assunto',
];

const fieldClass =
  'w-full border border-ink/15 bg-white px-4 py-3.5 text-[0.95rem] text-ink transition-colors duration-300 placeholder:text-stone/70 focus:border-champagne focus:outline-none focus-visible:outline-none';

const labelClass = 'block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-muted';

export function ContactForm({ defaultInterest = '' }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Validação simples e explícita, sem biblioteca.
    const nextErrors: Record<string, string> = {};
    if (!data.name?.trim()) nextErrors.name = 'Informe o seu nome.';
    if (!data.phone?.trim()) nextErrors.phone = 'Informe um WhatsApp para contato.';
    else if (data.phone.replace(/\D/g, '').length < 10)
      nextErrors.phone = 'Informe o DDD e o número completo.';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email))
      nextErrors.email = 'Verifique o endereço de e-mail.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }

    setStatus('sending');
    trackEvent('form_submit', { location: 'contact_form', item: data.interest });

    const endpoint = siteConfig.contact.formEndpoint;

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setStatus('success');
        form.reset();
      } catch {
        setStatus('error');
      }
      return;
    }

    // Sem back-end: leva a mensagem pronta para o WhatsApp.
    window.open(
      whatsappUrl(
        formMessage({
          name: data.name,
          phone: data.phone,
          email: data.email,
          interest: data.interest,
          message: data.message,
        }),
      ),
      '_blank',
      'noopener,noreferrer',
    );
    setStatus('success');
    form.reset();
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-center border border-champagne/40 bg-white px-8 py-16 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-champagne text-ink">
          <Check className="size-7" strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-7 text-2xl">Mensagem enviada</h3>
        <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-muted">
          {siteConfig.contact.formEndpoint
            ? 'Recebemos o seu contato. A equipe da Cia Estética responde em breve.'
            : 'Abrimos o WhatsApp com a sua mensagem pronta. Se a janela não apareceu, verifique o bloqueador de pop-ups do navegador.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink underline underline-offset-4 transition-colors hover:text-champagne-deep"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nome <span className="text-champagne-deep">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="Como podemos te chamar?"
            className={cn(fieldClass, 'mt-2.5', errors.name && 'border-red-600')}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 flex items-center gap-1.5 text-xs text-red-700">
              <AlertCircle className="size-3.5" aria-hidden="true" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            WhatsApp <span className="text-champagne-deep">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            placeholder="(21) 90000-0000"
            className={cn(fieldClass, 'mt-2.5', errors.phone && 'border-red-600')}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 flex items-center gap-1.5 text-xs text-red-700">
              <AlertCircle className="size-3.5" aria-hidden="true" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="seu@email.com"
            className={cn(fieldClass, 'mt-2.5', errors.email && 'border-red-600')}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 flex items-center gap-1.5 text-xs text-red-700">
              <AlertCircle className="size-3.5" aria-hidden="true" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="interest" className={labelClass}>
            Interesse
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue={defaultInterest}
            className={cn(fieldClass, 'mt-2.5 appearance-none bg-white')}
          >
            <option value="">Selecione uma opção</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Conte um pouco sobre o seu objetivo profissional."
          className={cn(fieldClass, 'mt-2.5 resize-y')}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="flex items-center gap-2 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          Não foi possível enviar agora. Tente novamente ou fale com a equipe pelo WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group/btn inline-flex w-full items-center justify-center gap-2.5 rounded-[2px] bg-ink px-8 py-[1.15rem] text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream transition-all duration-300 hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
        <Send
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>

      <p className="text-xs leading-relaxed text-stone">
        Ao enviar, você concorda com a nossa{' '}
        <a href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-ink">
          Política de Privacidade
        </a>
        . Usamos seus dados apenas para responder ao seu contato.
      </p>
    </form>
  );
}
