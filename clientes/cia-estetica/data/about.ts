/**
 * Conteúdo da seção "Sobre" (home) e da página /sobre.
 * Escrito sem afirmar dados institucionais não confirmados
 * (nº de alunos formados, corpo docente, certificações).
 */

export interface AboutValue {
  icon: string;
  title: string;
  description: string;
}

export const about = {
  eyebrow: 'A Cia Estética',
  title: 'Mais do que cursos. Uma experiência de formação profissional.',
  lead: 'A Cia Estética é uma escola de profissionais de beleza na Barra da Tijuca, no Rio de Janeiro. O objetivo é um só: preparar pessoas para atuar no mercado da estética com técnica, prática e confiança.',
  paragraphs: [
    'A formação é construída em torno da execução. Entender a teoria importa, mas o que transforma alguém em profissional é repetir a técnica com orientação, errar em ambiente seguro e desenvolver a leitura que só a prática dá.',
    'A escola trabalha com formações que vão da entrada na profissão à especialização técnica — micropigmentação, depilação, despigmentação, remoção de tatuagem a laser, estética avançada e tecnologias estéticas.',
    'O acolhimento aparece com constância nas avaliações públicas dos alunos, e não é por acaso: turmas em que perguntar é natural formam profissionais mais seguros.',
  ],
  values: [
    {
      icon: 'Compass',
      title: 'Experiência',
      description: 'Uma escola consolidada no mercado da beleza da Barra da Tijuca.',
    },
    {
      icon: 'BookOpen',
      title: 'Conhecimento técnico',
      description: 'Conteúdo estruturado, com fundamentação e critério em cada procedimento.',
    },
    {
      icon: 'Hand',
      title: 'Prática',
      description: 'Execução acompanhada como parte central da formação.',
    },
    {
      icon: 'HeartHandshake',
      title: 'Acolhimento',
      description: 'Ambiente em que a dúvida do aluno é bem-vinda e respondida.',
    },
    {
      icon: 'RefreshCw',
      title: 'Atualização',
      description: 'Acompanhamento das técnicas e tecnologias que o mercado usa hoje.',
    },
    {
      icon: 'Building2',
      title: 'Estrutura',
      description: 'Espaço organizado para o aprendizado técnico, no Condomínio Downtown.',
    },
  ] as AboutValue[],
  image: '/images/sobre/escola-cia-estetica.jpg',
  imageAlt: 'Professora orientando aluna durante aula prática na Cia Estética',
  secondaryImage: '/images/sobre/equipe-cia-estetica.jpg',
  secondaryImageAlt: 'Ambiente de aula da escola de profissionais de beleza Cia Estética',
};

/** Frases curtas de autoridade usadas como microcopy ao longo do site. */
export const microcopy = {
  knowledge: 'Conhecimento que transforma técnica em profissão.',
  learn: 'Aprenda. Pratique. Evolua.',
  nextLevel: 'Seu próximo nível começa aqui.',
  market: 'Formação profissional para o mercado da beleza.',
  possibilities: 'Mais conhecimento. Mais possibilidades.',
};

/**
 * Título da barra de autoridade.
 *
 * ⚠️ NOTA EDITORIAL: o briefing sugeria "Uma escolha de milhares de
 * profissionais". Como o número de alunos NÃO foi confirmado (a regra 47 do
 * briefing proíbe inventar números de alunos), usamos uma formulação que se
 * sustenta na única prova social verificável: as 546 avaliações no Google.
 * Se a escola confirmar o volume de alunos, basta trocar esta frase.
 */
export const authorityHeadline = 'A escolha de centenas de profissionais da beleza';
