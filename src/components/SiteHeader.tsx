import Link from "next/link";
import { BookOpen, Home, Newspaper, Settings } from "lucide-react";
import { getVisiblePages } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

export function SiteHeader({ content }: { content: SiteContent }) {
  const pages = getVisiblePages(content);

  return (
    <header className="site-topbar">
      <div className="site-container topbar-inner">
        <Link className="site-brand" href="/" aria-label="На главную">
          <BookOpen size={26} />
          <span>{content.settings.logoLabel}</span>
        </Link>
        <nav className="site-nav" aria-label="Навигация сайта">
          {pages.map((page) => {
            const Icon = page.key === "articles" ? Newspaper : Home;

            return (
              <Link href={page.href} key={page.key}>
                <Icon size={17} />
                {page.navLabel}
              </Link>
            );
          })}
          <Link href="/studio-panel-2026">
            <Settings size={17} />
            {content.ui.adminNavLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
