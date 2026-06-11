import Link from "next/link";
import { BookOpen, Home, Newspaper, Settings } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function SiteHeader({ content }: { content: SiteContent }) {
  return (
    <header className="site-topbar">
      <div className="site-container topbar-inner">
        <Link className="site-brand" href="/" aria-label="На главную">
          <BookOpen size={26} />
          <span>{content.settings.logoLabel}</span>
        </Link>
        <nav className="site-nav" aria-label="Навигация сайта">
          <Link href="/">
            <Home size={17} />
            Главная
          </Link>
          <Link href="/articles">
            <Newspaper size={17} />
            Журнал
          </Link>
          <Link href="/studio-panel-2026">
            <Settings size={17} />
            Админка
          </Link>
        </nav>
      </div>
    </header>
  );
}
