# Conteúdo pendente — Cia Estética

Este documento lista **tudo o que não pôde ser confirmado** durante a construção do site.

O princípio adotado foi simples: **nada foi inventado.** Onde a informação não existia,
o site ou omite o campo, ou mostra "sob consulta" com um caminho para o WhatsApp —
o que, na prática, também gera contato.

O site está funcional e pode ser apresentado como está. Os itens marcados com 🔴
precisam ser resolvidos **antes de colocar no ar**.

---

## 🔴 Bloqueadores para publicação

### 1. Número de WhatsApp
- **Situação:** não informado. Hoje o site usa os dígitos do telefone fixo
  (`552126690788`) como marcador, para que os links já fiquem estruturalmente corretos.
- **Impacto:** é o CTA principal do site inteiro. Um fixo não recebe WhatsApp.
- **Como resolver:** `NEXT_PUBLIC_WHATSAPP_NUMBER=55DDDNÚMERO` no `.env.local`,
  ou `contact.whatsapp` em `data/site.ts`.

### 2. Razão social e CNPJ
- **Situação:** aparecem como `[RAZÃO SOCIAL A CONFIRMAR]` e `[CNPJ A CONFIRMAR]`
  na Política de Privacidade.
- **Impacto:** exigência da LGPD — o titular precisa saber quem controla seus dados.
- **Como resolver:** `data/legal.ts` → `legalEntity`.

### 3. Revisão jurídica dos textos legais
- **Situação:** Política de Privacidade e Termos de Uso foram escritos como base
  sólida e alinhada à LGPD, mas **não substituem revisão de um advogado**.
- **Como resolver:** revisar `data/legal.ts`.

---

## 🟡 Recomendados antes de publicar

### 4. Horário de atendimento
- **Situação:** "segunda a sexta, 09h às 18h" é a informação pública, descrita como
  aproximada. O site exibe o aviso "Horário aproximado — confirme pelo WhatsApp".
- **Como resolver:** `data/site.ts` → `hours`. Esvazie `note` para remover o aviso;
  ajuste `schema` (formato Schema.org) junto, pois alimenta o Google.

### 5. Ano de atuação (2013)
- **Situação:** número informado no briefing, exibido na barra de autoridade, mas não
  verificado em fonte pública.
- **Como resolver:** `data/site.ts` → `stats`. Para remover o indicador, apague o objeto.

### 6. Título da barra de autoridade
- **Situação:** o briefing sugeria *"Uma escolha de milhares de profissionais"*. Como o
  número de alunos não foi confirmado — e a regra 47 do próprio briefing proíbe inventar
  números de alunos — usamos **"A escolha de centenas de profissionais da beleza"**,
  que se sustenta nas 546 avaliações públicas do Google.
- **Como resolver:** confirmando o volume de alunos, edite `authorityHeadline`
  em `data/about.ts`.

### 7. Redes sociais
- **Situação:** nenhum perfil confirmado. Todos os campos estão vazios e, por isso,
  **nenhum ícone é renderizado** — nada falso vai ao ar.
- **Como resolver:** `NEXT_PUBLIC_INSTAGRAM_URL` etc., ou `social` em `data/site.ts`.
  Ao preencher, os ícones aparecem no rodapé e na página de contato.

### 8. E-mail oficial
- **Situação:** não informado. O campo não aparece no site.
- **Como resolver:** `NEXT_PUBLIC_CONTACT_EMAIL`.

### 9. Fotos oficiais
- **Situação:** as imagens são composições abstratas geradas em código, na paleta da
  marca. Elegantes e coerentes, mas **não são fotos da escola**.
- **Impacto:** fotos reais de aulas práticas, da estrutura e da equipe aumentam
  bastante a conversão de um site de escola.
- **Como resolver:** substituir os arquivos em `public/images/` mantendo os nomes
  (tamanhos na seção 5 do README) e atualizar os textos `imageAlt` nos arquivos de dados.
- **Sugestão de pauta fotográfica:** aula prática em andamento · professora orientando
  aluna · equipamento de laser em uso · procedimento de micropigmentação em detalhe ·
  recepção e ambiente · turma reunida · produtos profissionais.

### 10. Logotipo oficial
- **Situação:** o site usa um wordmark tipográfico provisório desenhado para o projeto.
- **Como resolver:** ver "Trocar o logotipo" no README.

---

## 🟢 Enriquecem o site (podem entrar depois)

### 11. Dados de cada curso
Nenhum destes foi informado. Enquanto estiverem vazios, o site exibe **"Sob consulta"**
e leva ao WhatsApp — o que preserva a honestidade e ainda gera contato.

| Campo                    | Onde editar                  |
|--------------------------|------------------------------|
| Carga horária            | `data/courses.ts` → `duration` |
| Formato (presencial etc.)| `data/courses.ts` → `format`   |
| Certificado              | `data/courses.ts` → `certificate` |
| Investimento             | `data/courses.ts` → `price`    |
| Conteúdo programático    | `data/courses.ts` → `syllabus` |

### 12. Validação pedagógica do "O que você aprende"
- **Situação:** a lista de competências de cada curso foi escrita a partir do que essas
  técnicas envolvem no mercado. **Precisa ser validada pela coordenação** para refletir
  exatamente o que a Cia Estética ensina.
- **Como resolver:** `data/courses.ts` → `learnings`.

### 13. Nomes dos autores dos depoimentos
- **Situação:** as 3 avaliações são reais, mas vieram sem nome. O site exibe
  "Avaliação no Google" em vez de inventar um nome.
- **Como resolver:** `data/testimonials.ts` → `author`.
- **Sugestão:** acrescentar mais avaliações do Google (com nome e curso) fortalece
  muito a seção — hoje são apenas 3 de 546 disponíveis.

### 14. Coordenadas de latitude e longitude
- **Situação:** omitidas do JSON-LD para não arriscar um pin errado. O mapa e o
  "Como chegar" funcionam normalmente por endereço.
- **Como resolver:** ver seção 6 do README.

### 15. Link do e-commerce
- **Situação:** não informado. Todos os botões de produto apontam para o WhatsApp.
- **Como resolver:** `NEXT_PUBLIC_STORE_URL`. Ao preencher, os botões passam a apontar
  para a loja automaticamente.

### 16. IDs de analytics
- **Situação:** nenhum configurado — nenhum script de rastreamento é carregado.
- **Como resolver:** ver seção 7 do README.

### 17. Novos artigos do blog
- **Situação:** 5 artigos completos, otimizados para SEO, já publicados.
- **Sugestão:** um artigo novo por mês sustenta o crescimento orgânico. Ver README,
  seção "Publicar um artigo no blog".

---

## Fontes utilizadas

Todo o conteúdo factual do site veio de **duas fontes apenas**:

1. O briefing fornecido pelo cliente (nome, endereço, telefone, categoria, avaliação
   4,9, 546 avaliações, as seis áreas de formação e as três avaliações de alunos).
2. As três avaliações reais citadas no briefing.

O site oficial (ciaestetica.com) **não pôde ser consultado** — o ambiente de
desenvolvimento bloqueia o acesso ao domínio — e a busca pública não retornou dados
adicionais verificáveis. Por isso, nada além do briefing foi assumido como fato.
