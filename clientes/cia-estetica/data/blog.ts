/**
 * ============================================================================
 *  BLOG — "Conteúdo para quem vive de beleza"
 * ============================================================================
 *  Artigos editoriais de SEO. O conteúdo é sobre o MERCADO e a PROFISSÃO —
 *  não faz afirmações não confirmadas sobre a Cia Estética, não promete
 *  resultados e não faz alegações médicas.
 *
 *  COMO ADICIONAR UM ARTIGO:
 *    1. Copie um objeto de `posts` e troque o `slug` (vira a URL /blog/[slug]).
 *    2. Escreva o `content` em blocos: { heading, paragraphs, list }.
 *    3. Pronto — listagem, categorias, sitemap e JSON-LD se atualizam sozinhos.
 *
 *  ⚠️ `author` usa a assinatura institucional "Equipe Cia Estética".
 *     Troque pelo nome real do autor quando houver.
 * ============================================================================
 */

export interface ContentBlock {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO 8601 — usado no JSON-LD e no sitemap. */
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  author: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  seo: { title: string; description: string; keywords: string[] };
  content: ContentBlock[];
}

/** Categorias editoriais previstas. Só as que têm artigo aparecem nos filtros. */
export const blogCategories = [
  'Estética',
  'Micropigmentação',
  'Laser',
  'Depilação',
  'Cursos',
  'Carreira',
  'Empreendedorismo',
  'Equipamentos',
];

const AUTHOR = 'Equipe Cia Estética';

export const posts: BlogPost[] = [
  {
    slug: 'como-comecar-a-trabalhar-com-estetica',
    title: 'Como começar a trabalhar com estética?',
    excerpt:
      'Um caminho realista para quem quer entrar no mercado da beleza: por onde começar, o que estudar primeiro e quais decisões fazem diferença no primeiro ano.',
    category: 'Carreira',
    publishedAt: '2026-07-14',
    readingMinutes: 7,
    author: AUTHOR,
    image: '/images/blog/como-comecar-estetica.jpg',
    imageAlt: 'Profissional iniciante de estética organizando materiais em cabine de atendimento',
    featured: true,
    seo: {
      title: 'Como começar a trabalhar com estética? Guia para iniciantes | Cia Estética',
      description:
        'Guia prático para quem quer começar na estética: escolha da primeira técnica, formação, prática, primeiros clientes e organização profissional.',
      keywords: [
        'como começar a trabalhar com estética',
        'como entrar no mercado da estética',
        'curso profissionalizante de estética RJ',
        'primeiro curso de estética',
      ],
    },
    content: [
      {
        paragraphs: [
          'Quase todo mundo que entra na estética chega com a mesma pergunta: por onde eu começo? A área é ampla, tem muitas técnicas diferentes e uma quantidade enorme de informação circulando. É fácil se perder antes mesmo de dar o primeiro passo.',
          'A boa notícia é que o caminho de entrada costuma ser mais simples do que parece. Ele começa por uma escolha — e não por uma lista de dez cursos.',
        ],
      },
      {
        heading: '1. Escolha uma técnica de entrada, não uma carreira inteira',
        paragraphs: [
          'O erro mais comum de quem está começando é tentar aprender tudo ao mesmo tempo. Isso dilui a prática, atrasa o domínio da técnica e adia o momento de começar a atender.',
          'O caminho mais eficiente é escolher uma técnica de entrada e desenvolvê-la bem. Depilação e micropigmentação são pontos de partida frequentes justamente porque têm demanda constante e permitem construir uma rotina de atendimento desde cedo.',
          'Uma pergunta ajuda a decidir: você prefere um serviço de alta recorrência, em que o cliente volta com frequência, ou um procedimento de maior valor por atendimento? Não existe resposta certa — existe a resposta que combina com o seu perfil e com a sua realidade.',
        ],
      },
      {
        heading: '2. Priorize formação com prática acompanhada',
        paragraphs: [
          'Na estética, teoria sem execução não vira competência. O que separa quem estuda de quem atende é a quantidade de repetição feita com alguém corrigindo.',
          'Ao avaliar um curso, pergunte objetivamente: existe prática? Como ela acontece? Há acompanhamento durante a execução? Quantas pessoas por turma?',
          'É esse detalhe — a densidade de prática orientada — que determina se você sai do curso confiante ou apenas informada.',
        ],
      },
      {
        heading: '3. Trate biossegurança como parte da técnica',
        paragraphs: [
          'Biossegurança não é um capítulo extra do curso. É a base que sustenta tudo o que vem depois: higienização, organização do ambiente, descarte correto, uso adequado de EPI e cuidado com o material.',
          'Além da responsabilidade com o cliente, é o que constrói percepção de seriedade. Cliente percebe organização — e organização gera confiança.',
        ],
      },
      {
        heading: '4. Organize o atendimento desde o primeiro cliente',
        paragraphs: [
          'Muita gente adia a parte organizacional para quando "a agenda encher". O problema é que a agenda enche justamente por causa dela.',
          'Desde o início, vale estruturar algumas coisas simples:',
        ],
        list: [
          'Ficha de anamnese para cada cliente, com histórico e observações',
          'Registro de cada atendimento: data, procedimento, produtos e resposta',
          'Fotos de antes e depois, sempre com autorização por escrito',
          'Um canal único de agendamento, para não perder mensagem',
          'Controle simples de custo por atendimento e de estoque de insumos',
        ],
      },
      {
        heading: '5. Construa reputação antes de construir preço',
        paragraphs: [
          'No começo, o ativo mais valioso não é a tabela de preços — é a prova social. Atendimentos bem executados geram avaliações, indicações e recorrência.',
          'Peça avaliação a quem saiu satisfeita. Responda a todas. Documente o seu trabalho com constância. Reputação é o que permite ajustar preço depois sem perder cliente.',
        ],
      },
      {
        heading: '6. Só então amplie o seu leque',
        paragraphs: [
          'Depois que a primeira técnica está firme e a agenda tem previsibilidade, a especialização passa a fazer sentido. É o momento em que áreas como despigmentação, remoção de tatuagem a laser, estética avançada e tecnologias estéticas entram naturalmente.',
          'Cada nova competência amplia o que você pode oferecer para uma base de clientes que já confia no seu trabalho — o que costuma ser bem mais eficiente do que começar do zero em outra área.',
        ],
      },
      {
        heading: 'O primeiro passo',
        paragraphs: [
          'Começar na estética é menos sobre acertar a escolha perfeita e mais sobre escolher, praticar e ajustar. A técnica se aprende; a segurança vem da repetição orientada.',
          'Se você está decidindo por onde começar, conversar com quem forma profissionais na área encurta bastante esse caminho.',
        ],
      },
    ],
  },
  {
    slug: 'curso-de-remocao-de-tatuagem-o-que-voce-aprende',
    title: 'Curso de remoção de tatuagem: o que você aprende?',
    excerpt:
      'O que realmente se estuda em uma formação de remoção de tatuagem a laser — da leitura de pele ao acompanhamento entre sessões.',
    category: 'Laser',
    publishedAt: '2026-07-28',
    readingMinutes: 8,
    author: AUTHOR,
    image: '/images/blog/curso-remocao-tatuagem.jpg',
    imageAlt: 'Equipamento de laser utilizado em procedimento de remoção de tatuagem',
    featured: true,
    seo: {
      title: 'Curso de remoção de tatuagem a laser: o que você aprende | Cia Estética RJ',
      description:
        'Entenda o que é estudado em um curso de remoção de tatuagem a laser: avaliação de pele, parâmetros, condução da sessão, pós-procedimento e biossegurança.',
      keywords: [
        'curso de remoção de tatuagem a laser',
        'o que se aprende em curso de remoção de tatuagem',
        'curso remoção de tatuagem RJ',
        'formação laser estética Rio de Janeiro',
      ],
    },
    content: [
      {
        paragraphs: [
          'A remoção de tatuagem a laser é uma das áreas que mais atraem profissionais de estética em busca de especialização. E também uma das que mais exigem critério: não basta operar um equipamento, é preciso entender o que acontece na pele a cada sessão.',
          'Este texto reúne os eixos de conhecimento que estruturam uma formação séria na área.',
        ],
      },
      {
        heading: 'Como o laser age sobre o pigmento',
        paragraphs: [
          'O ponto de partida é técnico: entender de que forma a energia do laser interage com as partículas de pigmento depositadas na pele e por que diferentes cores respondem de maneiras diferentes.',
          'Essa base é o que permite ao profissional prever comportamento, explicar o processo ao cliente com honestidade e evitar promessas que a técnica não sustenta.',
        ],
      },
      {
        heading: 'Avaliação antes de qualquer sessão',
        paragraphs: [
          'Nenhuma sessão começa no equipamento. Começa na avaliação — e essa é uma das partes mais importantes da formação.',
          'O que se estuda nessa etapa:',
        ],
        list: [
          'Leitura do fototipo e das características da pele',
          'Análise da tatuagem: cores, densidade, profundidade e tempo',
          'Histórico do cliente, incluindo procedimentos anteriores',
          'Identificação de indicações e, sobretudo, de contraindicações',
          'Registro fotográfico padronizado para acompanhar a evolução',
        ],
      },
      {
        heading: 'Parâmetros e condução da sessão',
        paragraphs: [
          'Ajustar parâmetros é onde a técnica se manifesta. O curso trabalha a relação entre configuração do equipamento, resposta da pele e resultado esperado — sempre dentro dos limites de segurança.',
          'Junto disso vem a condução prática: preparo do ambiente, posicionamento, ritmo da aplicação e leitura da resposta imediata durante o procedimento.',
        ],
      },
      {
        heading: 'Pós-procedimento e intervalo entre sessões',
        paragraphs: [
          'Boa parte do resultado é decidida depois que o cliente sai da sala. Por isso a formação dedica atenção às orientações de cuidado, aos sinais que devem ser observados e ao intervalo adequado entre sessões.',
          'A remoção de tatuagem é um processo gradual, conduzido em várias etapas. Saber comunicar isso com clareza — sem prometer prazos ou resultados garantidos — faz parte do trabalho técnico.',
        ],
      },
      {
        heading: 'Biossegurança',
        paragraphs: [
          'Higienização, uso de EPI, proteção ocular, organização do ambiente e descarte correto compõem um eixo obrigatório da formação. É protocolo, não recomendação.',
        ],
      },
      {
        heading: 'Atendimento e alinhamento de expectativas',
        paragraphs: [
          'Um profissional preparado sabe dizer o que a técnica faz e o que ela não faz. Alinhar expectativa é parte da competência: evita frustração, protege a relação com o cliente e sustenta a reputação do trabalho.',
        ],
      },
      {
        heading: 'A prática é o que consolida',
        paragraphs: [
          'Todos esses eixos só se transformam em competência com execução acompanhada. É praticando, com alguém orientando e corrigindo, que o profissional desenvolve a leitura e a segurança que o procedimento exige.',
          'Se você quer entender como essa formação acontece na prática, fale com a equipe da Cia Estética.',
        ],
      },
    ],
  },
  {
    slug: 'areas-que-mais-crescem-na-estetica',
    title: 'Quais são as áreas que mais crescem na estética?',
    excerpt:
      'Um panorama das frentes com maior procura no mercado da beleza e o que cada uma exige de quem quer atuar nelas.',
    category: 'Estética',
    publishedAt: '2026-08-06',
    readingMinutes: 6,
    author: AUTHOR,
    image: '/images/blog/areas-que-crescem.jpg',
    imageAlt: 'Ambiente profissional de estética com equipamentos e materiais organizados',
    featured: false,
    seo: {
      title: 'Áreas que mais crescem na estética: onde se especializar | Cia Estética',
      description:
        'Conheça as frentes com maior procura na estética — laser, correção de pigmentos, micropigmentação e tecnologias — e o que cada uma exige do profissional.',
      keywords: [
        'áreas que mais crescem na estética',
        'especialização em estética',
        'mercado de estética Rio de Janeiro',
        'onde se especializar em estética',
      ],
    },
    content: [
      {
        paragraphs: [
          'A estética se reorganizou nos últimos anos. Serviços que antes eram nicho viraram procura constante, e a tecnologia ampliou o que o profissional consegue oferecer dentro do próprio espaço.',
          'Abaixo, as frentes que mais têm chamado atenção — e, mais importante, o que cada uma exige de quem quer atuar nelas.',
        ],
      },
      {
        heading: 'Procedimentos com laser',
        paragraphs: [
          'A frente de laser cresceu junto com o acesso a equipamentos e com a familiaridade do público. Remoção de tatuagem é o exemplo mais visível: uma demanda que praticamente não existia como serviço estruturado e hoje sustenta agendas inteiras.',
          'É uma área de barreira técnica alta — o que é uma vantagem para quem se qualifica. Exige entendimento de parâmetros, leitura de pele e protocolo rigoroso de segurança.',
        ],
      },
      {
        heading: 'Correção e despigmentação',
        paragraphs: [
          'Onde há volume de procedimentos, há demanda por correção. A despigmentação acompanha o crescimento da micropigmentação: trabalhos antigos, pigmentos residuais e pele que precisa ser preparada para um novo procedimento.',
          'É uma especialização natural para quem já atua com micropigmentação e quer atender o ciclo completo do cliente.',
        ],
      },
      {
        heading: 'Micropigmentação',
        paragraphs: [
          'Continua sendo uma das portas de entrada mais procuradas — e uma das que mais premiam refinamento técnico. O mercado tem muitos profissionais; tem bem menos profissionais com traço apurado e leitura de visagismo.',
          'A diferença entre atender e ser procurada, aqui, está no acabamento.',
        ],
      },
      {
        heading: 'Tecnologias estéticas',
        paragraphs: [
          'Equipamentos deixaram de ser exclusividade de grandes clínicas. Isso abriu espaço para profissionais que sabem operar tecnologia com critério — entendendo parâmetro, indicação e limite.',
          'Quem domina equipamento amplia o portfólio sem precisar mudar de área.',
        ],
      },
      {
        heading: 'Serviços de recorrência',
        paragraphs: [
          'Nem tudo que sustenta um negócio é novidade. Depilação e cuidados de rotina continuam sendo a base de previsibilidade de muitos profissionais: o cliente volta, a agenda se organiza e o fluxo permite investir em especialização.',
        ],
      },
      {
        heading: 'Como escolher a sua frente',
        paragraphs: [
          'Em vez de perseguir a área "do momento", vale cruzar três critérios: o que você gosta de executar, o que a sua região demanda e quanto tempo você pode dedicar à prática até ganhar segurança.',
          'Especialização funciona quando é escolha, não modismo.',
        ],
      },
    ],
  },
  {
    slug: 'como-escolher-um-curso-profissionalizante-de-estetica',
    title: 'Como escolher um curso profissionalizante de estética?',
    excerpt:
      'Nove critérios objetivos para avaliar uma escola antes de investir tempo e dinheiro em uma formação.',
    category: 'Cursos',
    publishedAt: '2026-08-18',
    readingMinutes: 7,
    author: AUTHOR,
    image: '/images/blog/como-escolher-curso.jpg',
    imageAlt: 'Aluna de estética acompanhada por professora durante aula prática',
    featured: false,
    seo: {
      title: 'Como escolher um curso profissionalizante de estética | Cia Estética RJ',
      description:
        'Critérios objetivos para avaliar um curso de estética: prática, tamanho da turma, estrutura, suporte e reputação. Guia para não errar na escolha.',
      keywords: [
        'como escolher curso de estética',
        'curso profissionalizante de estética RJ',
        'escola de estética Rio de Janeiro',
        'melhor curso de estética Barra da Tijuca',
      ],
    },
    content: [
      {
        paragraphs: [
          'Escolher um curso de estética é uma decisão de carreira. O que você aprende — e principalmente como aprende — define o quanto vai levar para começar a atender com segurança.',
          'Estes são os critérios que realmente diferenciam uma formação.',
        ],
      },
      {
        heading: '1. Quanta prática existe de fato',
        paragraphs: [
          'Pergunte de forma direta: quantas horas de execução acompanhada? Com modelo? Quantas vezes você repete cada técnica?',
          'Se a resposta for vaga, é um sinal. Prática orientada é o item mais determinante de uma formação técnica.',
        ],
      },
      {
        heading: '2. Tamanho da turma',
        paragraphs: [
          'Turma grande dilui a atenção. Em curso técnico, o valor está em ter alguém olhando enquanto você executa — e corrigindo no momento em que o erro acontece.',
        ],
      },
      {
        heading: '3. Quem ensina',
        paragraphs: [
          'Procure saber se quem conduz o curso atende ou atendeu na área. Quem vive a rotina traz o que não está na apostila: manejo de imprevisto, conversa difícil com cliente, decisão sob dúvida.',
        ],
      },
      {
        heading: '4. Estrutura e equipamentos',
        paragraphs: [
          'Você vai praticar com o mesmo tipo de material que usará depois? A estrutura é organizada? Biossegurança é levada a sério no ambiente?',
          'Se possível, visite. Dez minutos no local dizem mais do que qualquer folheto.',
        ],
      },
      {
        heading: '5. Conteúdo programático claro',
        paragraphs: [
          'Uma boa escola consegue explicar o que você vai aprender, em que ordem e com qual profundidade. Se o conteúdo não é apresentado com clareza, é difícil comparar.',
        ],
      },
      {
        heading: '6. Reputação verificável',
        paragraphs: [
          'Avaliações públicas dizem muito — principalmente as que descrevem a experiência em detalhe. Procure comentários que falem de prática, de acolhimento e de suporte, não apenas notas.',
        ],
      },
      {
        heading: '7. Suporte depois do curso',
        paragraphs: [
          'Dúvidas aparecem quando você começa a atender, não durante a aula. Saber se existe canal de contato depois faz diferença real no início.',
        ],
      },
      {
        heading: '8. Localização e logística',
        paragraphs: [
          'Formação técnica exige presença. Um endereço de acesso viável aumenta a chance de você concluir o curso — e de voltar para a próxima especialização.',
        ],
      },
      {
        heading: '9. Transparência',
        paragraphs: [
          'Escola séria informa com clareza o que está incluso, o que não está e o que a técnica pode entregar. Desconfie de qualquer promessa de renda, de resultado garantido ou de sucesso rápido.',
          'Formação séria entrega competência. O que você constrói com ela depende do seu trabalho.',
        ],
      },
    ],
  },
  {
    slug: 'micropigmentacao-como-comecar-na-profissao',
    title: 'Micropigmentação: como começar na profissão?',
    excerpt:
      'O que estudar, o que praticar e como estruturar os primeiros atendimentos em uma das áreas mais procuradas da beleza.',
    category: 'Micropigmentação',
    publishedAt: '2026-08-25',
    readingMinutes: 7,
    author: AUTHOR,
    image: '/images/blog/micropigmentacao-comecar.jpg',
    imageAlt: 'Detalhe de procedimento de micropigmentação de sobrancelhas sendo executado',
    featured: false,
    seo: {
      title: 'Micropigmentação: como começar na profissão | Cia Estética RJ',
      description:
        'Guia para iniciar na micropigmentação: fundamentos, visagismo, prática, biossegurança e organização dos primeiros atendimentos.',
      keywords: [
        'como começar na micropigmentação',
        'curso de micropigmentação Barra da Tijuca',
        'micropigmentação para iniciantes',
        'curso de micropigmentação RJ',
      ],
    },
    content: [
      {
        paragraphs: [
          'A micropigmentação atrai muita gente para a estética — e com razão. É uma técnica de resultado visível, com procura constante e uma curva de aprendizado que recompensa quem pratica.',
          'Mas é também uma área em que a diferença entre um trabalho comum e um trabalho procurado está em detalhes finos. Veja como construir essa base.',
        ],
      },
      {
        heading: 'Comece pelos fundamentos, não pelo traço bonito',
        paragraphs: [
          'É tentador querer reproduzir o resultado que se vê nas redes. Só que o traço é consequência: vem depois de entender pele, pigmento, profundidade e material.',
          'Quem pula essa etapa fica preso a um resultado que não consegue repetir com consistência em peles diferentes.',
        ],
      },
      {
        heading: 'Visagismo é metade do trabalho',
        paragraphs: [
          'Cada rosto tem proporção, assimetria e expressão próprias. Saber desenhar antes de pigmentar — e saber explicar esse desenho para a cliente — é o que define a qualidade percebida.',
          'O desenho aprovado antes do procedimento também protege você: alinha expectativa e evita frustração.',
        ],
      },
      {
        heading: 'Pele e pigmento',
        paragraphs: [
          'Fototipo, oleosidade, espessura e histórico influenciam diretamente a fixação e a cicatrização. A escolha do pigmento e a profundidade de trabalho mudam conforme essa leitura.',
          'É o tipo de conhecimento que só se consolida vendo casos diferentes, com orientação.',
        ],
      },
      {
        heading: 'Biossegurança desde o primeiro dia',
        paragraphs: [
          'Material descartável, higienização do ambiente, EPI e descarte correto não são opcionais. É a base ética e técnica do procedimento — e o que sustenta a confiança da cliente.',
        ],
      },
      {
        heading: 'Pratique muito antes de atender',
        paragraphs: [
          'Repetição orientada é o que constrói firmeza de mão e leitura. Pele sintética, acompanhamento em atendimentos e correção em tempo real: é assim que a técnica se consolida.',
        ],
      },
      {
        heading: 'Organize o atendimento',
        paragraphs: [
          'Desde a primeira cliente, estruture o básico:',
        ],
        list: [
          'Anamnese completa com histórico e contraindicações',
          'Termo de consentimento e autorização de uso de imagem',
          'Registro fotográfico padronizado, antes e depois',
          'Orientação de cuidados pós-procedimento por escrito',
          'Agendamento do retoque dentro do prazo adequado',
        ],
      },
      {
        heading: 'Construa portfólio com constância',
        paragraphs: [
          'Portfólio não é uma foto boa: é constância. Fotos padronizadas, mesma luz, mesmo enquadramento, resultado documentado ao longo do tempo.',
          'É o que transforma trabalho em reputação — e reputação em agenda.',
        ],
      },
      {
        heading: 'O próximo passo',
        paragraphs: [
          'Começar na micropigmentação é uma decisão que se sustenta em prática orientada. Se você está avaliando por onde iniciar, converse com quem forma profissionais na área e entenda o formato que faz sentido para o seu momento.',
        ],
      },
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  posts.find((post) => post.slug === slug);

/** Artigos ordenados do mais recente para o mais antigo. */
export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export const getRelatedPosts = (slug: string, limit = 3): BlogPost[] => {
  const current = getPostBySlug(slug);
  const others = sortedPosts.filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current?.category);
  return [...sameCategory, ...others.filter((p) => p.category !== current?.category)].slice(0, limit);
};

/** Apenas categorias que já possuem artigo publicado. */
export const activeBlogCategories = blogCategories.filter((category) =>
  posts.some((post) => post.category === category),
);
