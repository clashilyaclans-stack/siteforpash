import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteContent, getVisibleArticles } from "@/lib/content";

export default async function ArticlesPage() {
  const content = await getSiteContent();
  const articles = getVisibleArticles(content);

  return (
    <div className="site-page">
      <SiteHeader content={content} />
      <main>
        <section className="page-hero">
          <div className="site-container page-hero-inner">
            <Link className="back-link" href="/">
              <ArrowLeft size={18} />
              На главную
            </Link>
            <span className="section-kicker">Страница 2</span>
            <h1>Полезные статьи</h1>
            <p>Материалы, разборы заданий и советы для подготовки к ОГЭ по математике.</p>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container articles-layout">
            {content.important.visible ? (
              <article className="important-card">
                <span className="important-icon">
                  <ShieldAlert size={34} />
                </span>
                <div>
                  <h2>{content.important.title}</h2>
                  <p>{content.important.text}</p>
                </div>
              </article>
            ) : null}

            <div className="articles-grid">
              {articles.map((article) => (
                <article className="article-card" key={article.id}>
                  <div className="article-card-head">
                    <span className="article-icon" style={{ backgroundColor: article.color }}>
                      <AppIcon name={article.icon} />
                    </span>
                    <div>
                      <h2>{article.title}</h2>
                      <time>{article.date}</time>
                    </div>
                  </div>
                  <Image alt="" src={article.imageUrl} width={640} height={360} />
                  <p>{article.excerpt}</p>
                  <Link className="read-full" href={`/articles/${article.slug}`}>
                    Читать полностью
                    <ArrowRight size={18} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
