import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getArticle, getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, content] = await Promise.all([getArticle(slug), getContent()]);

  if (!article) {
    notFound();
  }

  return (
    <main className="article-page">
      <Link className="back-button" href="/materials">
        <ArrowLeft size={18} />
        {content.materialsPage.backLabel}
      </Link>
      <article>
        <span className="chip">
          {article.category} / {article.date}
        </span>
        <h1>{article.title}</h1>
        <Image alt={article.title} src={article.image} width={1100} height={620} priority />
        <p className="lead">{article.excerpt}</p>
        {article.body.map((paragraph, index) => (
          <p key={`${paragraph}-${index}`}>{paragraph}</p>
        ))}
      </article>
    </main>
  );
}
