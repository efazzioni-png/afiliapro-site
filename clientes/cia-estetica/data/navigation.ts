/** Navegação do header, do menu mobile e do footer. */

export interface NavItem {
  label: string;
  href: string;
}

/** Menu principal (header + menu mobile). */
export const mainNav: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Depoimentos', href: '/depoimentos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
];

/** Links extras que aparecem apenas no menu mobile e no footer. */
export const secondaryNav: NavItem[] = [
  { label: 'Produtos', href: '/produtos' },
  { label: 'Perguntas frequentes', href: '/faq' },
];

export const legalNav: NavItem[] = [
  { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
  { label: 'Termos de Uso', href: '/termos-de-uso' },
];
