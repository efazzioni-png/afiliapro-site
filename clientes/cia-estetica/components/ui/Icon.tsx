/**
 * Mapa explícito de ícones.
 *
 * Importar `* as icons` do lucide traria o pacote inteiro para o bundle.
 * Aqui, apenas os ícones realmente usados são importados — o tree-shaking
 * mantém o JavaScript enxuto (requisito de performance do briefing).
 *
 * Para usar um ícone novo: importe acima e acrescente ao mapa.
 */
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Compass,
  Droplets,
  FlaskConical,
  GraduationCap,
  Hand,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  PenTool,
  Phone,
  Quote,
  RefreshCw,
  Rocket,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export const iconMap = {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Compass,
  Droplets,
  FlaskConical,
  GraduationCap,
  Hand,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  PenTool,
  Phone,
  Quote,
  RefreshCw,
  Rocket,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

/** Renderiza um ícone pelo nome vindo dos arquivos de `data/`. */
export function Icon({ name, className, strokeWidth = 1.5 }: IconProps) {
  const Component = iconMap[name as IconName] ?? Sparkles;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
