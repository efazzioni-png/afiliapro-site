#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera uma versão do site em UM ÚNICO ARQUIVO HTML, com tudo embutido
(CSS, fontes, imagens, JavaScript e a biblioteca 3D).

Para que serve: esse arquivo abre com duplo-clique, direto do computador,
sem precisar de servidor — útil para mostrar o site a um cliente, mandar
por e-mail ou WhatsApp. O site "de verdade", que vai para a hospedagem,
continua sendo a pasta inteira (index.html + assets/).

Uso:  python3 build-arquivo-unico.py
Saída: carfer-engenharia-site.html
"""
import base64, os, re, sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(RAIZ, "carfer-engenharia-site.html")


def ler(*partes):
    with open(os.path.join(RAIZ, *partes), encoding="utf-8") as f:
        return f.read()


def data_uri(caminho, mime):
    with open(os.path.join(RAIZ, caminho), "rb") as f:
        return "data:%s;base64,%s" % (mime, base64.b64encode(f.read()).decode())


# ---------------------------------------------------------------- CSS -----
css = ler("assets", "css", "styles.css")

# As fontes viram data URI. Só o subconjunto latino: o latin-ext não é usado
# em português e dobraria o tamanho do arquivo à toa.
def embutir_fonte(m):
    arquivo = m.group(1)
    caminho = os.path.join("assets", "fonts", arquivo)
    if "latin-ext" in arquivo or not os.path.exists(os.path.join(RAIZ, caminho)):
        return "url('about:blank')"
    return "url('%s')" % data_uri(caminho, "font/woff2")

css = re.sub(r"url\('\.\./fonts/([^']+)'\)", embutir_fonte, css)
# Remove os @font-face do latin-ext que ficaram sem arquivo
css = re.sub(r"@font-face \{[^}]*url\('about:blank'\)[^}]*\}\n?", "", css)

# ------------------------------------------------------------- imagens ----
def embutir_imagens(html):
    """Troca todo caminho assets/img/*.svg|png por um data URI."""
    def sub(m):
        pre, caminho, pos = m.group(1), m.group(2), m.group(3)
        mime = "image/svg+xml" if caminho.endswith(".svg") else "image/png"
        return pre + data_uri(caminho, mime) + pos
    return re.sub(r'(["\'])(assets/img/[^"\']+\.(?:svg|png))(["\'])',
                  lambda m: sub(m), html)


# ---------------------------------------------------------------- HTML ----
html = ler("index.html")

# 1) folha de estilo → <style>
html = html.replace('<link rel="stylesheet" href="assets/css/styles.css">',
                    "<style>\n" + css + "\n</style>")

# 2) preload das fontes e manifest não fazem sentido em arquivo único
html = re.sub(r'<link rel="preload" as="font"[^>]*>\n?', "", html)
html = re.sub(r'<link rel="manifest"[^>]*>\n?', "", html)

# 3) scripts embutidos
config = ler("assets", "js", "site.config.js")
main = ler("assets", "js", "main.js")
three = ler("assets", "vendor", "three.min.js")     # build UMD: define window.THREE
hero = ler("assets", "js", "hero3d.js")

# A cena 3D deixa de importar módulo e passa a usar o THREE global embutido.
hero = re.sub(
    r"// Three\.js vem hospedada.*?const THREE_CDN\s*=\s*'[^']*';",
    "// Nesta versão de arquivo único a Three.js já vem embutida na página.",
    hero, flags=re.S)
hero = re.sub(
    r"  const comLimite = .*?\n  \}\n\n",
    "  const THREE = window.THREE;\n  if (!THREE) return;\n\n",
    hero, flags=re.S)
if "const THREE = window.THREE" not in hero:
    sys.exit("ERRO: não consegui adaptar hero3d.js para o THREE global.")

html = html.replace('<script src="assets/js/site.config.js"></script>',
                    "<script>\n" + config + "\n</script>")
html = html.replace('<script src="assets/js/main.js" defer></script>',
                    "<script>\n" + main + "\n</script>")
html = html.replace('<script src="assets/js/hero3d.js" type="module"></script>',
                    "<script>\n" + three + "\n</script>\n<script>\n" + hero + "\n</script>")

# 4) imagens e favicon → data URI
html = embutir_imagens(html)

with open(SAIDA, "w", encoding="utf-8") as f:
    f.write(html)

print("Gerado: %s  (%.1f MB)" % (SAIDA, os.path.getsize(SAIDA) / 1048576))
