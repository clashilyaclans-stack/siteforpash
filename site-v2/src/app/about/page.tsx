import Image from "next/image";
import { Award, BookOpen, MessageSquareQuote, Route } from "lucide-react";
import { getContent } from "@/lib/content";

export default async function AboutPage() {
  const content = await getContent();

  return (
    <main className="page-shell">
      <section className="about-hero">
        <div>
          <span className="chip">Обо мне</span>
          <h1>{content.authorName}</h1>
          <p>{content.authorRole}. Помогаю подросткам и студентам увидеть варианты, выбрать направление и собрать понятный план развития.</p>
        </div>
        <Image alt={content.authorName} src="/images/hero-author.jpg" width={720} height={480} priority />
      </section>
      <section className="timeline-grid">
        <Card icon={<BookOpen />} title="Опыт" text="Работаю с учебными маршрутами, профориентацией и подготовкой к образовательным решениям." />
        <Card icon={<Award />} title="Достижения" text="Помогаю ученикам переходить от тревоги к понятным действиям и результатам." />
        <Card icon={<Route />} title="Подход" text="Не угадываем профессию, а тестируем гипотезы, интересы, навыки и реальные варианты." />
        <Card icon={<MessageSquareQuote />} title="Отзывы" text="Ученики отмечают спокойную структуру, поддержку и понятный план после консультаций." />
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
