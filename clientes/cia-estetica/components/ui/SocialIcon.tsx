/**
 * Ícones de redes sociais em SVG próprio.
 * O lucide removeu os ícones de marca na versão 1, então mantemos os
 * glifos aqui — sem dependência extra e sem risco de quebra futura.
 */

type SocialName = 'instagram' | 'facebook' | 'youtube' | 'tiktok';

const paths: Record<SocialName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M15.5 8.5h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v7M9 12h3.5" />
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10.5 9.2 15 12l-4.5 2.8V9.2Z" />
    </>
  ),
  tiktok: (
    <path d="M15 3c.4 2.2 1.9 3.7 4 4v3c-1.5 0-2.9-.4-4-1.2V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1A2.9 2.9 0 1 0 12 15V3h3Z" />
  ),
};

export const socialLabels: Record<SocialName, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
};

export function SocialIcon({ name, className }: { name: SocialName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export type { SocialName };
