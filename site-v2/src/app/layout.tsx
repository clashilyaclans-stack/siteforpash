import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/Shell";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "RouteLab | Профориентация и обучение",
  description: "Современная платформа наставника: материалы, кабинет ученика, консультации и база знаний.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();

  return (
    <html lang="ru" data-theme="dark">
      <body>
        <Header contactPhone={content.contactPhone} logo={content.logo} />
        {children}
        <Footer brand={content.brand} contactName={content.contactName} contactPhone={content.contactPhone} logo={content.logo} />
      </body>
    </html>
  );
}
