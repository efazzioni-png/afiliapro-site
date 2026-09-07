/**
 * ============================================================================
 *  FAQ
 * ============================================================================
 *  As respostas foram escritas para NÃO afirmar nada que não tenha sido
 *  confirmado (preço, carga horária, certificado, calendário). Onde a
 *  informação não existe, a resposta encaminha para o WhatsApp — o que também
 *  é a rota de conversão desejada.
 *
 *  Este array alimenta a página /faq, a seção de FAQ da home E o JSON-LD
 *  FAQPage. Editar aqui atualiza os três.
 * ============================================================================
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'Quais cursos a Cia Estética oferece?',
    answer:
      'A escola trabalha com formações em Remoção de Tatuagem a Laser, Despigmentação, Micropigmentação, Depilação, Estética Avançada e Tecnologias Estéticas. Cada área tem uma página com os detalhes, e a equipe informa pelo WhatsApp quais turmas estão abertas no momento.',
  },
  {
    question: 'Onde ficam os cursos?',
    answer:
      'Na unidade da Cia Estética no Condomínio Downtown, Bloco 6, Portaria D — Av. das Américas, 500, Sala 304, Barra da Tijuca, Rio de Janeiro (CEP 22640-100).',
  },
  {
    question: 'Os cursos possuem aulas práticas?',
    answer:
      'A prática é parte central da proposta da escola. Em avaliações públicas no Google, alunos relatam a realização de atendimentos acompanhados durante o curso. O formato de cada turma é confirmado pela equipe no momento da matrícula.',
  },
  {
    question: 'Como faço minha matrícula?',
    answer:
      'O caminho mais rápido é falar com a equipe pelo WhatsApp. Você recebe as informações da turma vigente, tira suas dúvidas e faz a reserva da vaga com orientação direta.',
  },
  {
    question: 'Como saber as próximas turmas?',
    answer:
      'O calendário de turmas é informado diretamente pela equipe, porque as datas mudam ao longo do ano. Chame no WhatsApp e você recebe as próximas datas disponíveis.',
  },
  {
    question: 'Como falar com a equipe?',
    answer:
      'Pelo WhatsApp, pelo telefone (21) 2669-0788 ou pelo formulário desta página. O atendimento acontece de segunda a sexta, das 09h às 18h.',
  },
  {
    question: 'A Cia Estética vende produtos profissionais?',
    answer:
      'Sim. A Cia Estética também atua com produtos profissionais de beleza — cosméticos, itens para micropigmentação, produtos para estética, equipamentos e acessórios. Consulte a disponibilidade pelo WhatsApp.',
  },
  {
    question: 'Como chegar à unidade?',
    answer:
      'A unidade fica no Condomínio Downtown, na Av. das Américas, 500, Barra da Tijuca — um endereço de referência na região, com acesso pela Portaria D do Bloco 6. O botão "Como chegar" abre a rota direta no seu aplicativo de mapas.',
  },
];

/** FAQ resumido exibido na home (as demais perguntas ficam em /faq). */
export const homeFaqs = faqs.slice(0, 6);
