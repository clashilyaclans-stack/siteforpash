import type { Article, IconName, InfoBlock, SiteContent } from "./types";

const avatarUrl = "/teacher-placeholder.svg";
const studyDeskUrl =
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80";
const chartsUrl =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80";
const laptopLessonUrl =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";

export function getFallbackContent(): SiteContent {
  return {
    settings: {
      siteName: "Павел Мингайло",
      logoLabel: "Павел Мингайло",
      seoTitle: "Павел Мингайло - репетитор по математике",
      seoDescription:
        "Сайт репетитора по математике с полезными статьями, видео и записью на консультацию.",
      accentColor: "#0a64ee",
      messengers: {
        telegramUrl: "https://t.me/example",
        whatsappUrl: "https://wa.me/79990000000",
        maxUrl: "https://max.ru/example",
        primaryLabel: "Написать в Telegram",
        secondaryLabel: "Записаться на консультацию"
      }
    },
    pages: [
      page("home", "/", "Вводная", "Павел Мингайло", "Репетитор по математике", 1),
      page("articles", "/articles", "Статьи", "Полезные статьи", "Материалы для подготовки к ОГЭ", 2)
    ],
    home: {
      teacherName: "Павел Мингайло",
      teacherRole: "Репетитор по математике",
      avatarUrl,
      shortBio:
        "Этот сайт создан, чтобы помочь школьникам эффективно готовиться к экзаменам по математике."
    },
    infoBlocks: [
      block(
        "about",
        "info",
        "О проекте",
        "Этот сайт создан, чтобы помочь школьникам эффективно готовиться к экзаменам по математике.",
        1
      ),
      block(
        "goal",
        "target",
        "Для чего создан сайт",
        "Здесь собраны полезные материалы, разборы заданий, инструкции и советы для учеников и родителей.",
        2
      ),
      block(
        "articles",
        "book",
        "Полезные статьи",
        "Подборки статей, разборы заданий, теория и практика по подготовке к ОГЭ и ЕГЭ.",
        4,
        "/articles",
        "Открыть статьи"
      ),
      block(
        "help",
        "help",
        "Что делать, если запутался?",
        "Если у вас появились вопросы или что-то непонятно - напишите мне. Я всегда на связи.",
        5
      )
    ],
    video: {
      id: "intro-video",
      title: "Видео: как пользоваться сайтом",
      description:
        "Посмотрите короткое видео, чтобы быстро узнать, как устроен сайт и где искать нужные материалы.",
      videoUrl: "",
      posterUrl: laptopLessonUrl,
      visible: true,
      order: 3
    },
    important: {
      id: "important",
      title: "Важно",
      text:
        "Все статьи на сайте основываются на достоверных источниках и официальных документах. Ссылки на источники указаны в конце каждой статьи.",
      visible: true
    },
    articles: [
      article(
        "oge-3-months",
        "Как подготовиться к ОГЭ за 3 месяца",
        "12 июн 2024",
        "Пошаговый план подготовки к ОГЭ по математике с нуля до уверенного результата.",
        "book",
        "#26c45b",
        studyDeskUrl,
        true,
        1,
        [
          section(
            "goals",
            "1. Диагностика и цели",
            "Определите текущий уровень знаний и свою цель по баллам. Это поможет составить реалистичный план подготовки.",
            chartsUrl
          ),
          section(
            "plan",
            "2. План подготовки",
            "Разделите темы по важности и сложности. Рекомендуем уделять внимание базовым темам в начале, а затем переходить к более сложным заданиям."
          )
        ],
        [
          "ФИПИ - ОГЭ по математике 2024",
          "Официальный сайт ФИПИ",
          "Методические рекомендации по подготовке к ОГЭ"
        ]
      ),
      article(
        "seven-mistakes",
        "7 ошибок при подготовке к ОГЭ",
        "18 июн 2024",
        "Частые ошибки учеников и понятные способы исправить их до экзамена.",
        "book",
        "#a855f7",
        chartsUrl,
        false,
        2
      ),
      article(
        "task-17",
        "Разбор задания №17 (ОГЭ)",
        "24 июн 2024",
        "Пошаговый разбор задания №17 из ОГЭ по математике, типичные ошибки и рекомендации.",
        "play",
        "#3b82f6",
        studyDeskUrl,
        true,
        3
      ),
      article(
        "thirty-days",
        "Что делать, если осталось 30 дней до экзамена",
        "2 июл 2024",
        "Как расставить приоритеты и не потерять время в последний месяц.",
        "calendar",
        "#ff8a00",
        laptopLessonUrl,
        false,
        4
      ),
      article(
        "exam-anxiety",
        "Как справляться с волнением на экзамене",
        "9 июл 2024",
        "Практические приемы, которые помогают удерживать внимание и темп.",
        "target",
        "#14b8a6",
        chartsUrl,
        false,
        5
      ),
      article(
        "hard-tasks",
        "Секреты решения задач повышенной сложности",
        "16 июл 2024",
        "Как читать условие, строить решение и проверять себя.",
        "book",
        "#c084fc",
        studyDeskUrl,
        false,
        6
      )
    ]
  };
}

function page(
  key: SiteContent["pages"][number]["key"],
  href: string,
  navLabel: string,
  title: string,
  subtitle: string,
  order: number
) {
  return { key, href, navLabel, title, subtitle, visible: true, order };
}

function block(
  id: string,
  icon: IconName,
  title: string,
  description: string,
  order: number,
  href?: string,
  ctaLabel?: string
): InfoBlock {
  return { id, icon, title, description, href, ctaLabel, order, visible: true };
}

function section(id: string, heading: string, text: string, imageUrl?: string) {
  return { id, heading, text, imageUrl };
}

function article(
  slug: string,
  title: string,
  date: string,
  excerpt: string,
  icon: IconName,
  color: string,
  imageUrl: string,
  expanded: boolean,
  order: number,
  sections = [
    section(
      "summary",
      "1. С чего начать",
      "Сначала определите цель, соберите список тем и отметьте задания, которые уже получаются уверенно."
    ),
    section(
      "routine",
      "2. Как заниматься",
      "Лучше заниматься регулярно короткими подходами, чем пытаться выучить все за один день."
    )
  ],
  sources = ["ФИПИ", "Открытый банк заданий", "Методические материалы по математике"]
): Article {
  return {
    id: `article-${slug}`,
    slug,
    title,
    date,
    excerpt,
    icon,
    color,
    imageUrl,
    sections,
    sources,
    expanded,
    order,
    visible: true
  };
}
