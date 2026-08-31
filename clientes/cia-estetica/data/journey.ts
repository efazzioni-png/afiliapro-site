/** Seção "Como funciona" — jornada da matrícula. */

export interface JourneyStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const journeySteps: JourneyStep[] = [
  {
    number: '01',
    title: 'Escolha seu curso',
    description: 'Veja as áreas de formação e identifique qual combina com o seu momento profissional.',
    icon: 'Search',
  },
  {
    number: '02',
    title: 'Fale com nossa equipe',
    description: 'Tire dúvidas sobre formato, turmas e pré-requisitos direto pelo WhatsApp.',
    icon: 'MessageCircle',
  },
  {
    number: '03',
    title: 'Faça sua matrícula',
    description: 'A equipe orienta você sobre as condições e reserva a sua vaga na turma.',
    icon: 'ClipboardCheck',
  },
  {
    number: '04',
    title: 'Aprenda na prática',
    description: 'Estude a técnica e exercite com acompanhamento até ganhar segurança.',
    icon: 'Hand',
  },
  {
    number: '05',
    title: 'Comece sua nova jornada',
    description: 'Saia preparada para atender, com método e postura profissional.',
    icon: 'Rocket',
  },
];
