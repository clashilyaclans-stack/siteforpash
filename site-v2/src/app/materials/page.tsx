import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MaterialsPage() {
  const content = await getContent();
  const page = content.materialsPage;

  return (
    <main className="page-shell">
      <section className="page-title">
        <span>{page.badge}</span>
        <h1>{page.title}</h1>
        <p>{page.text}</p>
      </section>
      <div className="category-row">
        {page.categories.map((item) => (
          <button key={item} type="button">
            {item}
          </button>
        ))}
      </div>
      <section className="article-grid wide">
        {content.articles.map((article) => (
          <Link className="article-card" href={`/materials/${article.slug}`} key={article.slug}>
            <Image alt={article.title} src={article.image} width={620} height={380} />
            <span>{article.category}</span>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <time>{article.date}</time>
            <b>
              {page.readLabel}
              <ArrowRight size={16} />
            </b>
          </Link>
        ))}
      </section>
    </main>
  );
}
