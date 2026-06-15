import { createClient } from "@supabase/supabase-js";
import type { Article, SiteContent } from "./types";

export const fallbackContent: SiteContent = {
  brand: "RouteLab",
  logo: "R",
  heroTitle: "Помогаю найти свой путь и выбрать",
  heroAccent: "профессию по душе",
  heroText:
    "Профориентация для школьников и студентов. Определяем сильные стороны, интересы и реальные образовательные маршруты.",
  authorName: "Павел Мингайло",
  authorRole: "репетитор и наставник по образовательным траекториям",
  consultationUrl: "/consultation",
  videoUrl: "",
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
      "Профориентация",
      "08.05.2024",
      "Как не потеряться среди вариантов и собрать понятный план действий.",
      "/images/article-stairs.jpg"
    ),
    article(
      "confidence",
      "Как развить уверенность в себе",
      "Саморазвитие",
      "02.05.2024",
      "Почему уверенность строится не на мотивации, а на маленьких проверяемых шагах.",
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
          title: "Твоя бесплатная консультация",
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
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return fallbackContent;
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("site_v2_content")
    .select("content")
    .eq("id", "main")
    .maybeSingle();

  if (error || !data?.content) {
    return fallbackContent;
  }

  return { ...fallbackContent, ...(data.content as Partial<SiteContent>) };
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
      "Главная цель материала — помочь двигаться спокойно и последовательно, без давления и случайного выбора."
    ]
  };
}
