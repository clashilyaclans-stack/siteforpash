import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle, getSiteContent, getVisibleArticles } from "@/lib/content";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const content = await getSiteContent();
  return getVisibleArticles(content).map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const article = getArticle(content, slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="app-background">
      <article className="phone-screen article-detail-phone">
        <div className="phone-status">
          <span>9:41</span>
          <span>•••</span>
        </div>

        <Link href="/articles" className="back-link">
          <ArrowLeft size={18} />
          Назад к списку статей
        </Link>

        <header className="article-detail-head">
          <h1>{article.title}</h1>
          <time>{article.date}</time>
          <Image alt="" src={article.imageUrl} width={760} height={420} priority />
          <p>{article.excerpt}</p>
        </header>

        <div className="article-body">
          {article.sections.map((section) => (
            <section key={section.id}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
              {section.imageUrl ? (
                <Image alt="" src={section.imageUrl} width={760} height={420} />
              ) : null}
            </section>
          ))}
        </div>

        {article.sources.length ? (
          <footer className="sources">
            <h2>Источники</h2>
            <ul>
              {article.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </footer>
        ) : null}
      </article>
    </main>
  );
}
