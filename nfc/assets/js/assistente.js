/* ==========================================================================
   NFC — Assistente de dúvidas
   --------------------------------------------------------------------------
   Como ele responde
   -----------------
   Por padrão, a resposta vem da base local (base-conhecimento.js): o texto
   da pergunta é normalizado (sem acento, sem palavra de ligação), expandido
   por sinônimos e comparado com as chaves de cada assunto. Ganha o assunto
   de maior pontuação — e, se ninguém passar do limiar, o assistente assume
   que não sabe e sugere caminhos, em vez de inventar.

   Tudo acontece no próprio navegador: nenhuma pergunta sai da máquina do
   visitante e não existe chave de API no código.

   Se `assistente.endpoint` estiver preenchido no site.config.js, a pergunta
   é enviada primeiro para esse endereço (um modelo de linguagem hospedado
   por você). Se ele demorar ou falhar, a base local responde no lugar.

   Blocos
     1. Texto: normalizar, separar em palavras, sinônimos
     2. Índice e pontuação
     3. Busca da melhor resposta
     4. Endpoint externo (opcional)
     5. Interface do chat
     6. Início
   ========================================================================== */
(function () {
  'use strict';

  var CFG   = (window.SITE_NFC || {}).assistente || {};
  var BASE  = window.BASE_NFC || { sinonimos: {}, paradas: [], conversa: [], topicos: [] };
  var LIMIAR = 0.95;          // pontuação mínima para o assistente assumir a resposta

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------- 1. Texto: normalizar e separar em palavras --- */

  // "Não é SEGURO?" -> "nao e seguro"
  function normalizar(texto) {
    return String(texto || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  // Tira o plural e terminações comuns, para "tags" casar com "tag".
  function radical(p) {
    if (p.length > 5 && /oes$/.test(p)) return p.slice(0, -3) + 'ao';   // aplicacoes -> aplicacao
    if (p.length > 5 && /(res|les|zes)$/.test(p)) return p.slice(0, -2); // celulares -> celular
    if (p.length > 4 && /s$/.test(p) && !/ss$/.test(p)) return p.slice(0, -1);
    return p;
  }

  var PARADAS = {};
  (BASE.paradas || []).forEach(function (p) { PARADAS[normalizar(p)] = true; });

  // Sinônimo antes e depois do radical: pega 'smartphones' e 'smartphone'.
  function canonizar(p) {
    var s = BASE.sinonimos[p] || p;
    s = radical(s);
    return BASE.sinonimos[s] || s;
  }

  function separar(texto) {
    var brutas = normalizar(texto).split(' ');
    var palavras = [];
    for (var i = 0; i < brutas.length; i++) {
      var p = brutas[i];
      if (!p || p.length < 2 || PARADAS[p]) continue;
      palavras.push(canonizar(p));
    }
    return palavras;
  }

  /* ------------------------------------------ 2. Índice e pontuação ------- */

  // Em quantos assuntos cada palavra aparece: palavra que está em todo lugar
  // ('nfc', 'celular') identifica menos o assunto e por isso vale menos.
  var frequencia = {};
  var TOTAL = (BASE.topicos || []).length || 1;

  function prepararTopico(topico) {
    var vistas = {};
    topico._chaves = [];
    (topico.chaves || []).concat(topico.titulo || []).forEach(function (chave) {
      var palavras = separar(chave);
      if (!palavras.length) return;
      var assinatura = palavras.join(' ');
      if (vistas[assinatura]) return;      // chaves que viram a mesma coisa contam uma vez
      vistas[assinatura] = true;
      topico._chaves.push({ palavras: palavras, texto: assinatura });
    });
    // Cada palavra conta uma vez por assunto.
    var noTopico = {};
    topico._chaves.forEach(function (c) {
      c.palavras.forEach(function (p) {
        if (noTopico[p]) return;
        noTopico[p] = true;
        frequencia[p] = (frequencia[p] || 0) + 1;
      });
    });
  }

  (BASE.topicos || []).forEach(prepararTopico);
  // A conversa de cortesia é reconhecida pelo texto cru: 'oi' e 'obrigado'
  // são justamente palavras que a lista de paradas descartaria.
  (BASE.conversa || []).forEach(function (item) {
    item._chaves = (item.chaves || []).map(normalizar).filter(Boolean);
  });

  var ESCALA = Math.log(1 + TOTAL);
  function raridade(palavra) {
    var df = frequencia[palavra] || 0;
    return Math.min(1, Math.log(1 + TOTAL / (1 + df)) / ESCALA);
  }

  function pontuar(topico, pergunta) {
    var pontos = 0;
    var cobertas = {};

    topico._chaves.forEach(function (chave) {
      var completa = chave.palavras.every(function (p) { return pergunta.mapa[p]; });
      if (!completa) return;

      var peso = 0;
      chave.palavras.forEach(function (p) {
        peso += raridade(p);
        cobertas[p] = true;
      });
      // Expressão inteira escrita na mesma ordem vale mais que palavras soltas.
      if (chave.palavras.length > 1 && pergunta.texto.indexOf(chave.texto) >= 0) peso += 0.8;
      // A pergunta é exatamente esta chave ('nfc', 'quanto custa'): sinal forte.
      if (chave.texto === pergunta.texto) peso += 0.8;
      pontos += peso;
    });

    if (!pontos) return 0;

    // Quanto da pergunta o assunto explica: evita que uma palavra solta
    // sequestre uma pergunta longa sobre outra coisa.
    var total = pergunta.palavras.length || 1;
    pontos += 0.6 * (Object.keys(cobertas).length / total);
    return pontos;
  }

  /* --------------------------------------- 3. Busca da melhor resposta ---- */

  function preparar(texto) {
    var ordem = separar(texto);
    var mapa = {}, palavras = [];
    ordem.forEach(function (p) {
      if (mapa[p]) return;          // repetida não aumenta o denominador da cobertura
      mapa[p] = true;
      palavras.push(p);
    });
    return { palavras: palavras, mapa: mapa, texto: ordem.join(' ') };
  }

  function acharConversa(cru) {
    var enxuto = normalizar(cru);
    var quantas = enxuto ? enxuto.split(' ').length : 0;
    var achado = null;
    (BASE.conversa || []).forEach(function (item) {
      item._chaves.forEach(function (chave) {
        if (achado || !chave) return;
        // Cortesia só conta quando é praticamente a frase inteira ("oi",
        // "bom dia, tudo bem?") — nunca dentro de uma pergunta de verdade.
        var dentro = (' ' + enxuto + ' ').indexOf(' ' + chave + ' ') >= 0;
        var curta = quantas <= chave.split(' ').length + 3;
        if (dentro && curta) achado = item;
      });
    });
    return achado;
  }

  function ranquear(pergunta) {
    return (BASE.topicos || [])
      .map(function (t) { return { topico: t, pontos: pontuar(t, pergunta) }; })
      .filter(function (r) { return r.pontos > 0; })
      .sort(function (a, b) { return b.pontos - a.pontos; });
  }

  var ultimoTopico = null;   // usado para entender perguntas de continuação

  function responderLocal(cru) {
    var papo = acharConversa(cru);
    if (papo) return { tipo: 'conversa', html: papo.resposta };

    var pergunta = preparar(cru);

    if (!pergunta.palavras.length) {
      return { tipo: 'vazio', html: '<p>Pode escrever a pergunta com mais palavras? Assim eu consigo entender melhor. 🙂</p>' };
    }

    var lista = ranquear(pergunta);

    // Continuação curta ("e é seguro?", "e o preço?"): empresta o contexto do
    // último assunto respondido — mas só se a própria pergunta já apontar para
    // algum assunto. Sem isso, "qual a previsão do tempo?" herdaria o contexto
    // anterior e receberia uma resposta que não tem nada a ver.
    if ((!lista.length || lista[0].pontos < LIMIAR) && ultimoTopico && pergunta.palavras.length <= 3) {
      var apoio = preparar(cru + ' ' + (ultimoTopico.chaves || []).slice(0, 4).join(' '));
      var listaApoio = ranquear(apoio).filter(function (r) { return pontuar(r.topico, pergunta) > 0; });
      if (listaApoio.length && listaApoio[0].pontos >= LIMIAR) lista = listaApoio;
    }

    if (!lista.length || lista[0].pontos < LIMIAR) {
      return { tipo: 'naoSei', html: montarNaoSei(), sugestoes: sugestoesDe(lista) };
    }

    var topico = lista[0].topico;
    ultimoTopico = topico;

    // Segundo colocado quase empatado vira uma sugestão extra, não outra resposta.
    var extras = (topico.veja || []).slice();
    if (lista[1] && lista[1].pontos > lista[0].pontos * 0.72) extras.unshift(lista[1].topico.id);

    return { tipo: 'topico', html: topico.resposta, sugestoes: idsParaSugestoes(extras, topico.id) };
  }

  function montarNaoSei() {
    return '<p>Essa eu não sei responder com segurança — prefiro dizer isso a inventar. ' +
           'Tente reformular com outras palavras ou escolha um dos assuntos abaixo. ' +
           'Para dúvidas fora do NFC, fale com a gente pelos contatos do rodapé.</p>';
  }

  function sugestoesDe(lista) {
    var ids = lista.slice(0, 3).map(function (r) { return r.topico.id; });
    if (ids.length < 3) ids = ids.concat(['o-que-e', 'seguro', 'celular', 'custo']);
    return idsParaSugestoes(ids, null);
  }

  function idsParaSugestoes(ids, excluir) {
    var vistos = {}, saida = [];
    (ids || []).forEach(function (id) {
      if (!id || id === excluir || vistos[id]) return;
      vistos[id] = true;
      var t = acharPorId(id);
      if (t) saida.push({ id: t.id, texto: t.titulo });
    });
    return saida.slice(0, 3);
  }

  function acharPorId(id) {
    var achado = null;
    (BASE.topicos || []).forEach(function (t) { if (t.id === id) achado = t; });
    return achado;
  }

  /* ------------------------------------ 4. Endpoint externo (opcional) ---- */

  function responderRemoto(pergunta, historico) {
    var url = (CFG.endpoint || '').trim();
    if (!url) return Promise.resolve(null);
    if (typeof fetch !== 'function' || typeof AbortController !== 'function') return Promise.resolve(null);

    var corte = new AbortController();
    var relogio = setTimeout(function () { corte.abort(); }, CFG.tempoLimite || 12000);

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta: pergunta, historico: historico }),
      signal: corte.signal
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (dados) {
        if (!dados || !dados.resposta) return null;
        return { tipo: 'remoto', html: textoParaHtml(String(dados.resposta)) };
      })
      .catch(function () { return null; })            // qualquer falha cai na base local
      .then(function (r) { clearTimeout(relogio); return r; });
  }

  /* ------------------------------------------- 5. Interface do chat ------- */

  var conversa, campo, forma, enviar, sugestoesBox, limpar;
  var pensando = null;
  var historico = [];

  function escapar(texto) {
    return String(texto)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Texto puro (do endpoint) vira parágrafos, sem deixar HTML de fora passar.
  function textoParaHtml(texto) {
    return escapar(texto)
      .split(/\n{2,}/)
      .map(function (p) { return '<p>' + p.replace(/\n/g, '<br>') + '</p>'; })
      .join('');
  }

  var ICONE_IA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v3M5.5 7.5 7.6 9.6M18.5 7.5 16.4 9.6"/><rect x="4" y="9" width="16" height="11" rx="3.5"/><circle cx="9" cy="14.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="14.5" r="1.2" fill="currentColor" stroke="none"/></svg>';
  var ICONE_EU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M4.8 20c.9-3.6 3.8-5.6 7.2-5.6s6.3 2 7.2 5.6"/></svg>';

  function bolha(quem, html) {
    var msg = document.createElement('div');
    msg.className = 'msg msg--' + (quem === 'eu' ? 'eu' : 'ia');
    msg.innerHTML =
      '<span class="msg__icone">' + (quem === 'eu' ? ICONE_EU : ICONE_IA) + '</span>' +
      '<div class="msg__bolha"></div>';
    msg.querySelector('.msg__bolha').innerHTML = html;
    conversa.appendChild(msg);
    rolar();
    return msg;
  }

  function rolar() {
    // Um quadro depois, para a altura da bolha já estar calculada.
    requestAnimationFrame(function () { conversa.scrollTop = conversa.scrollHeight; });
  }

  function mostrarPensando() {
    pensando = bolha('ia', '<span class="digitando" role="status" aria-label="escrevendo a resposta"><i></i><i></i><i></i></span>');
  }

  function esconderPensando() {
    if (pensando && pensando.parentNode) pensando.parentNode.removeChild(pensando);
    pensando = null;
  }

  // Sugestões que aparecem embaixo de uma resposta ("veja também").
  function anexarSugestoes(msg, sugestoes) {
    if (!sugestoes || !sugestoes.length) return;
    var caixa = document.createElement('div');
    caixa.className = 'chat__sugestoes chat__sugestoes--resposta';
    sugestoes.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = s.texto;
      b.addEventListener('click', function () { perguntar(s.texto); });
      caixa.appendChild(b);
    });
    msg.querySelector('.msg__bolha').appendChild(caixa);
    rolar();
  }

  function responder(texto) {
    mostrarPensando();
    var inicio = Date.now();

    responderRemoto(texto, historico.slice(-6)).then(function (remoto) {
      var resposta = remoto || responderLocal(texto);
      // Uma pausa mínima deixa a conversa com ritmo de conversa.
      var espera = Math.max(0, 420 - (Date.now() - inicio));
      setTimeout(function () {
        esconderPensando();
        var msg = bolha('ia', resposta.html);
        anexarSugestoes(msg, resposta.sugestoes);
        historico.push({ papel: 'assistente', texto: msg.textContent.trim() });
        travar(false);
      }, espera);
    });
  }

  function travar(ocupado) {
    enviar.disabled = ocupado;
    campo.setAttribute('aria-busy', ocupado ? 'true' : 'false');
  }

  function perguntar(texto) {
    texto = String(texto || '').trim().slice(0, 500);
    if (!texto || enviar.disabled) return;
    bolha('eu', '<p>' + escapar(texto) + '</p>');
    historico.push({ papel: 'visitante', texto: texto });
    campo.value = '';
    ajustarAltura();
    travar(true);
    responder(texto);
  }

  function ajustarAltura() {
    campo.style.height = 'auto';
    campo.style.height = Math.min(campo.scrollHeight, 120) + 'px';
  }

  function montarSugestoesIniciais() {
    var lista = CFG.sugestoes || [];
    sugestoesBox.innerHTML = '';
    lista.forEach(function (texto) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = texto;
      b.addEventListener('click', function () { perguntar(texto); });
      sugestoesBox.appendChild(b);
    });
  }

  function reiniciar() {
    conversa.innerHTML = '';
    historico = [];
    ultimoTopico = null;
    bolha('ia', '<p>' + escapar(CFG.saudacao || 'Olá! Pergunte o que quiser sobre NFC.') + '</p>');
    travar(false);
  }

  /* ---------------------------------------------------- 6. Início --------- */

  function iniciar() {
    forma        = $('[data-chat-forma]');
    conversa     = $('[data-chat-conversa]');
    campo        = $('[data-chat-campo]');
    enviar       = $('[data-chat-enviar]');
    sugestoesBox = $('[data-chat-sugestoes]');
    limpar       = $('[data-chat-limpar]');
    if (!forma || !conversa || !campo || !enviar) return;

    reiniciar();
    montarSugestoesIniciais();

    forma.addEventListener('submit', function (e) {
      e.preventDefault();
      perguntar(campo.value);
    });

    // Enter envia; Shift+Enter quebra linha.
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        perguntar(campo.value);
      }
    });
    campo.addEventListener('input', ajustarAltura);

    if (limpar) limpar.addEventListener('click', reiniciar);

    // Botões da página que levam ao assistente já deixam o cursor no campo.
    $$('[data-abre-chat]').forEach(function (botao) {
      botao.addEventListener('click', function () {
        var pergunta = botao.getAttribute('data-pergunta');
        setTimeout(function () {
          campo.focus({ preventScroll: true });
          if (pergunta) perguntar(pergunta);
        }, 520);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

  // Exposto para testes e para uso por outros scripts da página.
  window.AssistenteNFC = { perguntar: perguntar, responderLocal: responderLocal };
})();
