import Image from 'next/image';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { getFeaturedCourse } from '@/data/courses';

/**
 * Destaque — Remoção de Tatuagem (requisito 12).
 *
 * Linguagem deliberadamente responsável: fala de aprendizado e possibilidades
 * profissionais, sem prometer renda, sem prometer resultado e sem qualquer
 * alegação médica.
 */
export function FeaturedCourse() {
  const course = getFeaturedCourse();
  const highlights = course.learnings.slice(0, 5);

  return (
    <section className="grain relative overflow-hidden bg-ink text-cream">
      <div className="grid lg:grid-cols-2">
        {/* Imagem */}
        <Reveal direction="left" className="relative min-h-[22rem] lg:min-h-[42rem]">
          <Image
            src={course.image}
            alt={course.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-ink/10 lg:to-ink"
          />
        </Reveal>

        {/* Texto */}
        <div className="flex items-center px-5 py-20 sm:px-10 lg:px-16 lg:py-32 xl:px-24">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow text-champagne">Curso em destaque</p>
            </Reveal>

            <Reveal delay={90}>
              <h2 className="mt-6 text-[2.1rem] leading-[1.1] sm:text-[2.7rem] lg:text-[3rem]">
                Especialização que abre novas possibilidades profissionais
              </h2>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-cream/70">
                A formação em <strong className="font-medium text-cream">remoção de tatuagem a laser</strong>{' '}
                é uma das especializações mais procuradas por quem já atua na beleza. Ela exige
                critério técnico — e é justamente aí que o aprendizado prático faz diferença.
              </p>
            </Reveal>

            <Reveal delay={230}>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-cream/70">
                Aqui você estuda a técnica com acompanhamento, entende como avaliar cada caso antes
                de iniciar e desenvolve a segurança necessária para conduzir o procedimento.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-3.5">
              {highlights.map((item, index) => (
                <Reveal key={item} as="li" delay={280 + index * 70} className="flex gap-3.5">
                  <Check
                    className="mt-0.5 size-[1.05rem] shrink-0 text-champagne"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="text-[0.95rem] leading-relaxed text-cream/75">{item}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={640}>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={`/cursos/${course.slug}`}
                  variant="gold"
                  size="lg"
                  track={{ event: 'click_course', location: 'featured', item: course.name }}
                >
                  Conhecer o curso
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
