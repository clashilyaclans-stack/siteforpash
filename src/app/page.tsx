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
            <div className="hero-content">
              <span className="section-kicker">Field guide no. 01 / ОГЭ математика</span>
              <h1>{content.home.teacherName}</h1>
              <p className="hero-role">{content.home.teacherRole}</p>
              <p className="hero-copy">{content.home.shortBio}</p>
              <div className="hero-proof" aria-label="Ключевые принципы подготовки">
                <span>Диагностика</span>
                <span>Маршрут</span>
                <span>Практика</span>
                <span>Разбор ошибок</span>
              </div>
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

            <div className="hero-specimen" aria-label="Профиль преподавателя">
              <div className="hero-photo">
                <Image
                  alt={content.home.teacherName}
                  src={content.home.avatarUrl}
                  width={520}
                  height={520}
                  priority
                />
              </div>
              <div className="formula-strip" aria-hidden="true">
                <span>x^2 + y^2</span>
                <span>sin a</span>
                <span>N17</span>
                <span>90+</span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container section-heading">
            <div>
              <span className="section-kicker">Система подготовки</span>
              <h2>Не набор уроков, а навигационная карта к экзамену</h2>
            </div>
            <Link className="text-link" href="/articles">
              Открыть журнал
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="site-container home-grid">
            {visibleBlocks.map((block, index) => (
              <InfoTile key={block.id} block={block} index={index + 1} />
            ))}
          </div>
        </section>

        {content.video.visible ? (
          <section className="content-section video-section">
            <div className="site-container video-layout">
              <div>
                <span className="section-kicker">Вводный разбор</span>
                <h2>{content.video.title}</h2>
                <p>{content.video.description}</p>
              </div>
              <div className="site-video-frame">
                <Image alt="" src={content.video.posterUrl} width={960} height={540} />
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

function InfoTile({ block, index }: { block: InfoBlock; index: number }) {
  const content = (
    <>
      <span className="card-index">{String(index).padStart(2, "0")}</span>
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
