# Cia Estética | Beleza Profissional — Site institucional e de conversão

Site completo da **Cia Estética**, escola de profissionais de beleza na Barra da Tijuca,
Rio de Janeiro. Construído para gerar contatos no WhatsApp e ranquear em buscas locais.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide Icons

---

## Índice

1. [Começando](#1-começando)
2. [Estrutura do projeto](#2-estrutura-do-projeto)
3. [Como editar o conteúdo](#3-como-editar-o-conteúdo) ← comece por aqui
4. [Variáveis de ambiente](#4-variáveis-de-ambiente)
5. [Imagens](#5-imagens)
6. [SEO e dados estruturados](#6-seo-e-dados-estruturados)
7. [Analytics e conversão](#7-analytics-e-conversão)
8. [Deploy](#8-deploy)
9. [Decisões técnicas](#9-decisões-técnicas)
10. [Antes de publicar](#10-antes-de-publicar)

---

## 1. Começando

Requisitos: **Node.js 20 ou superior** (testado no Node 22).

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento — http://localhost:3000
npm run dev

# build de produção
npm run build

# rodar o build de produção localmente — http://localhost:3000
npm start
```

Verificações de qualidade:

```bash
npm run typecheck   # TypeScript, sem erros
npm run lint        # ESLint com as regras oficiais do Next.js
```

---

## 2. Estrutura do projeto

```
app/                      Rotas (App Router)
├── page.tsx              Home — 15 seções na ordem definida no briefing
├── layout.tsx            Layout raiz: fontes, metadata global, JSON-LD, header/footer
├── cursos/               Listagem + página individual /cursos/[slug]
├── blog/                 Listagem + artigo /blog/[slug]
├── sobre/  depoimentos/  contato/  produtos/  faq/
├── politica-de-privacidade/  termos-de-uso/
├── sitemap.ts robots.ts manifest.ts icon.svg
└── globals.css           Design system (cores, tipografia, animações)

components/
├── sections/             Blocos da home (Hero, Cursos, Depoimentos, FAQ…)
├── ui/                   Primitivos reutilizáveis (Button, Section, Reveal…)
├── analytics/            GA4 / GTM / Meta Pixel + rastreamento de cliques
├── Header.tsx  Footer.tsx  WhatsAppButton.tsx
├── CourseCard.tsx  PostCard.tsx  TestimonialCard.tsx
└── ContactForm.tsx  MapEmbed.tsx  PageHero.tsx

data/                     ⭐ TODO O CONTEÚDO EDITÁVEL VIVE AQUI
lib/                      WhatsApp, analytics, SEO, Schema.org, utilitários
public/images/            Imagens (ver seção 5)
scripts/                  Gerador das imagens-placeholder
```

**Regra de ouro:** nenhum texto importante fica dentro de componentes.
Para mudar o site, edite `data/`.

---

## 3. Como editar o conteúdo

### Trocar o número do WhatsApp

O canal principal de conversão. Duas formas:

- **Recomendado:** defina `NEXT_PUBLIC_WHATSAPP_NUMBER` no `.env.local`
- Ou edite `contact.whatsapp` em `data/site.ts`

Formato: `55` + DDD + número, só dígitos. Exemplo: `5521999998888`.

Isso atualiza de uma vez: header, hero, botão flutuante, barra fixa do mobile,
cards de curso, formulário, footer e todos os CTAs — **mais de 30 pontos do site**.

### Trocar telefone, endereço ou horário

`data/site.ts` → objetos `contact`, `address` e `hours`.
Reflete no header, footer, página de contato, mapa e no JSON-LD do Google.

### Adicionar ou editar um curso

`data/courses.ts`. Copie um objeto do array `courses`, troque o `slug` (vira a URL)
e edite os campos. A home, a listagem `/cursos`, o menu do rodapé, o sitemap e os
dados estruturados se atualizam sozinhos.

Campos que valem atenção:

| Campo        | Comportamento quando vazio / `null`                                  |
|--------------|----------------------------------------------------------------------|
| `duration`   | Exibe "Sob consulta"                                                 |
| `format`     | Exibe "Sob consulta"                                                 |
| `certificate`| Exibe "Sob consulta"                                                 |
| `price`      | Exibe "Sob consulta"                                                 |
| `syllabus`   | `[]` → exibe um bloco de CTA "receber o conteúdo do curso"           |
| `badge`      | Sem selo sobre a imagem                                              |

Preenchendo `syllabus`, a seção de conteúdo programático aparece automaticamente:

```ts
syllabus: [
  { title: 'Módulo 1 — Fundamentos', topics: ['Tópico A', 'Tópico B'] },
  { title: 'Módulo 2 — Prática',     topics: ['Tópico C'] },
],
```

### Adicionar um depoimento

`data/testimonials.ts`:

```ts
{
  author: 'Nome da aluna',   // vazio → exibe "Avaliação no Google" (nunca um nome fictício)
  course: 'Micropigmentação', // opcional
  rating: 5,
  quote: 'Texto da avaliação.',
  source: 'Google',
}
```

Alimenta ao mesmo tempo a home, a página `/depoimentos`, as páginas de curso e o
Schema.org `Review`.

### Publicar um artigo no blog

`data/blog.ts`. Copie um objeto de `posts`, troque o `slug` e escreva o `content`
em blocos:

```ts
content: [
  { paragraphs: ['Primeiro parágrafo.', 'Segundo parágrafo.'] },
  { heading: 'Um subtítulo (vira <h2>)', paragraphs: ['Texto.'] },
  { heading: 'Com lista', list: ['Item um', 'Item dois'] },
]
```

Listagem, artigos relacionados, categorias, sitemap e o JSON-LD `BlogPosting` são
gerados a partir daí.

### Editar FAQ, produtos, diferenciais e textos institucionais

| Arquivo               | O que controla                                        |
|-----------------------|-------------------------------------------------------|
| `data/faq.ts`         | FAQ da home, página `/faq` e Schema `FAQPage`          |
| `data/products.ts`    | Categorias de produtos                                 |
| `data/benefits.ts`    | "Por que escolher a Cia Estética?"                     |
| `data/paths.ts`       | "Escolha seu próximo passo"                            |
| `data/journey.ts`     | "Como funciona"                                        |
| `data/about.ts`       | Seção e página "Sobre" + microcopy                     |
| `data/legal.ts`       | Política de Privacidade e Termos de Uso                |
| `data/navigation.ts`  | Itens de menu do header, menu mobile e rodapé          |

### Trocar o logotipo

O logo atual é um **wordmark tipográfico provisório** (`components/ui/Logo.tsx`).
Para usar o logo oficial:

1. Coloque os arquivos em `public/images/logo.svg` e `logo-light.svg`
2. Em `components/ui/Logo.tsx`, substitua o bloco `<span>` por:

```tsx
<Image src="/images/logo.svg" alt="Cia Estética" width={168} height={40} priority />
```

Nada mais no site precisa mudar.

---

## 4. Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha o necessário.
**Todas são opcionais** — sem nenhuma, o site funciona com os padrões de `data/site.ts`.

Nenhuma chave secreta é usada no projeto: tudo é `NEXT_PUBLIC_*`, ou seja, valores
que já ficariam visíveis no HTML de qualquer forma. Não há chave de API, token ou
credencial no repositório.

---

## 5. Imagens

As imagens em `public/images/` são **placeholders de direção de arte** — composições
abstratas geradas em código, na paleta da marca. Elas existem porque nenhuma foto
oficial da escola foi fornecida.

**Para usar as fotos reais**, basta substituir os arquivos mantendo os nomes:

```
public/images/hero-cia-estetica.jpg            1200 × 1500  (4:5)
public/images/cursos/<slug-do-curso>.jpg       1200 ×  900  (4:3)
public/images/sobre/escola-cia-estetica.jpg    1000 × 1250  (4:5)
public/images/sobre/equipe-cia-estetica.jpg    1200 ×  800  (3:2)
public/images/blog/<slug-do-artigo>.jpg        1280 ×  800  (16:10)
public/images/og/cia-estetica-og.jpg           1200 ×  630  (miniatura de compartilhamento)
```

O Next.js converte para WebP/AVIF e gera os tamanhos responsivos automaticamente —
não é preciso otimizar antes. Ao trocar uma imagem, **atualize o texto alternativo**
(`imageAlt`) no arquivo de dados correspondente: é o que descreve a foto para leitores
de tela e para o Google.

Para regenerar os placeholders (ex.: depois de acrescentar um curso):

```bash
node scripts/generate-placeholders.mjs
```

---

## 6. SEO e dados estruturados

Já implementado:

- `title` e `meta description` únicos em todas as páginas, dentro do tamanho ideal
- URL canônica em cada rota
- Open Graph e Twitter Card com imagem de 1200×630
- `sitemap.xml` e `robots.txt` gerados a partir dos dados (cursos e artigos entram sozinhos)
- Manifest, favicon e `theme-color`
- Hierarquia semântica correta: um único `<h1>` por página
- Breadcrumbs visuais + `BreadcrumbList`
- URLs amigáveis em português

**JSON-LD emitido:** `EducationalOrganization` + `LocalBusiness` (mesmo nó), `WebSite`,
`Course`, `Review`, `AggregateRating`, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `ItemList`.

Tudo é gerado em `lib/schema.ts` a partir de `data/` — mudou o telefone, o Schema muda junto.

**Dois campos foram deixados de fora de propósito**, porque os dados não foram confirmados:

- `geo` (latitude/longitude) — o mapa e o "Como chegar" funcionam por endereço.
  Para ativar, acrescente em `organizationSchema()`:
  ```ts
  geo: { '@type': 'GeoCoordinates', latitude: -00.0000, longitude: -00.0000 },
  ```
- `hasCourseInstance` — exige carga horária e datas reais de turma. Assim que a escola
  confirmar, acrescente em `courseSchema()`:
  ```ts
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'onsite',
    courseWorkload: 'PT40H',        // ISO 8601
    location: { '@id': ORG_ID },
  },
  ```
  Isso habilita o card de curso enriquecido no Google.

### Palavras-chave trabalhadas

`cursos de estética na Barra da Tijuca` · `curso de estética RJ` ·
`curso de micropigmentação Barra da Tijuca` · `curso de remoção de tatuagem RJ` ·
`escola de estética no Rio de Janeiro` · `curso profissionalizante de estética RJ` ·
`Cia Estética Barra da Tijuca` · `cursos de beleza Barra da Tijuca`

---

## 7. Analytics e conversão

Configure os IDs no `.env.local`. **Sem ID, o script não é carregado** — nada de peso
inútil e nada de cookie desnecessário.

Suportados: Google Analytics 4, Google Tag Manager, Google Ads e Meta Pixel.

### Eventos disparados

| Evento             | Quando acontece                                  |
|--------------------|--------------------------------------------------|
| `click_whatsapp`   | Qualquer botão de WhatsApp                       |
| `click_phone`      | Qualquer link de telefone                        |
| `click_course`     | Clique em um card de curso                       |
| `view_course`      | Abertura de uma página de curso                  |
| `click_contact`    | Clique em e-mail / contato                       |
| `click_maps`       | "Como chegar" e "Ver avaliações"                 |
| `click_products`   | CTAs de produtos                                 |
| `click_social`     | Ícones de redes sociais                          |
| `click_hero_cta`   | CTA principal do hero                            |
| `form_submit`      | Envio do formulário de contato                   |

Cada evento carrega `location` (onde na página) e `item` (qual curso/produto) — o que
permite, no Google Ads, saber exatamente qual seção converte.

Para criar uma conversão no Google Ads, use `click_whatsapp` e `form_submit`.

---

## 8. Deploy

### Vercel (recomendado)

1. Suba o repositório para o GitHub
2. Em vercel.com → **Add New Project** → selecione o repositório
3. **Root Directory:** `clientes/cia-estetica`
4. Cole as variáveis do `.env.local` em Settings → Environment Variables
5. Deploy

Build e start são detectados automaticamente.

### Hospedagem estática (GitHub Pages, Hostinger, S3, cPanel…)

```bash
npm run build:static     # gera a pasta out/
```

Envie o conteúdo de `out/` para o servidor. Se o site ficar em um subdiretório,
defina `NEXT_PUBLIC_BASE_PATH` antes de gerar.

Como o formulário funciona via WhatsApp por padrão, o site **não precisa de back-end**.

### Node próprio / Docker

```bash
npm ci && npm run build && npm start   # escuta na porta 3000
```

---

## 9. Decisões técnicas

**Animações sem biblioteca.** Todo o scroll reveal, contadores, carrossel e
microinterações usam CSS + `IntersectionObserver` (~1 KB de JS). O briefing sugeria
Framer Motion, mas ele adicionaria ~40 KB em *todas* as rotas e comprometeria a meta
de Lighthouse 90+. Se quiser adotá-lo depois, `components/ui/Reveal.tsx` é o único
ponto a trocar.

**Rastreamento por delegação.** Um único listener de clique no documento lê atributos
`data-track-*`. Assim todos os botões continuam sendo Server Components: zero
JavaScript por CTA. Ver `components/analytics/TrackingProvider.tsx`.

**Mapa com carregamento adiado.** O iframe do Google Maps só é inserido quando a seção
entra na viewport. Continua sendo um mapa interativo, sem custo na primeira carga.

**Formulário sem back-end.** Por padrão, monta a mensagem e abre o WhatsApp já
preenchido — o canal de maior conversão para o público da escola. Basta definir
`NEXT_PUBLIC_FORM_ENDPOINT` para passar a enviar por POST.

**Sem `tailwind-merge`.** O componente `Button` expõe `variant`, `size` e `fullWidth`
em vez de aceitar classes soltas, o que elimina conflitos de utilidades na origem.
**Não passe classes de display, padding ou largura via `className` para o `Button`.**

**Acessibilidade.** Skip link, foco visível, `aria-*` no menu, no accordion e no
formulário, alvos de toque de no mínimo 24 px (WCAG 2.2 SC 2.5.8), texto alternativo
em todas as imagens e respeito a `prefers-reduced-motion`.

---

## 10. Antes de publicar

- [ ] Preencher o **WhatsApp oficial** (`NEXT_PUBLIC_WHATSAPP_NUMBER`) — hoje há um placeholder
- [ ] Confirmar o **horário de atendimento** (`data/site.ts` → `hours`)
- [ ] Confirmar o **ano de atuação** exibido na barra de autoridade (`data/site.ts` → `stats`)
- [ ] Preencher **Instagram** e demais redes (sem isso, os ícones não aparecem)
- [ ] Substituir as **imagens** pelas fotos oficiais e atualizar os `imageAlt`
- [ ] Colocar o **logotipo oficial**
- [ ] Validar o **conteúdo programático** dos cursos com a coordenação
- [ ] Preencher **razão social e CNPJ** em `data/legal.ts`
- [ ] Passar os textos legais por **revisão jurídica**
- [ ] Configurar **GA4 / Google Ads / Meta Pixel**
- [ ] Apontar o **domínio** e conferir `NEXT_PUBLIC_SITE_URL`
- [ ] Enviar o `sitemap.xml` no **Google Search Console**

A lista completa de itens pendentes, com o motivo de cada um, está em
[`CONTEUDO-PENDENTE.md`](./CONTEUDO-PENDENTE.md).
