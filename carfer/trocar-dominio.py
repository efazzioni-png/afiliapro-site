#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Troca o domínio do site em todos os lugares de uma vez.

O endereço do site aparece em 11 pontos (canonical, Open Graph, dados
estruturados, sitemap, robots e a configuração). Este script atualiza todos,
para não sobrar nenhum apontando para o domínio antigo — o que confundiria
o Google e quebraria a prévia dos links no WhatsApp.

Uso:
    python3 trocar-dominio.py www.novodominio.com.br
    python3 trocar-dominio.py novodominio.com.br --email   (troca também o e-mail)

Depois de rodar, se você usa a versão de arquivo único:
    python3 build-arquivo-unico.py
"""
import os, re, sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
ARQUIVOS = ["index.html", "sitemap.xml", "robots.txt",
            os.path.join("assets", "js", "site.config.js")]


def dominio_atual():
    """Lê o domínio em uso a partir de site.config.js."""
    caminho = os.path.join(RAIZ, "assets", "js", "site.config.js")
    with open(caminho, encoding="utf-8") as f:
        m = re.search(r"site:\s*'https?://([^/']+)'", f.read())
    if not m:
        sys.exit("ERRO: não encontrei o campo 'site' em site.config.js.")
    return m.group(1)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    trocar_email = "--email" in sys.argv

    if len(args) != 1:
        sys.exit(__doc__)

    novo = args[0].strip().lower()
    novo = re.sub(r"^https?://", "", novo).rstrip("/")
    if not re.match(r"^[a-z0-9.-]+\.[a-z]{2,}$", novo):
        sys.exit("ERRO: '%s' não parece um domínio válido." % novo)

    antigo = dominio_atual()
    if antigo == novo:
        sys.exit("O site já usa %s — nada a fazer." % novo)

    total = 0
    for rel in ARQUIVOS:
        caminho = os.path.join(RAIZ, rel)
        with open(caminho, encoding="utf-8") as f:
            texto = f.read()

        # Conta antes de substituir: o domínio novo pode conter o antigo
        # (ex.: carferengenharia.com.br → www.carferengenharia.com.br), e aí
        # comparar as contagens depois daria sempre zero.
        alvos = ["https://" + antigo]
        if trocar_email:
            alvos.append("@" + antigo)

        n = sum(texto.count(alvo) for alvo in alvos)
        novo_texto = texto
        for alvo in alvos:
            novo_texto = novo_texto.replace(alvo, alvo.replace(antigo, novo))

        if n:
            with open(caminho, "w", encoding="utf-8") as f:
                f.write(novo_texto)
            print("  %-34s %d ocorrência(s)" % (rel, n))
            total += n

    print("\n%s  →  %s   (%d substituições)" % (antigo, novo, total))

    restou = []
    for rel in ARQUIVOS:
        with open(os.path.join(RAIZ, rel), encoding="utf-8") as f:
            if "https://" + antigo in f.read():
                restou.append(rel)
    if restou:
        print("\nATENÇÃO: o domínio antigo ainda aparece em: " + ", ".join(restou))
        print("(esperado se você NÃO usou --email e o e-mail continua no domínio antigo)")


if __name__ == "__main__":
    main()
