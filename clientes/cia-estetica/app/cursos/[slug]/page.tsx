import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, Clock, GraduationCap, MapPin, Users } from 'lucide-react';

import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { CourseCard } from '@/components/CourseCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { ContactForm } from '@/components/ContactForm';
import { CtaBand } from '@/components/sections/CtaBand';
import { TrackView } from '@/components/analytics/TrackingProvider';

import { courses, getCourseBySlug, getRelatedCourses } from '@/data/courses';
import { getTestimonialsForCourse } from '@/data/testimonials';
import { siteConfig, addressLines } from '@/data/site';
import { courseMessage } from '@/lib/whatsapp';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, breadcrumbSchema, courseSchema, faqSchema } from '@/lib/schema';

/** Gera as rotas estáticas de todos os cursos em tempo de build. */
export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return buildMetadata({
      title: 'Curso não encontrado',
      description: 'O curso que você procura não está disponível.',
      path: `/cursos/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: course.seo.title,
    description: course.seo.description,
    path: `/cursos/${course.slug}`,
    keywords: course.seo.keywords,
    image: course.image,
  });
}

/** Item de metadados do curso. Mostra "Sob consulta" quando o dado não foi confirmado. */
function MetaItem({
  icon: IconComponent,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex gap-4 border-t border-ink/10 py-5">
      <IconComponent className="mt-0.5 size-5 shrink-0 text-champagne-deep" strokeWidth={1.5} aria-hidden="true" />
      <div>
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-stone">
          {label}
        </dt>
        <dd className="mt-1.5 text-[0.95rem] text-ink">{value ?? 'Sob consulta'}</dd>
      </div>
    </div>
  );
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const related = getRelatedCourses(course.slug);
  const testimonials = getTestimonialsForCourse(course.name);
  const message = courseMessage(course.name);

  const trail = [
    { name: 'Início', href: '/' },
    { name: 'Cursos', href: '/cursos' },
    { name: course.name, href: `/cursos/${course.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={buildGraph(
          breadcrumbSchema(trail),
          courseSchema(course),
          ...(course.faq.length > 0 ? [faqSchema(course.faq)] : []),
        )}
      />
      <TrackView event="view_course" item={course.name} />

      <PageHero
        eyebrow={`${course.category} · ${course.level}`}
        title={course.name}
        lead={course.intro}
        trail={trail}
      >
        <Button
          href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`}
          variant="gold"
          size="lg"
          track={{ event: 'click_whatsapp', location: 'course_hero', item: course.name }}
        >
          Quero saber mais
        </Button>
        <Button href="#formulario" variant="outlineLight" size="lg" icon={null}>
          Falar com a equipe
        </Button>
      </PageHero>

      {/* ---------- Apresentação + ficha técnica ---------- */}
      <Section tone="cream" space="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Reveal direction="scale">
                <div className="relative aspect-3/2 w-full overflow-hidden bg-cream-deep">
                  <Image
                    src={course.image}
                    alt={course.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <div className="mt-12">
                {course.body.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={index * 80}>
                    <p className="mb-5 text-[1.0625rem] leading-[1.75] text-ink-muted last:mb-0">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* Para quem é */}
              <Reveal>
                <h2 className="mt-14 text-[1.75rem] sm:text-[2rem]">Para quem é este curso</h2>
              </Reveal>
              <ul className="mt-7 space-y-3.5">
                {course.audience.map((item, index) => (
                  <Reveal key={item} as="li" delay={index * 70} className="flex gap-3.5">
                    <Check className="mt-1 size-4 shrink-0 text-champagne-deep" strokeWidth={2} aria-hidden="true" />
                    <span className="leading-relaxed text-ink-muted">{item}</span>
                  </Reveal>
                ))}
              </ul>

              {/* O que você aprende */}
              <Reveal>
                <h2 className="mt-14 text-[1.75rem] sm:text-[2rem]">O que você aprende</h2>
              </Reveal>
              <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {course.learnings.map((item, index) => (
                  <Reveal key={item} as="li" delay={(index % 2) * 70} className="flex gap-3.5">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-champagne"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-ink-muted">{item}</span>
                  </Reveal>
                ))}
              </ul>

              {/* Conteúdo programático */}
              <Reveal>
                <h2 className="mt-14 text-[1.75rem] sm:text-[2rem]">Conteúdo programático</h2>
              </Reveal>

              {course.syllabus.length > 0 ? (
                <ol className="mt-7 space-y-px overflow-hidden border border-ink/10 bg-ink/10">
                  {course.syllabus.map((module, index) => (
                    <Reveal key={module.title} as="li" delay={index * 70} className="bg-white p-7">
                      <div className="flex items-baseline gap-4">
                        <span className="numeral text-sm text-champagne">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-xl">{module.title}</h3>
                      </div>
                      <ul className="mt-4 space-y-2 pl-10">
                        {module.topics.map((topic) => (
                          <li key={topic} className="text-[0.95rem] leading-relaxed text-ink-muted">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  ))}
                </ol>
              ) : (
                /* Nenhum conteúdo programático oficial foi fornecido pela escola.
                   Em vez de inventar módulos, o bloco vira um ponto de conversão. */
                <Reveal>
                  <div className="mt-7 border border-champagne/35 bg-white p-8 sm:p-10">
                    <p className="leading-relaxed text-ink-muted">
                      O conteúdo programático completo, a carga horária e o calendário da próxima
                      turma são enviados pela equipe da Cia Estética, porque variam conforme a turma
                      em andamento.
                    </p>
                    <div className="mt-7">
                      <Button
                        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`}
                        variant="primary"
                        size="md"
                        iconLeft="MessageCircle"
                        icon={null}
                        track={{ event: 'click_whatsapp', location: 'course_syllabus', item: course.name }}
                      >
                        Receber o conteúdo do curso
                      </Button>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* ---------- Coluna lateral ---------- */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal direction="right">
                <div className="border border-ink/10 bg-white p-8">
                  <h2 className="text-[1.35rem]">Informações do curso</h2>

                  <dl className="mt-6">
                    <MetaItem icon={GraduationCap} label="Nível" value={course.level} />
                    <MetaItem icon={Clock} label="Carga horária" value={course.duration} />
                    <MetaItem icon={Users} label="Formato" value={course.format} />
                    <MetaItem icon={Check} label="Certificado" value={course.certificate} />
                    <MetaItem icon={MapPin} label="Onde" value={addressLines.slice(1, 3).join(' — ')} />
                  </dl>

                  <div className="mt-8 border-t border-ink/10 pt-7">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-stone">
                      Investimento
                    </p>
                    <p className="mt-2 font-display text-2xl text-ink">
                      {course.price ?? 'Sob consulta'}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-stone">
                      Valores e condições são informados diretamente pela equipe.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <Button
                      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`}
                      variant="primary"
                      size="lg"
                      fullWidth
                      iconLeft="MessageCircle"
                      icon={null}
                      track={{ event: 'click_whatsapp', location: 'course_sidebar', item: course.name }}
                    >
                      Falar no WhatsApp
                    </Button>
                    <Button
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      variant="outline"
                      size="lg"
                      fullWidth
                      icon={null}
                      iconLeft="Phone"
                      track={{ event: 'click_phone', location: 'course_sidebar' }}
                    >
                      {siteConfig.contact.phone}
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- Depoimentos ---------- */}
      <Section tone="deep" space="md">
        <Container>
          <SectionHeading
            eyebrow="Depoimentos"
            title="O que dizem os alunos"
            lead="Avaliações publicadas no Google por quem estudou na Cia Estética."
            align="center"
            maxWidth="max-w-xl"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.quote} delay={index * 110}>
                <TestimonialCard testimonial={testimonial} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- FAQ ---------- */}
      {course.faq.length > 0 && (
        <Section tone="white" space="md">
          <Container size="narrow">
            <SectionHeading
              eyebrow="Dúvidas"
              title={`Perguntas sobre ${course.name}`}
              align="center"
              maxWidth="max-w-xl"
            />
            <div className="mt-10">
              <Accordion items={course.faq} />
            </div>
          </Container>
        </Section>
      )}

      {/* ---------- Formulário ---------- */}
      <Section tone="cream" space="lg" id="formulario">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Contato"
            title="Quer saber mais sobre este curso?"
            lead="Preencha os campos e a equipe entra em contato com as informações da próxima turma."
            align="center"
            maxWidth="max-w-xl"
          />
          <div className="mt-12">
            <ContactForm defaultInterest={course.name} />
          </div>
        </Container>
      </Section>

      {/* ---------- Cursos relacionados ---------- */}
      <Section tone="white" space="md">
        <Container>
          <SectionHeading eyebrow="Continue explorando" title="Outros cursos da Cia Estética" />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 110}>
                <CourseCard course={item} location="related_courses" className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Pronta para começar?"
        text={`Fale com a equipe da Cia Estética sobre o curso de ${course.name} e conheça as turmas disponíveis.`}
        message={message}
        location="course_footer"
        secondary={{ label: 'Ver todos os cursos', href: '/cursos' }}
      />
    </>
  );
}
