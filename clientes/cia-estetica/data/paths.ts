/** Seção "Escolha seu próximo passo" — três caminhos de entrada na jornada. */

export interface CareerPath {
  step: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  cta: string;
  whatsappMessage: string;
}

export const careerPaths: CareerPath[] = [
  {
    step: '01',
    title: 'Aprender',
    description:
      'Cursos e capacitações para quem deseja começar na área da beleza e construir uma base técnica sólida.',
    icon: 'Sparkles',
    href: '/cursos',
    cta: 'Ver cursos para começar',
    whatsappMessage:
      'Olá! Estou começando na área da beleza e gostaria de conhecer os cursos da Cia Estética.',
  },
  {
    step: '02',
    title: 'Especializar',
    description:
      'Aprofunde seus conhecimentos, domine novas técnicas e amplie o leque de serviços que você oferece.',
    icon: 'Target',
    href: '/cursos',
    cta: 'Ver especializações',
    whatsappMessage:
      'Olá! Já atuo na área e gostaria de conhecer as especializações da Cia Estética.',
  },
  {
    step: '03',
    title: 'Empreender',
    description:
      'Prepare-se para transformar conhecimento em oportunidade profissional e organizar o seu próprio atendimento.',
    icon: 'TrendingUp',
    href: '/cursos',
    cta: 'Quero me profissionalizar',
    whatsappMessage:
      'Olá! Pretendo empreender na área da beleza e gostaria de orientação sobre os cursos da Cia Estética.',
  },
];
