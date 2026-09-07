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
    // Como o endereço aparece escrito na tela.
    logradouro: 'Estr. União e Indústria, 10337 — Sl 118',
    bairro: 'Itaipava',
    cidade: 'Petrópolis',
    uf: 'RJ',
    cep: '25730-740',

    // Texto usado para ACHAR a empresa no mapa (Google Maps, Waze e Apple
    // Maps) — é o que você digitaria na busca do Maps. Sem o número da sala:
    // "Sala 118" não existe para o mapa e só atrapalha a localização.
    // Começar pelo nome da empresa faz o Maps abrir a ficha do negócio.
    busca: 'Carfer Engenharia, Estrada União e Indústria, 10337, Itaipava, Petrópolis - RJ, 25730-740, Brasil',

    // OPCIONAL — deixe null que o mapa se vira com o endereço acima.
    // Se quiser cravar o pino num ponto exato (a entrada da obra, o
    // estacionamento): abra o Google Maps, clique com o botão direito
    // sobre o local e copie os dois números do topo do menu.
    // Ex.: lat: -22.316742, lng: -43.136055
    lat: null,
    lng: null
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
