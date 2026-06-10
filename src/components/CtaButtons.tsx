import { MessageCircle, Send } from "lucide-react";
import { buildMessengerLinks } from "@/lib/messenger";
import type { MessengerSettings } from "@/lib/types";

type CtaButtonsProps = {
  messengers: MessengerSettings;
  compact?: boolean;
};

export function CtaButtons({ messengers, compact = false }: CtaButtonsProps) {
  const links = buildMessengerLinks(messengers);

  return (
    <div className={compact ? "cta-row compact" : "cta-row"}>
      {links.map((link, index) => (
        <a
          className={index === 0 ? "button primary" : "button secondary"}
          href={link.href}
          key={link.key}
          rel="noreferrer"
          target="_blank"
        >
          {link.key === "telegram" ? <Send size={18} /> : <MessageCircle size={18} />}
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}
