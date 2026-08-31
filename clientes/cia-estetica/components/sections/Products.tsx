import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { productCategories } from '@/data/products';
import { siteConfig } from '@/data/site';
import { whatsappUrlFor } from '@/lib/whatsapp';

/**
 * Loja / produtos (requisito 18).
 *
 * O botão aponta para a loja quando `siteConfig.store.url` estiver preenchido
 * e, enquanto isso, cai no WhatsApp. Nenhuma alteração de componente será
 * necessária quando o e-commerce entrar no ar.
 */
export function Products() {
  const hasStore = siteConfig.store.url.length > 0;
  const href = hasStore ? siteConfig.store.url : whatsappUrlFor('products');

  return (
    <Section tone="white" space="lg" id="produtos">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Produtos profissionais"
              title="Tudo o que o profissional de beleza precisa."
              lead="Além da formação, a Cia Estética também atua com produtos profissionais para quem atende no dia a dia."
              maxWidth="max-w-md"
            />

            <Reveal delay={240}>
              <div className="mt-10">
                <Button
                  href={href}
                  variant="primary"
                  size="lg"
                  track={{ event: 'click_products', location: 'products_section' }}
                >
                  Conhecer produtos
                </Button>
                {!hasStore && (
                  <p className="mt-4 max-w-xs text-xs leading-relaxed text-stone">
                    Consulte disponibilidade e condições diretamente com a equipe.
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          <ul className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {productCategories.map((category, index) => (
              <Reveal
                key={category.name}
                as="li"
                delay={(index % 2) * 90}
                className="group bg-white p-7 transition-colors duration-500 hover:bg-cream"
              >
                <Icon
                  name={category.icon}
                  className="size-6 text-champagne-deep"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 text-lg">{category.name}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-muted">
                  {category.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
