# -*- coding: utf-8 -*-
"""Gera as ilustrações SVG dos formatos NFC em assets/img (galeria da seção 5).

Uso: python3 gerar-ilustracoes.py

Todas compartilham o mesmo fundo, a mesma paleta e a mesma luz, para a
galeria parecer um conjunto e não seis desenhos avulsos.
"""
import io, os

W, H = 1200, 900
SAIDA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets', 'img')

AZUL, ROXO, CIANO, VERDE = '#4F7BFF', '#A855F7', '#22D3EE', '#34D399'
COBRE, COBRE_ESC = '#E9A87C', '#C4763F'


def cabeca(nome, extra=''):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="{nome}">
<defs>
<linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0A0F26"/><stop offset="55%" stop-color="#121A3A"/><stop offset="100%" stop-color="#0C1230"/></linearGradient>
<radialGradient id="halo" cx="50%" cy="42%" r="62%"><stop offset="0%" stop-color="{AZUL}" stop-opacity="0.34"/><stop offset="60%" stop-color="{ROXO}" stop-opacity="0.13"/><stop offset="100%" stop-color="{ROXO}" stop-opacity="0"/></radialGradient>
<linearGradient id="face" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#26325F"/><stop offset="48%" stop-color="#18224A"/><stop offset="100%" stop-color="#0E1533"/></linearGradient>
<linearGradient id="faceClara" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#F3F5FF"/><stop offset="100%" stop-color="#C9D2F0"/></linearGradient>
<linearGradient id="acento" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{AZUL}"/><stop offset="100%" stop-color="{ROXO}"/></linearGradient>
<linearGradient id="brilhoFace" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.22"/><stop offset="45%" stop-color="#FFFFFF" stop-opacity="0.02"/><stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
<radialGradient id="sombra" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#04060F" stop-opacity="0.66"/><stop offset="100%" stop-color="#04060F" stop-opacity="0"/></radialGradient>
<pattern id="malha" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="1.6" fill="#8FA3E8" opacity="0.13"/></pattern>
{extra}
</defs>
<rect width="{W}" height="{H}" fill="url(#fundo)"/>
<rect width="{W}" height="{H}" fill="url(#halo)"/>
<g opacity="0.5">{malha()}</g>'''


def malha():
    """Grade de pontinhos discreta, o mesmo clima da malha do site."""
    return f'<rect width="{W}" height="{H}" fill="url(#malha)"/>' 


def sombra(cx, cy, rx, ry):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="url(#sombra)"/>'


def espiral(x0, y0, x1, y1, passo, voltas, cor=COBRE, larg=4, op=0.95):
    """Antena em espiral — o que existe de verdade dentro de toda peça NFC."""
    l, t, r, b = x0, y0, x1, y1
    d = [f'M {l:.1f} {t:.1f}']
    for _ in range(voltas):
        if r - l < passo * 2 or b - t < passo * 2:
            break
        d.append(f'L {r:.1f} {t:.1f} L {r:.1f} {b:.1f} L {l:.1f} {b:.1f} L {l:.1f} {t + passo:.1f}')
        l += passo; t += passo; r -= passo; b -= passo
        d.append(f'L {l:.1f} {t:.1f}')
    return (f'<path d="{" ".join(d)}" fill="none" stroke="{cor}" stroke-width="{larg}" '
            f'stroke-linejoin="round" stroke-linecap="round" opacity="{op}"/>')


def marca_nfc(cx, cy, tam, cor='#FFFFFF', op=0.95, larg=None):
    """As três ondinhas do símbolo universal de NFC: arcos concêntricos,
    abertos para a esquerda, saindo de um centro comum."""
    larg = larg or max(2.4, tam * 0.11)
    ox = cx - tam * 0.52          # centro dos arcos, à esquerda do símbolo
    arcos = []
    for i, k in enumerate((0.42, 0.72, 1.02)):
        r = tam * k
        x = ox + r * 0.5          # ponto a 60° do centro
        y = r * 0.866
        arcos.append(f'<path d="M {x:.1f} {cy - y:.1f} A {r:.1f} {r:.1f} 0 0 1 {x:.1f} {cy + y:.1f}" '
                     f'fill="none" stroke="{cor}" stroke-width="{larg:.1f}" stroke-linecap="round" opacity="{op - i*0.14:.2f}"/>')
    return ''.join(arcos)


def ondas(cx, cy, cor=CIANO, n=3, base=46, passo=30, op=0.75, larg=5):
    """Ondas saindo da peça em direção ao celular."""
    a = []
    for i in range(n):
        r = base + i * passo
        a.append(f'<path d="M {cx:.1f} {cy - r*0.72:.1f} A {r:.1f} {r:.1f} 0 0 1 {cx:.1f} {cy + r*0.72:.1f}" '
                 f'fill="none" stroke="{cor}" stroke-width="{larg}" stroke-linecap="round" opacity="{op - i*0.2:.2f}"/>')
    return ''.join(a)


def celular(x, y, larg=190, alt=380, giro=0, tela='#101A3C'):
    """Silhueta de celular, sempre no mesmo estilo."""
    r = larg * 0.13
    return f'''<g transform="translate({x} {y}) rotate({giro})">
  <rect x="{-larg/2}" y="{-alt/2}" width="{larg}" height="{alt}" rx="{r}" fill="#1A2140" stroke="#5C6CA8" stroke-width="3"/>
  <rect x="{-larg/2+8}" y="{-alt/2+8}" width="{larg-16}" height="{alt-16}" rx="{r-5}" fill="{tela}"/>
  <rect x="{-larg*0.16}" y="{-alt/2+16}" width="{larg*0.32}" height="9" rx="4.5" fill="#39436E"/>
  <rect x="{-larg/2+8}" y="{-alt/2+8}" width="{larg-16}" height="{alt-16}" rx="{r-5}" fill="url(#brilhoFace)"/>
</g>'''


def rodape():
    return '<rect width="1200" height="900" fill="none"/></svg>'


def salvar(nome, corpo):
    caminho = os.path.join(SAIDA, nome)
    io.open(caminho, 'w', encoding='utf-8').write(corpo + rodape())
    print('  ', nome, len(corpo) // 1024, 'KB')


# ---------------------------------------------------------------- 1. visita --
def cartao_visita():
    s = [cabeca('Cartão de visita NFC preto sendo aproximado de um celular')]
    s.append(sombra(470, 700, 330, 62))
    s.append(f'''<g transform="translate(470 470) rotate(-13)">
  <rect x="-300" y="-180" width="600" height="360" rx="26" fill="url(#face)" stroke="#5E6FB4" stroke-width="3"/>
  <rect x="-300" y="-180" width="600" height="360" rx="26" fill="url(#brilhoFace)"/>
  <circle cx="-196" cy="-84" r="44" fill="url(#acento)"/>
  <text x="-196" y="-70" font-family="Sora, Inter, sans-serif" font-size="42" font-weight="700" fill="#fff" text-anchor="middle">A</text>
  <rect x="-128" y="-112" width="236" height="20" rx="10" fill="#E7ECFF" opacity="0.92"/>
  <rect x="-128" y="-76" width="150" height="14" rx="7" fill="#8FA0D8" opacity="0.8"/>
  <rect x="-196" y="10" width="330" height="11" rx="5.5" fill="#6B7CB8" opacity="0.62"/>
  <rect x="-196" y="44" width="266" height="11" rx="5.5" fill="#6B7CB8" opacity="0.52"/>
  <rect x="-196" y="78" width="300" height="11" rx="5.5" fill="#6B7CB8" opacity="0.42"/>
  <g transform="translate(206 92)">{marca_nfc(0, 0, 58, '#9FB6FF', 0.95)}</g>
  <rect x="-300" y="132" width="600" height="48" rx="0" fill="url(#acento)" opacity="0.22"/>
</g>''')
    s.append(f'<g opacity="0.95">{ondas(770, 430, CIANO, 3, 52, 34)}</g>')
    s.append(celular(985, 430, 196, 392, 6))
    s.append(f'''<g transform="translate(985 380)">
  <circle cx="0" cy="-58" r="40" fill="url(#acento)" opacity="0.9"/>
  {marca_nfc(2, -58, 40, '#fff', 0.98)}
  <rect x="-62" y="2" width="124" height="14" rx="7" fill="#7E8FD0" opacity="0.75"/>
  <rect x="-44" y="32" width="88" height="11" rx="5.5" fill="#5E6CA8" opacity="0.6"/>
  <rect x="-70" y="74" width="140" height="42" rx="21" fill="url(#acento)"/>
  <text x="0" y="102" font-family="Inter, sans-serif" font-size="19" font-weight="600" fill="#fff" text-anchor="middle">Salvar</text>
</g>''')
    salvar('cartao-visita.svg', ''.join(s))


# ------------------------------------------------------------ 2. fidelidade --
def cartao_fidelidade():
    s = [cabeca('Cartão fidelidade NFC com selos carimbados')]
    s.append(sombra(600, 730, 360, 58))
    s.append(f'''<g transform="translate(600 450) rotate(-4)">
  <rect x="-330" y="-206" width="660" height="412" rx="30" fill="url(#faceClara)" stroke="#FFFFFF" stroke-width="3"/>
  <rect x="-330" y="-206" width="660" height="118" rx="30" fill="url(#acento)"/>
  <rect x="-330" y="-120" width="660" height="32" fill="url(#acento)"/>
  <text x="-286" y="-138" font-family="Sora, Inter, sans-serif" font-size="40" font-weight="700" fill="#fff">CAFÉ AROMA</text>
  <text x="-286" y="-104" font-family="Inter, sans-serif" font-size="22" fill="#E4E9FF" opacity="0.92">Cartão fidelidade</text>
  <g transform="translate(250 -146)">{marca_nfc(0, 0, 52, '#fff', 0.95)}</g>''')
    for i in range(5):
        cx = -250 + i * 125
        cheio = i < 3
        s.append(f'<circle cx="{cx}" cy="-4" r="48" fill="{"url(#acento)" if cheio else "none"}" '
                 f'stroke="{"none" if cheio else "#9AA7CE"}" stroke-width="3" stroke-dasharray="{"0" if cheio else "9 8"}"/>')
        if cheio:
            s.append(f'<path d="M {cx-19} -4 l 13 15 l 26 -30" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>')
        else:
            s.append(f'<text x="{cx}" y="9" font-family="Inter, sans-serif" font-size="26" fill="#98A5CC" text-anchor="middle">{i+1}</text>')
    s.append('''  <text x="-286" y="122" font-family="Inter, sans-serif" font-size="25" fill="#3C4770">Faltam 2 selos para o próximo café</text>
  <rect x="-286" y="146" width="572" height="12" rx="6" fill="#D5DCF2"/>
  <rect x="-286" y="146" width="343" height="12" rx="6" fill="url(#acento)"/>
</g>''')
    s.append(f'<g opacity="0.55">{ondas(600, 200, ROXO, 3, 44, 30, 0.6)}</g>')
    salvar('cartao-fidelidade.svg', ''.join(s))


# ------------------------------------------------------------- 3. adesivos ---
def tags_adesivas():
    s = [cabeca('Tags e adesivos NFC, um deles mostrando a antena interna')]
    # Adesivo grande, translúcido, com a antena à mostra.
    s.append(sombra(410, 640, 230, 42))
    s.append(f'''<g transform="translate(410 430)">
  <circle r="200" fill="#1A2450" stroke="#7385C8" stroke-width="3"/>
  <circle r="200" fill="url(#brilhoFace)"/>
  <circle r="176" fill="none" stroke="#3C4A86" stroke-width="2" stroke-dasharray="5 7"/>
  {espiral(-128, -128, 128, 128, 19, 6, COBRE, 6)}
  <rect x="-34" y="-30" width="68" height="60" rx="9" fill="#1C2550" stroke="{COBRE_ESC}" stroke-width="3"/>
  <rect x="-22" y="-18" width="44" height="36" rx="5" fill="#2A3costume"/>
</g>'''.replace('#2A3costume', '#2C3768'))
    s.append('<text x="410" y="700" font-family="Inter, sans-serif" font-size="26" fill="#93A2D6" text-anchor="middle">antena + chip</text>')
    # Adesivo médio impresso.
    s.append(sombra(830, 560, 150, 30))
    s.append(f'''<g transform="translate(830 400) rotate(9)">
  <circle r="140" fill="url(#acento)"/>
  <circle r="140" fill="url(#brilhoFace)"/>
  <circle r="118" fill="none" stroke="#fff" stroke-width="3" opacity="0.5" stroke-dasharray="6 9"/>
  {marca_nfc(6, -28, 66, '#fff', 0.98)}
  <text x="0" y="66" font-family="Inter, sans-serif" font-size="26" font-weight="600" fill="#fff" text-anchor="middle">APROXIME</text>
</g>''')
    # Adesivo quadrado pequeno.
    s.append(sombra(1000, 710, 120, 26))
    s.append(f'''<g transform="translate(1000 640) rotate(-11)">
  <rect x="-92" y="-92" width="184" height="184" rx="24" fill="#E9EDFB" stroke="#fff" stroke-width="3"/>
  {marca_nfc(4, -10, 54, '#2B3566', 0.9)}
  <text x="0" y="56" font-family="Inter, sans-serif" font-size="21" font-weight="600" fill="#2B3566" text-anchor="middle">NFC TAG</text>
</g>''')
    salvar('tags-adesivos.svg', ''.join(s))


# ------------------------------------------------ 4. chaveiro e pulseira -----
def chaveiro_pulseira():
    s = [cabeca('Chaveiro e pulseira com NFC')]
    # Pulseira de silicone, vista em perspectiva.
    s.append(sombra(760, 690, 280, 48))
    s.append(f'''<g transform="translate(760 450)">
  <ellipse rx="230" ry="150" fill="none" stroke="url(#acento)" stroke-width="66" opacity="0.95"/>
  <ellipse rx="230" ry="150" fill="none" stroke="#FFFFFF" stroke-width="66" opacity="0.07"/>
  <ellipse rx="230" ry="150" fill="none" stroke="#0B1130" stroke-width="2" opacity="0.5"/>
  <g transform="translate(0 -150)">
    <rect x="-84" y="-32" width="168" height="64" rx="16" fill="#101740" stroke="#6C7CC0" stroke-width="3"/>
    {marca_nfc(-34, 0, 34, '#9FB6FF', 0.95)}
    <text x="24" y="9" font-family="Inter, sans-serif" font-size="23" font-weight="600" fill="#C4CFF6" text-anchor="middle">VIP</text>
  </g>
</g>''')
    # Chaveiro em acrílico com argola.
    s.append(sombra(330, 700, 150, 32))
    s.append(f'''<g transform="translate(330 470) rotate(-8)">
  <circle cx="0" cy="-196" r="42" fill="none" stroke="#9AA7D8" stroke-width="11"/>
  <rect x="-16" y="-176" width="32" height="46" rx="8" fill="#8A97C8"/>
  <rect x="-132" y="-148" width="264" height="330" rx="36" fill="url(#face)" stroke="#6070B4" stroke-width="3"/>
  <rect x="-132" y="-148" width="264" height="330" rx="36" fill="url(#brilhoFace)"/>
  <circle cx="0" cy="-104" r="15" fill="#0A1030" stroke="#6070B4" stroke-width="3"/>
  {marca_nfc(6, -6, 72, '#9FB6FF', 0.95)}
  <rect x="-86" y="86" width="172" height="12" rx="6" fill="#6879B8" opacity="0.6"/>
  <rect x="-60" y="116" width="120" height="12" rx="6" fill="#6879B8" opacity="0.42"/>
</g>''')
    s.append(f'<g opacity="0.6">{ondas(545, 330, CIANO, 2, 40, 28, 0.5)}</g>')
    salvar('chaveiro-pulseira.svg', ''.join(s))


# --------------------------------------------------- 5. placa e display ------
def placa_display():
    s = [cabeca('Display de mesa com NFC para avaliação')]
    # Balcão.
    s.append('<rect x="0" y="690" width="1200" height="210" fill="#0A1030" opacity="0.75"/>')
    s.append('<rect x="0" y="686" width="1200" height="6" fill="#4B5A9C" opacity="0.5"/>')
    s.append(sombra(600, 700, 330, 40))
    # Suporte de acrílico inclinado.
    s.append(f'''<g transform="translate(600 430)">
  <path d="M -250 250 L -186 -250 L 186 -250 L 250 250 Z" fill="#0E1638" opacity="0.55"/>
  <g transform="skewY(-3)">
    <rect x="-228" y="-262" width="456" height="524" rx="26" fill="url(#face)" stroke="#6272BC" stroke-width="3"/>
    <rect x="-228" y="-262" width="456" height="524" rx="26" fill="url(#brilhoFace)"/>
    <circle cx="0" cy="-118" r="86" fill="url(#acento)" opacity="0.18"/>
    {marca_nfc(10, -118, 92, '#A9BDFF', 0.98)}
    <text x="0" y="36" font-family="Sora, Inter, sans-serif" font-size="46" font-weight="700" fill="#F0F4FF" text-anchor="middle">AVALIE</text>
    <text x="0" y="82" font-family="Sora, Inter, sans-serif" font-size="46" font-weight="700" fill="#F0F4FF" text-anchor="middle">A GENTE</text>
    <text x="0" y="132" font-family="Inter, sans-serif" font-size="25" fill="#94A3D8" text-anchor="middle">aproxime o celular</text>
    <g transform="translate(0 196)">''')
    for i in range(5):
        s.append(f'<path transform="translate({-130 + i*65} 0) scale(1.5)" d="M 0 -14 L 4.2 -4.6 L 14.4 -3.4 L 6.9 3.6 L 8.9 13.6 L 0 8.7 L -8.9 13.6 L -6.9 3.6 L -14.4 -3.4 L -4.2 -4.6 Z" fill="#FFC44D"/>')
    s.append('''</g>
  </g>
</g>''')
    s.append('<g transform="translate(600 1388) scale(1 -0.34)" opacity="0.16">'
             '<rect x="-228" y="-262" width="456" height="524" rx="26" fill="url(#acento)"/></g>')
    s.append(f'<g opacity="0.9">{ondas(880, 330, CIANO, 3, 48, 32, 0.62)}</g>')
    s.append(celular(1040, 330, 172, 344, 9))
    salvar('placa-display.svg', ''.join(s))


# -------------------------------------------------- 6. etiqueta em produto ---
def etiqueta_produto():
    s = [cabeca('Etiqueta NFC de autenticidade presa a um produto')]
    s.append(sombra(470, 720, 260, 44))
    # Caixa do produto.
    s.append(f'''<g transform="translate(450 450)">
  <path d="M -210 -170 L 0 -250 L 210 -170 L 210 190 L 0 270 L -210 190 Z" fill="url(#face)" stroke="#5E6FB4" stroke-width="3" stroke-linejoin="round"/>
  <path d="M -210 -170 L 0 -90 L 210 -170" fill="none" stroke="#5E6FB4" stroke-width="3" stroke-linejoin="round"/>
  <path d="M 0 -90 L 0 270" fill="none" stroke="#5E6FB4" stroke-width="3"/>
  <path d="M -210 -170 L 0 -90 L 0 270 L -210 190 Z" fill="#0B1130" opacity="0.35"/>
  <g transform="translate(-108 40)">
    <rect x="-60" y="-56" width="120" height="112" rx="14" fill="url(#acento)" opacity="0.22"/>
    {marca_nfc(6, 0, 52, '#9FB6FF', 0.9)}
  </g>
  <rect x="42" y="-30" width="128" height="13" rx="6.5" fill="#7285C4" opacity="0.6"/>
  <rect x="42" y="4" width="98" height="13" rx="6.5" fill="#7285C4" opacity="0.45"/>
</g>''')
    # Etiqueta pendurada com cordão.
    s.append(f'''<g transform="translate(830 420) rotate(7)">
  <path d="M -206 -118 C -150 -66 -104 -20 -48 34" fill="none" stroke="#8291CC" stroke-width="7" stroke-linecap="round"/>
  <circle cx="-206" cy="-118" r="9" fill="#8291CC"/>
  <g transform="translate(60 40)">
    <path d="M -150 -128 L 96 -128 L 168 0 L 96 128 L -150 128 Z" fill="#EEF1FC" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="-108" cy="0" r="18" fill="#0E1638" opacity="0.55"/>
    <circle cx="-108" cy="0" r="18" fill="none" stroke="#9AA7D8" stroke-width="4"/>
    {marca_nfc(-8, -34, 50, '#2B3566', 0.92)}
    <text x="-6" y="34" font-family="Inter, sans-serif" font-size="27" font-weight="700" fill="#2B3566" text-anchor="middle">ORIGINAL</text>
    <text x="-6" y="70" font-family="Inter, sans-serif" font-size="20" fill="#5C6892" text-anchor="middle">lote 24·A · garantia</text>
  </g>
</g>''')
    s.append(f'<g opacity="0.75">{ondas(1035, 460, VERDE, 2, 44, 30, 0.55)}</g>')
    salvar('etiqueta-produto.svg', ''.join(s))


print('Gerando ilustrações:')
cartao_visita(); cartao_fidelidade(); tags_adesivas()
chaveiro_pulseira(); placa_display(); etiqueta_produto()
