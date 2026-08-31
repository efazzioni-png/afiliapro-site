import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Course } from '@/data/courses';

/**
 * Card de curso (requisito 42): imagem, badge, categoria, título, descrição,
 * nível e CTA. No hover a imagem cresce, o card sobe e a sombra aparece.
 */
export function CourseCard({
  course,
  className,
  priority = false,
  location = 'course_grid',
}: {
  course: Course;
  className?: string;
  priority?: boolean;
  location?: string;
}) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col border border-ink/10 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[var(--shadow-lift)]',
        className,
      )}
    >
      {/* Imagem */}
      <div className="relative aspect-4/3 overflow-hidden bg-cream-deep">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />

        {course.badge && (
          <span className="absolute left-4 top-4 bg-champagne px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink">
            {course.badge}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em]">
          <span className="text-champagne-deep">{course.category}</span>
          <span className="size-1 rounded-full bg-ink/20" aria-hidden="true" />
          <span className="text-stone">{course.level}</span>
        </div>

        <h3 className="mt-4 text-[1.4rem] leading-snug">
          <Link
            href={`/cursos/${course.slug}`}
            className="before:absolute before:inset-0 before:content-['']"
            data-track-event="click_course"
            data-track-location={location}
            data-track-item={course.name}
          >
            {course.name}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-[0.925rem] leading-relaxed text-ink-muted">
          {course.shortDescription}
        </p>

        <span className="mt-7 inline-flex items-center gap-2 border-t border-ink/10 pt-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-500 group-hover:text-champagne-deep">
          Ver curso
          <ArrowUpRight
            className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
