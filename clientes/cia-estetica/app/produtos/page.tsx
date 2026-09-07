import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { buildGraph, breadcrumbSchema } from '@/lib/schema';
import { productCategories } from '@/data/products';
import { siteConfig } from '@/data/site';
import { whatsappUrlFor, whatsappMessages } from '@/lib/whatsapp';

export const metadata: Metadata = buildMetadata({
  title: 'Produtos Profissionais de Beleza | Cia Estética RJ',
  description:
    'Cosméticos, insumos para micropigmentação, equipamentos e acessórios profissionais para quem atua na estética. Barra da Tijuca, Rio de Janeiro.',
  path: '/produtos',
  keywords: [
    'produtos profissionais de estética RJ',
    'produtos para micropigmentação Rio de Janeiro',
    'equipamentos de estética Barra da Tijuca',
  ],
});

const trail = [
  { name: 'Início', href: '/' },
  { name: 'Produtos', href: '/produtos' },
];

export default function ProductsPage() {
  const hasStore = siteConfig.store.url.length > 0;
  const href = hasStore ? siteConfig.store.url : whatsappUrlFor('products');

  return (
    <>
      <JsonLd data={buildGraph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow="Produtos profissionais"
        title="Tudo o que o profissional de beleza precisa."
        lead="Além da formação, a Cia Estética também atua com produtos profissionais para quem atende no dia a dia."
        trail={trail}
      >
        <Button
          href={href}
          variant="gold"
          size="lg"
          track={{ event: 'click_products', location: 'products_hero' }}
        >
          {hasStore ? 'Ir para a loja' : 'Consultar produtos'}
        </Button>
      </PageHero>

      <Section tone="cream" space="lg">
        <Container>
          <SectionHeading
            eyebrow="Categorias"
            title="O que você encontra"
            lead="Uma seleção pensada para quem precisa de constância de resultado no atendimento."
            align="center"
            maxWidth="max-w-xl"
          />

          <ul className="mt-16 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, index) => (
              <Reveal
                key={category.name}
                as="li"
                delay={(index % 3) * 100}
                className="bg-white p-8 transition-colors duration-500 hover:bg-cream-warm"
              >
                <Icon name={category.icon} className="size-6 text-champagne-deep" strokeWidth={1.5} />
                <h3 className="mt-6 text-xl">{category.name}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{category.description}</p>
              </Reveal>
            ))}
          </ul>

          {/*
            ⚠️ Enquanto NEXT_PUBLIC_STORE_URL não for preenchida, o site não
            promete um e-commerce que ainda não existe: o botão leva ao WhatsApp.
          */}
          {!hasStore && (
            <Reveal delay={140}>
              <div className="mt-14 border border-champagne/35 bg-white px-7 py-10 text-center sm:px-12">
                <h2 className="text-[1.6rem] leading-snug sm:text-[1.9rem]">
                  Consulte disponibilidade e condições
                </h2>
                <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-muted">
                  Diga qual produto você procura e a equipe informa disponibilidade, valores e formas
                  de retirada ou envio.
                </p>
                <div className="mt-8">
                  <Button
                    href={whatsappUrlFor('products')}
                    variant="primary"
                    size="lg"
                    track={{ event: 'click_products', location: 'products_helper' }}
                  >
                    Falar sobre produtos
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      <CtaBand
        title="Precisa de um produto específico?"
        text="Fale com a equipe da Cia Estética e receba a orientação sobre o que faz sentido para o seu atendimento."
        buttonLabel="Falar sobre produtos"
        message={whatsappMessages.products}
        location="products_footer"
        secondary={{ label: 'Ver cursos', href: '/cursos' }}
      />
    </>
  );
}
