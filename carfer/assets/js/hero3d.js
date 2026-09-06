/* ==========================================================================
   CARFER ENGENHARIA — cena 3D do topo (Three.js / WebGL)
   --------------------------------------------------------------------------
   Estrutura metálica em wireframe + poeira de canteiro + nível laser que
   sobe pela obra. Rotação automática lenta e parallax suave com o mouse.

   A cena é OPCIONAL: só carrega em telas grandes, com conexão boa e quando
   o usuário não pediu menos movimento. Em qualquer outro caso — inclusive
   se o CDN falhar ou não houver WebGL — a imagem estática do hero permanece.
   ========================================================================== */

// Three.js vem hospedada junto com o site (assets/vendor). O CDN é apenas
// um plano B caso o arquivo local não esteja disponível.
const THREE_LOCAL = '../vendor/three.module.min.js';
const THREE_CDN   = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const hero   = document.querySelector('[data-hero]');
const canvas = document.querySelector('[data-hero-canvas]');

/* --------------------------------------------------------- elegibilidade -- */
function podeRodar3D() {
  if (!hero || !canvas) return false;

  // Respeita quem prefere menos movimento.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  // Celular / tela pequena: fica só a imagem estática.
  if (window.matchMedia('(max-width: 900px)').matches) return false;
  if (window.matchMedia('(hover: none)').matches) return false;

  // Conexão fraca ou economia de dados.
  const con = navigator.connection;
  if (con) {
    if (con.saveData) return false;
    if (/(^|-)2g$/.test(con.effectiveType || '')) return false;
    if (con.effectiveType === '3g') return false;
  }

  // Aparelho com pouca memória.
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;

  // WebGL disponível?
  try {
    const teste = document.createElement('canvas');
    if (!(teste.getContext('webgl2') || teste.getContext('webgl'))) return false;
  } catch (e) { return false; }

  return true;
}

/* ------------------------------------------------------------- geometria -- */
/** Empilha um segmento de reta no array de posições. */
function linha(arr, x1, y1, z1, x2, y2, z2) {
  arr.push(x1, y1, z1, x2, y2, z2);
}

/**
 * Monta uma torre em wireframe: pilares, lajes e alguns contraventamentos.
 * Escreve nos arrays `base` (cinza concreto) e `destaque` (laranja).
 */
function torre(base, destaque, cx, cz, larg, prof, alt, pav, rnd) {
  const hx = larg / 2, hz = prof / 2;
  const passo = alt / pav;

  const cantos = [
    [cx - hx, cz - hz], [cx + hx, cz - hz],
    [cx + hx, cz + hz], [cx - hx, cz + hz]
  ];

  // Pilares
  cantos.forEach(([x, z]) => linha(base, x, 0, z, x, alt, z));

  // Pilar intermediário nas faces largas
  if (larg > 3.2) {
    linha(base, cx, 0, cz - hz, cx, alt, cz - hz);
    linha(base, cx, 0, cz + hz, cx, alt, cz + hz);
  }

  // Lajes / vigas de cada pavimento
  for (let i = 0; i <= pav; i++) {
    const y = i * passo;
    const destino = (i === pav || i % 4 === 0) ? destaque : base;
    for (let c = 0; c < 4; c++) {
      const [x1, z1] = cantos[c];
      const [x2, z2] = cantos[(c + 1) % 4];
      linha(destino, x1, y, z1, x2, y, z2);
    }
  }

  // Contraventamentos em X, esparsos
  for (let i = 0; i < pav; i++) {
    if (rnd() > 0.34) continue;
    const y1 = i * passo, y2 = (i + 1) * passo;
    const face = Math.floor(rnd() * 4);
    const [ax, az] = cantos[face];
    const [bx, bz] = cantos[(face + 1) % 4];
    const destino = rnd() > 0.7 ? destaque : base;
    linha(destino, ax, y1, az, bx, y2, bz);
    linha(destino, bx, y1, bz, ax, y2, az);
  }
}

/** Gerador pseudoaleatório com semente: a cena é sempre a mesma. */
function semente(s) {
  return function () {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/* ------------------------------------------------------------------ cena -- */
async function iniciar() {
  if (!podeRodar3D()) return;

  const comLimite = (url, ms) => Promise.race([
    import(/* webpackIgnore: true */ url),
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))
  ]);

  let THREE;
  try {
    THREE = await comLimite(THREE_LOCAL, 8000);
  } catch (e) {
    try {
      THREE = await comLimite(THREE_CDN, 6000);
    } catch (e2) {
      return;                     // silencioso: a imagem estática continua na tela
    }
  }

  const rnd = semente(20240917);

  const cena = new THREE.Scene();
  cena.fog = new THREE.FogExp2(0x080b10, 0.0118);

  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 400);
  camera.position.set(0, 13, 54);
  camera.lookAt(0, 11, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: window.devicePixelRatio < 2,
    powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x000000, 0);

  /* --- torres ------------------------------------------------------------ */
  const base = [];
  const destaque = [];

  // Um quarteirão: torres altas ao centro, mais baixas nas bordas.
  const lotes = [
    [-26, -14, 7, 7, 30, 10], [-15, -22, 6, 6, 22,  8], [ -4, -16, 8, 7, 44, 14],
    [  8, -24, 6, 6, 26,  9], [ 19, -13, 7, 7, 34, 11], [ 29, -22, 6, 6, 20,  7],
    [-30,   2, 6, 6, 18,  6], [-17,  -4, 7, 6, 27,  9], [ -5,   3, 6, 6, 15,  5],
    [  9,  -3, 7, 7, 38, 12], [ 22,   2, 6, 6, 23,  8], [ 33,  -5, 6, 6, 16,  6],
    [-24,  14, 6, 6, 12,  4], [ -8,  16, 7, 6, 10,  4], [ 14,  15, 6, 6, 13,  5]
  ];

  lotes.forEach(([x, z, w, d, h, p]) => {
    const jitter = (v) => v + (rnd() - 0.5) * 2.2;
    torre(base, destaque, jitter(x), jitter(z), w, d, h * (0.85 + rnd() * 0.3), p, rnd);
  });

  // Malha do terreno (grelha do canteiro)
  const chao = [];
  const meia = 78, espaco = 6.5;
  for (let i = -meia; i <= meia; i += espaco) {
    linha(chao, i, -0.05, -meia, i, -0.05, meia);
    linha(chao, -meia, -0.05, i, meia, -0.05, i);
  }

  function malha(pos, cor, opacidade) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.LineBasicMaterial({
      color: cor, transparent: true, opacity: opacidade, fog: true
    });
    return new THREE.LineSegments(geo, mat);
  }

  const cidade = new THREE.Group();
  cidade.add(malha(base,     0x9fabb8, 0.78));
  cidade.add(malha(destaque, 0xff7c2e, 1.0));
  cidade.add(malha(chao,     0x424c59, 0.36));
  // Deslocada para a direita: o texto do hero ocupa a esquerda.
  cidade.position.x = 7;
  cena.add(cidade);

  /* --- poeira de canteiro ------------------------------------------------ */
  const QTD = 850;
  const pos = new Float32Array(QTD * 3);
  const velocidade = new Float32Array(QTD);
  for (let i = 0; i < QTD; i++) {
    pos[i * 3]     = (rnd() - 0.5) * 140;
    pos[i * 3 + 1] = rnd() * 52;
    pos[i * 3 + 2] = (rnd() - 0.5) * 110;
    velocidade[i]  = 0.6 + rnd() * 1.9;
  }
  const geoPo = new THREE.BufferGeometry();
  geoPo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const poeira = new THREE.Points(geoPo, new THREE.PointsMaterial({
    color: 0xd8a06a,
    size: 0.32,
    transparent: true,
    opacity: 0.62,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: true
  }));
  cena.add(poeira);

  /* --- nível laser: um plano de conferência que sobe pela obra ----------- */
  const laserPos = [];
  const L = 46;
  linha(laserPos, -L, 0, -L,  L, 0, -L);
  linha(laserPos,  L, 0, -L,  L, 0,  L);
  linha(laserPos,  L, 0,  L, -L, 0,  L);
  linha(laserPos, -L, 0,  L, -L, 0, -L);
  const laser = malha(laserPos, 0xff7c2e, 0.5);
  cena.add(laser);

  /* --- interação: parallax com o mouse ----------------------------------- */
  const alvo = { x: 0, y: 0 };
  const suave = { x: 0, y: 0 };

  window.addEventListener('pointermove', (e) => {
    alvo.x = (e.clientX / window.innerWidth - 0.5) * 2;
    alvo.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  /* --- dimensionamento --------------------------------------------------- */
  function redimensionar() {
    const l = hero.clientWidth, a = hero.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(l, a, false);
    camera.aspect = l / a;
    camera.updateProjectionMatrix();
  }
  redimensionar();
  window.addEventListener('resize', redimensionar);

  /* --- laço de animação (pausa fora da tela e em aba oculta) ------------- */
  let visivel = true;
  let rodando = true;
  let quadro = null;

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visivel = entries[0].isIntersecting;
      if (visivel && !quadro) quadro = requestAnimationFrame(animar);
    }, { threshold: 0 }).observe(hero);
  }

  document.addEventListener('visibilitychange', () => {
    rodando = !document.hidden;
    if (rodando && !quadro) quadro = requestAnimationFrame(animar);
  });

  const relogio = new THREE.Clock();

  function animar() {
    quadro = null;
    if (!visivel || !rodando) return;

    const dt = Math.min(relogio.getDelta(), 0.05);
    const t = relogio.getElapsedTime();

    // Rotação automática lenta
    cidade.rotation.y += dt * 0.028;

    // Parallax amortecido
    suave.x += (alvo.x - suave.x) * 0.045;
    suave.y += (alvo.y - suave.y) * 0.045;
    camera.position.x = suave.x * 9;
    camera.position.y = 13 - suave.y * 4.5;
    camera.lookAt(0, 11 + suave.y * 1.5, 0);

    // Poeira subindo devagar
    const p = geoPo.attributes.position.array;
    for (let i = 0; i < QTD; i++) {
      p[i * 3 + 1] += velocidade[i] * dt;
      if (p[i * 3 + 1] > 54) p[i * 3 + 1] = -2;
    }
    geoPo.attributes.position.needsUpdate = true;

    // Nível laser percorrendo a altura da obra
    const ciclo = (t % 11) / 11;
    laser.position.y = ciclo * 46;
    laser.material.opacity = 0.5 * Math.sin(ciclo * Math.PI);
    laser.rotation.y = cidade.rotation.y;

    renderer.render(cena, camera);
    quadro = requestAnimationFrame(animar);
  }

  // Revela a cena por cima da imagem estática
  hero.classList.add('is-3d');
  quadro = requestAnimationFrame(animar);
}

iniciar();
