import { Phone } from "lucide-react";
import { getContent } from "@/lib/content";

function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("8") ? `tel:+7${digits.slice(1)}` : `tel:+${digits}`;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactsPage() {
  const content = await getContent();

  return (
    <main className="page-shell">
      <section className="contact-layout contact-simple">
        <div>
          <span className="chip">Контакты</span>
          <h1>Связь по проекту</h1>
          <p>По всем вопросам пишите или звоните: {content.contactName}.</p>
        </div>
        <div className="contact-card">
          <strong>{content.contactName}</strong>
          <a href={phoneHref(content.contactPhone)}>
            <Phone size={24} />
            {content.contactPhone}
          </a>
        </div>
      </section>
    </main>
  );
}
