import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import { siteConfig, maps } from '@/data/site';

/** Bloco de prova social do Google (requisito 16). */
export function GoogleReviews() {
  const rating = siteConfig.reviews.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 });

  return (
    <section className="bg-cream-deep pb-20 sm:pb-28" aria-labelledby="google-reviews">
      <Container>
        <Reveal direction="scale">
          <div className="grain relative overflow-hidden border border-champagne/30 bg-white px-6 py-14 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(198,165,107,0.14),transparent_65%)]"
            />

            <div className="relative">
              <StarRating
                rating={siteConfig.reviews.rating}
                size="lg"
                className="justify-center"
                label={`Avaliação ${rating} de 5 no Google`}
              />

              <h2 id="google-reviews" className="mt-7 text-[2.1rem] leading-tight sm:text-[2.8rem]">
                <span className="text-champagne-deep">{rating}</span> de 5 no Google
              </h2>

              <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ink-muted">
                Mais de {siteConfig.reviews.displayCount.replace('+', '')} pessoas já compartilharam
                suas experiências com a Cia Estética.
              </p>

              <div className="mt-9">
                <Button
                  href={maps.reviews}
                  variant="outline"
                  size="lg"
                  icon="ArrowUpRight"
                  track={{ event: 'click_maps', location: 'google_reviews' }}
                >
                  Ver avaliações
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
