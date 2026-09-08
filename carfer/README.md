# Carfer Engenharia — site institucional

Site estático (HTML + CSS + JavaScript puro, sem build e sem framework).
Basta subir a pasta `carfer/` para qualquer hospedagem — ou apontar um
domínio para ela. Não há dependência de CDN: fontes, ícones, imagens e a
biblioteca 3D são servidas pelo próprio site.

```
carfer/
├── index.html                  página única, com todas as seções
├── site.webmanifest            ícones e nome do app (atalho no celular)
├── robots.txt · sitemap.xml    SEO
└── assets/
    ├── css/styles.css          toda a identidade visual (tokens no topo)
    ├── fonts/                  Inter e Sora (woff2, self-hosted)
    ├── img/                    imagens das seções, ícones e og:image
    ├── js/
    │   ├── site.config.js      ← TELEFONE, LINKS, ENDEREÇO, MENSAGENS
    │   ├── main.js             comportamento (menu, filtros, formulário, GPS…)
    │   └── hero3d.js           cena 3D do topo (Three.js)
    └── vendor/                 Three.js r160 (MIT)
```

---

## 1. O que mexer no dia a dia

### Telefone, WhatsApp, Instagram, endereço e mensagens
Tudo em **`assets/js/site.config.js`**. É o único arquivo que precisa ser
editado para trocar contato ou o texto das mensagens automáticas.

### Textos das seções
Em `index.html`. Cada bloco começa com um comentário indicando a seção
(`<!-- SOBRE -->`, `<!-- SERVIÇOS -->`, etc.).

### Cores e tipografia
No topo de `assets/css/styles.css`, no bloco `:root`. Trocar
`--accent: #E8681B;` muda a cor de destaque do site inteiro.

---

## 2. Pontos que precisam da sua confirmação

| Onde | O quê | Por quê |
|---|---|---|
| `site.config.js` → `contato.email` | `contato@carferengenharia.com.br` | Endereço **presumido**. É o e-mail usado no botão “Por e-mail” do formulário. Confirme ou troque. |
| `site.config.js` → `indicadores` | “+150 obras entregues” e “+10 anos de experiência” | Números **provisórios**, marcados com `nota: 'ajustar'`. Os outros dois (49 avaliações e 3 estados) são reais. |
| `site.config.js` → `endereco.busca` | Texto usado para achar a empresa no mapa | Confirme abrindo o link “Abrir a ficha no Google Maps” no site: se o pino cair no lugar certo, está pronto. Se não, ajuste o texto (ou preencha `lat`/`lng`). |
| `site.config.js` → `endereco.lat/lng` | `null` por padrão | Opcional. Sem eles, mapa e rota usam o endereço por escrito. Preencha só se quiser cravar o pino num ponto exato — clique com o botão direito no local no Google Maps e copie os dois números. |
| Domínio do site | `https://carferengenharia.com.br/` | Aparece em 11 lugares (canonical, Open Graph, dados estruturados, sitemap, robots, configuração). Para trocar todos de uma vez: `python3 trocar-dominio.py novodominio.com.br` — some `--email` se o e-mail também mudar. |
| `assets/img/obra-*.svg`, `area-*.svg`, `sobre-carfer.svg` | Ilustrações-base | São desenhos vetoriais de apoio, **não fotos de obras reais**. Substitua por fotos suas (veja abaixo). |

### Trocar as imagens por fotos reais
1. Salve as fotos em `assets/img/` (use `.webp` ou `.jpg`, largura ~1600px).
2. Em `index.html`, troque o `src` e o `alt` da imagem, e o `data-full` do
   botão da galeria (é o que o lightbox abre em tamanho grande).
3. Mantenha `loading="lazy"` e `width`/`height` — é o que evita o site “pular”
   enquanto carrega.

### Depoimentos do Google
O site **não** traz depoimentos inventados. Na seção “Avaliações” existe um
modelo comentado no HTML: copie-o para fora do comentário e cole as avaliações
reais, com o nome exatamente como aparece no perfil do Google.

---

## 3. Recursos interativos (e como cada um funciona)

**Cena 3D do topo** — estrutura metálica em wireframe com rotação lenta,
parallax do mouse, poeira de canteiro e um “nível laser” que sobe pela obra.
Só é carregada em desktop, com conexão boa e quando o visitante não pediu
menos movimento no sistema. Em qualquer outro caso (celular, 3G, economia de
dados, sem WebGL) fica a imagem estática `hero-fallback.svg` — que já está
na tela desde o primeiro instante, então nunca há “buraco” no lugar dela.

**WhatsApp com mensagem contextual** — todo link com `data-wa` recebe a
mensagem pronta. O texto muda conforme o contexto:
- clique no card *Reforma de cozinha* → “…orçamento para **reforma de cozinha**.”
- botão flutuante → acompanha a **seção visível** na tela, e passa a citar o
  serviço específico quando o visitante passa o mouse sobre um card;
- lightbox → cita o nome da obra aberta;
- formulário → monta a mensagem completa com nome, telefone, serviço, cidade
  e descrição, já formatada com negrito do WhatsApp.

Para adicionar um novo ponto de contato basta pôr `data-wa` e
`data-wa-service="o que a pessoa quer"` em qualquer link.

**Instagram** — no celular tenta abrir o app (`instagram://user?username=…`)
e, se em ~0,9 s nada acontecer, cai para o site. No desktop abre em nova aba.

**GPS / rota** — o botão “Traçar rota” pede a localização do visitante e abre
a navegação já traçada: Apple Maps no iPhone, Google Maps nos demais. Se a
pessoa negar a localização, o app de mapas abre mesmo assim e usa a posição
atual dele. Há ainda botões diretos para Google Maps, Waze e Apple Maps.

**Mapa** — o endereço vem de `endereco.busca` no `site.config.js`: o mesmo
texto alimenta o mapa incorporado, a rota, o Waze, o Apple Maps e o link da
ficha. Mudou o endereço lá, mudou em todos. O texto começa pelo nome da
empresa (faz o Maps abrir a ficha do negócio, não só um ponto na rua) e não
inclui o número da sala, que o mapa não reconhece.

O iframe só é carregado quando a seção se aproxima da tela; se não carregar
(rede fora, navegador bloqueando iframes de terceiros), o bloco mostra o
endereço escrito e um link para abrir no Google Maps.

**Galeria** — filtros por categoria e lightbox com teclado (← → e Esc),
arraste no celular e foco preso dentro do diálogo.

---

## 4. Acessibilidade e performance

- Navegação completa por teclado, `skip link`, `aria-*` nos componentes
  interativos e foco visível.
- `prefers-reduced-motion` desliga a cena 3D, o pulso dos botões e as
  animações de entrada.
- Imagens com `loading="lazy"`, `width`/`height` e `decoding="async"`.
- Fontes locais com `font-display: swap` e `preload` nas duas mais usadas.
- Zero requisições a terceiros no carregamento inicial (o único domínio
  externo é o `google.com/maps` do iframe, carregado sob demanda).

## 5. SEO local

`title`, `description`, Open Graph e dados estruturados **schema.org
`GeneralContractor`** já preenchidos com endereço, horário, telefone,
áreas atendidas (RJ, SP, MG) e a avaliação 5,0/49.

> Observação: o Google desencoraja marcar como `aggregateRating` uma nota
> coletada em outra plataforma (o próprio Google Meu Negócio). A marcação
> está no site porque a nota é o principal diferencial da empresa — se o
> Search Console reclamar, basta remover o bloco `aggregateRating` do
> JSON-LD no `<head>`; nada mais quebra.

## 6. Versão em arquivo único (para mostrar sem hospedar)

`carfer-engenharia-site.html` é o site inteiro num arquivo só — CSS, fontes,
imagens, JavaScript e a biblioteca 3D embutidos. **Abre com duplo-clique**,
funciona offline e pode ser enviado por e-mail ou WhatsApp. Serve para
apresentar o site antes de publicar; o que vai para a hospedagem continua
sendo a pasta completa.

Para regerar depois de mexer no site:

```bash
cd carfer
python3 build-arquivo-unico.py
```

> Por que existe: abrindo `index.html` direto do disco (`file://`), o
> navegador bloqueia por segurança o carregamento das fontes e do módulo da
> cena 3D — a página aparece, mas com a fonte do sistema e sem o 3D. Servido
> por HTTP (hospedagem ou o comando abaixo) não há esse bloqueio; no arquivo
> único também não, porque nada é carregado de fora.

## 7. Publicar

Qualquer hospedagem de arquivos estáticos serve (GitHub Pages, Netlify,
Vercel, Hostinger, cPanel…). Não há passo de build.

Para testar localmente:

```bash
cd carfer
python3 -m http.server 8080     # depois abra http://localhost:8080
```

> A cena 3D usa módulos ES, então precisa ser servida por HTTP —
> abrir o `index.html` direto pelo `file://` desliga só o 3D
> (o resto do site funciona normalmente).
