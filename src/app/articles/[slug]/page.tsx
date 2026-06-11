import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
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
    <div className="site-page">
      <SiteHeader content={content} />
      <main>
        <article className="article-detail">
          <div className="site-container article-detail-inner">
            <div className="article-nav-row">
              <Link className="back-link" href="/articles">
                <ArrowLeft size={18} />
                Назад к журналу
              </Link>
              <Link className="back-link" href="/">
                <Home size={18} />
                Главная
              </Link>
            </div>

            <header className="article-detail-head">
              <span className="section-kicker">Разбор / {article.date}</span>
              <h1>{article.title}</h1>
              <Image alt="" src={article.imageUrl} width={1120} height={620} priority />
              <p>{article.excerpt}</p>
            </header>

            <div className="article-body">
              {article.sections.map((section) => (
                <section key={section.id}>
                  <h2>{section.heading}</h2>
                  <p>{section.text}</p>
                  {section.imageUrl ? (
                    <Image alt="" src={section.imageUrl} width={1120} height={620} />
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
          </div>
        </article>
      </main>
    </div>
  );
}
