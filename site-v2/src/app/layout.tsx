import "./globals.css";
import { Footer, Header } from "@/components/Shell";
import { getContent } from "@/lib/content";

export async function generateMetadata() {
  const content = await getContent();

  return {
    title: `${content.brand} | ${content.authorRole}`,
    description: content.heroText,
    icons: {
      icon: "/favicon.svg"
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();

  return (
    <html lang="ru" data-theme="dark">
      <body>
        <Header
          contactPhone={content.contactPhone}
          headerButtonText={content.headerButtonText}
          logo={content.logo}
          menuCloseLabel={content.menuCloseLabel}
          menuOpenLabel={content.menuOpenLabel}
          navItems={content.navItems}
          phoneButtonLabel={content.phoneButtonLabel}
        />
        {children}
        <Footer
          brand={content.brand}
          contactName={content.contactName}
          contactPhone={content.contactPhone}
          footerText={content.footerText}
          logo={content.logo}
          navItems={content.navItems}
        />
      </body>
    </html>
  );
}
