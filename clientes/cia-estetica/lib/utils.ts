/** Utilitários gerais. Sem dependências externas — mantém o bundle enxuto. */

type ClassValue = string | number | null | false | undefined;

/** Concatena classes CSS ignorando valores falsos. */
export const cn = (...classes: ClassValue[]): string =>
  classes.filter((value): value is string | number => Boolean(value)).join(' ');

/** Formata uma data ISO para leitura em português. Ex.: "25 de agosto de 2026". */
export const formatDate = (iso: string): string =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

/** Versão curta da data. Ex.: "25 ago 2026". */
export const formatDateShort = (iso: string): string =>
  new Date(`${iso}T12:00:00`)
    .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    .replace('.', '');

/** Iniciais para o avatar dos depoimentos. Retorna '' quando não há nome. */
export const initials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

/** Ano corrente — usado no copyright do footer. */
export const currentYear = (): number => new Date().getFullYear();
