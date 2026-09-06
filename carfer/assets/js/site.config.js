/* ==========================================================================
   CARFER ENGENHARIA — Configuração central do site
   --------------------------------------------------------------------------
   TODO o conteúdo variável (telefone, links, endereço, textos das mensagens
   automáticas) fica neste arquivo. Para atualizar o site, edite apenas aqui:
   nenhum outro arquivo precisa ser alterado.
   ========================================================================== */

window.CARFER = {

  /* ---------------------------------------------------------- contato --- */
  contato: {
    // Número no formato internacional, só dígitos (55 + DDD + número).
    whatsapp: '5521992877968',
    // Como o telefone aparece na tela.
    telefoneVisivel: '(21) 99287-7968',
    // Link de discagem (tel:).
    telefoneLink: '+5521992877968',
    // ⚠️ CONFIRMAR: e-mail usado no botão "Enviar por e-mail" do formulário.
    email: 'contato@carferengenharia.com.br',
    instagram: 'carferengenharia',
    site: 'https://carferengenharia.com.br',
    horario: 'Segunda a sexta, a partir das 08:00'
  },

  /* --------------------------------------------------------- endereço --- */
  endereco: {
    logradouro: 'Estr. União e Indústria, 10337 — Sl 118',
    bairro: 'Itaipava',
    cidade: 'Petrópolis',
    uf: 'RJ',
    cep: '25730-740',
    // Usado no mapa e na rota. Manter em uma linha, como se digitasse no Maps.
    consulta: 'Carfer Engenharia, Estr. União e Indústria, 10337 - Sala 118, Itaipava, Petrópolis - RJ, 25730-740',
    // ⚠️ CONFIRMAR: coordenadas aproximadas de Itaipava (usadas apenas no
    // Waze/Apple Maps como destino alternativo e no schema.org).
    lat: -22.3167,
    lng: -43.1361
  },

  /* ------------------------------------------------- mensagens do zap --- */
  // {servico} é substituído pelo contexto (card, seção ou item clicado).
  mensagens: {
    padrao: 'Olá! Vim pelo site da Carfer Engenharia e gostaria de solicitar um orçamento.',
    comServico: 'Olá! Vim pelo site da Carfer Engenharia e gostaria de solicitar um orçamento para {servico}.',
    // Cabeçalho da mensagem montada pelo formulário de contato.
    formularioTitulo: '*Solicitação de orçamento — site Carfer Engenharia*'
  },

  /* ------------------------------------------------------- indicadores --- */
  // Exibidos na barra de contadores. Ajuste "valor" conforme os números reais.
  // sufixo/prefixo são opcionais e não entram na animação.
  indicadores: [
    { valor: 150, prefixo: '+', rotulo: 'Obras entregues',        nota: 'ajustar' },
    { valor: 49,  prefixo: '',  rotulo: 'Avaliações 5,0 no Google' },
    { valor: 3,   prefixo: '',  rotulo: 'Estados atendidos'       },
    { valor: 10,  prefixo: '+', rotulo: 'Anos de experiência',    nota: 'ajustar' }
  ]
};
