import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Minus, Plus, ShieldAlert } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { getSiteContent, getVisibleArticles } from "@/lib/content";

export default async function ArticlesPage() {
  const content = await getSiteContent();
  const articles = getVisibleArticles(content);

  return (
    <main className="app-background">
      <section className="phone-screen articles-phone" aria-label="Статьи">
        <div className="phone-status">
          <span>9:41</span>
          <span>•••</span>
        </div>

        {content.important.visible ? (
          <article className="important-card">
            <div className="important-icon">
              <ShieldAlert size={38} />
            </div>
            <div>
              <h1>{content.important.title}</h1>
              <p>{content.important.text}</p>
            </div>
          </article>
        ) : null}

        <div className="article-list">
          {articles.map((article) => (
            <article
              className={`article-accordion ${article.expanded ? "expanded" : ""}`}
              key={article.id}
            >
              <Link href={`/articles/${article.slug}`} className="article-row">
                <span className="article-icon" style={{ backgroundColor: article.color }}>
                  <AppIcon name={article.icon} />
                </span>
                <strong>{article.title}</strong>
                {article.expanded ? <Minus size={22} /> : <Plus size={22} />}
              </Link>

              {article.expanded ? (
                <div className="article-preview">
                  <p>{article.excerpt}</p>
                  <Image alt="" src={article.imageUrl} width={680} height={360} />
                  <Link className="read-full" href={`/articles/${article.slug}`}>
                    Читать полностью
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <p className="articles-hint">Нажмите на «+», чтобы раскрыть содержание</p>
      </section>
    </main>
  );
}
