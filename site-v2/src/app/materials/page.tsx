import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MaterialsPage() {
  const content = await getContent();
  const categories = ["Все статьи", "Профориентация", "Учеба", "Саморазвитие", "Полезное"];

  return (
    <main className="page-shell">
      <section className="page-title">
        <span>Бесплатные материалы</span>
        <h1>База знаний для осознанного выбора</h1>
        <p>Статьи, инструкции, полезные материалы и видеоматериалы доступны без регистрации.</p>
      </section>
      <div className="category-row">
        {categories.map((item) => (
          <button key={item} type="button">{item}</button>
        ))}
      </div>
      <section className="article-grid wide">
        {content.articles.map((article) => (
          <Link className="article-card" href={`/materials/${article.slug}`} key={article.slug}>
            <Image alt="" src={article.image} width={620} height={380} />
            <span>{article.category}</span>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <time>{article.date}</time>
            <b>Читать <ArrowRight size={16} /></b>
          </Link>
        ))}
      </section>
    </main>
  );
}
