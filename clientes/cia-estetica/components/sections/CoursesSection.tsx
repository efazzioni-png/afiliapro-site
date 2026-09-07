import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/CourseCard';
import { courses } from '@/data/courses';
import { whatsappUrlFor } from '@/lib/whatsapp';

/**
 * Vitrine de cursos (requisito 11).
 * Mobile: carrossel com snap. Desktop: grade de três colunas.
 */
export function CoursesSection() {
  return (
    <Section tone="deep" space="lg" id="cursos">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Formações"
            title="Cursos para levar sua carreira ao próximo nível"
            lead="Seis áreas de formação, do primeiro passo na profissão à especialização técnica."
            maxWidth="max-w-2xl"
          />
          <Reveal delay={200} className="shrink-0">
            <Button href="/cursos" variant="outline" size="md">
              Ver todos os cursos
            </Button>
          </Reveal>
        </div>

        {/* Carrossel no mobile / grade no desktop */}
        <div className="no-scrollbar mt-14 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-7 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Reveal
              key={course.slug}
              delay={(index % 3) * 110}
              className="w-[80vw] max-w-[21rem] shrink-0 snap-start sm:w-[58vw] md:w-auto md:max-w-none"
            >
              <CourseCard course={course} priority={index < 3} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-12 flex flex-col items-start gap-4 border-t border-ink/10 pt-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <span>Não sabe qual curso combina com o seu momento? A equipe te orienta.</span>
            <Button
              href={whatsappUrlFor('courses')}
              variant="ghost"
              size="link"
              track={{ event: 'click_whatsapp', location: 'courses_section' }}
            >
              Quero saber mais
            </Button>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
