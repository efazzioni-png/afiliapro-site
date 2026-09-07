import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/CourseCard';
import { Benefits } from '@/components/sections/Benefits';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildGraph, breadcrumbSchema, courseListSchema, courseSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { courses } from '@/data/courses';
import { whatsappUrlFor, whatsappMessages } from '@/lib/whatsapp';

export const metadata: Metadata = buildMetadata({
  title: 'Cursos de Estética na Barra da Tijuca | Escola Cia Estética RJ',
  description:
    'Cursos profissionalizantes de estética no Rio de Janeiro: remoção de tatuagem a laser, micropigmentação, despigmentação, depilação e estética avançada.',
  path: '/cursos',
  keywords: [
    'cursos de estética na Barra da Tijuca',
    'curso profissionalizante de estética RJ',
    'escola de estética no Rio de Janeiro',
    'cursos de beleza Barra da Tijuca',
  ],
});

const trail = [
  { name: 'Início', href: '/' },
  { name: 'Cursos', href: '/cursos' },
];

export default function CoursesPage() {
  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail), courseListSchema(), ...courses.map(courseSchema))} />

      <PageHero
        eyebrow="Formações"
        title="Cursos para levar sua carreira ao próximo nível"
        lead="Seis áreas de formação profissional em estética e beleza, do primeiro passo na profissão à especialização técnica. Turmas presenciais na Barra da Tijuca, Rio de Janeiro."
        trail={trail}
      >
        <Button
          href={whatsappUrlFor('courses')}
          variant="gold"
          size="lg"
          track={{ event: 'click_whatsapp', location: 'courses_page_hero' }}
        >
          Quero saber mais
        </Button>
        <Button href="#lista" variant="outlineLight" size="lg" icon={null}>
          Ver cursos
        </Button>
      </PageHero>

      <Section tone="cream" space="lg" id="lista">
        <Container>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <Reveal key={course.slug} delay={(index % 3) * 110}>
                <CourseCard
                  course={course}
                  priority={index < 3}
                  location="courses_page"
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-16 border border-champagne/35 bg-white px-7 py-10 text-center sm:px-12">
              <h2 className="text-[1.6rem] leading-snug sm:text-[2rem]">
                Não sabe qual curso escolher?
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-muted">
                Cada momento profissional pede um caminho diferente. Conte para a equipe onde você
                está hoje e receba uma orientação sobre a formação mais adequada — sem compromisso.
              </p>
              <div className="mt-8">
                <Button
                  href={whatsappUrlFor('schedule')}
                  variant="primary"
                  size="lg"
                  track={{ event: 'click_whatsapp', location: 'courses_page_helper' }}
                >
                  Falar com a equipe
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Benefits />
      <HowItWorks />

      <CtaBand
        title="Seu próximo nível começa aqui."
        text="Fale com a equipe da Cia Estética e conheça as turmas abertas para a formação que você escolher."
        message={whatsappMessages.schedule}
        location="courses_page_footer"
        secondary={{ label: 'Ver depoimentos', href: '/depoimentos' }}
      />
    </>
  );
}
