import Link from "next/link";
import { Send } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const nav = [
  ["Главная", "/"],
  ["Бесплатные материалы", "/materials"],
  ["Кабинет ученика", "/cabinet"],
  ["Обо мне", "/about"],
  ["Контакты", "/contacts"]
];

export function Header({ logo }: { logo: string }) {
  return (
    <header className="site-header">
      <Link className="logo" href="/">
        <span>{logo}</span>
      </Link>
      <nav>
        {nav.map(([label, href]) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="round-link" href="/contacts" aria-label="Telegram">
          <Send size={17} />
        </Link>
        <Link className="primary-small" href="/consultation">
          Записаться
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}

export function Footer({ brand, logo }: { brand: string; logo: string }) {
  return (
    <footer className="site-footer">
      <div>
        <Link className="logo" href="/">
          <span>{logo}</span>
        </Link>
        <p>{brand}. Профориентация и обучение для школьников и студентов.</p>
      </div>
      <div>
        <strong>Навигация</strong>
        {nav.map(([label, href]) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </div>
      <div>
        <strong>Материалы</strong>
        <Link href="/materials">Все статьи</Link>
        <Link href="/consultation">Консультация</Link>
        <Link href="/cabinet">Код доступа</Link>
      </div>
      <div>
        <strong>Контакты</strong>
        <a href="mailto:example@mail.com">example@mail.com</a>
        <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
        <a href="https://vk.com/" target="_blank" rel="noreferrer">VK</a>
      </div>
    </footer>
  );
}
