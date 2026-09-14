/* ==========================================================================
   NFC — Base de conhecimento do assistente
   --------------------------------------------------------------------------
   Este arquivo guarda TUDO o que o assistente sabe responder. Não há lógica
   aqui: quem procura, pontua e escolhe a resposta é o assistente.js.

   Para ensinar um assunto novo, copie um bloco de `topicos` e preencha:
     id       — identificador único (minúsculo, sem espaço)
     titulo   — nome do assunto (aparece nas sugestões do "não entendi")
     chaves   — palavras e expressões que levam a esta resposta. Pode ser
                uma palavra ('pagamento') ou uma expressão ('pagar no
                celular'): expressões valem mais pontos que palavras soltas.
     resposta — HTML curto (<p>, <ul>, <li>, <strong>). Escreva como quem
                explica para um leigo: frase curta, sem jargão.
     veja     — ids de assuntos relacionados, oferecidos ao final.
   ========================================================================== */

window.BASE_NFC = {

  /* ------------------------------------------------------- sinônimos -----
     Mapa "palavra do visitante" → "palavra usada nas chaves". Serve para
     que 'smartphone', 'aparelho' e 'fone' cheguem todos em 'celular'. */
  sinonimos: {
    smartphone: 'celular', telefone: 'celular', fone: 'celular', aparelho: 'celular',
    android: 'celular', samsung: 'celular', motorola: 'celular', xiaomi: 'celular',
    iphone: 'iphone', ios: 'iphone', apple: 'iphone', maca: 'iphone',
    tag: 'tag', tags: 'tag', etiqueta: 'tag', adesivo: 'tag', chip: 'tag',
    cartoes: 'cartao', card: 'cartao', crachas: 'cracha', cracha: 'cracha',
    pagar: 'pagamento', pago: 'pagamento', pague: 'pagamento', compra: 'pagamento',
    comprar: 'pagamento', maquininha: 'pagamento', maquinha: 'pagamento',
    pix: 'pagamento', credito: 'pagamento', debito: 'pagamento',
    seguranca: 'seguro', segura: 'seguro', protegido: 'seguro', protecao: 'seguro',
    risco: 'seguro', perigo: 'seguro', perigoso: 'seguro', golpe: 'seguro',
    hacker: 'clonar', hackear: 'clonar', copiar: 'clonar', copia: 'clonar',
    duplicar: 'clonar', fraude: 'clonar', roubar: 'clonar',
    aplicativo: 'app', aplicativos: 'app', programa: 'app', baixar: 'app',
    instalar: 'app', download: 'app',
    wifi: 'internet', rede: 'internet', dados: 'internet', online: 'internet',
    offline: 'internet', sinal: 'internet', conexao: 'internet',
    preco: 'custo', valor: 'custo', caro: 'custo', custa: 'custo',
    barato: 'custo', investimento: 'custo', orcamento: 'custo',
    distancia: 'alcance', perto: 'alcance', longe: 'alcance', centimetro: 'alcance',
    raio: 'alcance', proximidade: 'alcance', aproximacao: 'alcance',
    restaurante: 'restaurante', bar: 'restaurante', lanchonete: 'restaurante',
    cardapio: 'restaurante', menu: 'restaurante', garcom: 'restaurante',
    condominio: 'acesso', portaria: 'acesso', catraca: 'acesso', porta: 'acesso',
    fechadura: 'acesso', entrada: 'acesso', funcionario: 'acesso', ponto: 'acesso',
    loja: 'varejo', vitrine: 'varejo', promocao: 'varejo', produto: 'varejo',
    prateleira: 'varejo', vendas: 'varejo', venda: 'varejo', marketing: 'varejo',
    evento: 'evento', feira: 'evento', ingresso: 'evento', congresso: 'evento',
    palestra: 'evento', credenciamento: 'evento', checkin: 'evento',
    hospital: 'saude', clinica: 'saude', paciente: 'saude', medico: 'saude',
    prontuario: 'saude', remedio: 'saude', medicamento: 'saude',
    networking: 'visita', contato: 'visita', linkedin: 'visita',
    avaliacao: 'avaliacoes', review: 'avaliacoes', estrela: 'avaliacoes',
    google: 'avaliacoes', feedback: 'avaliacoes',
    gravar: 'gravar', programar: 'gravar', escrever: 'gravar', configurar: 'gravar',
    gravo: 'gravar', grava: 'gravar', gravei: 'gravar', gravando: 'gravar',
    ler: 'ler', le: 'ler', leio: 'ler', lendo: 'ler', leitura: 'ler', leu: 'ler',
    lido: 'ler', reconhece: 'ler', detecta: 'ler', identifica: 'ler',
    regravar: 'regravar', reescrever: 'regravar', apagar: 'regravar',
    reutilizar: 'regravar', bloquear: 'regravar', travar: 'regravar',
    durar: 'durabilidade', dura: 'durabilidade', vencer: 'durabilidade',
    validade: 'durabilidade', estraga: 'durabilidade', quebra: 'durabilidade',
    memoria: 'memoria', armazenar: 'memoria', guardar: 'memoria', cabe: 'memoria',
    espaco: 'memoria', byte: 'memoria', bytes: 'memoria',
    metal: 'metal', aco: 'metal', aluminio: 'metal', agua: 'agua',
    molhar: 'agua', chuva: 'agua', capinha: 'capinha', capa: 'capinha',
    case: 'capinha', bolsa: 'capinha', carteira: 'capinha',
    ativar: 'ativar', ligar: 'ativar', desligar: 'ativar', desativar: 'ativar',
    habilitar: 'ativar', configuracao: 'ativar', ajustes: 'ativar',
    diferenca: 'diferenca', versus: 'diferenca', melhor: 'diferenca',
    comparar: 'diferenca', comparacao: 'diferenca', vantagem: 'beneficio',
    beneficios: 'beneficio', vantagens: 'beneficio',
    qr: 'qrcode', qrcode: 'qrcode', codigo: 'qrcode',
    bluetooth: 'bluetooth', pareamento: 'bluetooth', parear: 'bluetooth',
    rfid: 'rfid', radiofrequencia: 'rfid',
    virus: 'virus', malware: 'virus', infectar: 'virus', infeccao: 'virus',
    privacidade: 'privacidade', rastrear: 'privacidade', espionar: 'privacidade',
    lgpd: 'privacidade', pessoal: 'privacidade', pessoais: 'privacidade',
    comecar: 'comecar', contratar: 'comecar', encomendar: 'comecar',
    pedido: 'comecar', personalizar: 'comecar', logo: 'comecar',
    funciona: 'funciona', serve: 'funciona', usar: 'funciona', uso: 'funciona',
    passivo: 'passivo', ativo: 'ativo', energia: 'bateria', pilha: 'bateria',
    carga: 'bateria', consumo: 'bateria', gasta: 'bateria'
  },

  /* ----------------------------------------------- palavras ignoradas -----
     Conectivos que aparecem em qualquer frase e não ajudam a identificar
     o assunto. */
  paradas: [
    'a','o','as','os','um','uma','uns','umas','de','do','da','dos','das','em',
    'no','na','nos','nas','por','para','pra','pro','com','sem','e','ou','mas',
    'que','qual','quais','quem','como','onde','quando','porque','porquê','pq',
    'se','sim','nao','eu','voce','vc','meu','minha','seu','sua','ele','ela',
    'isso','isto','esse','essa','este','esta','aquele','aquela','ai','la',
    'ser','sao','e','esta','estao','tem','tenho','ter','fazer','faz','pode',
    'posso','podem','poderia','preciso','precisa','quero','queria','gostaria',
    'saber','me','mim','ao','aos','as','muito','mais','menos','tambem','ja',
    'so','todo','toda','todos','todas','algum','alguma','qualquer','sobre',
    'dar','da','de','tipo','coisa','favor','obrigado','oi','ola','entao'
  ],

  /* -------------------------------------------- respostas de conversa -----
     Saudação, agradecimento e afins: reconhecidas antes dos assuntos. */
  conversa: [
    {
      id: 'saudacao',
      chaves: ['oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e ai', 'opa', 'hey'],
      resposta: '<p>Olá! Pode perguntar o que quiser sobre NFC — desde <strong>“o que é isso?”</strong> até <strong>“funciona no meu celular?”</strong> ou <strong>“serve para o meu negócio?”</strong>.</p>'
    },
    {
      id: 'agradecimento',
      chaves: ['obrigado', 'obrigada', 'valeu', 'vlw', 'agradecido', 'muito bom', 'show', 'perfeito', 'legal'],
      resposta: '<p>Por nada! Se aparecer outra dúvida sobre NFC, é só perguntar. 👋</p>'
    },
    {
      id: 'despedida',
      chaves: ['tchau', 'ate logo', 'ate mais', 'falou', 'adeus', 'bye'],
      resposta: '<p>Até logo! Qualquer dúvida sobre NFC, estou aqui nesta página.</p>'
    },
    {
      id: 'quem-e-voce',
      chaves: ['quem e voce', 'voce e um robo', 'voce e humano', 'voce e uma ia', 'qual seu nome', 'e uma pessoa'],
      resposta: '<p>Sou o assistente virtual deste site: um programa que responde dúvidas sobre NFC a partir de um material preparado por aqui. <strong>Não sou uma pessoa</strong> e respondo só sobre este assunto — para falar com alguém de verdade, use os contatos no rodapé da página.</p>'
    },
    {
      id: 'ajuda',
      chaves: ['ajuda', 'o que voce faz', 'o que voce sabe', 'o que posso perguntar', 'me ajuda', 'nao sei o que perguntar', 'opcoes'],
      resposta: '<p>Posso explicar, em linguagem simples:</p><ul><li>o que é NFC e <strong>como funciona</strong>;</li><li>se é <strong>seguro</strong> e se funciona no <strong>seu celular</strong>;</li><li><strong>pagamentos</strong>, cartão de visita digital, cardápio, controle de acesso, eventos;</li><li><strong>tags, cartões, chaveiros e adesivos</strong>: preço, memória, durabilidade e como gravar.</li></ul><p>Escolha um dos botões de sugestão ou escreva a pergunta do seu jeito.</p>'
    }
  ],

  /* ----------------------------------------------------------- tópicos --- */
  topicos: [
    {
      id: 'o-que-e',
      titulo: 'O que é NFC',
      chaves: ['o que e nfc', 'nfc', 'significa nfc', 'sigla nfc', 'near field communication',
               'definicao', 'explicar nfc', 'o que significa', 'conceito'],
      resposta:
        '<p><strong>NFC</strong> quer dizer <em>Near Field Communication</em> — comunicação de campo próximo. É uma forma de dois objetos trocarem informação <strong>só de chegarem perto um do outro</strong>, a poucos centímetros, sem fio, sem cabo e sem pareamento.</p>' +
        '<p>É a mesma tecnologia que você já usa ao pagar aproximando o cartão ou o celular da maquininha. A diferença é que ela também funciona com <strong>cartões, adesivos, chaveiros e placas</strong>: o visitante aproxima o celular e algo acontece na hora — um site abre, um contato é salvo, um cardápio aparece.</p>',
      veja: ['como-funciona', 'formatos', 'beneficio']
    },
    {
      id: 'como-funciona',
      titulo: 'Como o NFC funciona por dentro',
      chaves: ['como funciona', 'funcionamento', 'tecnicamente', 'por dentro', 'frequencia',
               'ondas', 'antena', 'transmite', 'mecanismo', '13 56', 'mhz', 'campo magnetico'],
      resposta:
        '<p>Todo item com NFC tem uma <strong>antena em espiral</strong> e um chip minúsculo. O leitor (quase sempre o celular ou a maquininha) gera um campo magnético em <strong>13,56 MHz</strong>. Quando a antena da tag entra nesse campo, ela capta energia suficiente para o chip acordar e conversar.</p>' +
        '<p>Em três tempos: <strong>aproximar</strong> (menos de 4 cm), <strong>conectar</strong> (o reconhecimento leva cerca de um décimo de segundo) e <strong>agir</strong> (o celular recebe o conteúdo e mostra na tela). A troca acontece a 106, 212 ou 424 kbit/s — pouco para vídeo, de sobra para um link, um contato ou uma credencial.</p>' +
        '<p>Nada disso exige emparelhamento, senha ou configuração: é o encostar que inicia e o afastar que encerra.</p>',
      veja: ['alcance', 'ativo', 'bateria']
    },
    {
      id: 'alcance',
      titulo: 'Qual é o alcance do NFC',
      chaves: ['alcance', 'a que distancia', 'quantos centimetros', 'precisa encostar',
               'tem que encostar', 'longe funciona', 'raio de acao', 'metros'],
      resposta:
        '<p>Na prática, de <strong>0 a 4 centímetros</strong>. O padrão admite até cerca de 10 cm, mas antenas de celular e de tag raramente chegam lá. Na dúvida, encoste.</p>' +
        '<p>Esse alcance curto é proposital e é a <strong>primeira camada de segurança</strong> do NFC: ninguém lê sua tag do outro lado da sala, do carro ao lado ou de dentro da bolsa a metros de distância.</p>' +
        '<p>Onde fica a antena do celular varia: na maioria dos Android é no terço superior das costas do aparelho; no iPhone, bem no topo. Se não pegar de primeira, deslize o celular pela superfície.</p>',
      veja: ['seguro', 'capinha', 'como-funciona']
    },
    {
      id: 'ativo',
      titulo: 'NFC ativo e passivo',
      chaves: ['ativo', 'passivo', 'diferenca ativo passivo', 'dispositivo ativo',
               'tag passiva', 'emulacao de cartao', 'modos de operacao', 'ponto a ponto'],
      resposta:
        '<p>Pense em <strong>quem tem energia</strong>:</p>' +
        '<ul><li><strong>Ativo</strong> — tem bateria e cria o campo magnético: o celular, a maquininha, a catraca, a fechadura eletrônica. Ele lê, grava e pode se passar por um cartão (é o que acontece no pagamento por aproximação).</li>' +
        '<li><strong>Passivo</strong> — não tem bateria nenhuma: tags, adesivos, cartões, chaveiros, pulseiras. Ficam “dormindo” até que um aparelho ativo chegue perto e os alimente por indução. Por isso não estragam parados na gaveta e custam poucos reais.</li></ul>' +
        '<p>Na maioria dos usos comerciais a combinação é sempre a mesma: o <strong>celular do cliente é o ativo</strong> e o <strong>seu cartão ou tag é o passivo</strong>.</p>',
      veja: ['bateria', 'como-funciona', 'pagamento']
    },
    {
      id: 'seguro',
      titulo: 'NFC é seguro?',
      chaves: ['nfc e seguro', 'seguro', 'e perigoso', 'confiavel', 'risco de usar',
               'alguem pode ler', 'roubar dados', 'interceptar'],
      resposta:
        '<p>Sim — e por quatro motivos somados:</p>' +
        '<ul><li><strong>Distância</strong>: sem encostar, não há leitura. Não dá para “passar o leitor” em alguém de longe.</li>' +
        '<li><strong>Nada roda sozinho</strong>: uma tag guarda dados (quase sempre um link), não programas. O celular mostra o que encontrou e <strong>espera você tocar</strong> para abrir.</li>' +
        '<li><strong>Pagamento é criptografado</strong>: o número real do cartão não trafega. Vai um número substituto (token) e um <strong>código único por compra</strong>, inútil se for copiado.</li>' +
        '<li><strong>A tag pode ser travada</strong>: depois de gravada, ela é bloqueada em modo somente leitura e ninguém regrava por cima.</li></ul>' +
        '<p>O cuidado que vale é o de sempre: olhe o endereço antes de abrir e desconfie de tags soltas coladas em lugares públicos — do mesmo jeito que você faria com um QR Code colado por cima de outro.</p>',
      veja: ['clonar', 'virus', 'privacidade']
    },
    {
      id: 'clonar',
      titulo: 'Dá para clonar uma tag NFC?',
      chaves: ['clonar', 'clonagem', 'copiar tag', 'duplicar cartao', 'falsificar',
               'alguem copia', 'proteger tag', 'bloqueada'],
      resposta:
        '<p>Uma tag comum <strong>gravada e deixada aberta</strong> pode, sim, ser lida e copiada por quem tem o aparelho na mão — afinal, o conteúdo dela é público por natureza (em geral, um link).</p>' +
        '<p>O que se faz na prática:</p>' +
        '<ul><li><strong>Travar a tag</strong> depois de gravar: ela vira somente leitura para sempre.</li>' +
        '<li>Guardar na tag <strong>só um link</strong>, nunca senha ou dado sensível. O que é sigiloso fica no servidor, atrás de login.</li>' +
        '<li>Para acesso e identificação, usar chips com <strong>criptografia e autenticação</strong> (linha MIFARE DESFire, por exemplo), onde copiar não basta: é preciso a chave.</li></ul>' +
        '<p>Em resumo: para marketing e cardápio, tag comum travada resolve. Para crachá, catraca e pagamento, chip criptografado.</p>',
      veja: ['seguro', 'acesso', 'regravar']
    },
    {
      id: 'virus',
      titulo: 'NFC pode transmitir vírus?',
      chaves: ['virus', 'malware', 'infectar celular', 'hackear pelo nfc', 'pegar virus',
               'invadir', 'perigo de virus'],
      resposta:
        '<p>Não. A tag guarda <strong>texto, não programas</strong>. Na esmagadora maioria dos casos, o que está lá dentro é um endereço de site com meia dúzia de caracteres.</p>' +
        '<p>Quando o celular lê, ele <strong>mostra o endereço e pergunta</strong> se você quer abrir. Nada instala, nada executa, nada acontece sem o seu toque. O risco real é o mesmo de clicar num link qualquer: por isso, leia o endereço antes de confirmar.</p>',
      veja: ['seguro', 'privacidade', 'app']
    },
    {
      id: 'celular',
      titulo: 'Funciona em qualquer celular?',
      chaves: ['funciona em qualquer celular', 'todo celular tem', 'meu celular funciona',
               'compativel', 'compatibilidade', 'funciona em celular antigo', 'celular basico',
               'funciona celular', 'todo mundo consegue'],
      resposta:
        '<p>Na maioria, sim. <strong>Praticamente todo celular lançado nos últimos anos tem NFC</strong> — de intermediários a topo de linha, em Android e iPhone.</p>' +
        '<p>Fica de fora uma parte dos aparelhos de <strong>entrada</strong> (os mais baratos) e os modelos <strong>bem antigos</strong>. É a exceção, não a regra, e ela encolhe a cada ano.</p>' +
        '<p>Por isso a boa prática é oferecer <strong>NFC e QR Code juntos</strong>: quem tem NFC aproxima; quem não tem, aponta a câmera. Ninguém fica de fora.</p>',
      veja: ['tem-nfc', 'iphone', 'qrcode']
    },
    {
      id: 'iphone',
      titulo: 'NFC no iPhone',
      chaves: ['iphone', 'funciona no iphone', 'apple', 'ios', 'iphone le tag'],
      resposta:
        '<p>Funciona. Todo iPhone <strong>do 7 em diante</strong> lê tags NFC.</p>' +
        '<ul><li><strong>iPhone XS, XR, 11 e mais novos</strong>: basta aproximar com a tela ligada e desbloqueada. A notificação aparece sozinha, sem abrir aplicativo nenhum.</li>' +
        '<li><strong>iPhone 7, 8 e X</strong>: leem, mas é preciso acionar o atalho <strong>“Leitor de tags NFC”</strong> na Central de Controle (ou usar um app).</li></ul>' +
        '<p>Pagamento por aproximação com Apple Pay funciona desde o iPhone 6. Para <strong>gravar</strong> tags pelo iPhone você precisa de um aplicativo de gravação — a leitura é nativa, a escrita não.</p>',
      veja: ['celular', 'gravar', 'pagamento']
    },
    {
      id: 'tem-nfc',
      titulo: 'Como saber se meu celular tem NFC',
      chaves: ['meu celular tem nfc', 'antigo tem nfc', 'descobrir se tem nfc',
               'verificar', 'onde fica o nfc', 'antena onde fica'],
      resposta:
        '<p><strong>Android</strong>: abra os Ajustes e busque por “NFC”. Se aparecer a opção (costuma ficar em <em>Conexões</em> ou <em>Dispositivos conectados</em>), o aparelho tem. Aproveite e deixe ligada.</p>' +
        '<p><strong>iPhone</strong>: do iPhone 7 em diante, tem — e vem sempre ativo, sem opção para desligar.</p>' +
        '<p>Se não achar nos ajustes, procure o modelo do aparelho seguido de “NFC” na internet: a ficha técnica responde em um segundo.</p>' +
        '<p>A antena fica <strong>nas costas do celular</strong>: no topo, nos iPhones; no terço superior ou no meio, na maioria dos Android. É por ali que se encosta.</p>',
      veja: ['ativar', 'celular', 'alcance']
    },
    {
      id: 'ativar',
      titulo: 'Como ativar ou desativar o NFC',
      chaves: ['ativar nfc', 'desativar', 'ligar nfc', 'desligar nfc', 'habilitar',
               'ativo o nfc', 'ativo no celular', 'nao esta funcionando', 'nao funciona',
               'nao le', 'nao esta lendo', 'nao reconhece', 'parou de funcionar'],
      resposta:
        '<p><strong>Android</strong>: Ajustes → busque “NFC” → ligue a chave. Em muitos aparelhos o atalho também está no painel de notificações, junto com Wi-Fi e Bluetooth.</p>' +
        '<p><strong>iPhone</strong>: não existe botão. O NFC fica sempre disponível e só age quando você aproxima de uma tag com a tela ligada.</p>' +
        '<p>Se não estiver lendo, verifique nesta ordem: NFC ligado, <strong>tela acesa e desbloqueada</strong>, capinha muito grossa ou com metal, e o ponto exato da antena (deslize o celular devagar pela tag).</p>',
      veja: ['tem-nfc', 'capinha', 'bateria']
    },
    {
      id: 'pagamento',
      titulo: 'NFC em pagamentos',
      chaves: ['pagamento', 'pagar por aproximacao', 'pagamento por aproximacao',
               'cartao por aproximacao', 'google pay', 'apple pay', 'carteira digital',
               'maquininha', 'contactless'],
      resposta:
        '<p>É o uso mais conhecido: aproximar o cartão, o celular ou o relógio da maquininha e pronto, em menos de um segundo.</p>' +
        '<p>O que acontece nesse instante: o aparelho envia um <strong>número substituto</strong> (token) no lugar do número do cartão, junto com um <strong>código criptografado que só vale para aquela compra</strong>. Interceptar não adianta — o código já nasceu vencido.</p>' +
        '<p>Pelo celular ainda entra a <strong>digital ou o reconhecimento facial</strong> antes de liberar, o que torna o pagamento mais seguro que entregar o cartão físico na mão de alguém. O limite de valor sem senha varia de banco para banco.</p>' +
        '<p>Para o comerciante: fila mais curta, menos contato com o cartão do cliente e a mesma maquininha de sempre — a função por aproximação já vem nela.</p>',
      veja: ['seguro', 'ativo', 'varejo']
    },
    {
      id: 'app',
      titulo: 'Precisa de aplicativo?',
      chaves: ['precisa de app', 'precisa baixar', 'instalar aplicativo', 'sem app',
               'app para ler', 'tem que baixar'],
      resposta:
        '<p><strong>Para ler, não.</strong> Celulares Android e iPhones modernos leem tags NFC de fábrica: aproximou, a notificação aparece; tocou, o conteúdo abre no navegador.</p>' +
        '<p>Essa é justamente a grande vantagem sobre um app próprio: <strong>nada para baixar, nada para cadastrar</strong>, nenhuma fricção entre o cliente e a informação.</p>' +
        '<p>App só entra em dois casos: para <strong>gravar</strong> as tags (quem produz, não quem usa) e nos iPhone 7, 8 e X, que precisam do atalho do leitor.</p>',
      veja: ['gravar', 'iphone', 'qrcode']
    },
    {
      id: 'internet',
      titulo: 'Funciona sem internet?',
      chaves: ['sem internet', 'precisa de internet', 'funciona offline', 'wifi',
               'dados moveis', 'sem sinal', 'precisa de rede'],
      resposta:
        '<p>A <strong>leitura em si não usa internet</strong>: a conversa entre a tag e o celular é direta, por campo magnético, a centímetros de distância.</p>' +
        '<p>A internet só faz falta no passo seguinte, e apenas se o conteúdo estiver na nuvem — um site, um cardápio online, um formulário. Se a tag guardar um <strong>contato, uma senha de Wi-Fi ou um texto</strong>, tudo acontece offline, inclusive no modo avião.</p>' +
        '<p>Dica prática para eventos e locais com sinal ruim: grave o essencial na própria tag e deixe o link como complemento.</p>',
      veja: ['memoria', 'evento', 'bateria']
    },
    {
      id: 'bateria',
      titulo: 'Bateria e consumo de energia',
      chaves: ['bateria', 'gasta bateria', 'consumo', 'precisa de bateria', 'pilha',
               'sem energia', 'descarrega'],
      resposta:
        '<p><strong>A tag não tem bateria e nunca vai precisar de uma.</strong> Ela tira do próprio campo do celular a energia de que precisa, por indução, no instante da leitura. Por isso uma etiqueta colada na parede funciona igual daqui a dez anos.</p>' +
        '<p>No celular, o gasto é <strong>irrelevante</strong>: a antena fica em espera de baixíssimo consumo e só trabalha por frações de segundo. Deixar o NFC ligado o dia inteiro não encurta a bateria de forma perceptível.</p>',
      veja: ['ativo', 'durabilidade', 'ativar']
    }
,
    {
      id: 'qrcode',
      titulo: 'NFC ou QR Code?',
      chaves: ['qrcode', 'qr code', 'diferenca qr', 'melhor que qr', 'nfc ou qr',
               'camera', 'comparar qr'],
      resposta:
        '<p>Os dois levam ao mesmo lugar; muda a experiência.</p>' +
        '<ul><li><strong>NFC</strong>: encosta e pronto. Nada de abrir câmera, mirar, esperar o foco. Funciona no escuro, com a tag escondida dentro do material, e não estraga o design da peça.</li>' +
        '<li><strong>QR Code</strong>: funciona em qualquer celular com câmera, inclusive os sem NFC, e pode ser lido de longe ou de uma foto na tela.</li></ul>' +
        '<p>Não escolha: <strong>use os dois na mesma peça</strong>. A tag dentro, o QR impresso atrás. Quem pode, aproxima; quem não pode, aponta a câmera. É a combinação que mais converte.</p>',
      veja: ['celular', 'visita', 'beneficio']
    },
    {
      id: 'bluetooth',
      titulo: 'NFC e Bluetooth',
      chaves: ['bluetooth', 'diferenca bluetooth', 'parear', 'melhor bluetooth', 'wifi direct'],
      resposta:
        '<p>São para coisas diferentes. O <strong>Bluetooth</strong> mantém uma ligação contínua a metros de distância (fone, caixa de som, relógio), mas exige pareamento, configuração e bateria dos dois lados.</p>' +
        '<p>O <strong>NFC</strong> é um toque instantâneo a centímetros, sem configuração e com um lado podendo ser passivo, sem bateria alguma.</p>' +
        '<p>Eles até se ajudam: em muitas caixas de som e fones, você encosta o celular e o <strong>NFC faz o pareamento Bluetooth sozinho</strong> — um toque no lugar de cinco telas de ajuste.</p>',
      veja: ['como-funciona', 'alcance', 'ativo']
    },
    {
      id: 'rfid',
      titulo: 'NFC e RFID',
      chaves: ['rfid', 'diferenca rfid', 'radiofrequencia', 'etiqueta rfid', 'pedagio'],
      resposta:
        '<p><strong>NFC é um ramo do RFID</strong>, especializado em curta distância. Todo NFC é RFID; nem todo RFID é NFC.</p>' +
        '<ul><li><strong>RFID</strong> (o de estoque, pedágio e antifurto de loja) trabalha em outras frequências e alcança de metros a dezenas de metros. Ótimo para ler centenas de itens de uma vez, mas exige leitor próprio.</li>' +
        '<li><strong>NFC</strong> fica nos 13,56 MHz e em poucos centímetros — e tem uma vantagem decisiva: <strong>o leitor já está no bolso do seu cliente</strong>, é o celular dele.</li></ul>',
      veja: ['como-funciona', 'varejo', 'alcance']
    },
    {
      id: 'visita',
      titulo: 'Cartão de visita digital',
      chaves: ['cartao de visita', 'visita digital', 'networking', 'trocar contato',
               'salvar contato', 'cartao inteligente', 'vcard'],
      resposta:
        '<p>Você encosta o cartão no celular da pessoa e, na hora, aparece a sua página: <strong>nome, cargo, telefone, WhatsApp, Instagram, site e o botão de salvar o contato</strong>. Um toque e você está na agenda dela — sem digitar, sem foto do cartão que ninguém revê depois.</p>' +
        '<p>Por que substitui o cartão de papel:</p>' +
        '<ul><li><strong>Um só cartão para sempre</strong>: mudou de telefone ou de cargo? Edita a página; o cartão que já está com as pessoas passa a mostrar o dado novo.</li>' +
        '<li><strong>Não acaba</strong> e não vira lixo: o mesmo cartão atende o evento inteiro.</li>' +
        '<li><strong>Dá números</strong>: quantos toques, em que dias, quais links foram clicados.</li></ul>' +
        '<p>Funciona também como chaveiro, pulseira, adesivo no verso do celular ou tag na mesa do escritório.</p>',
      veja: ['formatos', 'evento', 'comecar']
    },
    {
      id: 'restaurante',
      titulo: 'Cardápio digital em restaurantes',
      chaves: ['restaurante', 'cardapio digital', 'menu digital', 'bar', 'mesa',
               'garcom', 'delivery', 'lanchonete'],
      resposta:
        '<p>Uma tag no display da mesa, no porta-guardanapo ou embaixo do tampo: o cliente encosta o celular e o <strong>cardápio abre na hora</strong>, com foto, descrição e preço.</p>' +
        '<p>O que muda na operação:</p>' +
        '<ul><li><strong>Preço se atualiza na nuvem</strong> — acabou o prato ou mudou o valor? Edita na página; nenhuma mesa precisa ser trocada.</li>' +
        '<li><strong>Sem app e sem mirar câmera</strong>: mais rápido que QR Code e funciona com a mesa mal iluminada.</li>' +
        '<li>A mesma tag pode levar a <strong>pedir, chamar o garçom, pagar ou avaliar</strong>, conforme o momento.</li>' +
        '<li>Cardápio sempre limpo: a tag vai embutida no acrílico, protegida de gordura e de respingo.</li></ul>',
      veja: ['qrcode', 'avaliacoes', 'formatos']
    },
    {
      id: 'acesso',
      titulo: 'Controle de acesso com NFC',
      chaves: ['controle de acesso', 'cracha', 'catraca', 'portaria', 'condominio',
               'fechadura', 'porta', 'seguranca predial', 'registro de ponto', 'academia'],
      resposta:
        '<p>É o crachá, a chave do quarto de hotel, a pulseira da academia e o cartão do estacionamento. Encostou, a catraca libera e o sistema registra <strong>quem entrou e quando</strong>.</p>' +
        '<p>Por que é mais seguro que chave:</p>' +
        '<ul><li><strong>Perdeu? Cancela no sistema</strong> em segundos — nada de trocar fechadura.</li>' +
        '<li><strong>Permissão por pessoa, área e horário</strong>: o visitante entra no térreo, o técnico entra na sala de máquinas, o estagiário só em horário comercial.</li>' +
        '<li><strong>Trilha de auditoria</strong> completa, útil para segurança do trabalho e para o RH.</li>' +
        '<li>Com chips criptografados (linha DESFire), <strong>copiar o cartão não basta</strong>: sem a chave do sistema, ele não abre nada.</li></ul>',
      veja: ['clonar', 'saude', 'formatos']
    },
    {
      id: 'varejo',
      titulo: 'Marketing e varejo',
      chaves: ['marketing', 'varejo', 'loja', 'promocao', 'vitrine', 'produto',
               'campanha', 'propaganda', 'cupom', 'ponto de venda', 'embalagem'],
      resposta:
        '<p>A tag transforma qualquer superfície em ponto de contato: prateleira, vitrine, cartaz, embalagem, provador.</p>' +
        '<ul><li><strong>Ficha do produto na hora</strong>: composição, modo de usar, vídeo, tabela de tamanhos, avaliações de quem já comprou.</li>' +
        '<li><strong>Cupom e promoção</strong> que abrem com um toque, sem o cliente digitar código nenhum.</li>' +
        '<li><strong>Vitrine que vende fora do horário</strong>: quem passa à noite encosta o celular e compra pelo site.</li>' +
        '<li><strong>Métrica de verdade</strong>: dá para medir quantas pessoas interagiram com aquele cartaz, naquela loja, naquele dia — o que o papel nunca mostrou.</li></ul>' +
        '<p>Como a tag é fina e flexível, ela vai <strong>escondida</strong> atrás do material gráfico: o design continua intacto.</p>',
      veja: ['avaliacoes', 'rastreio', 'qrcode']
    },
    {
      id: 'evento',
      titulo: 'Eventos, ingressos e check-in',
      chaves: ['evento', 'ingresso', 'checkin', 'credenciamento', 'feira', 'congresso',
               'pulseira', 'festival', 'palestra'],
      resposta:
        '<p>Pulseira ou crachá com NFC resolvem o evento inteiro:</p>' +
        '<ul><li><strong>Entrada sem fila</strong>: encostou, liberou. Sem procurar o PDF do ingresso no e-mail.</li>' +
        '<li><strong>Credenciamento e networking</strong>: um toque entre dois crachás troca os contatos; o expositor capta leads sem papel.</li>' +
        '<li><strong>Consumo sem dinheiro</strong> (cashless): a pulseira carrega o crédito e agiliza o bar.</li>' +
        '<li><strong>Controle por área</strong>: camarote, backstage, área VIP, cada um com sua permissão.</li>' +
        '<li>Se o sinal cair, a leitura continua funcionando: <strong>ela não depende de internet</strong>.</li></ul>',
      veja: ['acesso', 'internet', 'visita']
    },
    {
      id: 'saude',
      titulo: 'NFC na saúde',
      chaves: ['saude', 'hospital', 'paciente', 'prontuario', 'clinica', 'medico',
               'remedio', 'pulseira hospitalar', 'idoso', 'emergencia'],
      resposta:
        '<p>Na saúde o ganho é evitar troca de informação e ganhar tempo:</p>' +
        '<ul><li><strong>Pulseira do paciente</strong>: o profissional encosta o leitor e confere identidade, alergias, exames e a medicação prescrita antes de aplicar.</li>' +
        '<li><strong>Prontuário na beira do leito</strong>, sem digitar registro nenhum — menos erro de digitação, menos retrabalho.</li>' +
        '<li><strong>Rastreio de medicamentos e equipamentos</strong>: lote, validade, última manutenção, checklist de limpeza.</li>' +
        '<li><strong>Identificação de emergência</strong> para idosos e pacientes crônicos: tipo sanguíneo, condições e contato da família.</li></ul>' +
        '<p>Importante: dado de saúde é dado sensível. A tag guarda <strong>só o identificador</strong>; a informação clínica fica no sistema do hospital, com acesso controlado — como manda a LGPD.</p>',
      veja: ['privacidade', 'acesso', 'seguro']
    },
    {
      id: 'avaliacoes',
      titulo: 'Avaliações e redes sociais',
      chaves: ['avaliacoes', 'avaliacao no google', 'estrela', 'review', 'seguidores',
               'instagram', 'nota do google', 'reputacao'],
      resposta:
        '<p>É um dos usos com resultado mais rápido: uma plaquinha NFC no balcão, na mesa ou na recepção.</p>' +
        '<p>O cliente encosta o celular e <strong>já cai direto na tela de avaliar</strong> o seu negócio no Google — sem procurar o nome da loja, sem digitar nada. O mesmo vale para seguir o Instagram ou entrar no grupo de ofertas.</p>' +
        '<p>Por que funciona: a avaliação acontece <strong>no melhor momento</strong>, com o cliente ainda satisfeito no local, e o esforço dele cai de seis toques para um.</p>',
      veja: ['restaurante', 'varejo', 'comecar']
    },
    {
      id: 'rastreio',
      titulo: 'Autenticidade e rastreio de produtos',
      chaves: ['autenticidade', 'falsificacao', 'original', 'produto original', 'rastreio',
               'rastreabilidade', 'garantia', 'certificado', 'procedencia', 'lote', 'pirata'],
      resposta:
        '<p>Uma etiqueta NFC no produto (ou dentro dele) vira <strong>selo de autenticidade</strong>: o cliente aproxima o celular e vê a página oficial com lote, data, garantia e certificado.</p>' +
        '<p>Como cada tag tem um <strong>número de série único e não regravável</strong> de fábrica, o servidor sabe distinguir a peça verdadeira de uma cópia da etiqueta. Falsificar a embalagem é fácil; falsificar o chip, não.</p>' +
        '<p>Serve ainda para registrar a garantia sem nota fiscal amassada, mostrar a origem de um alimento ou provar a manutenção em um equipamento.</p>',
      veja: ['varejo', 'memoria', 'clonar']
    },
    {
      id: 'formatos',
      titulo: 'Formatos: cartão, tag, chaveiro, placa',
      chaves: ['formatos', 'modelos', 'tipos de tag', 'chaveiro', 'pulseira', 'placa',
               'display', 'adesivo', 'em que formato', 'opcoes de produto'],
      resposta:
        '<p>O chip é o mesmo; muda a embalagem. Os formatos mais usados:</p>' +
        '<ul><li><strong>Cartão PVC</strong> (tamanho de cartão de crédito): visita digital, fidelidade, crachá. Aceita impressão colorida nos dois lados.</li>' +
        '<li><strong>Tag adesiva</strong>: fina e flexível, cola em cardápio, cartaz, caixa, embalagem ou no verso do celular.</li>' +
        '<li><strong>Chaveiro e pulseira</strong>: resistentes, para academia, hotel, evento e controle de acesso.</li>' +
        '<li><strong>Placa e display de mesa</strong>: acrílico de balcão para avaliação, Wi-Fi, cardápio e promoção.</li>' +
        '<li><strong>Etiqueta de produto</strong>: lacre, selo de garantia e etiqueta de autenticidade.</li>' +
        '<li><strong>Tag antimetal</strong>: com camada de ferrite, é a que funciona colada em máquina, ferramenta e superfície metálica.</li></ul>',
      veja: ['custo', 'metal', 'comecar']
    },
    {
      id: 'memoria',
      titulo: 'Quanto cabe em uma tag NFC',
      chaves: ['memoria', 'quanto cabe', 'armazenamento', 'ntag213', 'ntag215', 'ntag216',
               'bytes', 'guarda quanto', 'capacidade', 'salvar video'],
      resposta:
        '<p>Pouco — e é o bastante. Os chips mais comuns da família NTAG guardam:</p>' +
        '<ul><li><strong>NTAG213</strong>: cerca de 144 bytes. Um link ou um contato simples. É o do dia a dia.</li>' +
        '<li><strong>NTAG215</strong>: cerca de 504 bytes. Contato completo, vários links.</li>' +
        '<li><strong>NTAG216</strong>: cerca de 888 bytes. Textos maiores e configurações.</li></ul>' +
        '<p>Foto e vídeo <strong>não cabem</strong> e nem precisam: grava-se o <strong>link</strong> e o conteúdo pesado fica na internet. A vantagem é que esse conteúdo pode ser trocado quando você quiser, sem mexer na tag.</p>',
      veja: ['gravar', 'internet', 'custo']
    },
    {
      id: 'gravar',
      titulo: 'Como gravar uma tag NFC',
      chaves: ['gravar', 'programar tag', 'escrever na tag', 'como configurar',
               'app para gravar', 'colocar link', 'ndef'],
      resposta:
        '<p>É simples e leva menos de um minuto:</p>' +
        '<ul><li>Instale um aplicativo de gravação (no Android, <strong>NFC Tools</strong> é o mais usado; no iPhone, o NFC Tools também funciona, ou o próprio app Atalhos).</li>' +
        '<li>Escolha o tipo de conteúdo: <strong>link, contato, texto, senha de Wi-Fi, telefone, e-mail</strong>.</li>' +
        '<li>Escreva e encoste o celular na tag até confirmar.</li>' +
        '<li>Teste em outro aparelho e, se estiver tudo certo, <strong>trave a tag</strong> em somente leitura.</li></ul>' +
        '<p>O conteúdo é gravado no formato <strong>NDEF</strong>, um padrão universal: uma tag gravada no Android é lida por qualquer iPhone e vice-versa.</p>' +
        '<p>Se for uma quantidade grande, o fornecedor entrega as tags <strong>já gravadas e travadas</strong>.</p>',
      veja: ['regravar', 'app', 'memoria']
    },
    {
      id: 'regravar',
      titulo: 'Dá para regravar ou apagar?',
      chaves: ['regravar', 'apagar', 'reutilizar', 'mudar o link', 'trocar conteudo',
               'quantas vezes', 'travar', 'somente leitura'],
      resposta:
        '<p>Dá, enquanto a tag estiver aberta. Os chips NTAG aguentam cerca de <strong>100 mil regravações</strong> — na prática, quantas você quiser.</p>' +
        '<p>Depois de travada em somente leitura, porém, <strong>não há volta</strong>: é definitivo, e é assim mesmo que se protege uma peça entregue ao público.</p>' +
        '<p>O melhor dos dois mundos é gravar um <strong>link intermediário</strong> (um redirecionador seu). A tag fica travada e mesmo assim você troca o destino quando quiser, no painel, sem tocar em nada que já foi distribuído.</p>',
      veja: ['gravar', 'clonar', 'durabilidade']
    },
    {
      id: 'durabilidade',
      titulo: 'Quanto tempo dura uma tag',
      chaves: ['durabilidade', 'quanto tempo dura', 'vida util', 'validade', 'estraga',
               'resistente', 'desgasta'],
      resposta:
        '<p>Muito tempo. Os fabricantes garantem cerca de <strong>10 anos de retenção dos dados</strong> e as tags não têm bateria, peça móvel nem manutenção: paradas, não se gastam.</p>' +
        '<p>O que acaba com uma tag é o <strong>dano físico</strong> — dobrar até romper a antena, furar o chip, calor extremo. Por isso o formato importa: adesivo simples para uso interno; PVC, epóxi ou acrílico para quem vai pegar chuva, sol e manuseio diário.</p>',
      veja: ['agua', 'formatos', 'bateria']
    },
    {
      id: 'metal',
      titulo: 'Funciona em metal?',
      chaves: ['metal', 'superficie metalica', 'aco', 'aluminio', 'maquina',
               'ferramenta', 'cola em metal'],
      resposta:
        '<p>Tag comum colada direto no metal <strong>não funciona</strong>: o metal distorce o campo magnético e a antena não consegue captar energia.</p>' +
        '<p>A solução existe e é simples: <strong>tag antimetal</strong> (on-metal), que traz uma camada de ferrite entre o chip e a superfície. Com ela, dá para etiquetar máquina, ferramenta, quadro elétrico, extintor e equipamento hospitalar normalmente.</p>' +
        '<p>Vale lembrar: <strong>capinha de metal no celular</strong> atrapalha do mesmo jeito, só que do outro lado.</p>',
      veja: ['capinha', 'agua', 'formatos']
    },
    {
      id: 'agua',
      titulo: 'Funciona molhado ou na chuva?',
      chaves: ['agua', 'molhado', 'chuva', 'impermeavel', 'umidade', 'lavar',
               'piscina', 'externo', 'sol'],
      resposta:
        '<p>A água não interfere no sinal — o problema é a tag encharcar. Por isso existem versões <strong>seladas em PVC, epóxi ou silicone</strong>, que aguentam chuva, lavagem e mão molhada. É o caso das pulseiras de piscina e de parque aquático.</p>' +
        '<p>Para uso externo, peça a versão com <strong>proteção UV</strong>: quem costuma sofrer primeiro é a impressão, não o chip.</p>',
      veja: ['durabilidade', 'metal', 'formatos']
    },
    {
      id: 'capinha',
      titulo: 'Funciona por cima da capinha?',
      chaves: ['capinha', 'capa do celular', 'case', 'bolsa', 'carteira', 'atravessa',
               'por cima', 'vidro', 'acrilico'],
      resposta:
        '<p>Sim. O sinal atravessa <strong>plástico, silicone, couro, acrílico, vidro, madeira, papel e tecido</strong> sem esforço. Capinha comum não atrapalha — é por isso que a tag pode ficar escondida dentro do display da mesa ou atrás do cartaz.</p>' +
        '<p>Atrapalham dois casos: <strong>capinhas com placa de metal</strong> (as de suporte magnético para carro) e capinhas muito grossas, tipo blindada. Se não ler, tire a capa e teste de novo.</p>',
      veja: ['metal', 'alcance', 'ativar']
    },
    {
      id: 'custo',
      titulo: 'Quanto custa',
      chaves: ['custo', 'preco', 'quanto custa', 'valor', 'caro', 'barato', 'orcamento',
               'investimento', 'mensalidade'],
      resposta:
        '<p>É uma das tecnologias mais baratas de colocar em pé, porque o leitor — o celular do cliente — já existe e não custa nada para você.</p>' +
        '<ul><li><strong>Tags e adesivos</strong> simples: poucos reais por unidade, e o preço cai bastante por volume.</li>' +
        '<li><strong>Cartões em PVC</strong> com impressão personalizada: um pouco mais, dependendo do acabamento.</li>' +
        '<li><strong>Chaveiros, pulseiras e displays</strong>: variam com o material e a resistência.</li>' +
        '<li><strong>Nenhuma infraestrutura</strong>: sem leitor para comprar, sem obra, sem instalação.</li></ul>' +
        '<p>Os valores mudam com chip, quantidade e acabamento — peça um orçamento com o volume que você precisa. Em quase todo projeto, o custo real está no conteúdo (a página de destino), não no plástico.</p>',
      veja: ['formatos', 'beneficio', 'comecar']
    },
    {
      id: 'privacidade',
      titulo: 'Privacidade e dados pessoais',
      chaves: ['privacidade', 'dados pessoais', 'lgpd', 'rastrear', 'espionar',
               'sabe quem eu sou', 'monitorar', 'localizacao'],
      resposta:
        '<p>A tag <strong>não sabe quem leu</strong>. Ela não tem bateria, não tem memória de eventos e não guarda nada sobre o seu celular: só entrega o conteúdo que foi gravado nela e volta a dormir.</p>' +
        '<p>Ninguém consegue rastrear você por uma tag passiva, nem descobrir sua localização por ela.</p>' +
        '<p>Quem pode registrar algo é o <strong>site que abre depois</strong> — e aí valem as regras de sempre: aviso de cookies, política de privacidade e consentimento, como manda a LGPD. Boa prática para quem monta a campanha: medir o toque de forma anônima e só pedir dado pessoal com finalidade clara.</p>',
      veja: ['seguro', 'virus', 'saude']
    },
    {
      id: 'beneficio',
      titulo: 'Benefícios do NFC',
      chaves: ['beneficio', 'vantagem', 'por que usar', 'para que serve', 'serve o nfc',
               'ganho', 'utilidade', 'vale a pena', 'resolve o que'],
      resposta:
        '<p>Em uma frase: <strong>tira o atrito entre a pessoa e a informação</strong>. Os ganhos que aparecem em todo projeto:</p>' +
        '<ul><li><strong>Sem contato</strong> — nada de superfície compartilhada, papel passando de mão em mão.</li>' +
        '<li><strong>Instantâneo</strong> — menos de um segundo, sem mirar câmera nem digitar endereço.</li>' +
        '<li><strong>Seguro</strong> — alcance curto, nada roda sozinho, pagamento criptografado.</li>' +
        '<li><strong>Sem app</strong> — funciona com o celular do jeito que ele já veio.</li>' +
        '<li><strong>Barato</strong> — poucos reais por peça e nenhum equipamento para comprar.</li>' +
        '<li><strong>Sustentável</strong> — uma peça reprogramável no lugar de milhares de impressos que envelhecem.</li></ul>',
      veja: ['custo', 'qrcode', 'comecar']
    },
    {
      id: 'comecar',
      titulo: 'Como começar a usar NFC',
      chaves: ['comecar', 'como comecar', 'contratar', 'encomendar', 'primeiro passo',
               'implantar', 'personalizar', 'fazer um pedido', 'implantacao'],
      resposta:
        '<p>Três decisões e você está pronto:</p>' +
        '<ul><li><strong>1. O que deve acontecer no toque?</strong> Abrir o cardápio, salvar seu contato, levar à avaliação do Google, liberar a catraca.</li>' +
        '<li><strong>2. Em que peça?</strong> Cartão para a mão do cliente, adesivo para colar, display para o balcão, pulseira para o evento, chaveiro para a equipe.</li>' +
        '<li><strong>3. Quantas?</strong> O volume define o custo por unidade e se vale entregar tudo já gravado e travado.</li></ul>' +
        '<p>Depois é operação: gravar (ou receber gravado), testar em um Android e em um iPhone, distribuir e acompanhar os números.</p>' +
        '<p>Se quiser, use os contatos no rodapé desta página — a conversa fica mais rápida quando já se sabe o objetivo do toque.</p>',
      veja: ['formatos', 'custo', 'gravar']
    }
  ]
};
