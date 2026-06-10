import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Maximize2,
  MessageCircle,
  Play,
  Send
} from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { getSiteContent } from "@/lib/content";
import type { InfoBlock } from "@/lib/types";

export default async function HomePage() {
  const content = await getSiteContent();
  const visibleBlocks = [...content.infoBlocks]
    .filter((block) => block.visible)
    .sort((left, right) => left.order - right.order);

  return (
    <main className="app-background">
      <section className="phone-screen home-phone" aria-label="Вводная страница">
        <div className="phone-status">
          <span>9:41</span>
          <span>•••</span>
        </div>

        <button className="settings-dot" aria-label="Настройки" type="button">
          <span />
          <span />
          <span />
        </button>

        <header className="profile-head">
          <div className="avatar-ring">
            <Image
              alt={content.home.teacherName}
              src={content.home.avatarUrl}
              width={148}
              height={148}
              priority
            />
          </div>
          <h1>{content.home.teacherName}</h1>
          <p>{content.home.teacherRole}</p>
        </header>

        <div className="home-block-list">
          {visibleBlocks.slice(0, 2).map((block) => (
            <InfoTile key={block.id} block={block} />
          ))}

          {content.video.visible ? (
            <article className="info-tile video-tile">
              <div className="tile-title">
                <span className="tile-icon">
                  <AppIcon name="video" />
                </span>
                <h2>{content.video.title}</h2>
              </div>
              <div className="video-frame">
                <Image
                  alt=""
                  src={content.video.posterUrl}
                  width={700}
                  height={390}
                />
                <span className="play-button">
                  <Play fill="currentColor" size={28} />
                </span>
                <span className="video-time">0:00 / 1:35</span>
                <Maximize2 className="video-fullscreen" size={17} />
              </div>
              <p>{content.video.description}</p>
            </article>
          ) : null}

          {visibleBlocks.slice(2).map((block) => (
            <InfoTile key={block.id} block={block} />
          ))}
        </div>

        <footer className="phone-actions">
          <a href={content.settings.messengers.telegramUrl} target="_blank" rel="noreferrer">
            <Send size={18} />
            {content.settings.messengers.primaryLabel}
          </a>
          <a href={content.settings.messengers.whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            {content.settings.messengers.secondaryLabel}
          </a>
        </footer>
      </section>
    </main>
  );
}

function InfoTile({ block }: { block: InfoBlock }) {
  const body = (
    <>
      <div className="tile-title">
        <span className="tile-icon">
          <AppIcon name={block.icon} />
        </span>
        <h2>{block.title}</h2>
      </div>
      <p>{block.description}</p>
      {block.href ? (
        <span className="tile-arrow">
          <ChevronRight size={22} />
        </span>
      ) : null}
    </>
  );

  if (block.href) {
    return (
      <Link className="info-tile clickable" href={block.href}>
        {body}
      </Link>
    );
  }

  return <article className="info-tile">{body}</article>;
}
