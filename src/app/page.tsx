import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { getSiteContent } from "@/lib/content";
import type { InfoBlock, VideoBlock } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const content = await getSiteContent();
  const ui = content.ui;
  const visibleBlocks = [...content.infoBlocks]
    .filter((block) => block.visible)
    .sort((left, right) => left.order - right.order);
  const homeItems = [
    ...visibleBlocks.map((block) => ({
      id: block.id,
      kind: "block" as const,
      order: block.order,
      item: block
    })),
    ...(content.video.visible
      ? [
          {
            id: content.video.id,
            kind: "video" as const,
            order: content.video.order,
            item: content.video
          }
        ]
      : [])
  ].sort((left, right) => {
    if (left.order === right.order) {
      return left.kind === "video" ? -1 : 1;
    }

    return left.order - right.order;
  });

  return (
    <div className="site-page" style={{ "--accent": content.settings.accentColor } as CSSProperties}>
      <main>
        <section className="app-section">
          <div className="site-container app-shell">
            <section className="app-screen home-screen" aria-labelledby="home-title">
              <div className="profile-head">
                {content.home.avatarUrl ? (
                  <Image
                    alt={content.home.teacherName}
                    src={content.home.avatarUrl}
                    width={180}
                    height={180}
                    priority
                  />
                ) : (
                  <span className="avatar-empty" aria-hidden="true" />
                )}
                <h1 id="home-title">{content.home.teacherName}</h1>
                <p>{content.home.teacherRole}</p>
              </div>

              <div className="app-stack">
                {homeItems.map((entry) =>
                  entry.kind === "video" ? (
                    <VideoTile key={entry.id} video={entry.item as VideoBlock} badge={ui.videoBadge} />
                  ) : (
                    <InfoTile key={entry.id} block={entry.item as InfoBlock} />
                  )
                )}
              </div>

              <div className="app-actions">
                <a href={content.settings.messengers.telegramUrl} target="_blank" rel="noreferrer">
                  {content.settings.messengers.primaryLabel}
                </a>
                <a href={content.settings.messengers.whatsappUrl} target="_blank" rel="noreferrer">
                  {content.settings.messengers.secondaryLabel}
                </a>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoTile({ block }: { block: InfoBlock }) {
  const content = (
    <>
      {block.icon !== "none" ? (
        <span className="tile-icon">
          <AppIcon name={block.icon} />
        </span>
      ) : null}
      <div>
        <h3>{block.title}</h3>
        <p>{block.description}</p>
      </div>
      {block.href ? <ArrowRight className="card-arrow" size={20} /> : null}
    </>
  );

  if (block.href) {
    return (
      <Link className={`info-card clickable${block.icon === "none" ? " no-icon" : ""}`} href={block.href}>
        {content}
      </Link>
    );
  }

  return <article className={`info-card${block.icon === "none" ? " no-icon" : ""}`}>{content}</article>;
}

function VideoTile({ badge, video }: { badge: string; video: VideoBlock }) {
  return (
    <article className="info-card video-card">
      <span className="tile-icon">
        <Play size={22} />
      </span>
      <div>
        {badge ? <span className="block-badge">{badge}</span> : null}
        <h3>{video.title}</h3>
      </div>
      <div className="embedded-video">
        {video.videoUrl ? (
          <video controls preload="metadata" src={video.videoUrl} />
        ) : (
          <>
            <span className="play-button">
              <Play fill="currentColor" size={26} />
            </span>
          </>
        )}
      </div>
      <p>{video.description}</p>
    </article>
  );
}
