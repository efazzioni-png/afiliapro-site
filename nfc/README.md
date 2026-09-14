# Site institucional sobre NFC

Página única, estática e responsiva explicando a tecnologia NFC (Near Field
Communication): o que é, como funciona, onde usar, em quais formatos existe e
quais os benefícios — com um **assistente de dúvidas** que responde às
perguntas do visitante ali mesmo na página.

Publicada em `https://afiliapro.com/nfc/` (GitHub Pages, sem build).

---

## Como abrir

É HTML estático: basta servir a pasta.

```bash
# da raiz do repositório
python3 -m http.server 8000
# depois abra http://localhost:8000/nfc/
```

Abrir o `index.html` direto pelo `file://` também funciona.

---

## O que editar (e onde)

| Quero mudar…                                   | Arquivo                            |
| ---------------------------------------------- | ---------------------------------- |
| Telefone, WhatsApp, e-mail, redes sociais      | `assets/js/site.config.js`         |
| As perguntas sugeridas no chat                 | `assets/js/site.config.js`         |
| O que o assistente sabe responder              | `assets/js/base-conhecimento.js`   |
| Textos das seções, cards e legendas            | `index.html`                       |
| Cores, espaçamentos, tipografia                | `assets/css/styles.css` (bloco 01) |
| As ilustrações da galeria                      | `gerar-ilustracoes.py`             |

### Contato e redes

Tudo vem de `site.config.js`. **Campo vazio some da tela**: se não houver
WhatsApp, o botão "Falar com a gente" vira link de e-mail; se não houver
Instagram, o ícone não é exibido. Nada de link quebrado apontando para `#`.

Os campos marcados com `⚠️ CONFIRMAR` no arquivo ainda precisam dos dados reais.

---

## O assistente de dúvidas

### Como ele funciona hoje

Por padrão o assistente responde **a partir da base local**
(`assets/js/base-conhecimento.js`), com 38 assuntos escritos à mão sobre NFC.

O motor (`assets/js/assistente.js`) normaliza a pergunta (tira acento,
pontuação e palavras de ligação), expande sinônimos (`smartphone` → `celular`,
`cardápio` → `restaurante`), pontua cada assunto pelas palavras em comum — dando
mais peso às raras e às expressões inteiras — e responde o de maior pontuação.
**Se ninguém passar do limiar, ele assume que não sabe** e sugere caminhos, em
vez de inventar uma resposta.

Consequências práticas:

- funciona **offline**, sem servidor e sem chave de API;
- nenhuma pergunta do visitante sai do navegador dele;
- responde em milissegundos e não tem custo por uso;
- só sabe o que está na base — por isso ele diz isso na cara do gol quando não sabe.

### Ensinar um assunto novo

Copie um bloco de `topicos` em `base-conhecimento.js` e preencha:

```js
{
  id: 'identificador-unico',
  titulo: 'Nome do assunto',                    // aparece nas sugestões
  chaves: ['palavra', 'expressão com peso maior'],
  resposta: '<p>HTML curto, sem jargão.</p>',
  veja: ['outro-id', 'mais-um-id']              // sugestões ao final
}
```

Depois rode a bateria de perguntas (abaixo) para conferir que nada se
desencontrou: uma chave genérica demais rouba perguntas de outro assunto.

### Ligar num modelo de linguagem de verdade

Preencha `assistente.endpoint` no `site.config.js` com a URL de um endpoint
**seu** (uma função serverless que guarda a chave de API no servidor — nunca no
navegador). O site envia:

```
POST { pergunta: "...", historico: [{ papel, texto }, ...] }
```

e espera `{ resposta: "texto" }`. Se o endpoint falhar ou demorar mais que
`tempoLimite`, a base local responde no lugar — a página nunca fica muda.

---

## Testes

Bateria de perguntas reais conferindo que cada uma cai no assunto certo
(inclusive as que o assistente **deve** recusar):

```bash
node testes/assistente.test.js
```

---

## Estrutura

```
nfc/
├── index.html                    página única, com SEO e dados estruturados
├── assets/
│   ├── css/styles.css            folha única, dividida em 16 blocos numerados
│   ├── js/site.config.js         ⚙️  todo o conteúdo variável
│   ├── js/base-conhecimento.js   📚 o que o assistente sabe
│   ├── js/assistente.js          motor de busca + interface do chat
│   ├── js/main.js                menu, animações, galeria, rodapé
│   ├── fonts/                    Inter e Sora servidas pelo próprio site
│   └── img/                      ilustrações SVG, ícones e imagem de compartilhamento
├── gerar-ilustracoes.py          regera os SVGs da galeria
├── testes/assistente.test.js     bateria de perguntas do assistente
├── robots.txt · sitemap.xml · site.webmanifest
└── README.md
```

## Decisões de implementação

- **Nenhuma dependência externa.** Sem framework, sem CDN, sem Google Fonts,
  sem rastreador. O navegador baixa só o que está nesta pasta — a página
  carrega rápido e continua funcionando daqui a anos.
- **Acessibilidade:** navegação por teclado na galeria, `aria-live` no chat,
  foco visível, texto alternativo em todas as imagens e um atalho para pular
  ao conteúdo.
- **`prefers-reduced-motion`:** quem pede menos movimento recebe a página
  inteira parada, com todo o conteúdo visível.
- **Imagens em SVG** geradas por script: poucos KB cada, nítidas em qualquer
  tela e fáceis de regerar quando o visual mudar.
