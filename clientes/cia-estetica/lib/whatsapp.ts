/**
 * ============================================================================
 *  WHATSAPP — canal principal de conversão
 * ============================================================================
 *  O número fica em `siteConfig.contact.whatsapp` (ou na variável de ambiente
 *  NEXT_PUBLIC_WHATSAPP_NUMBER). Nenhum componente conhece o número: todos
 *  chamam as funções deste arquivo.
 *
 *  Cada contexto abre a conversa com uma mensagem diferente, para que a equipe
 *  saiba de onde o lead veio já na primeira linha.
 * ============================================================================
 */

import { siteConfig } from '@/data/site';

export const whatsappMessages = {
  default: 'Olá! Gostaria de saber mais sobre os cursos da Cia Estética.',
  courses: 'Olá! Tenho interesse em conhecer os cursos disponíveis da Cia Estética.',
  products: 'Olá! Gostaria de saber mais sobre os produtos profissionais disponíveis.',
  hero: 'Olá! Cheguei pelo site e gostaria de saber mais sobre as formações da Cia Estética.',
  enroll: 'Olá! Gostaria de saber como fazer a matrícula em um curso da Cia Estética.',
  schedule: 'Olá! Gostaria de saber quais são as próximas turmas da Cia Estética.',
  visit: 'Olá! Gostaria de conhecer a escola. Podemos combinar uma visita?',
  contact: 'Olá! Gostaria de falar com a equipe da Cia Estética.',
} as const;

export type WhatsappContext = keyof typeof whatsappMessages;

/** Mensagem específica para um curso. */
export const courseMessage = (courseName: string): string =>
  `Olá! Tenho interesse no curso de ${courseName} da Cia Estética e gostaria de saber mais sobre turmas, formato e condições.`;

/** Monta o link do WhatsApp com a mensagem já preenchida. */
export const whatsappUrl = (message: string = whatsappMessages.default): string => {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

/** Atalho: link a partir de um contexto nomeado. */
export const whatsappUrlFor = (context: WhatsappContext = 'default'): string =>
  whatsappUrl(whatsappMessages[context]);

/** Mensagem montada a partir do formulário de contato (fallback sem back-end). */
export const formMessage = (data: {
  name: string;
  phone: string;
  email?: string;
  interest?: string;
  message?: string;
}): string =>
  [
    'Olá! Vim pelo site da Cia Estética.',
    '',
    `*Nome:* ${data.name}`,
    `*WhatsApp:* ${data.phone}`,
    data.email ? `*E-mail:* ${data.email}` : null,
    data.interest ? `*Interesse:* ${data.interest}` : null,
    data.message ? `*Mensagem:* ${data.message}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n');
