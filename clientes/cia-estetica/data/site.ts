/**
 * ============================================================================
 *  CONFIGURAÇÃO CENTRAL DO SITE — Cia Estética | Beleza Profissional
 * ============================================================================
 *  Este é o único arquivo que a equipe precisa editar para alterar telefone,
 *  WhatsApp, endereço, horários, redes sociais e números de autoridade.
 *  Nenhum destes textos está espalhado pelos componentes.
 *
 *  LEGENDA DOS COMENTÁRIOS:
 *    ✅ CONFIRMADO  — informação fornecida pela empresa / perfil público.
 *    ⚠️  PENDENTE   — placeholder. Precisa ser confirmado antes de publicar.
 *                     A lista completa está em CONTEUDO-PENDENTE.md
 * ============================================================================
 */

/** Lê uma variável de ambiente pública, caindo para o valor padrão se vazia. */
const env = (value: string | undefined, fallback = ''): string =>
  value && value.trim().length > 0 ? value.trim() : fallback;

export const siteConfig = {
  // ─── Identidade ──────────────────────────────────────────────────────────
  /** ✅ CONFIRMADO */
  name: 'Cia Estética',
  legalName: 'Cia Estética | Beleza Profissional',
  shortName: 'Cia Estética',
  /** ✅ CONFIRMADO — categoria principal no Google */
  category: 'Escola de profissionais de beleza',
  tagline: 'Beleza Profissional',
  /** Posicionamento central do site. */
  positioning: 'Formação profissional para quem quer transformar a beleza em profissão.',
  /** Usada em meta description, Open Graph e JSON-LD. Manter entre 120 e 158 caracteres. */
  description:
    'Escola de profissionais de beleza na Barra da Tijuca, RJ. Cursos de remoção de tatuagem a laser, micropigmentação, depilação e estética avançada.',

  // ─── URLs ────────────────────────────────────────────────────────────────
  /**
   * Domínio de produção. Usado em canonical, Open Graph, sitemap e JSON-LD.
   * ✅ CONFIRMADO — site atual da empresa.
   */
  url: env(process.env.NEXT_PUBLIC_SITE_URL, 'https://ciaestetica.com'),
  /** Prefixo quando hospedado em subdiretório (ex.: GitHub Pages). Vazio em domínio próprio. */
  basePath: env(process.env.NEXT_PUBLIC_BASE_PATH),
  locale: 'pt-BR',
  ogImage: '/images/og/cia-estetica-og.jpg',

  // ─── Contato ─────────────────────────────────────────────────────────────
  contact: {
    /** ✅ CONFIRMADO — telefone fixo da unidade. */
    phone: '(21) 2669-0788',
    phoneRaw: '+552126690788',

    /**
     * ⚠️ PENDENTE — número de WhatsApp oficial.
     * Formato internacional, apenas dígitos: 55 + DDD + número.
     * Enquanto não confirmado, usamos os dígitos do telefone fixo como
     * placeholder para que todos os links já fiquem estruturalmente corretos.
     * Altere aqui OU pela variável NEXT_PUBLIC_WHATSAPP_NUMBER.
     */
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, '552126690788'),
    whatsappConfirmed: false,

    /** ⚠️ PENDENTE — e-mail oficial. Vazio = o campo simplesmente não aparece no site. */
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),

    /**
     * ⚠️ PENDENTE — endpoint do formulário (Formspree, n8n, API própria...).
     * Vazio = o formulário monta a mensagem e envia pelo WhatsApp (sem back-end).
     */
    formEndpoint: env(process.env.NEXT_PUBLIC_FORM_ENDPOINT),
  },

  // ─── Endereço ────────────────────────────────────────────────────────────
  /** ✅ CONFIRMADO */
  address: {
    venue: 'Condomínio Downtown — Bloco 6, Portaria D',
    street: 'Av. das Américas, 500',
    unit: 'Sala 304',
    neighborhood: 'Barra da Tijuca',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zip: '22640-100',
    country: 'BR',
    countryName: 'Brasil',
  },

  // ─── Horário ─────────────────────────────────────────────────────────────
  /**
   * ⚠️ PENDENTE (parcial) — o horário informado publicamente é aproximado.
   * Confirmar antes de publicar; o campo `note` some do site se for esvaziado.
   */
  hours: {
    summary: 'Segunda a sexta, das 09h às 18h',
    note: 'Horário aproximado — confirme pelo WhatsApp antes de visitar.',
    /** Formato Schema.org (openingHours). */
    schema: ['Mo-Fr 09:00-18:00'],
    days: [
      { label: 'Segunda a sexta', value: '09h — 18h' },
      { label: 'Sábado', value: 'Consultar' },
      { label: 'Domingo', value: 'Fechado' },
    ],
  },

  // ─── Redes sociais ───────────────────────────────────────────────────────
  /**
   * ⚠️ PENDENTE — nenhum perfil foi confirmado, portanto todos estão vazios.
   * Um link vazio NÃO é renderizado (nada falso aparece no site).
   * Basta preencher a URL completa para o ícone aparecer no header e no footer.
   */
  social: {
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    youtube: env(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    tiktok: env(process.env.NEXT_PUBLIC_TIKTOK_URL),
  },

  // ─── Loja / e-commerce ───────────────────────────────────────────────────
  /** ⚠️ PENDENTE — quando houver loja online, preencha a URL e o botão passa a apontar para ela. */
  store: {
    url: env(process.env.NEXT_PUBLIC_STORE_URL),
  },

  // ─── Prova social ────────────────────────────────────────────────────────
  /** ✅ CONFIRMADO — perfil público no Google. */
  reviews: {
    rating: 4.9,
    count: 546,
    displayCount: '+500',
    source: 'Google',
  },

  // ─── Números da barra de autoridade ──────────────────────────────────────
  /**
   * Apenas números informados. `suffix`/`prefix` permitem formatar sem lógica no componente.
   * Para adicionar um indicador novo, basta acrescentar um objeto nesta lista.
   */
  stats: [
    { value: 4.9, decimals: 1, suffix: ' ★', label: 'Avaliação no Google', confirmed: true },
    { value: 500, prefix: '+', label: 'Avaliações de alunos', confirmed: true },
    /** ⚠️ PENDENTE — ano de atuação informado no briefing; confirmar com a empresa. */
    { value: 2013, plain: true, label: 'Atuação desde', confirmed: false },
    { value: 100, suffix: '%', label: 'Foco em formação profissional', confirmed: true },
  ],

  // ─── Analytics (IDs por variável de ambiente — nunca versionados) ────────
  analytics: {
    ga4: env(process.env.NEXT_PUBLIC_GA_ID),
    gtm: env(process.env.NEXT_PUBLIC_GTM_ID),
    metaPixel: env(process.env.NEXT_PUBLIC_META_PIXEL_ID),
    googleAds: env(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID),
  },

  /** Exibe marcações de "conteúdo pendente" para a equipe. Ative com NEXT_PUBLIC_SHOW_PLACEHOLDERS=true */
  showPlaceholders: env(process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS) === 'true',
} as const;

export type SiteConfig = typeof siteConfig;

// ─── Derivados de endereço e mapas ─────────────────────────────────────────

/** Endereço em uma linha — usado em JSON-LD, footer e links de mapa. */
export const fullAddress = [
  `${siteConfig.address.street} — ${siteConfig.address.unit}`,
  siteConfig.address.neighborhood,
  `${siteConfig.address.city} - ${siteConfig.address.state}`,
  siteConfig.address.zip,
].join(', ');

/** Endereço em várias linhas — usado nos blocos visuais de localização. */
export const addressLines = [
  siteConfig.address.venue,
  `${siteConfig.address.street} — ${siteConfig.address.unit}`,
  `${siteConfig.address.neighborhood}, ${siteConfig.address.city} - ${siteConfig.address.state}`,
  `CEP ${siteConfig.address.zip}`,
];

const mapsQuery = encodeURIComponent(`${siteConfig.legalName}, ${fullAddress}`);

export const maps = {
  /** Iframe do mapa (não exige chave de API). */
  embed: `https://maps.google.com/maps?q=${mapsQuery}&hl=pt-BR&z=16&output=embed`,
  /** "Como chegar" — abre a rota no app de mapas do usuário. */
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  /** "Ver avaliações" — abre a ficha da empresa no Google. */
  reviews: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
};
