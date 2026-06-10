import { describe, expect, it } from "vitest";
import { buildMessengerLinks } from "./messenger";

describe("messenger links", () => {
  it("builds configured Telegram, WhatsApp, and Max CTA links", () => {
    const links = buildMessengerLinks({
      telegramUrl: "https://t.me/example",
      whatsappUrl: "https://wa.me/79990000000",
      maxUrl: "https://max.ru/example",
      primaryLabel: "Записаться",
      secondaryLabel: "Задать вопрос"
    });

    expect(links).toEqual([
      {
        key: "telegram",
        label: "Записаться",
        href: "https://t.me/example"
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
        href: "https://wa.me/79990000000"
      },
      {
        key: "max",
        label: "Max",
        href: "https://max.ru/example"
      }
    ]);
  });

  it("skips empty messenger URLs", () => {
    const links = buildMessengerLinks({
      telegramUrl: "",
      whatsappUrl: "https://wa.me/79990000000",
      maxUrl: "",
      primaryLabel: "Написать",
      secondaryLabel: "Вопрос"
    });

    expect(links).toHaveLength(1);
    expect(links[0]?.key).toBe("whatsapp");
  });
});
