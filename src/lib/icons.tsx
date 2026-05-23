import {
  HeartPulse,
  Utensils,
  Users,
  Truck,
  Microscope,
  Home,
  School,
  Flame,
  Globe,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse,
  Utensils,
  Users,
  Truck,
  Microscope,
  Home,
  School,
  Flame,
  Globe,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Globe;
}

export const ICON_OPTIONS = Object.keys(iconMap);
