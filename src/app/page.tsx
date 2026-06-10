import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Play, Send } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteContent } from "@/lib/content";
import type { InfoBlock } from "@/lib/types";

export default async function HomePage() {
  const content = await getSiteContent();
  const visibleBlocks = [...content.infoBlocks]
    .filter((block) => block.visible)
    .sort((left, right) => left.order - right.order);

  return (
    <div className="site-page">
      <SiteHeader content={content} />
      <main>
        <section className="hero-section">
          <div className="site-container hero-layout">
            <div className="hero-photo">
              <Image
                alt={content.home.teacherName}
                src={content.home.avatarUrl}
                width={420}
                height={420}
                priority
              />
            </div>

            <div className="hero-content">
              <span className="section-kicker">Репетитор по математике</span>
              <h1>{content.home.teacherName}</h1>
              <p className="hero-role">{content.home.teacherRole}</p>
              <p>{content.home.shortBio}</p>
              <div className="cta-row">
                <a href={content.settings.messengers.telegramUrl} target="_blank" rel="noreferrer">
                  <Send size={19} />
                  {content.settings.messengers.primaryLabel}
                </a>
                <a href={content.settings.messengers.whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle size={19} />
                  {content.settings.messengers.secondaryLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container section-heading">
            <div>
              <span className="section-kicker">Структура и описание</span>
              <h2>Все важное для подготовки в одном месте</h2>
            </div>
            <Link className="text-link" href="/articles">
              Перейти к статьям
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="site-container home-grid">
            {visibleBlocks.map((block) => (
              <InfoTile key={block.id} block={block} />
            ))}
          </div>
        </section>

        {content.video.visible ? (
          <section className="content-section video-section">
            <div className="site-container video-layout">
              <div>
                <span className="section-kicker">Видео-блок</span>
                <h2>{content.video.title}</h2>
                <p>{content.video.description}</p>
              </div>
              <div className="site-video-frame">
                <Image alt="" src={content.video.posterUrl} width={860} height={480} />
                <span className="play-button">
                  <Play fill="currentColor" size={30} />
                </span>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function InfoTile({ block }: { block: InfoBlock }) {
  const content = (
    <>
      <span className="tile-icon">
        <AppIcon name={block.icon} />
      </span>
      <div>
        <h3>{block.title}</h3>
        <p>{block.description}</p>
      </div>
      {block.href ? <ArrowRight className="card-arrow" size={20} /> : null}
    </>
  );

  if (block.href) {
    return (
      <Link className="info-card clickable" href={block.href}>
        {content}
      </Link>
    );
  }

  return <article className="info-card">{content}</article>;
}
