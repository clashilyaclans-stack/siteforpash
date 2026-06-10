import Image from "next/image";
import { ArrowRight, BadgeCheck, BookMarked, GraduationCap, Play } from "lucide-react";
import type { ContentCard } from "@/lib/types";

type CardGridProps = {
  cards: ContentCard[];
  variant?: "catalog" | "profile" | "genre";
};

export function CardGrid({ cards, variant = "catalog" }: CardGridProps) {
  const visibleCards = [...cards]
    .filter((card) => card.visible)
    .sort((left, right) => left.order - right.order);

  return (
    <div className={`card-grid ${variant}`}>
      {visibleCards.map((card) => (
        <article className="content-card" key={card.id}>
          <div className="card-visual" aria-hidden="true">
            {card.imageUrl ? (
              <Image alt="" height={220} src={card.imageUrl} width={440} />
            ) : variant === "profile" ? (
              <GraduationCap size={48} />
            ) : variant === "genre" ? (
              <BookMarked size={50} />
            ) : (
              <>
                <BadgeCheck size={52} />
                <span className="play-badge">
                  <Play size={22} fill="currentColor" />
                </span>
              </>
            )}
          </div>
          <div className="card-copy">
            {card.badge ? <span className="pill">{card.badge}</span> : null}
            <h3>{card.title}</h3>
            <p className="card-subtitle">{card.subtitle}</p>
            <p>{card.description}</p>
          </div>
          <div className="card-footer">
            {card.price ? <strong>{card.price}</strong> : <span />}
            {card.ctaLabel ? (
              <span className="card-link">
                {card.ctaLabel}
                <ArrowRight size={16} />
              </span>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
