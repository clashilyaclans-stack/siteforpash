import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  HeartHandshake,
  Lock,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound
} from "lucide-react";
import { VideoModal } from "@/components/VideoModal";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const content = await getContent();
  const latest = content.articles.slice(0, 4);

  return (
    <main>
      <section className="hero section-pad">
        <div className="hero-copy">
          <span className="eyebrow">Профориентация для школьников и студентов</span>
          <h1>
            {content.heroTitle} <span>{content.heroAccent}</span>
          </h1>
          <p>{content.heroText}</p>
          <div className="hero-actions">
            <Link className="primary-action" href="/consultation">
              Записаться на консультацию
              <ArrowRight size={18} />
            </Link>
            <VideoModal label="Смотреть видео о подходе" title="Видео о подходе" url={content.videoUrl} />
          </div>
        </div>
        <div className="hero-visual">
          <Image
            alt={content.authorName}
            src="/images/hero-author.jpg"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
          />
          <div className="float-card top">Определяем направление</div>
          <div className="float-card mid">Находим сильные стороны</div>
          <div className="float-card low">Собираем план действий</div>
        </div>
      </section>

      <section className="section-pad split-section">
        <article className="video-card">
          <span className="chip">Начните отсюда</span>
          <h2>Как пользоваться сайтом?</h2>
          <p>Посмотрите короткое видео, чтобы понять, где искать материалы, как пользоваться кабинетом и как получить максимум пользы.</p>
          <div className="video-frame">
            <VideoModal label="Запустить видео" title="Как пользоваться сайтом" url={content.videoUrl} />
          </div>
        </article>
        <article className="quick-start">
          <span className="chip">Быстрый старт</span>
          <h2>Выберите, что вам нужно прямо сейчас</h2>
          <StartCard icon={<BookOpen />} title="Я впервые на сайте" text="Изучите бесплатные материалы и полезные статьи." href="/materials" label="Перейти к материалам" />
          <StartCard icon={<Lock />} title="Я уже ученик" text="Войдите в кабинет и получите доступ к персональным материалам." href="/cabinet" label="Ввести код доступа" />
          <StartCard icon={<UserRound />} title="Хочу консультацию" text="Узнайте подробнее о консультации и запишитесь на удобное время." href="/consultation" label="Подробнее" />
        </article>
      </section>

      <section className="benefits section-pad">
        <Benefit icon={<Brain />} title="Индивидуальный подход" text="Учитываем ваши интересы, способности и цель." />
        <Benefit icon={<Target />} title="Практические рекомендации" text="Конкретные шаги и план для достижения цели." />
        <Benefit icon={<ShieldCheck />} title="Опыт и экспертиза" text="Помогаем школьникам и студентам находить себя." />
        <Benefit icon={<HeartHandshake />} title="Поддержка на пути" text="Всегда на связи и готов помочь на каждом этапе." />
      </section>

      <section className="materials-preview section-pad">
        <div className="section-head">
          <div>
            <span className="chip">База знаний</span>
            <h2>Актуальные материалы для роста и развития</h2>
          </div>
          <Link className="text-link" href="/materials">
            Смотреть все статьи
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="article-grid">
          {latest.map((article) => (
            <Link className="article-card" href={`/materials/${article.slug}`} key={article.slug}>
              <Image alt="" src={article.image} width={520} height={320} />
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <time>{article.date}</time>
              <b>Читать</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-band section-pad">
        <Sparkles size={34} />
        <div>
          <h2>Готовы сделать шаг к своей будущей профессии?</h2>
          <p>Запишитесь на консультацию и получите персональный план действий.</p>
        </div>
        <Link className="primary-action" href="/consultation">
          Записаться на консультацию
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}

function StartCard({ href, icon, label, text, title }: { href: string; icon: React.ReactNode; label: string; text: string; title: string }) {
  return (
    <Link className="start-card" href={href}>
      <span>{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <b>{label}<ArrowRight size={17} /></b>
    </Link>
  );
}

function Benefit({ icon, text, title }: { icon: React.ReactNode; text: string; title: string }) {
  return (
    <article>
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
