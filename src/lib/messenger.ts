import type { MessengerLink, MessengerSettings } from "./types";

export function buildMessengerLinks(settings: MessengerSettings): MessengerLink[] {
  const links: MessengerLink[] = [];

  if (settings.telegramUrl.trim()) {
    links.push({
      key: "telegram",
      label: settings.primaryLabel || "Telegram",
      href: settings.telegramUrl
    });
  }

  if (settings.whatsappUrl.trim()) {
    links.push({
      key: "whatsapp",
      label: "WhatsApp",
      href: settings.whatsappUrl
    });
  }

  if (settings.maxUrl.trim()) {
    links.push({
      key: "max",
      label: "Max",
      href: settings.maxUrl
    });
  }

  return links;
}
