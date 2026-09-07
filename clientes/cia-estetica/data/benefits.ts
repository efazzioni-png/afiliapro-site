/**
 * "Por que escolher a Cia Estética?" — 6 diferenciais definidos no briefing.
 * `icon` é o nome do ícone do lucide-react (ver components/ui/Icon.tsx).
 */

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    icon: 'Hand',
    title: 'Aprendizado prático',
    description:
      'A técnica se consolida na execução. A formação reserva espaço para praticar com orientação antes de você atender sozinha.',
  },
  {
    icon: 'GraduationCap',
    title: 'Professores preparados',
    description:
      'Ensino conduzido por quem conhece a rotina real do atendimento e traduz a teoria para o dia a dia da profissão.',
  },
  {
    icon: 'Building2',
    title: 'Estrutura profissional',
    description:
      'Ambiente organizado para o aprendizado técnico, no Downtown, um dos endereços mais conhecidos da Barra da Tijuca.',
  },
  {
    icon: 'RefreshCw',
    title: 'Conteúdo atualizado',
    description:
      'O mercado da estética muda rápido. O conteúdo acompanha técnicas, equipamentos e práticas atuais da área.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Ambiente acolhedor',
    description:
      'Turmas em que perguntar é parte do processo. O acolhimento aparece com frequência nas avaliações dos alunos.',
  },
  {
    icon: 'Briefcase',
    title: 'Formação voltada ao mercado',
    description:
      'Além da técnica, o que fazer com ela: atendimento, postura profissional e organização do trabalho.',
  },
];
