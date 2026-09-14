/* ==========================================================================
   NFC — Configuração central do site
   --------------------------------------------------------------------------
   TODO o conteúdo variável (contato, redes, sugestões do assistente) fica
   neste arquivo. Para atualizar o site, edite apenas aqui: nenhum outro
   arquivo precisa ser alterado.
   ========================================================================== */

window.SITE_NFC = {

  /* ---------------------------------------------------------- contato ---
     Os campos abaixo alimentam o rodapé, os botões de contato e os links
     de WhatsApp. Deixe em branco ('') o que ainda não existir: o site
     esconde sozinho o que estiver vazio, sem link quebrado. */
  contato: {
    // ⚠️ CONFIRMAR: número no formato internacional, só dígitos (55 + DDD + número).
    whatsapp: '',
    // ⚠️ CONFIRMAR: como o telefone aparece na tela e no link de discagem.
    telefoneVisivel: '',
    telefoneLink: '',
    // ⚠️ CONFIRMAR: e-mail que recebe os contatos do site.
    email: 'contato@afiliapro.com',
    site: 'https://afiliapro.com',
    horario: 'Segunda a sexta, das 09h às 18h'
  },

  /* ------------------------------------------------------------ redes ---
     Só o nome de usuário (sem @ e sem URL). Vazio = ícone escondido. */
  redes: {
    instagram: '',
    linkedin: '',
    youtube: '',
    tiktok: ''
  },

  /* ------------------------------------------------- mensagens do zap ---
     {assunto} é trocado pelo contexto do botão clicado. */
  mensagens: {
    padrao: 'Olá! Vim pelo site sobre NFC e gostaria de mais informações.',
    comAssunto: 'Olá! Vim pelo site sobre NFC e gostaria de falar sobre {assunto}.'
  },

  /* ----------------------------------------------------- assistente -----
     O assistente responde, por padrão, a partir da base de conhecimento
     local (assets/js/base-conhecimento.js): funciona offline, não envia
     nada para fora e não precisa de chave de API.

     Para ligá-lo a um modelo de linguagem de verdade, publique um endpoint
     próprio (uma função serverless que guarda a chave de API no servidor —
     nunca no navegador) e informe a URL em `endpoint`. O site envia

         POST { pergunta: "...", historico: [{ papel, texto }, ...] }

     e espera de volta { resposta: "texto" } ou { erro: "..." }. Se o
     endpoint falhar ou demorar, a base local responde no lugar dele. */
  assistente: {
    endpoint: '',            // ex.: 'https://api.seudominio.com/nfc-ia'
    tempoLimite: 12000,      // ms até desistir do endpoint e usar a base local
    saudacao: 'Oi! Sou o assistente de NFC daqui do site. Pode perguntar em português mesmo — do básico ("o que é NFC?") ao prático ("dá para usar em pagamento?", "funciona no meu celular?").',
    // Sugestões que aparecem como botões abaixo do campo de texto.
    sugestoes: [
      'NFC é seguro?',
      'Funciona em qualquer celular?',
      'Posso usar em pagamentos?',
      'Precisa de aplicativo?',
      'Qual a diferença para o QR Code?',
      'Quanto custa uma tag NFC?',
      'Funciona sem internet?',
      'Dá para usar em cardápio de restaurante?'
    ]
  }
};
