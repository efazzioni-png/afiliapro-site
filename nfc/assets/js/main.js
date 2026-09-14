/* ==========================================================================
   NFC — comportamento do site
   --------------------------------------------------------------------------
   Sem dependência externa. Tudo o que é conteúdo variável vem de
   window.SITE_NFC (site.config.js).

   Blocos
     1. Utilitários
     2. Cabeçalho, menu e seção ativa
     3. Animações de entrada
     4. Galeria e lightbox
     5. Contato, redes e links de WhatsApp
     6. Voltar ao topo e ano do rodapé
   ========================================================================== */
(function () {
  'use strict';

  var CFG     = window.SITE_NFC || {};
  var CONTATO = CFG.contato || {};
  var REDES   = CFG.redes || {};
  var MSG     = CFG.mensagens || {};

  /* ------------------------------------------------ 1. Utilitários -------- */
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function remover(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  /* ------------------------------- 2. Cabeçalho, menu e seção ativa ------- */
  var cabecalho = $('[data-cabecalho]');
  var navegacao = $('[data-navegacao]');
  var menuBotao = $('[data-menu]');

  function fecharMenu() {
    if (!navegacao || !menuBotao) return;
    navegacao.classList.remove('aberto');
    menuBotao.setAttribute('aria-expanded', 'false');
  }

  if (menuBotao && navegacao) {
    menuBotao.addEventListener('click', function () {
      var aberto = navegacao.classList.toggle('aberto');
      menuBotao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
    // Clicar num item, apertar Esc ou tocar fora fecha o menu.
    $$('a', navegacao).forEach(function (a) { a.addEventListener('click', fecharMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharMenu(); });
    document.addEventListener('click', function (e) {
      if (!navegacao.classList.contains('aberto')) return;
      if (navegacao.contains(e.target) || menuBotao.contains(e.target)) return;
      fecharMenu();
    });
  }

  var aoTopo = $('[data-ao-topo]');

  function aoRolar() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (cabecalho) cabecalho.classList.toggle('solido', y > 12);
    if (aoTopo) aoTopo.classList.toggle('visivel', y > 620);
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  // Marca no menu a seção que está na tela.
  (function seçãoAtiva() {
    var links = $$('[data-navegacao] a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var porId = {};
    links.forEach(function (a) { porId[a.getAttribute('href').slice(1)] = a; });

    var secoes = Object.keys(porId)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var visiveis = {};
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        visiveis[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
      });
      var melhor = '', maior = 0;
      Object.keys(visiveis).forEach(function (id) {
        if (visiveis[id] > maior) { maior = visiveis[id]; melhor = id; }
      });
      links.forEach(function (a) {
        a.classList.toggle('ativo', a.getAttribute('href') === '#' + melhor);
      });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .25, .5, .75, 1] });

    secoes.forEach(function (s) { io.observe(s); });
  })();

  /* ------------------------------------------ 3. Animações de entrada ----- */
  (function revelar() {
    var alvos = $$('.revelar');
    if (!alvos.length) return;

    if (semMovimento || !('IntersectionObserver' in window)) {
      alvos.forEach(function (el) { el.classList.add('visivel'); });
      return;
    }

    // Elementos irmãos entram em cascata, não todos de uma vez.
    $$('[data-cascata]').forEach(function (grupo) {
      $$('.revelar', grupo).forEach(function (el, i) {
        el.style.setProperty('--atraso', Math.min(i * 80, 480) + 'ms');
      });
    });

    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visivel');
        io.unobserve(e.target);            // anima uma vez só
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    alvos.forEach(function (el) { io.observe(el); });
  })();

  /* --------------------------------------------- 4. Galeria e lightbox ---- */
  (function galeria() {
    var caixa = $('[data-lightbox]');
    var figuras = $$('[data-formato]');
    if (!caixa || !figuras.length) return;

    var imagem  = $('[data-lightbox-img]', caixa);
    var titulo  = $('[data-lightbox-titulo]', caixa);
    var legenda = $('[data-lightbox-texto]', caixa);
    var fechar  = $('[data-lightbox-fechar]', caixa);
    var suporta = typeof caixa.showModal === 'function';

    function abrir(fig) {
      if (!suporta) return;                // navegador antigo: a figura já está na página
      var img = $('img', fig);
      imagem.src = img.getAttribute('src');
      imagem.alt = img.getAttribute('alt') || '';
      titulo.textContent  = (fig.getAttribute('data-nome') || '').trim();
      legenda.textContent = (fig.getAttribute('data-uso') || '').trim();
      caixa.showModal();
    }

    figuras.forEach(function (fig) {
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      fig.addEventListener('click', function () { abrir(fig); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(fig); }
      });
    });

    if (fechar) fechar.addEventListener('click', function () { caixa.close(); });
    // Clique no fundo escuro fecha.
    caixa.addEventListener('click', function (e) { if (e.target === caixa) caixa.close(); });
  })();

  /* ------------------------------ 5. Contato, redes e links de WhatsApp --- */
  function textoWhats(assunto) {
    if (!assunto) return MSG.padrao || 'Olá! Gostaria de mais informações sobre NFC.';
    return (MSG.comAssunto || 'Olá! Gostaria de falar sobre {assunto}.').replace('{assunto}', assunto);
  }

  (function contatos() {
    // WhatsApp: sem número configurado, o botão vira link de e-mail.
    var zap = (CONTATO.whatsapp || '').replace(/\D/g, '');
    $$('[data-wa]').forEach(function (el) {
      var assunto = el.getAttribute('data-wa-assunto');
      if (zap) {
        el.setAttribute('href', 'https://wa.me/' + zap + '?text=' + encodeURIComponent(textoWhats(assunto)));
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      } else if (CONTATO.email) {
        el.setAttribute('href', 'mailto:' + CONTATO.email + '?subject=' + encodeURIComponent('Dúvida sobre NFC'));
      } else {
        el.setAttribute('href', '#assistente');
      }
    });

    var email = $('[data-contato="email"]');
    if (email) {
      if (CONTATO.email) {
        email.setAttribute('href', 'mailto:' + CONTATO.email);
        email.textContent = CONTATO.email;
      } else { remover(email.closest('li') || email); }
    }

    var tel = $('[data-contato="telefone"]');
    if (tel) {
      if (CONTATO.telefoneVisivel) {
        tel.setAttribute('href', 'tel:' + (CONTATO.telefoneLink || CONTATO.telefoneVisivel).replace(/[^\d+]/g, ''));
        tel.textContent = CONTATO.telefoneVisivel;
      } else { remover(tel.closest('li') || tel); }
    }

    var zapLinha = $('[data-contato="whatsapp"]');
    if (zapLinha && !zap) remover(zapLinha.closest('li') || zapLinha);

    var horario = $('[data-contato="horario"]');
    if (horario) {
      if (CONTATO.horario) horario.textContent = CONTATO.horario;
      else remover(horario.closest('li') || horario);
    }

    // Redes sociais: some o ícone de quem não tem perfil configurado.
    var enderecos = {
      instagram: 'https://instagram.com/',
      linkedin:  'https://linkedin.com/company/',
      youtube:   'https://youtube.com/@',
      tiktok:    'https://tiktok.com/@'
    };
    $$('[data-rede]').forEach(function (el) {
      var nome = el.getAttribute('data-rede');
      var usuario = (REDES[nome] || '').replace(/^@/, '').trim();
      if (!usuario) { remover(el); return; }
      el.setAttribute('href', enderecos[nome] + usuario);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });

    var redes = $('[data-redes]');
    if (redes && !$$('[data-rede]', redes).length) remover(redes);
  })();

  /* --------------------------- 6. Voltar ao topo e ano do rodapé ---------- */
  if (aoTopo) {
    aoTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: semMovimento ? 'auto' : 'smooth' });
    });
  }

  var ano = $('[data-ano]');
  if (ano) ano.textContent = new Date().getFullYear();
})();
