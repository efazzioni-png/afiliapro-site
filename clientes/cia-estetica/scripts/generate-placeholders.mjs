/**
 * Gerador de imagens-placeholder da Cia Estética.
 * Composições abstratas de direção de arte (sem texto), renderizadas com sharp.
 * Ver README: devem ser substituídas pelas fotos oficiais da escola.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const ROOT = '/home/user/afiliapro-site/clientes/cia-estetica/public';

const PALETTES = {
  cream:     { a: '#FAF8F5', b: '#EFE9DE', orb: '#C6A56B', line: '#B08F52', ink: '#151515' },
  creamWarm: { a: '#F8F4EC', b: '#E8DECD', orb: '#C6A56B', line: '#A8854A', ink: '#151515' },
  creamCool: { a: '#F7F6F3', b: '#E6E4DE', orb: '#C6A56B', line: '#9C9384', ink: '#151515' },
  ink:       { a: '#1A1A1A', b: '#0D0D0D', orb: '#C6A56B', line: '#C6A56B', ink: '#F8F6F2' },
  inkWarm:   { a: '#221D17', b: '#100D0A', orb: '#DCC79B', line: '#C6A56B', ink: '#F8F6F2' },
};

/** Anéis concêntricos finos — evocam precisão, luz e técnica. */
const rings = (cx, cy, count, step, stroke, opacity) =>
  Array.from({ length: count }, (_, i) =>
    `<circle cx="${cx}" cy="${cy}" r="${step * (i + 1)}" fill="none" stroke="${stroke}" stroke-width="1" opacity="${(opacity * (1 - i / (count * 1.35))).toFixed(3)}"/>`,
  ).join('');

/** Arco aberto, como um traço editorial. */
const arc = (cx, cy, r, stroke, width, opacity, rotate) =>
  `<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="${stroke}" stroke-width="${width}" opacity="${opacity}" stroke-linecap="round" transform="rotate(${rotate} ${cx} ${cy})"/>`;

function svg({ w, h, palette, variant }) {
  const p = PALETTES[palette];
  const dark = palette.startsWith('ink');
  const m = Math.min(w, h);

  // Cada variante reposiciona os mesmos elementos, mantendo uma linguagem
  // visual única em todo o site com composições diferentes por imagem.
  const layouts = [
    { bx: 0.86, by: 0.14, br: 0.60, rx: 0.26, ry: 0.72, rn: 10, rs: 0.070, dx: 0.20, dy: 0.30, dr: 0.10, arot: -22 },
    { bx: 0.14, by: 0.84, br: 0.56, rx: 0.74, ry: 0.30, rn: 12, rs: 0.058, dx: 0.80, dy: 0.74, dr: 0.08, arot: 150 },
    { bx: 0.50, by: -0.04, br: 0.66, rx: 0.46, ry: 0.70, rn: 13, rs: 0.062, dx: 0.78, dy: 0.22, dr: 0.09, arot: 16 },
    { bx: 0.06, by: 0.24, br: 0.54, rx: 0.70, ry: 0.66, rn: 9, rs: 0.078, dx: 0.30, dy: 0.80, dr: 0.11, arot: -96 },
    { bx: 0.92, by: 0.76, br: 0.58, rx: 0.28, ry: 0.30, rn: 11, rs: 0.064, dx: 0.66, dy: 0.14, dr: 0.085, arot: 62 },
  ];
  const L = layouts[variant % layouts.length];

  // Cor da forma em bloco: escura sobre creme, clara sobre preto.
  const blockFill = dark ? p.ink : p.ink;
  const blockOpacity = dark ? 0.0 : 0.93;
  const lightBlock = dark ? 0.06 : 0.0;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stop-color="${p.a}"/>
      <stop offset="100%" stop-color="${p.b}"/>
    </linearGradient>
    <linearGradient id="blockGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${dark ? p.ink : '#1E1E1E'}"/>
      <stop offset="100%" stop-color="${dark ? p.ink : '#0C0C0C'}"/>
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0%" stop-color="${p.orb}" stop-opacity="${dark ? 0.55 : 0.45}"/>
      <stop offset="60%" stop-color="${p.orb}" stop-opacity="${dark ? 0.14 : 0.12}"/>
      <stop offset="100%" stop-color="${p.orb}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="frame"><rect width="${w}" height="${h}"/></clipPath>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg)"/>

  <g clip-path="url(#frame)">
    <!-- brilho champagne de fundo -->
    <circle cx="${w * L.rx}" cy="${h * L.ry}" r="${m * 0.78}" fill="url(#glow)"/>

    <!-- forma em bloco: o peso visual da composição -->
    <circle cx="${w * L.bx}" cy="${h * L.by}" r="${m * L.br}"
            fill="url(#blockGrad)" opacity="${blockOpacity}"/>
    <circle cx="${w * L.bx}" cy="${h * L.by}" r="${m * L.br}"
            fill="${p.a}" opacity="${lightBlock}"/>

    <!-- anéis concêntricos atravessando a composição -->
    <g>${rings(w * L.rx, h * L.ry, L.rn, m * L.rs, p.orb, dark ? 0.72 : 0.6)}</g>

    <!-- disco sólido champagne -->
    <circle cx="${w * L.dx}" cy="${h * L.dy}" r="${m * L.dr}" fill="${p.orb}" opacity="0.9"/>

    <!-- traços arqueados -->
    ${arc(w * L.rx, h * L.ry, m * 0.46, p.orb, 2, dark ? 0.8 : 0.7, L.arot)}
    ${arc(w * L.bx, h * L.by, m * 0.34, p.orb, 1.2, 0.5, L.arot + 130)}

    <!-- linha vertical fina, ritmo editorial -->
    <line x1="${w * 0.5}" y1="0" x2="${w * 0.5}" y2="${h}"
          stroke="${p.orb}" stroke-width="1" opacity="${dark ? 0.22 : 0.18}"/>
  </g>

  <!-- moldura interna -->
  <rect x="${m * 0.05}" y="${m * 0.05}" width="${w - m * 0.1}" height="${h - m * 0.1}"
        fill="none" stroke="${p.orb}" stroke-width="1" opacity="0.45"/>

  <!-- textura de papel -->
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="${dark ? 0.1 : 0.08}"/>
</svg>`;
}

const IMAGES = [
  { file: 'images/hero-cia-estetica.jpg',                  w: 1200, h: 1500, palette: 'creamWarm', variant: 0 },
  { file: 'images/cursos/remocao-de-tatuagem-a-laser.jpg',  w: 1200, h: 900,  palette: 'ink',       variant: 2 },
  { file: 'images/cursos/despigmentacao.jpg',               w: 1200, h: 900,  palette: 'creamCool', variant: 1 },
  { file: 'images/cursos/micropigmentacao.jpg',             w: 1200, h: 900,  palette: 'creamWarm', variant: 4 },
  { file: 'images/cursos/depilacao.jpg',                    w: 1200, h: 900,  palette: 'cream',     variant: 3 },
  { file: 'images/cursos/estetica-avancada.jpg',            w: 1200, h: 900,  palette: 'inkWarm',   variant: 0 },
  { file: 'images/cursos/tecnologias-esteticas.jpg',        w: 1200, h: 900,  palette: 'ink',       variant: 1 },
  { file: 'images/sobre/escola-cia-estetica.jpg',           w: 1000, h: 1250, palette: 'creamWarm', variant: 2 },
  { file: 'images/sobre/equipe-cia-estetica.jpg',           w: 1200, h: 800,  palette: 'creamCool', variant: 4 },
  { file: 'images/blog/como-comecar-estetica.jpg',          w: 1280, h: 800,  palette: 'cream',     variant: 1 },
  { file: 'images/blog/curso-remocao-tatuagem.jpg',         w: 1280, h: 800,  palette: 'inkWarm',   variant: 3 },
  { file: 'images/blog/areas-que-crescem.jpg',              w: 1280, h: 800,  palette: 'creamWarm', variant: 0 },
  { file: 'images/blog/como-escolher-curso.jpg',            w: 1280, h: 800,  palette: 'creamCool', variant: 2 },
  { file: 'images/blog/micropigmentacao-comecar.jpg',       w: 1280, h: 800,  palette: 'cream',     variant: 4 },
];

for (const spec of IMAGES) {
  const out = join(ROOT, spec.file);
  await mkdir(dirname(out), { recursive: true });
  await sharp(Buffer.from(svg(spec)))
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(out);
  console.log('✓', spec.file);
}

/* ==========================================================================
   IMAGEM OPEN GRAPH (1200x630)
   Esta é a única imagem gerada com texto — é a miniatura que aparece quando o
   site é compartilhado no WhatsApp, Instagram, Facebook e Google.
   As famílias de fonte têm fallback, então funciona mesmo sem Playfair/Inter
   instaladas no sistema.
   ========================================================================== */
const SERIF = 'Playfair Display, DejaVu Serif, Georgia, serif';
const SANS = 'Inter, DejaVu Sans, Helvetica, Arial, sans-serif';

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1C1A17"/>
      <stop offset="100%" stop-color="#0C0C0C"/>
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0%" stop-color="#C6A56B" stop-opacity="0.4"/>
      <stop offset="65%" stop-color="#C6A56B" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="#C6A56B" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="c"><rect width="1200" height="630"/></clipPath>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <g clip-path="url(#c)">
    <circle cx="1010" cy="150" r="470" fill="url(#glow)"/>
    ${rings(1010, 150, 11, 46, '#C6A56B', 0.5)}
    <circle cx="1118" cy="512" r="54" fill="#C6A56B" opacity="0.9"/>
    <path d="M 640 150 A 370 370 0 0 1 1380 150" fill="none" stroke="#C6A56B"
          stroke-width="1.6" opacity="0.55" transform="rotate(-20 1010 150)"/>
  </g>

  <!-- marca -->
  <text x="86" y="268" fill="#F8F6F2" font-family="${SERIF}" font-size="92" font-weight="500"
        letter-spacing="-1">Cia<tspan fill="#C6A56B">.</tspan>Estética</text>

  <text x="90" y="316" fill="#9A958D" font-family="${SANS}" font-size="18" font-weight="500"
        letter-spacing="8.5">BELEZA PROFISSIONAL</text>

  <line x1="86" y1="368" x2="330" y2="368" stroke="#C6A56B" stroke-width="1.5" opacity="0.8"/>

  <text x="86" y="428" fill="#F8F6F2" font-family="${SANS}" font-size="27" font-weight="500">
    Escola de profissionais de beleza
  </text>
  <text x="86" y="470" fill="#9A958D" font-family="${SANS}" font-size="23">
    Barra da Tijuca · Rio de Janeiro
  </text>

  <!-- prova social -->
  <g transform="translate(86, 528)">
    ${Array.from({ length: 5 }, (_, i) =>
      `<path transform="translate(${i * 27}, 0) scale(0.95)" fill="#C6A56B"
             d="M11 0.6l2.72 5.53 6.1.89-4.41 4.3 1.04 6.07L11 14.52l-5.45 2.87 1.04-6.07L2.18 7.02l6.1-.89L11 .6z"/>`,
    ).join('')}
    <text x="158" y="15" fill="#F8F6F2" font-family="${SANS}" font-size="20" font-weight="500">
      4,9 no Google · +500 avaliações
    </text>
  </g>

  <rect width="1200" height="630" filter="url(#grain)" opacity="0.09"/>
</svg>`;

{
  const out = join(ROOT, 'images/og/cia-estetica-og.jpg');
  await mkdir(dirname(out), { recursive: true });
  await sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(out);
  console.log('✓ images/og/cia-estetica-og.jpg');
}
