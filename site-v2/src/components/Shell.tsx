"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import type { NavItem } from "@/lib/types";
import { ThemeSwitcher } from "./ThemeSwitcher";

function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("8") ? `tel:+7${digits.slice(1)}` : `tel:+${digits}`;
}

export function Header({
  contactPhone,
  headerButtonText,
  logo,
  menuCloseLabel,
  menuOpenLabel,
  navItems,
  phoneButtonLabel
}: {
  contactPhone: string;
  headerButtonText: string;
  logo: string;
  menuCloseLabel: string;
  menuOpenLabel: string;
  navItems: NavItem[];
  phoneButtonLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="logo" href="/" aria-label="На главную" onClick={() => setOpen(false)}>
        <span>{logo}</span>
      </Link>

      <button
        aria-expanded={open}
        aria-label={open ? menuCloseLabel : menuOpenLabel}
        className="menu-toggle"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav aria-label="Основная навигация" className={open ? "open" : ""}>
        {navItems.map(({ label, href }) => (
          <Link href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="round-link phone-link" href={phoneHref(contactPhone)} aria-label={phoneButtonLabel}>
          <Phone size={17} />
        </Link>
        <Link className="primary-small" href="/consultation">
          {headerButtonText}
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}

export function Footer({
  brand,
  contactName,
  contactPhone,
  footerText,
  logo,
  navItems
}: {
  brand: string;
  contactName: string;
  contactPhone: string;
  footerText: string;
  logo: string;
  navItems: NavItem[];
}) {
  return (
    <footer className="site-footer">
      <div>
        <Link className="logo" href="/">
          <span>{logo}</span>
        </Link>
        <p>{brand}. {footerText}</p>
      </div>
      <div>
        <strong>Навигация</strong>
        {navItems.map(({ label, href }) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </div>
      <div>
        <strong>Контакты</strong>
        <span>{contactName}</span>
        <a href={phoneHref(contactPhone)}>{contactPhone}</a>
      </div>
    </footer>
  );
}
