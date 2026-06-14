import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import { getArticle, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const ui = content.ui;
  const article = getArticle(content, slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="site-page" style={{ "--accent": content.settings.accentColor } as CSSProperties}>
      <main>
        <section className="app-section">
          <div className="site-container app-shell">
            <article className="app-screen article-reader">
              <div className="article-nav-row">
                <Link className="back-link" href="/articles">
                  <ArrowLeft size={18} />
                  {ui.articleBackToListLabel}
                </Link>
                <Link className="back-link" href="/">
                  <Home size={18} />
                  {ui.articleBackHomeLabel}
                </Link>
              </div>

              <header className="article-detail-head">
                <span className="section-kicker">{ui.articleDetailBadgePrefix} / {article.date}</span>
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
                  <h2>{ui.articleSourcesTitle}</h2>
                  <ul>
                    {article.sources.map((source) => (
                      <li key={source}>{source}</li>
                    ))}
                  </ul>
                </footer>
              ) : null}
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
