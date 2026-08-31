import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { courses } from '@/data/courses';
import Link from 'next/link';

export const metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[70vh] items-center overflow-hidden bg-ink py-32 text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 mx-auto size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(198,165,107,0.16),transparent_64%)]"
      />

      <Container className="relative text-center">
        <p className="numeral text-champagne">404</p>
        <h1 className="mx-auto mt-6 max-w-2xl text-[2.2rem] leading-tight sm:text-[3rem]">
          Não encontramos esta página.
        </h1>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-cream/65">
          O endereço pode ter mudado. Continue a partir de um destes caminhos.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="gold" size="lg">
            Voltar ao início
          </Button>
          <Button href="/cursos" variant="outlineLight" size="lg" icon={null}>
            Ver cursos
          </Button>
        </div>

        <nav aria-label="Cursos" className="mt-14">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {courses.map((course) => (
              <li key={course.slug}>
                <Link
                  href={`/cursos/${course.slug}`}
                  className="inline-block py-1.5 text-sm text-cream/50 transition-colors hover:text-champagne-light"
                >
                  {course.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
