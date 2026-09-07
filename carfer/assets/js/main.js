/* ==========================================================================
   CARFER ENGENHARIA — comportamento do site
   --------------------------------------------------------------------------
   Nenhuma dependência externa. Tudo lê window.CARFER (site.config.js).
   Blocos:
     1.  Utilitários
     2.  Mensagens automáticas de WhatsApp
     3.  Instagram (abre o app no celular)
     4.  Cabeçalho, menu e scrollspy
     5.  Animações de entrada
     6.  Contadores animados
     7.  Barras de avaliação
     8.  Portfólio: filtros e lightbox
     9.  Formulário de contato
     10. Mapa e rota por GPS
     11. Rodapé e botão "voltar ao topo"
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.CARFER || {};
  var CONTATO = CFG.contato || {};
  var END = CFG.endereco || {};
  var MSG = CFG.mensagens || {};

  /* ------------------------------------------------ 1. Utilitários ------- */
  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ehTouch = window.matchMedia('(hover: none)').matches;
  var ehIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var ehMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

  function abrir(url) {
    var w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = url;   // pop-up bloqueado: navega na mesma aba
  }

  /* --------------------------- 2. Mensagens automáticas de WhatsApp ------ */
  var CONTEXTO_PADRAO = 'um orçamento';

  function textoWhats(servico) {
    if (!servico || servico === CONTEXTO_PADRAO) {
      return MSG.padrao || 'Olá! Gostaria de solicitar um orçamento.';
    }
    return (MSG.comServico || 'Olá! Gostaria de um orçamento para {servico}.')
      .replace('{servico}', servico);
  }

  function linkWhats(servico) {
    return 'https://wa.me/' + (CONTATO.whatsapp || '') +
           '?text=' + encodeURIComponent(textoWhats(servico));
  }

  // Todo elemento com [data-wa] recebe o link já com a mensagem correta.
  function aplicarLinksWhats() {
    $$('[data-wa]').forEach(function (el) {
      el.setAttribute('href', linkWhats(el.getAttribute('data-wa-service')));
    });
  }

  /* Botão flutuante: a mensagem acompanha a seção visível na tela e,
     no hover/foco de um card de serviço, o serviço daquele card. */
  var dock = $('[data-wa-dock]');
  var dockTip = $('[data-dock-tip]');
  var contextoSecao = CONTEXTO_PADRAO;

  function atualizarDock(servico) {
    if (!dock) return;
    var s = servico || contextoSecao;
    dock.setAttribute('href', linkWhats(s));
    if (dockTip) {
      dockTip.textContent = (s === CONTEXTO_PADRAO)
        ? 'Pedir orçamento no WhatsApp'
        : 'Falar sobre ' + s;
    }
  }

  function observarContextos() {
    var secoes = $$('[data-wa-context]');
    if (!secoes.length || !('IntersectionObserver' in window)) return;

    var visiveis = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        visiveis.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
      });
      var melhor = null, maior = 0;
      visiveis.forEach(function (ratio, el) {
        if (ratio > maior) { maior = ratio; melhor = el; }
      });
      if (melhor) {
        contextoSecao = melhor.getAttribute('data-wa-context') || CONTEXTO_PADRAO;
        atualizarDock();
      }
    }, { threshold: [0, .15, .35, .6, .85] });

    secoes.forEach(function (s) { io.observe(s); });
  }

  // Hover/foco em um card de serviço ou área: o botão flutuante passa a citar
  // aquele serviço. Ao sair, volta ao contexto da seção.
  function vincularCardsAoDock() {
    $$('[data-wa-service]').forEach(function (el) {
      if (el.hasAttribute('data-wa-dock')) return;
      var servico = el.getAttribute('data-wa-service');
      ['pointerenter', 'focus'].forEach(function (ev) {
        el.addEventListener(ev, function () { atualizarDock(servico); });
      });
      ['pointerleave', 'blur'].forEach(function (ev) {
        el.addEventListener(ev, function () { atualizarDock(); });
      });
    });
  }

  /* --------------------------------------------------- 3. Instagram ------ */
  // No celular tenta abrir o app; se não abrir em ~900ms, cai para o site.
  function ligarInstagram() {
    var user = CONTATO.instagram || '';
    var web = 'https://instagram.com/' + user;

    $$('[data-insta]').forEach(function (el) {
      el.setAttribute('href', web);
      el.addEventListener('click', function (e) {
        if (!ehMobile) return;                 // desktop: comportamento normal
        e.preventDefault();

        var voltou = false;
        var marcarVolta = function () { voltou = true; };
        document.addEventListener('visibilitychange', marcarVolta, { once: true });
        window.addEventListener('pagehide', marcarVolta, { once: true });

        window.location.href = 'instagram://user?username=' + user;

        setTimeout(function () {
          document.removeEventListener('visibilitychange', marcarVolta);
          if (!voltou && !document.hidden) abrir(web);
        }, 900);
      });
    });
  }

  /* ------------------------------- 4. Cabeçalho, menu e scrollspy -------- */
  function ligarCabecalho() {
    var header = $('[data-header]');
    if (header) {
      var aoRolar = function () {
        header.classList.toggle('is-stuck', window.scrollY > 24);
      };
      aoRolar();
      window.addEventListener('scroll', aoRolar, { passive: true });
    }

    var burger = $('[data-burger]');
    var drawer = $('[data-drawer]');
    if (!burger || !drawer) return;

    drawer.removeAttribute('hidden');

    var alternar = function (abrirMenu) {
      burger.setAttribute('aria-expanded', String(abrirMenu));
      burger.setAttribute('aria-label', abrirMenu ? 'Fechar menu' : 'Abrir menu');
      drawer.classList.toggle('is-open', abrirMenu);
      document.body.classList.toggle('menu-aberto', abrirMenu);
      document.body.style.overflow = abrirMenu ? 'hidden' : '';
    };

    burger.addEventListener('click', function () {
      alternar(burger.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () { alternar(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) alternar(false);
    });
  }

  function ligarScrollspy() {
    var links = $$('[data-spy-nav] .nav__link');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var mapa = {};
    var alvos = [];
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) { mapa[id] = a; alvos.push(sec); }
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var ativo = mapa[e.target.id];
        if (ativo) ativo.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    alvos.forEach(function (s) { io.observe(s); });
  }

  /* ----------------------------------- 5. Animações de entrada ----------- */
  function ligarReveal() {
    var itens = $$('.reveal');
    if (reduzMovimento || !('IntersectionObserver' in window)) {
      itens.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    itens.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------- 6. Contadores animados --------- */
  function montarContadores() {
    var alvo = $('[data-counters]');
    if (!alvo) return;
    var dados = CFG.indicadores || [];

    alvo.innerHTML = dados.map(function (d) {
      return '<div class="counter">' +
               '<p class="counter__value" data-count="' + d.valor + '">' +
                 (d.prefixo ? '<span class="unit">' + d.prefixo + '</span>' : '') +
                 '<span data-count-num>0</span>' +
                 (d.sufixo ? '<span class="unit">' + d.sufixo + '</span>' : '') +
               '</p>' +
               '<p class="counter__label">' + d.rotulo + '</p>' +
             '</div>';
    }).join('');

    var valores = $$('[data-count]', alvo);

    var animar = function (el) {
      var destino = parseFloat(el.getAttribute('data-count')) || 0;
      var saida = $('[data-count-num]', el);
      if (reduzMovimento) { saida.textContent = destino.toLocaleString('pt-BR'); return; }

      var dur = 1600, inicio = null;
      var passo = function (t) {
        if (inicio === null) inicio = t;
        var p = Math.min((t - inicio) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 4);            // easeOutQuart
        saida.textContent = Math.round(destino * eased).toLocaleString('pt-BR');
        if (p < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    };

    if (!('IntersectionObserver' in window)) { valores.forEach(animar); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        animar(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: .5 });
    valores.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------- 7. Barras de avaliação ------------- */
  function ligarBarras() {
    var bloco = $('[data-bars]');
    if (!bloco) return;
    var preencher = function () {
      $$('[data-fill]', bloco).forEach(function (el) {
        el.style.width = el.getAttribute('data-fill') + '%';
      });
    };
    if (!('IntersectionObserver' in window)) { preencher(); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        preencher();
        obs.unobserve(e.target);
      });
    }, { threshold: .4 });
    io.observe(bloco);
  }

  /* --------------------------- 8. Portfólio: filtros e lightbox ---------- */
  function ligarPortfolio() {
    var galeria = $('[data-gallery]');
    var lb = $('[data-lightbox]');
    if (!galeria) return;

    var todos = $$('.shot', galeria);
    var visiveis = todos.slice();

    /* filtros */
    $$('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        $$('[data-filter]').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        visiveis = todos.filter(function (shot) {
          var mostra = (cat === 'todas' || shot.getAttribute('data-cat') === cat);
          shot.classList.toggle('is-hidden', !mostra);
          return mostra;
        });
      });
    });

    if (!lb) return;
    lb.removeAttribute('hidden');

    var img     = $('[data-lb-img]', lb);
    var titulo  = $('[data-lb-title]', lb);
    var tag     = $('[data-lb-tag]', lb);
    var conta   = $('[data-lb-count]', lb);
    var waBtn   = $('[data-lb-wa]', lb);
    var atual   = 0;
    var ultimoFoco = null;

    function mostrar(i) {
      if (!visiveis.length) return;
      atual = (i + visiveis.length) % visiveis.length;
      var shot = visiveis[atual];
      var t = shot.getAttribute('data-title');

      img.classList.remove('is-ready');
      var pronta = new Image();
      pronta.onload = function () {
        img.src = pronta.src;
        img.alt = $('img', shot) ? $('img', shot).alt : t;
        img.classList.add('is-ready');
      };
      pronta.src = shot.getAttribute('data-full');

      titulo.textContent = t;
      tag.textContent = shot.getAttribute('data-tag');
      conta.textContent = (atual + 1) + ' / ' + visiveis.length;
      if (waBtn) waBtn.setAttribute('href', linkWhats('uma obra como “' + t + '”'));
    }

    function abrirLb(i) {
      ultimoFoco = document.activeElement;
      mostrar(i);
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      $('[data-lb-close]', lb).focus();
    }

    function fecharLb() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      if (ultimoFoco) ultimoFoco.focus();
    }

    todos.forEach(function (shot) {
      shot.addEventListener('click', function () {
        var i = visiveis.indexOf(shot);
        abrirLb(i < 0 ? 0 : i);
      });
    });

    $('[data-lb-close]', lb).addEventListener('click', fecharLb);
    $('[data-lb-prev]', lb).addEventListener('click', function () { mostrar(atual - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { mostrar(atual + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) fecharLb(); });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape')     fecharLb();
      if (e.key === 'ArrowLeft')  mostrar(atual - 1);
      if (e.key === 'ArrowRight') mostrar(atual + 1);
      if (e.key === 'Tab') {                                  // prende o foco
        var foco = $$('button, a[href]', lb).filter(function (el) { return el.offsetParent !== null; });
        if (!foco.length) return;
        var primeiro = foco[0], ultimo = foco[foco.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
      }
    });

    /* arrastar para trocar de imagem no celular */
    var x0 = null;
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 55) mostrar(atual + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  /* --------------------------------- 9. Formulário de contato ------------ */
  function ligarFormulario() {
    var form = $('[data-form]');
    if (!form) return;

    var status = $('[data-form-status]', form);
    var tel = $('#f-tel', form);

    /* máscara simples de telefone brasileiro */
    if (tel) {
      tel.addEventListener('input', function () {
        var d = tel.value.replace(/\D/g, '').slice(0, 11);
        if (d.length <= 2)       tel.value = d.replace(/^(\d{0,2})/, '($1');
        else if (d.length <= 6)  tel.value = d.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
        else if (d.length <= 10) tel.value = d.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        else                     tel.value = d.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      });
    }

    function erro(campo, texto) {
      var wrap = campo.closest('.field');
      wrap.classList.toggle('is-invalid', !!texto);
      var alvo = $('[data-error-for="' + campo.id + '"]', wrap);
      if (alvo) alvo.textContent = texto || '';
      return !texto;
    }

    function validar() {
      var ok = true;
      var nome = $('#f-nome', form);
      var msg  = $('#f-msg', form);

      ok = erro(nome, nome.value.trim().length < 2 ? 'Informe o seu nome.' : '') && ok;
      ok = erro(tel, tel.value.replace(/\D/g, '').length < 10
                     ? 'Informe um WhatsApp com DDD.' : '') && ok;
      ok = erro(msg, msg.value.trim().length < 10
                     ? 'Descreva a obra em pelo menos uma frase.' : '') && ok;
      return ok;
    }

    /* Monta a mensagem formatada com os dados preenchidos.
       markdown = true usa os asteriscos do WhatsApp. */
    function montarMensagem(markdown) {
      var n = function (t) { return markdown ? '*' + t + ':*' : t + ':'; };
      var dados = [
        [n('Nome'),            $('#f-nome', form).value.trim()],
        [n('WhatsApp'),        tel.value.trim()],
        [n('Serviço'),         $('#f-servico', form).value],
        [n('Cidade da obra'),  $('#f-cidade', form).value.trim() || 'não informada'],
        [n('Sobre a obra'),    $('#f-msg', form).value.trim()]
      ];
      var cabecalho = markdown
        ? (MSG.formularioTitulo || 'Solicitação de orçamento')
        : (MSG.formularioTitulo || 'Solicitação de orçamento').replace(/\*/g, '');
      return cabecalho + '\n\n' + dados.map(function (d) { return d[0] + ' ' + d[1]; }).join('\n');
    }

    function avisar(texto, ok) {
      if (!status) return;
      status.textContent = texto;
      status.classList.add('is-visible');
      status.classList.toggle('is-ok', !!ok);
    }

    function enviar(canal) {
      if (!validar()) {
        avisar('Confira os campos destacados antes de enviar.', false);
        return;
      }
      if (canal === 'email') {
        var assunto = 'Orçamento pelo site — ' + $('#f-servico', form).value;
        abrir('mailto:' + (CONTATO.email || '') +
              '?subject=' + encodeURIComponent(assunto) +
              '&body=' + encodeURIComponent(montarMensagem(false)));
        avisar('Abrimos o seu programa de e-mail com a mensagem pronta.', true);
      } else {
        abrir('https://wa.me/' + (CONTATO.whatsapp || '') +
              '?text=' + encodeURIComponent(montarMensagem(true)));
        avisar('Abrimos o WhatsApp com a mensagem pronta. É só enviar.', true);
      }
    }

    form.addEventListener('submit', function (e) { e.preventDefault(); enviar('whatsapp'); });
    var btnEmail = $('[data-send="email"]', form);
    if (btnEmail) btnEmail.addEventListener('click', function () { enviar('email'); });
  }

  /* ------------------------------------ 10. Mapa e rota por GPS ---------- */
  function ligarMapa() {
    var slot = $('[data-map-slot]');
    if (!slot) return;
    var skeleton = $('[data-map-skeleton]');

    // O mapa é montado a partir do endereço em site.config.js. O atributo
    // data-map-src do HTML é só a reserva para quem estiver sem JavaScript.
    var busca = END.busca || '';
    var src = busca
      ? 'https://www.google.com/maps?q=' + encodeURIComponent(busca) +
        '&hl=pt-BR&z=16&output=embed'
      : slot.getAttribute('data-map-src');

    var carregar = function () {
      if (slot.dataset.carregado) return;
      slot.dataset.carregado = '1';
      var iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = 'Mapa com a localização da Carfer Engenharia em Itaipava, Petrópolis';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');

      var carregou = false;
      iframe.addEventListener('load', function () {
        carregou = true;
        iframe.classList.add('is-ready');
        if (skeleton) skeleton.remove();
      });

      // Se o mapa não abrir (bloqueio, rede fora), oferece o link direto.
      setTimeout(function () {
        if (carregou || !skeleton) return;
        skeleton.innerHTML =
          '<strong style="font-size:.95rem">Mapa indisponível nesta visualização</strong>' +
          '<span style="max-width:32ch;text-align:center;line-height:1.5">' +
          (END.logradouro || '') + '<br>' +
          (END.bairro || '') + ', ' + (END.cidade || '') + ' — ' + (END.uf || '') +
          '</span>' +
          '<a href="' + src.replace('&output=embed', '') + '" target="_blank" rel="noopener">' +
          'Abrir no Google Maps</a>';
      }, 9000);

      slot.appendChild(iframe);
    };

    if (!('IntersectionObserver' in window)) { carregar(); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        carregar();
        obs.unobserve(e.target);
      });
    }, { rootMargin: '350px' });
    io.observe(slot);
  }

  function ligarRota() {
    // O endereço por escrito é o destino padrão — o Maps resolve a ficha da
    // empresa com precisão. As coordenadas só entram se estiverem preenchidas.
    var destinoTexto = encodeURIComponent(END.busca || '');
    var destinoGeo = (END.lat && END.lng) ? (END.lat + ',' + END.lng) : '';
    var destino = destinoGeo ? encodeURIComponent(destinoGeo) : destinoTexto;
    var hint = $('[data-route-hint]');

    var appleBtn = $('[data-apple]');
    if (appleBtn && ehIOS) appleBtn.hidden = false;

    function urlRota(app, origem) {
      switch (app) {
        case 'waze':
          // Sem coordenadas o Waze busca pelo texto; com elas, vai direto.
          return 'https://www.waze.com/ul?' +
                 (destinoGeo ? 'll=' + encodeURIComponent(destinoGeo) + '&' : '') +
                 'q=' + destinoTexto + '&navigate=yes';
        case 'apple':
          return 'https://maps.apple.com/?daddr=' + destino +
                 (origem ? '&saddr=' + origem : '') + '&dirflg=d';
        default:
          return 'https://www.google.com/maps/dir/?api=1' +
                 (origem ? '&origin=' + origem : '') +
                 '&destination=' + destino + '&travelmode=driving';
      }
    }

    // App padrão do aparelho: Apple Maps no iOS, Google Maps no resto.
    function appPadrao() { return ehIOS ? 'apple' : 'google'; }

    function traçar(app) {
      var escolhido = app || appPadrao();

      // Sem geolocalização disponível: o próprio app de mapas usa a posição atual.
      if (!navigator.geolocation) { abrir(urlRota(escolhido, '')); return; }

      if (hint) hint.textContent = 'Obtendo a sua localização…';
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          if (hint) hint.textContent = 'Rota traçada a partir da sua localização atual.';
          abrir(urlRota(escolhido, pos.coords.latitude + ',' + pos.coords.longitude));
        },
        function () {
          if (hint) hint.textContent = 'Sem acesso à localização — o app de mapas usará a sua posição atual.';
          abrir(urlRota(escolhido, ''));
        },
        { enableHighAccuracy: false, timeout: 7000, maximumAge: 300000 }
      );
    }

    // Link para a ficha da empresa no Maps, montado a partir da configuração.
    var ficha = $('[data-map-link]');
    if (ficha && END.busca) {
      ficha.setAttribute('href',
        'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(END.busca));
    }

    var principal = $('[data-route]');
    if (principal) principal.addEventListener('click', function () { traçar(null); });

    $$('[data-route-app]').forEach(function (btn) {
      btn.addEventListener('click', function () { traçar(btn.getAttribute('data-route-app')); });
    });

    var noRodape = $('[data-route-footer]');
    if (noRodape) {
      noRodape.addEventListener('click', function (e) {
        e.preventDefault();
        var alvo = $('#contato');
        if (alvo) alvo.scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth' });
        setTimeout(function () { traçar(null); }, reduzMovimento ? 0 : 700);
      });
    }
  }

  /* ------------------------- 11. Rodapé e voltar ao topo ----------------- */
  function ligarDiversos() {
    var ano = $('[data-year]');
    if (ano) ano.textContent = new Date().getFullYear();

    // Telefone vindo da configuração
    if (CONTATO.telefoneLink) {
      $$('a[href^="tel:"]').forEach(function (a) { a.setAttribute('href', 'tel:' + CONTATO.telefoneLink); });
    }
    if (CONTATO.telefoneVisivel) {
      $$('[data-phone-link]').forEach(function (a) { a.textContent = CONTATO.telefoneVisivel; });
    }

    var topo = $('[data-to-top]');
    if (topo) {
      var aoRolar = function () {
        topo.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9);
      };
      aoRolar();
      window.addEventListener('scroll', aoRolar, { passive: true });
      topo.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduzMovimento ? 'auto' : 'smooth' });
      });
    }

    // Em telas de toque não há hover: o tooltip aparece por alguns segundos.
    if (ehTouch && dockTip) {
      setTimeout(function () { dockTip.style.opacity = '1'; }, 2200);
      setTimeout(function () { dockTip.style.opacity = ''; }, 7000);
    }
  }

  /* ---------------------------------------------------- inicialização ---- */
  function iniciar() {
    aplicarLinksWhats();
    atualizarDock();
    observarContextos();
    vincularCardsAoDock();
    ligarInstagram();
    ligarCabecalho();
    ligarScrollspy();
    ligarReveal();
    montarContadores();
    ligarBarras();
    ligarPortfolio();
    ligarFormulario();
    ligarMapa();
    ligarRota();
    ligarDiversos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
