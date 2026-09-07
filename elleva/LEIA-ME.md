# ELLEVA — Clínica Integrada · site institucional

Site estático de uma página só: `elleva/index.html`.
Sem build, sem dependências — HTML, CSS e JavaScript no próprio arquivo.
Publicado pelo GitHub Pages em `/elleva/`.

---

## ⚠️ Antes de publicar

Estes itens **não puderam ser preenchidos** porque dependem de informações que só a
clínica tem. Procure no `index.html` pelos marcadores `[EDITAR]` e `[CONFIRMAR]`.

### 1. Depoimentos (obrigatório)
Os textos do carrossel são **resumos dos temas** que os pacientes costumam
destacar — estão sem autoria individual **de propósito**. Copie os depoimentos
reais do perfil da clínica no Google e substitua texto, nome, inicial e data.
**Não publique depoimentos com nomes inventados.**

### 2. Equipe (obrigatório)
Três dos quatro cards estão como "A definir". Preencha nome, especialidade e
CRO/CRM de cada profissional — a exibição do registro é exigida pelo CFO/CRO.
O único card real é o do responsável técnico (Dr. Vitor Waruar, CRO-RJ 31235),
tirado da bio pública do Instagram — confirme se segue atual.

### 3. Horário de atendimento
Está como **seg. a sex., 09:00–19:00 / sáb., 09:00–13:00** — foi uma suposição,
já que o briefing veio com o campo em branco. Aparece em 4 lugares:
hero, seção Localização, rodapé e no JSON-LD (`openingHoursSpecification`).

### 4. Fotos
Cada moldura pontilhada é um espaço de imagem. Coloque os arquivos em
`elleva/assets/` e troque o `<div class="ph">` por um `<img>` — o comentário
ao lado de cada uma já traz o caminho e o tamanho sugeridos.

| Onde | Proporção | Tamanho mínimo |
|---|---|---|
| Hero — recepção/ambiente | 4:5 | 900 × 1125 px |
| Sobre — equipe | 3:4 | 900 × 1200 px |
| Sobre — detalhe do consultório | 1:1 | 600 × 600 px |
| Equipe — cada profissional | 4:5 | 600 × 750 px |
| Compartilhamento (`og-elleva.jpg`) | 1,91:1 | 1200 × 630 px |

Use fotos reais da clínica. Comprima antes de subir (TinyPNG ou similar) e
mantenha cada arquivo abaixo de ~300 KB.

### 5. Logotipo
O símbolo é um SVG provisório inspirado na marca. Coloque o arquivo real em
`elleva/assets/logo-elleva.svg` e troque os dois blocos `.logo__mark`
(cabeçalho e rodapé) — o comentário no cabeçalho mostra como.

### 6. Endereço no JSON-LD
Confirme `latitude`/`longitude` (as atuais são aproximadas — copie as exatas do
Google Maps) e troque os links de "Ver todas as avaliações" e `hasMap` pelo
**link direto do perfil da clínica no Google**, no lugar da busca genérica.

### 7. Domínio
Todas as URLs absolutas (`canonical`, `og:url`, JSON-LD) apontam para
`https://afiliapro.com/elleva/`. Se o site for para um domínio próprio,
substitua todas as ocorrências.

---

## Serviços listados

Foram montados a partir do posicionamento "Odontologia e Medicina Integrada /
Equipe Multidisciplinar" do Instagram — **confirme se batem com o que a clínica
oferece hoje** e ajuste os cards e o `availableService` do JSON-LD juntos.

---

## O que já está pronto

- Cabeçalho fixo com menu, indicador de seção ativa e menu lateral no celular
- Botão flutuante de WhatsApp com mensagem pré-preenchida, em todas as telas
- Carrossel de avaliações: setas, pontos, autoplay (pausa no hover/foco),
  arrastar com o dedo e navegação por teclado
- Formulário que monta a mensagem e abre o WhatsApp — sem servidor, sem backend
  (validação de nome e telefone, máscara de celular e fixo)
- Mapa do Google incorporado, sem chave de API
- SEO local: meta tags, Open Graph e dados estruturados `Dentist` do Schema.org
- Responsivo de 320 px para cima, com `prefers-reduced-motion` respeitado

## Como editar

Abra `index.html` em qualquer editor. A folha de estilo fica no `<style>` do
topo e as cores estão todas em variáveis, no bloco `:root`:

```css
--gold: #B8933F;   /* dourado da marca  */
--deep: #1D2A24;   /* verde escuro      */
--bg:   #FBF9F5;   /* off-white de fundo */
```

Para conferir localmente, basta abrir o arquivo no navegador — ou rodar
`npx http-server .` na raiz do repositório e acessar `/elleva/`.
