import {
  BookOpen,
  CalendarDays,
  CircleHelp,
  CirclePlay,
  Info,
  Target,
  Video,
  TriangleAlert
} from "lucide-react";
import type { IconName } from "@/lib/types";

const icons = {
  info: Info,
  target: Target,
  video: Video,
  book: BookOpen,
  help: CircleHelp,
  calendar: CalendarDays,
  play: CirclePlay,
  warning: TriangleAlert
};

export function AppIcon({ name, size = 22 }: { name: IconName; size?: number }) {
  const Icon = icons[name] || Info;
  return <Icon size={size} />;
}
