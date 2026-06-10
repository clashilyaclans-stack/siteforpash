import Link from "next/link";
import { BookOpen, Home, Newspaper, Settings } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function SiteHeader({ content }: { content: SiteContent }) {
  return (
    <header className="site-topbar">
      <div className="site-container topbar-inner">
        <Link className="site-brand" href="/">
          <BookOpen size={28} />
          <span>{content.settings.logoLabel}</span>
        </Link>
        <nav className="site-nav" aria-label="Навигация сайта">
          <Link href="/">
            <Home size={18} />
            Главная
          </Link>
          <Link href="/articles">
            <Newspaper size={18} />
            Статьи
          </Link>
          <Link href="/studio-panel-2026">
            <Settings size={18} />
            Админка
          </Link>
        </nav>
      </div>
    </header>
  );
}
