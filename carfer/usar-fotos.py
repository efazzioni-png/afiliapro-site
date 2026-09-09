#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Troca as ilustrações de exemplo pelas fotos reais das obras.

COMO USAR
  1. Salve as fotos em  carfer/assets/fotos/
  2. Rode:  python3 usar-fotos.py
  3. Pronto — o site inteiro passa a usar as suas fotos.

ONDE CADA FOTO VAI
  Por padrão as fotos entram na ordem alfabética do nome do arquivo.
  Para mandar uma foto para um lugar específico, comece o nome pelo
  destino:

      hero-fachada.jpg        → fundo do topo (paisagem, deitada)
      sobre-equipe.jpg        → foto ao lado do texto "Sobre"
      area-industrial-01.jpg  → card "Industrial"
      area-comercial-loja.jpg → card "Comercial"
      area-residencial-x.jpg  → card "Residencial"
      obra-05-galpao.jpg      → 5ª foto da galeria
      qualquer-outro-nome.jpg → preenche as vagas de galeria que sobraram

OUTROS COMANDOS
  python3 usar-fotos.py --listar    mostra o que já é foto e o que ainda é ilustração
  python3 usar-fotos.py --desfazer  volta tudo para as ilustrações
"""
import json, os, re, sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
PASTA_FOTOS = os.path.join(RAIZ, "assets", "fotos")
ESTADO = os.path.join(RAIZ, "assets", "img", ".fotos.json")
EXTENSOES = (".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg")

ARQUIVOS_SITE = ["index.html", os.path.join("assets", "js", "site.config.js")]

# slot → (descrição, prefixos aceitos no nome do arquivo)
# Os prefixos são o que a pessoa escreveria naturalmente: "hero-fachada.jpg",
# não "hero-fallback-fachada.jpg".
SLOTS = [("hero-fallback",    "Fundo do topo",    ["hero", "topo", "capa"]),
         ("sobre-carfer",     "Bloco Sobre",      ["sobre", "equipe"]),
         ("area-residencial", "Card Residencial", ["area-residencial", "residencial"]),
         ("area-comercial",   "Card Comercial",   ["area-comercial", "comercial"]),
         ("area-industrial",  "Card Industrial",  ["area-industrial", "industrial"])] + \
        [("obra-%02d" % i, "Galeria %d" % i, ["obra-%02d" % i, "obra-%d" % i])
         for i in range(1, 13)]
NOMES = [s for s, _, _ in SLOTS]
PREFIXOS = {s: p for s, _, p in SLOTS}


def casa_prefixo(nome_arquivo, prefixo):
    """Confere o prefixo respeitando o limite da palavra, para "obra-1" não
       casar com "obra-12"."""
    base = os.path.splitext(nome_arquivo)[0].lower()
    if not base.startswith(prefixo):
        return False
    resto = base[len(prefixo):]
    return resto == "" or resto[0] in "-_ ."


def carregar_estado():
    if os.path.exists(ESTADO):
        with open(ESTADO, encoding="utf-8") as f:
            return json.load(f)
    return {s: "assets/img/%s.svg" % s for s in NOMES}


def salvar_estado(e):
    with open(ESTADO, "w", encoding="utf-8") as f:
        json.dump(e, f, indent=1, ensure_ascii=False)


def aplicar(mapa_novo):
    """Troca os caminhos antigos pelos novos em todos os arquivos do site."""
    atual = carregar_estado()
    trocas = [(atual[s], mapa_novo[s]) for s in NOMES if atual[s] != mapa_novo[s]]
    if not trocas:
        print("Nada mudou — os caminhos já são esses.")
        return 0

    total = 0
    for rel in ARQUIVOS_SITE:
        caminho = os.path.join(RAIZ, rel)
        with open(caminho, encoding="utf-8") as f:
            texto = f.read()
        antes = texto
        for velho, novo in trocas:
            texto = texto.replace(velho, novo)
        if texto != antes:
            with open(caminho, "w", encoding="utf-8") as f:
                f.write(texto)
            total += 1
    salvar_estado(mapa_novo)
    return len(trocas)


def listar():
    atual = carregar_estado()
    print("%-18s %-16s %s" % ("SLOT", "ONDE APARECE", "ARQUIVO EM USO"))
    print("-" * 78)
    fotos = 0
    for slot, desc, _ in SLOTS:
        arq = atual[slot]
        eh_foto = not arq.endswith("/%s.svg" % slot)
        fotos += eh_foto
        print("%-18s %-16s %s %s" % (slot, desc, "📷" if eh_foto else "  ", arq))
    print("\n%d de %d com foto real." % (fotos, len(SLOTS)))


def main():
    if "--listar" in sys.argv:
        listar()
        return

    if "--desfazer" in sys.argv:
        n = aplicar({s: "assets/img/%s.svg" % s for s in NOMES})
        print("Voltou para as ilustrações (%d trocas)." % n)
        return

    if not os.path.isdir(PASTA_FOTOS):
        os.makedirs(PASTA_FOTOS)
        sys.exit("Criei a pasta assets/fotos/.\nColoque as fotos lá dentro e rode de novo.")

    fotos = sorted(f for f in os.listdir(PASTA_FOTOS)
                   if f.lower().endswith(EXTENSOES) and not f.startswith("."))
    if not fotos:
        sys.exit("Nenhuma foto em assets/fotos/.\nFormatos aceitos: " + ", ".join(EXTENSOES))

    atual = carregar_estado()
    novo = dict(atual)
    usadas = set()

    # 1ª passada: fotos cujo nome começa pelo destino.
    # Os prefixos mais longos primeiro, para "area-industrial-x" ganhar de
    # "industrial-x" quando os dois existirem.
    for slot in NOMES:
        for prefixo in sorted(PREFIXOS[slot], key=len, reverse=True):
            achou = False
            for f in fotos:
                if f in usadas or not casa_prefixo(f, prefixo):
                    continue
                novo[slot] = "assets/fotos/" + f
                usadas.add(f)
                achou = True
                break
            if achou:
                break

    # 2ª passada: as demais preenchem as vagas de galeria ainda sem foto
    sobrando = [f for f in fotos if f not in usadas]
    for slot in NOMES:
        if not sobrando:
            break
        if not slot.startswith("obra-"):
            continue
        if novo[slot].startswith("assets/fotos/"):
            continue
        novo[slot] = "assets/fotos/" + sobrando.pop(0)

    n = aplicar(novo)
    print("%d foto(s) encontrada(s), %d posição(ões) atualizada(s).\n" % (len(fotos), n))
    listar()
    if sobrando:
        print("\nSobraram sem lugar (a galeria tem 12 vagas): " + ", ".join(sobrando))
    print("\nSe você usa a versão de arquivo único, rode agora:"
          "\n  python3 build-arquivo-unico.py")


if __name__ == "__main__":
    main()
