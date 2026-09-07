/**
 * ============================================================================
 *  DEPOIMENTOS
 * ============================================================================
 *  ✅ CONFIRMADO: os depoimentos abaixo são avaliações reais fornecidas pela
 *     empresa / perfil público no Google. NENHUM depoimento foi inventado.
 *
 *  ⚠️ PENDENTE: os nomes dos autores não foram informados. Com `author` vazio,
 *     o site exibe "Avaliação no Google" em vez de um nome inventado.
 *     Basta preencher `author` (e opcionalmente `course`) para o nome aparecer.
 * ============================================================================
 */

export interface Testimonial {
  /** ⚠️ Vazio = exibe "Avaliação no Google" (nunca um nome fictício). */
  author: string;
  /** Curso citado. Só preencher quando confirmado. */
  course: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  source: string;
}

export const testimonials: Testimonial[] = [
  {
    author: '',
    course: '',
    rating: 5,
    quote: 'Professora top e recepção top. Rumo ao próximo curso ❤️',
    source: 'Google',
  },
  {
    author: '',
    course: '',
    rating: 5,
    quote:
      'Tira todas as dúvidas e dá várias dicas para começarmos no campo de trabalho.',
    source: 'Google',
  },
  {
    author: '',
    /** Curso citado pelo próprio autor dentro da avaliação. */
    course: 'Remoção de Tatuagem a Laser',
    rating: 5,
    quote:
      'Fiz o curso de remoção de tatuagem e foi maravilhoso, teve várias modelos e o aprendizado foi excepcional.',
    source: 'Google',
  },
];

/** Depoimentos exibidos na página de um curso específico (por enquanto, os gerais). */
export const getTestimonialsForCourse = (courseName: string): Testimonial[] => {
  const specific = testimonials.filter((t) => t.course === courseName);
  return specific.length > 0 ? specific : testimonials;
};
