import Link from "next/link";
import { getVisiblePages } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

export function SiteHeader({ content }: { content: SiteContent }) {
  const pages = getVisiblePages(content);

  return (
    <header className="site-topbar">
      <div className="site-container topbar-inner">
        <Link className="site-brand" href="/" aria-label="На главную">
          <span>{content.settings.logoLabel}</span>
        </Link>
        <nav className="site-nav" aria-label="Навигация сайта">
          {pages.map((page) => (
            <Link href={page.href} key={page.key}>
              {page.navLabel}
            </Link>
          ))}
          <Link href="/studio-panel-2026">
            {content.ui.adminNavLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
