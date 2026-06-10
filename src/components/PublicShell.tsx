import Link from "next/link";
import { BookOpen, MessageCircle, UserCircle } from "lucide-react";
import { getVisiblePages } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

type PublicShellProps = {
  content: SiteContent;
  children: React.ReactNode;
};

export function PublicShell({ content, children }: PublicShellProps) {
  const pages = getVisiblePages(content);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href="/">
            <BookOpen size={30} />
            <span>{content.settings.logoLabel}</span>
          </Link>
          <nav className="desktop-nav" aria-label="Основная навигация">
            {pages.map((page) => (
              <Link href={page.href} key={page.key}>
                {page.navLabel}
              </Link>
            ))}
          </nav>
          <div className="header-icons" aria-label="Быстрые действия">
            <Link href="/quiz" aria-label="Подбор подготовки">
              <MessageCircle size={28} />
            </Link>
            <a
              aria-label="Написать преподавателю"
              href={content.settings.messengers.telegramUrl}
              rel="noreferrer"
              target="_blank"
            >
              <UserCircle size={31} />
            </a>
          </div>
        </div>
        <nav className="mobile-nav-links" aria-label="Мобильная навигация">
          {pages.map((page) => (
            <Link href={page.href} key={page.key}>
              {page.navLabel}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <div className="container footer-inner">
          <Link className="brand" href="/">
            <BookOpen size={26} />
            <span>{content.settings.logoLabel}</span>
          </Link>
          <nav aria-label="Нижняя навигация">
            {pages.slice(1).map((page) => (
              <Link href={page.href} key={page.key}>
                {page.navLabel}
              </Link>
            ))}
          </nav>
          <div className="footer-socials" aria-label="Соцсети">
            <a href={content.settings.messengers.telegramUrl}>TG</a>
            <a href={content.settings.messengers.whatsappUrl}>WA</a>
            <a href={content.settings.messengers.maxUrl}>MAX</a>
          </div>
        </div>
        <div className="container copyright">
          © 2026 {content.settings.siteName}. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
