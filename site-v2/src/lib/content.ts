import { createClient } from "@supabase/supabase-js";
import type { Article, SiteContent } from "./types";

export const contentTable = process.env.SUPABASE_CONTENT_TABLE || "site_content";
export const contentId = process.env.SUPABASE_CONTENT_ID || "site-v2";

export const fallbackContent: SiteContent = {
  brand: "RouteLab",
  logo: "R",
  heroTitle: "Помогаю найти свой путь и выбрать",
  heroAccent: "профессию по душе",
  heroText:
    "Профориентация для школьников и студентов. Определяем сильные стороны, интересы и возможности.",
  heroButtonText: "Записаться на консультацию",
  videoButtonText: "Смотреть видео о подходе",
  howBadge: "Начните отсюда",
  howTitle: "Как пользоваться сайтом?",
  howText:
    "Посмотрите короткую инструкцию: где искать материалы, как пользоваться кабинетом ученика и как получить максимум пользы от сайта.",
  howImage: "/images/hero-video.jpg",
  howVideoTitle: "Как получить максимум пользы от этого сайта",
  authorName: "Павел Мингайло",
  authorRole: "наставник по образовательным траекториям",
  contactName: "Макс",
  contactPhone: "89089771274",
  consultationUrl: "/consultation",
  videoUrl: "",
  quickCards: [
    {
      title: "Я впервые на сайте",
      text: "Изучите бесплатные материалы и полезные статьи.",
      action: "Перейти к материалам",
      href: "/materials",
      tone: "blue"
    },
    {
      title: "Я уже ученик",
      text: "Войдите в свой кабинет и получите доступ к персональным материалам.",
      action: "Ввести код доступа",
      href: "/cabinet",
      tone: "violet"
    },
    {
      title: "Хочу консультацию",
      text: "Узнайте подробнее о консультации и запишитесь на удобное время.",
      action: "Подробнее",
      href: "/consultation",
      tone: "orange"
    }
  ],
  benefits: [
    {
      title: "Индивидуальный подход",
      text: "Учитываем ваши интересы, способности и цели."
    },
    {
      title: "Практические рекомендации",
      text: "Конкретные шаги и план для достижения цели."
    },
    {
      title: "Опыт и экспертиза",
      text: "Помогаю школьникам и студентам найти себя с 2019 года."
    },
    {
      title: "Поддержка на пути",
      text: "Всегда на связи и готов помочь на каждом этапе."
    }
  ],
  articles: [
    article(
      "kak-ponyat-professiyu",
      "Как понять, какая профессия тебе подходит",
      "Профориентация",
      "12.05.2024",
      "Короткий алгоритм, который помогает связать интересы, навыки и реальный рынок.",
      "/images/article-compass.jpg"
    ),
    article(
      "5-shagov-k-mechte",
      "5 шагов к выбору профессии мечты",
      "Саморазвитие",
      "08.05.2024",
      "Как не потеряться среди вариантов и собрать понятный план действий.",
      "/images/article-stairs.jpg"
    ),
    article(
      "confidence",
      "Как развить уверенность в себе",
      "Саморазвитие",
      "02.05.2024",
      "Почему уверенность строится на маленьких проверяемых шагах.",
      "/images/article-light.jpg"
    ),
    article(
      "study-system",
      "Как эффективно учиться",
      "Учеба",
      "28.04.2024",
      "Простая система повторения, конспектов и разбора ошибок.",
      "/images/article-notes.jpg"
    )
  ],
  students: [
    {
      code: "IVAN01",
      name: "Иван",
      cards: [
        {
          icon: "lock",
          title: "Для тебя",
          text: "Важная информация лично для тебя от наставника."
        },
        {
          icon: "gift",
          title: "Бесплатная консультация",
          text: "Подробные рекомендации и разбор твоей ситуации."
        },
        {
          icon: "target",
          title: "Домашние задания",
          text: "Задания и упражнения, которые помогут двигаться вперед."
        },
        {
          icon: "folder",
          title: "Полезные материалы",
          text: "Статьи, видео и ресурсы, которые пригодятся дальше."
        }
      ]
    }
  ]
};

export async function getContent(): Promise<SiteContent> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return fallbackContent;
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from(contentTable)
    .select("content")
    .eq("id", contentId)
    .maybeSingle();

  if (error || !data?.content) {
    return fallbackContent;
  }

  return normalizeContent(data.content as Partial<SiteContent>);
}

export function normalizeContent(content: Partial<SiteContent>): SiteContent {
  return {
    ...fallbackContent,
    ...content,
    quickCards: Array.isArray(content.quickCards) ? content.quickCards : fallbackContent.quickCards,
    benefits: Array.isArray(content.benefits) ? content.benefits : fallbackContent.benefits,
    articles: Array.isArray(content.articles) ? content.articles : fallbackContent.articles,
    students: Array.isArray(content.students) ? content.students : fallbackContent.students
  };
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const content = await getContent();
  return content.articles.find((item) => item.slug === slug);
}

function article(
  slug: string,
  title: string,
  category: string,
  date: string,
  excerpt: string,
  image: string
): Article {
  return {
    slug,
    title,
    category,
    date,
    excerpt,
    image,
    body: [
      "Выбор профессии становится проще, когда у подростка есть понятный маршрут: интересы, сильные стороны, пробные задачи и честная обратная связь.",
      "На консультациях мы не угадываем будущее, а собираем карту решений: какие направления подходят, какие навыки нужно проверить и что сделать в ближайшие недели.",
      "Главная цель материала - помочь двигаться спокойно и последовательно, без давления и случайного выбора."
    ]
  };
}
