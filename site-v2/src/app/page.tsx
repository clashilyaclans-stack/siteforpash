import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Compass,
  Heart,
  Lock,
  Shield,
  Sparkles,
  Star,
  Target,
  UserRound,
  UsersRound
} from "lucide-react";
import { VideoModal } from "@/components/VideoModal";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const content = await getContent();

  return (
    <main className="home-reference">
      <section className="reference-hero" aria-label="Главный экран">
        <div className="hero-glow" />
        <div className="hero-copy">
          <span className="plain-eyebrow">{content.authorRole}</span>
          <h1>
            {content.heroTitle}
            <br />
            <span>{content.heroAccent}</span>
          </h1>
          <p>{content.heroText}</p>
          <div className="hero-actions">
            <Link className="primary-action" href={content.consultationUrl}>
              {content.heroButtonText}
            </Link>
          </div>
        </div>

        <div className="orbit-field" aria-hidden="true">
          <div className="orbit-card orbit-card-top">
            <Compass size={18} />
            <span>{content.orbitLabels[0]}</span>
          </div>
          <div className="orbit-card orbit-card-right">
            <Star size={18} />
            <span>{content.orbitLabels[1]}</span>
          </div>
          <div className="orbit-card orbit-card-bottom">
            <ClipboardList size={18} />
            <span>{content.orbitLabels[2]}</span>
          </div>
          <Sparkles className="sparkle sparkle-one" size={28} />
          <Sparkles className="sparkle sparkle-two" size={20} />
        </div>

        <div className="hero-person">
          <Image
            alt={content.authorName}
            src={content.aboutImage}
            fill
            priority
            sizes="(max-width: 760px) 70vw, 360px"
          />
        </div>
      </section>

      <section className="start-layout" aria-label="Инструкция и быстрый старт">
        <article className="reference-video content-sequence">
          <span className="small-pill">{content.howBadge}</span>
          <h2>{content.howTitle}</h2>
          <p>{content.howText}</p>
          <div className="video-preview">
            <Image alt="" src={content.howImage} fill sizes="(max-width: 760px) 100vw, 440px" />
            <div>
              <strong>{content.howVideoTitle}</strong>
              <VideoModal label="" placeholder={content.videoPlaceholderText} title={content.howTitle} url={content.videoUrl} />
            </div>
            <div className="fake-controls">
              <span />
              <b>0:00 / 2:35</b>
              <i />
              <i />
              <i />
            </div>
          </div>
        </article>

        <article className="quick-panel">
          <h2>{content.quickTitle}</h2>
          <p>{content.quickText}</p>
          {content.quickCards.map((card, index) => (
            <QuickStart
              action={card.action}
              href={card.href}
              icon={[<BookOpen key="book" />, <Lock key="lock" />, <UserRound key="user" />][index] || <BookOpen />}
              key={`${card.title}-${index}`}
              label={card.title}
              text={card.text}
              tone={card.tone}
            />
          ))}
        </article>
      </section>

      <section className="benefit-strip" aria-label="Преимущества">
        {content.benefits.map((benefit, index) => (
          <Benefit
            icon={[<UsersRound key="users" />, <Target key="target" />, <Shield key="shield" />, <Heart key="heart" />][index] || <Heart />}
            key={`${benefit.title}-${index}`}
            text={benefit.text}
            title={benefit.title}
          />
        ))}
      </section>

      <section className="home-articles final-home-block" aria-label={content.materialsPage.badge}>
        <div className="section-head">
          <div>
            <span className="chip">{content.materialsPage.badge}</span>
            <h2>{content.materialsPage.title}</h2>
          </div>
          <Link href="/materials">
            {content.materialsPage.allLabel}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-row">
          {content.materialsPage.categories.map((item) => (
            <button key={item} type="button">
              {item}
            </button>
          ))}
        </div>
        <div className="article-grid">
          {content.articles.slice(0, 4).map((article) => (
            <Link className="article-card" href={`/materials/${article.slug}`} key={article.slug}>
              <Image alt={article.title} src={article.image} width={620} height={380} />
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <time>{article.date}</time>
              <b>
                {content.materialsPage.readLabel}
                <ArrowRight size={16} />
              </b>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function QuickStart({
  action,
  href,
  icon,
  label,
  text,
  tone
}: {
  action: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  text: string;
  tone: "blue" | "orange" | "violet";
}) {
  return (
    <Link className={`quick-row ${tone}`} href={href}>
      <span>{icon}</span>
      <div>
        <h3>{label}</h3>
        <p>{text}</p>
      </div>
      <b>
        {action}
        <ArrowRight size={16} />
      </b>
    </Link>
  );
}

function Benefit({ icon, text, title }: { icon: React.ReactNode; text: string; title: string }) {
  return (
    <article>
      <span>{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
