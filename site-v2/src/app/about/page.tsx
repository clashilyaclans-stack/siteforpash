import Image from "next/image";
import { Award, BookOpen, MessageSquareQuote, Route } from "lucide-react";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const icons = [<BookOpen key="book" />, <Award key="award" />, <Route key="route" />, <MessageSquareQuote key="quote" />];

export default async function AboutPage() {
  const content = await getContent();

  return (
    <main className="page-shell">
      <section className="about-hero">
        <div>
          <span className="chip">{content.aboutBadge}</span>
          <h1>{content.authorName}</h1>
          <p>
            {content.authorRole}. {content.aboutText}
          </p>
        </div>
        <Image alt={content.authorName} src={content.aboutImage} width={720} height={480} priority />
      </section>
      <section className="timeline-grid">
        {content.aboutCards.map((card, index) => (
          <Card icon={icons[index] || icons[0]} key={`${card.title}-${index}`} text={card.text} title={card.title} />
        ))}
      </section>
    </main>
  );
}

function Card({ icon, text, title }: { icon: React.ReactNode; text: string; title: string }) {
  return (
    <article className="info-panel">
      <span>{icon}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}
