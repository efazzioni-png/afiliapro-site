/**
 * ============================================================================
 *  CURSOS
 * ============================================================================
 *  ✅ CONFIRMADO: as SEIS áreas de formação abaixo foram informadas pela empresa.
 *     Nenhum curso foi inventado.
 *
 *  ⚠️ PENDENTE em todos os cursos:
 *     - `duration`, `format`, `certificate`, `price`  → estão em `null`.
 *       Quando `null`, o site NÃO exibe o dado: mostra "sob consulta" com CTA
 *       para o WhatsApp. Nada falso vai ao ar.
 *     - `syllabus` (conteúdo programático) → array vazio. Quando vazio, a página
 *       exibe um bloco "conteúdo programático sob consulta". Preencha e a seção
 *       aparece automaticamente.
 *     - `learnings` → base editável descrevendo competências da área. Deve ser
 *       validado pela coordenação pedagógica antes de publicar.
 *
 *  COMO ADICIONAR UM CURSO NOVO:
 *     Copie um objeto, troque o `slug` (usado na URL /cursos/[slug]) e edite.
 *     A home, a listagem, o sitemap e o JSON-LD se atualizam sozinhos.
 * ============================================================================
 */

export type CourseLevel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos os níveis';

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface Course {
  slug: string;
  name: string;
  category: string;
  /** Frase curta usada no card. */
  shortDescription: string;
  /** Parágrafo de abertura da página do curso. */
  intro: string;
  /** Corpo da apresentação, um item por parágrafo. */
  body: string[];
  level: CourseLevel;
  /** ⚠️ null enquanto não confirmado → exibido como "sob consulta". */
  duration: string | null;
  format: string | null;
  certificate: string | null;
  price: string | null;
  /** Para quem é o curso. */
  audience: string[];
  /** Competências trabalhadas (base editável — validar com a coordenação). */
  learnings: string[];
  /** ⚠️ Vazio até a escola enviar o conteúdo programático oficial. */
  syllabus: CourseModule[];
  faq: CourseFaq[];
  image: string;
  imageAlt: string;
  featured: boolean;
  /** Selo opcional exibido sobre a imagem do card. */
  badge?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const courses: Course[] = [
  {
    slug: 'remocao-de-tatuagem-a-laser',
    name: 'Remoção de Tatuagem a Laser',
    category: 'Laser',
    shortDescription:
      'Formação prática em remoção de tatuagem com tecnologia laser, do protocolo de avaliação à condução das sessões.',
    intro:
      'Uma especialização técnica para profissionais que querem atuar com remoção de tatuagem a laser com segurança, critério e método.',
    body: [
      'A remoção de tatuagem a laser é uma das áreas que mais despertam procura dentro da estética. Exige conhecimento técnico específico: entender como o laser interage com diferentes pigmentos, avaliar cada pele antes de iniciar, ajustar parâmetros e conduzir o acompanhamento entre sessões.',
      'A formação da Cia Estética foi pensada para quem precisa sair da teoria e ganhar confiança na prática. O aprendizado acontece com acompanhamento próximo, orientação técnica e espaço para tirar dúvidas reais do dia a dia de atendimento.',
    ],
    level: 'Intermediário',
    duration: null,
    format: null,
    certificate: null,
    price: null,
    audience: [
      'Profissionais de estética que desejam ampliar os serviços oferecidos',
      'Tatuadores e profissionais de body art interessados na área de correção',
      'Profissionais da beleza em busca de uma especialização técnica',
      'Quem pretende atuar em clínicas e espaços de estética avançada',
    ],
    learnings: [
      'Fundamentos do laser aplicado à remoção de pigmentos',
      'Avaliação prévia da pele e da tatuagem antes do protocolo',
      'Identificação de indicações e contraindicações',
      'Ajuste de parâmetros conforme tipo de pigmento e fototipo',
      'Condução da sessão e cuidados durante o procedimento',
      'Orientações de pós-procedimento e acompanhamento entre sessões',
      'Biossegurança, higienização e organização do ambiente de trabalho',
      'Comunicação com o cliente e alinhamento de expectativas',
    ],
    syllabus: [],
    faq: [
      {
        question: 'Preciso ter experiência anterior em estética?',
        answer:
          'Este é um curso de especialização técnica. Para saber se o seu perfil se encaixa na turma atual, fale com a equipe da Cia Estética pelo WhatsApp — a orientação é feita caso a caso.',
      },
      {
        question: 'O curso tem aula prática?',
        answer:
          'A prática é parte central da proposta da escola. Alunos relatam em suas avaliações públicas no Google a realização de atendimentos acompanhados durante o curso. Confirme o formato da próxima turma com a equipe.',
      },
      {
        question: 'Como faço para saber valores e próximas turmas?',
        answer:
          'Valores, datas e condições são informados diretamente pela equipe. Chame no WhatsApp e você recebe as informações da turma vigente.',
      },
    ],
    image: '/images/cursos/remocao-de-tatuagem-a-laser.jpg',
    imageAlt:
      'Profissional de estética conduzindo sessão de remoção de tatuagem a laser em ambiente clínico',
    featured: true,
    badge: 'Destaque',
    seo: {
      title: 'Curso de Remoção de Tatuagem a Laser no Rio de Janeiro | Cia Estética',
      description:
        'Especialização em remoção de tatuagem a laser com foco em prática, protocolo e segurança. Barra da Tijuca, Rio de Janeiro. Fale com a Cia Estética.',
      keywords: [
        'curso de remoção de tatuagem a laser RJ',
        'curso remoção de tatuagem Barra da Tijuca',
        'formação remoção de tatuagem Rio de Janeiro',
        'curso laser estética RJ',
      ],
    },
  },
  {
    slug: 'despigmentacao',
    name: 'Despigmentação',
    category: 'Correção',
    shortDescription:
      'Técnicas de correção e clareamento de pigmentos para quem quer atuar com procedimentos de correção.',
    intro:
      'Formação voltada à correção de pigmentos, uma das competências mais requisitadas por quem já atua com micropigmentação.',
    body: [
      'A despigmentação é a área que responde por uma demanda cada vez mais comum: corrigir trabalhos anteriores, clarear pigmentos residuais e preparar a pele para novos procedimentos.',
      'É uma especialização que exige leitura de pele, critério na indicação e domínio da técnica. A proposta da formação é desenvolver esse olhar técnico com acompanhamento prático.',
    ],
    level: 'Intermediário',
    duration: null,
    format: null,
    certificate: null,
    price: null,
    audience: [
      'Profissionais de micropigmentação que querem oferecer correção',
      'Profissionais de estética em busca de especialização',
      'Quem deseja ampliar o leque de serviços do próprio espaço',
    ],
    learnings: [
      'Leitura de pele e avaliação do pigmento a ser corrigido',
      'Indicações, contraindicações e limites do procedimento',
      'Escolha da técnica adequada a cada caso',
      'Condução do procedimento passo a passo',
      'Cuidados de pós-procedimento e intervalos entre sessões',
      'Alinhamento de expectativas com o cliente',
      'Biossegurança aplicada ao procedimento',
    ],
    syllabus: [],
    faq: [
      {
        question: 'Preciso já trabalhar com micropigmentação?',
        answer:
          'A equipe avalia o perfil de cada interessado e orienta sobre o melhor ponto de partida. Fale pelo WhatsApp para receber essa orientação.',
      },
      {
        question: 'Quais são as próximas turmas?',
        answer:
          'O calendário de turmas é informado diretamente pela equipe da Cia Estética. Chame no WhatsApp para saber as datas abertas.',
      },
    ],
    image: '/images/cursos/despigmentacao.jpg',
    imageAlt: 'Procedimento de despigmentação sendo realizado por profissional de estética',
    featured: true,
    seo: {
      title: 'Curso de Despigmentação no Rio de Janeiro | Cia Estética',
      description:
        'Curso de despigmentação e correção de pigmentos na Barra da Tijuca, RJ. Formação técnica com foco em prática. Fale com a Cia Estética.',
      keywords: [
        'curso de despigmentação RJ',
        'curso despigmentação Barra da Tijuca',
        'correção de micropigmentação Rio de Janeiro',
      ],
    },
  },
  {
    slug: 'micropigmentacao',
    name: 'Micropigmentação',
    category: 'Micropigmentação',
    shortDescription:
      'Do traço à harmonia do rosto: formação para quem quer começar ou aperfeiçoar a técnica.',
    intro:
      'A micropigmentação é uma das portas de entrada mais procuradas por quem decide viver da beleza — e uma das que mais exigem técnica apurada.',
    body: [
      'Trabalhar com micropigmentação é unir precisão técnica e leitura estética. Cada rosto pede um estudo próprio: proporção, simetria, fototipo, expectativa do cliente.',
      'A formação acompanha o aluno da fundamentação até a execução, com espaço para praticar, errar com orientação e desenvolver segurança antes de atender.',
    ],
    level: 'Iniciante',
    duration: null,
    format: null,
    certificate: null,
    price: null,
    audience: [
      'Quem quer iniciar uma nova profissão na área da beleza',
      'Profissionais de estética que desejam agregar um novo serviço',
      'Quem já atua e quer aperfeiçoar traço, técnica e acabamento',
    ],
    learnings: [
      'Fundamentos da micropigmentação e materiais utilizados',
      'Visagismo aplicado: proporção e simetria do rosto',
      'Estudo de pele, fototipos e escolha de pigmentos',
      'Técnicas de traço e execução do procedimento',
      'Biossegurança, higienização e organização do atendimento',
      'Cuidados de pós-procedimento e retoque',
      'Atendimento, anamnese e alinhamento de expectativas',
    ],
    syllabus: [],
    faq: [
      {
        question: 'Preciso de experiência prévia para começar?',
        answer:
          'A micropigmentação costuma ser um ponto de partida para quem está entrando na área. Fale com a equipe para entender o formato da turma atual.',
      },
      {
        question: 'A escola fornece o material?',
        answer:
          'A lista de materiais e o que está incluso são informados pela equipe no momento da matrícula. Consulte pelo WhatsApp.',
      },
    ],
    image: '/images/cursos/micropigmentacao.jpg',
    imageAlt: 'Profissional realizando procedimento de micropigmentação de sobrancelhas',
    featured: true,
    seo: {
      title: 'Curso de Micropigmentação na Barra da Tijuca | Cia Estética RJ',
      description:
        'Curso de micropigmentação no Rio de Janeiro com foco em prática e técnica. Escola de profissionais de beleza na Barra da Tijuca.',
      keywords: [
        'curso de micropigmentação Barra da Tijuca',
        'curso de micropigmentação RJ',
        'curso micropigmentação Rio de Janeiro',
        'escola de micropigmentação RJ',
      ],
    },
  },
  {
    slug: 'depilacao',
    name: 'Depilação',
    category: 'Depilação',
    shortDescription:
      'Técnica, higiene e atendimento em um dos serviços de maior recorrência do mercado da beleza.',
    intro:
      'A depilação é um serviço de alta recorrência — e por isso uma base sólida para quem está construindo uma carteira de clientes.',
    body: [
      'Mais do que executar a técnica, o profissional de depilação precisa dominar higiene, conforto do cliente e organização do atendimento. É o conjunto que faz o cliente voltar.',
      'A formação trabalha os fundamentos com prática orientada, preparando para o atendimento real.',
    ],
    level: 'Iniciante',
    duration: null,
    format: null,
    certificate: null,
    price: null,
    audience: [
      'Quem está começando na área da beleza',
      'Profissionais que querem agregar um serviço recorrente',
      'Quem pretende atender em espaço próprio ou domicílio',
    ],
    learnings: [
      'Fundamentos da depilação e tipos de técnica',
      'Avaliação de pele e cuidados prévios',
      'Biossegurança, higienização e descarte correto',
      'Execução com foco em conforto do cliente',
      'Orientações de pós-procedimento',
      'Organização do atendimento e fidelização',
    ],
    syllabus: [],
    faq: [
      {
        question: 'O curso serve para quem nunca trabalhou com beleza?',
        answer:
          'Sim, é uma área frequentemente escolhida por quem está iniciando. Fale com a equipe para entender o formato da próxima turma.',
      },
    ],
    image: '/images/cursos/depilacao.jpg',
    imageAlt: 'Profissional de estética realizando procedimento de depilação em cabine profissional',
    featured: false,
    seo: {
      title: 'Curso de Depilação Profissional no Rio de Janeiro | Cia Estética',
      description:
        'Curso de depilação profissional na Barra da Tijuca, RJ. Técnica, biossegurança e prática orientada. Fale com a Cia Estética.',
      keywords: [
        'curso de depilação RJ',
        'curso de depilação Barra da Tijuca',
        'curso depilação profissional Rio de Janeiro',
      ],
    },
  },
  {
    slug: 'estetica-avancada',
    name: 'Estética Avançada',
    category: 'Estética',
    shortDescription:
      'Protocolos e procedimentos avançados para profissionais que querem subir de nível.',
    intro:
      'Para quem já atua e quer ampliar repertório técnico com procedimentos de estética avançada.',
    body: [
      'A estética avançada é o caminho natural de quem já tem prática e quer trabalhar com protocolos mais complexos, atendimentos de maior valor agregado e resultados que exigem leitura técnica apurada.',
      'A formação foca em critério: saber indicar, saber contraindicar e saber conduzir.',
    ],
    level: 'Avançado',
    duration: null,
    format: null,
    certificate: null,
    price: null,
    audience: [
      'Profissionais de estética já atuantes',
      'Quem quer trabalhar com protocolos de maior complexidade',
      'Profissionais que buscam atualização técnica',
    ],
    learnings: [
      'Avaliação e anamnese aplicadas a protocolos avançados',
      'Indicações e contraindicações de cada procedimento',
      'Montagem e condução de protocolos',
      'Combinação de técnicas dentro de um plano de tratamento',
      'Biossegurança em procedimentos avançados',
      'Acompanhamento de resultados e ajustes de conduta',
    ],
    syllabus: [],
    faq: [
      {
        question: 'É preciso ter formação prévia em estética?',
        answer:
          'Por se tratar de conteúdo avançado, o pré-requisito é avaliado pela equipe. Fale pelo WhatsApp para confirmar o seu caso.',
      },
    ],
    image: '/images/cursos/estetica-avancada.jpg',
    imageAlt: 'Atendimento de estética avançada em sala profissional equipada',
    featured: false,
    seo: {
      title: 'Curso de Estética Avançada no Rio de Janeiro | Cia Estética',
      description:
        'Formação em estética avançada na Barra da Tijuca, RJ. Protocolos, critério técnico e prática. Fale com a Cia Estética.',
      keywords: [
        'curso de estética avançada RJ',
        'estética avançada Barra da Tijuca',
        'curso profissionalizante de estética RJ',
      ],
    },
  },
  {
    slug: 'tecnologias-esteticas',
    name: 'Tecnologias Estéticas',
    category: 'Tecnologia',
    shortDescription:
      'Equipamentos, parâmetros e protocolos: como usar tecnologia com segurança e critério.',
    intro:
      'A tecnologia mudou a estética — e o profissional que domina equipamento trabalha com mais possibilidades.',
    body: [
      'Conhecer o equipamento é apenas o começo. O que diferencia o profissional é entender o porquê de cada parâmetro, saber ler a resposta da pele e ajustar a conduta.',
      'Esta formação aproxima o aluno dos equipamentos com orientação técnica e prática acompanhada.',
    ],
    level: 'Intermediário',
    duration: null,
    format: null,
    certificate: null,
    price: null,
    audience: [
      'Profissionais de estética que trabalham ou pretendem trabalhar com equipamentos',
      'Quem quer ampliar os serviços do próprio espaço',
      'Profissionais em busca de atualização tecnológica',
    ],
    learnings: [
      'Princípios de funcionamento dos principais equipamentos',
      'Parâmetros e sua relação com o resultado',
      'Indicações, contraindicações e segurança do paciente',
      'Montagem de protocolos com tecnologia',
      'Manutenção, cuidados e organização do equipamento',
      'Registro de atendimento e acompanhamento de resultados',
    ],
    syllabus: [],
    faq: [
      {
        question: 'Quais equipamentos são utilizados no curso?',
        answer:
          'A relação de equipamentos da turma vigente é informada pela equipe. Consulte pelo WhatsApp.',
      },
    ],
    image: '/images/cursos/tecnologias-esteticas.jpg',
    imageAlt: 'Equipamentos de tecnologia estética em ambiente profissional',
    featured: false,
    seo: {
      title: 'Curso de Tecnologias Estéticas no Rio de Janeiro | Cia Estética',
      description:
        'Curso de tecnologias e equipamentos estéticos na Barra da Tijuca, RJ. Parâmetros, protocolos e segurança. Fale com a Cia Estética.',
      keywords: [
        'curso de tecnologias estéticas RJ',
        'curso de equipamentos estéticos Rio de Janeiro',
        'curso estética Barra da Tijuca',
      ],
    },
  },
];

/** Curso em destaque na home (seção "Especialização que abre novas possibilidades"). */
export const featuredCourseSlug = 'remocao-de-tatuagem-a-laser';

export const getCourseBySlug = (slug: string): Course | undefined =>
  courses.find((course) => course.slug === slug);

export const getFeaturedCourse = (): Course =>
  getCourseBySlug(featuredCourseSlug) ?? (courses[0] as Course);

/** Até `limit` cursos diferentes do atual, para o bloco "cursos relacionados". */
export const getRelatedCourses = (slug: string, limit = 3): Course[] =>
  courses.filter((course) => course.slug !== slug).slice(0, limit);

export const courseCategories = Array.from(new Set(courses.map((c) => c.category)));
