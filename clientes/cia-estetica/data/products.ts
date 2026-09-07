/**
 * ============================================================================
 *  PRODUTOS / LOJA
 * ============================================================================
 *  ✅ CONFIRMADO: as categorias abaixo foram informadas no briefing.
 *  ⚠️ PENDENTE: o link do e-commerce. Enquanto `siteConfig.store.url` estiver
 *     vazio, os botões apontam para o WhatsApp. Preenchendo a URL (ou a
 *     variável NEXT_PUBLIC_STORE_URL), todos os botões passam a apontar para a
 *     loja automaticamente — sem alterar componente algum.
 * ============================================================================
 */

export interface ProductCategory {
  name: string;
  description: string;
  icon: string;
}

export const productCategories: ProductCategory[] = [
  {
    name: 'Cosméticos',
    description: 'Linha profissional para uso em cabine e indicação pós-procedimento.',
    icon: 'Droplets',
  },
  {
    name: 'Micropigmentação',
    description: 'Pigmentos, agulhas e insumos para o trabalho do dia a dia.',
    icon: 'PenTool',
  },
  {
    name: 'Produtos para estética',
    description: 'Itens de apoio para protocolos faciais e corporais.',
    icon: 'FlaskConical',
  },
  {
    name: 'Equipamentos',
    description: 'Tecnologia para quem quer ampliar os serviços do próprio espaço.',
    icon: 'Zap',
  },
  {
    name: 'Acessórios',
    description: 'Do descartável ao mobiliário de apoio para o atendimento.',
    icon: 'Package',
  },
  {
    name: 'Produtos profissionais',
    description: 'Seleção voltada a quem atende e precisa de constância de resultado.',
    icon: 'BadgeCheck',
  },
];
