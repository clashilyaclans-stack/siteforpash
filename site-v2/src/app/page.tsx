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
          <span className="plain-eyebrow">Профориентация для школьников и студентов</span>
          <h1>
            Помогаю найти
            <br />
            свой путь и выбрать
            <br />
            <span>профессию по душе</span>
          </h1>
          <p>Профориентация для школьников и студентов. Определяем сильные стороны, интересы и возможности.</p>
          <div className="hero-actions">
            <Link className="primary-action" href="/consultation">
              Записаться на консультацию
            </Link>
            <VideoModal label="Смотреть видео о подходе" title="Видео о подходе" url={content.videoUrl} />
          </div>
        </div>

        <div className="orbit-field" aria-hidden="true">
          <div className="orbit-card orbit-card-top">
            <Compass size={18} />
            <span>Определимся с направлением</span>
          </div>
          <div className="orbit-card orbit-card-right">
            <Star size={18} />
            <span>Поймем твои сильные стороны</span>
          </div>
          <div className="orbit-card orbit-card-bottom">
            <ClipboardList size={18} />
            <span>Составим план действий</span>
          </div>
          <Sparkles className="sparkle sparkle-one" size={28} />
          <Sparkles className="sparkle sparkle-two" size={20} />
        </div>

        <div className="hero-person">
          <Image
            alt="Наставник проекта"
            src="/images/hero-author-v3.jpg"
            fill
            priority
            sizes="(max-width: 760px) 70vw, 360px"
          />
        </div>
      </section>

      <section className="start-layout" aria-label="Инструкция и быстрый старт">
        <article className="reference-video content-sequence">
          <span className="small-pill">Начните отсюда</span>
          <h2>Как пользоваться сайтом?</h2>
          <p>
            Посмотрите короткую инструкцию: где искать материалы, как пользоваться кабинетом ученика
            и как получить максимум пользы от сайта.
          </p>
          <figure className="instruction-image">
            <Image alt="Визуальное вступление к инструкции" src="/images/hero-video.jpg" width={720} height={420} />
          </figure>
          <div className="video-preview">
            <Image alt="" src="/images/hero-video.jpg" fill sizes="(max-width: 760px) 100vw, 440px" />
            <div>
              <strong>Как получить максимум пользы от этого сайта</strong>
              <VideoModal label="" title="Как пользоваться сайтом" url={content.videoUrl} />
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
          <h2>Быстрый старт</h2>
          <p>Выберите, что вам нужно прямо сейчас:</p>
          <QuickStart
            icon={<BookOpen />}
            label="Я впервые на сайте"
            text="Изучите бесплатные материалы и полезные статьи."
            href="/materials"
            action="Перейти к материалам"
            tone="blue"
          />
          <QuickStart
            icon={<Lock />}
            label="Я уже ученик"
            text="Войдите в свой кабинет и получите доступ к персональным материалам."
            href="/cabinet"
            action="Ввести код доступа"
            tone="violet"
          />
          <QuickStart
            icon={<UserRound />}
            label="Хочу консультацию"
            text="Узнайте подробнее о консультации и запишитесь на удобное время."
            href="/consultation"
            action="Подробнее"
            tone="orange"
          />
        </article>
      </section>

      <section className="benefit-strip final-home-block" aria-label="Преимущества">
        <Benefit icon={<UsersRound />} title="Индивидуальный подход" text="Учитываем ваши интересы, способности и цели." />
        <Benefit icon={<Target />} title="Практические рекомендации" text="Конкретные шаги и план для достижения цели." />
        <Benefit icon={<Shield />} title="Опыт и экспертиза" text="Помогаю школьникам и студентам найти себя с 2019 года." />
        <Benefit icon={<Heart />} title="Поддержка на пути" text="Всегда на связи и готов помочь на каждом этапе." />
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
