import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { getPage, getSiteContent, getVisibleArticles } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ArticlesPage() {
  const content = await getSiteContent();
  const ui = content.ui;
  const page = getPage(content, "articles");
  const articles = getVisibleArticles(content);

  return (
    <div className="site-page" style={{ "--accent": content.settings.accentColor } as CSSProperties}>
      <main>
        <section className="app-section">
          <div className="site-container app-shell">
            <section className="app-screen articles-screen" aria-labelledby="articles-title">
              <Link className="back-link" href="/">
                <ArrowLeft size={18} />
                {ui.articlesBackLabel}
              </Link>
              <div className="screen-title">
                {ui.articlesBadge ? <span>{ui.articlesBadge}</span> : null}
                <h1 id="articles-title">{page.title}</h1>
                <p>{page.subtitle}</p>
              </div>

            {content.important.visible ? (
              <article className="important-card">
                <span className="important-icon">
                  <ShieldAlert size={32} />
                </span>
                <div>
                  <h2>{content.important.title}</h2>
                  <p>{content.important.text}</p>
                </div>
              </article>
            ) : null}

            <div className="article-list">
              {articles.map((article) => (
                <article className={`article-card${article.icon === "none" ? " no-icon" : ""}`} key={article.id}>
                  <div className="article-card-head">
                    {article.icon !== "none" ? (
                      <span
                        className="article-icon"
                        style={{ "--article-color": article.color } as CSSProperties}
                      >
                        <AppIcon name={article.icon} />
                      </span>
                    ) : null}
                    <div>
                      <h2>{article.title}</h2>
                      <time>{article.date}</time>
                    </div>
                  </div>
                  <p>{article.excerpt}</p>
                  <Link className="read-full" href={`/articles/${article.slug}`}>
                    {ui.articleReadLabel}
                    <ArrowRight size={18} />
                  </Link>
                </article>
              ))}
            </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
