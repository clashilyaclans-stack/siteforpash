import type { Article, IconName, InfoBlock, SiteContent } from "./types";

const avatarUrl = "/reference/teacher.jpg";
const studyDeskUrl = "/reference/article-book.jpg";
const chartsUrl = "/reference/article-charts.jpg";
const laptopLessonUrl = "/reference/video-preview.jpg";

export function getFallbackContent(): SiteContent {
  return {
    settings: {
      siteName: "Павел Мингайло",
      logoLabel: "Павел Мингайло",
      seoTitle: "Павел Мингайло - репетитор по математике",
      seoDescription:
        "Сайт репетитора по математике: подготовка к ОГЭ, статьи, видео и запись на консультацию.",
      accentColor: "#2f80ff",
      messengers: {
        telegramUrl: "https://t.me/example",
        whatsappUrl: "https://wa.me/79990000000",
        maxUrl: "https://max.ru/example",
        primaryLabel: "Написать в Telegram",
        secondaryLabel: "Записаться на консультацию"
      }
    },
    ui: {
      adminNavLabel: "Админка",
      homeHeroBadge: "",
      homeProofItems: ["Диагностика", "Маршрут", "Практика", "Разбор ошибок"],
      heroCardLabel: "MATH FIELD CARD",
      heroFormulaItems: ["x^2 + y^2", "sin a", "N17", "90+"],
      homeSectionBadge: "Система подготовки",
      homeSectionTitle: "",
      homeArticlesLinkLabel: "Открыть журнал",
      videoBadge: "",
      articlesBackLabel: "На главную",
      articlesBadge: "",
      articleReadLabel: "Читать полностью",
      articleBackToListLabel: "Назад к журналу",
      articleBackHomeLabel: "Главная",
      articleDetailBadgePrefix: "Разбор",
      articleSourcesTitle: "Источники"
    },
    pages: [
      page("home", "/", "Главная", "Павел Мингайло", "Репетитор по математике", 1),
      page("articles", "/articles", "Статьи", "Полезные статьи", "Подборки статей, разборы заданий, теория и практика по подготовке к ОГЭ и ЕГЭ.", 2)
    ],
    home: {
      teacherName: "Павел Мингайло",
      teacherRole: "Репетитор по математике",
      avatarUrl,
      shortBio: ""
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
        "Полезные статьи"
      ),
      block(
        "help",
        "help",
        "Что делать, если запутался?",
        "Если у вас появились вопросы или что-то непонятно — напишите мне. Я всегда на связи!",
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
        "Все материалы на сайте опираются на официальные документы, открытый банк заданий и методические рекомендации. Источники указаны в конце каждой статьи.",
      visible: true
    },
    articles: [
      article(
        "oge-3-months",
        "Как подготовиться к ОГЭ за 3 месяца",
        "12 июн 2024",
        "Пошаговый план подготовки к ОГЭ по математике с нуля до уверенного результата. Разбираем темы, график, ошибки и полезные ресурсы.",
        "book",
        "#2f80ff",
        studyDeskUrl,
        true,
        1,
        [
          section(
            "goals",
            "1. Диагностика и цель",
            "Сначала нужно понять текущий уровень: какие темы уже держатся уверенно, где появляются типовые ошибки и сколько баллов нужно набрать. Это превращает подготовку из догадок в маршрут.",
            chartsUrl
          ),
          section(
            "plan",
            "2. План подготовки",
            "Разделите темы по важности и сложности. Первые недели лучше отдать базе и заданиям первой части, затем добавить геометрию, текстовые задачи и тренировочные варианты."
          )
        ],
        [
          "ФИПИ - ОГЭ по математике",
          "Открытый банк заданий",
          "Методические рекомендации по подготовке к ОГЭ"
        ]
      ),
      article(
        "seven-mistakes",
        "7 ошибок при подготовке к ОГЭ",
        "18 июн 2024",
        "Почему ученики теряют баллы даже при регулярных занятиях и как исправить эти ошибки заранее.",
        "warning",
        "#b7d7ff",
        chartsUrl,
        false,
        2
      ),
      article(
        "task-17",
        "Разбор задания №17 (огэ)",
        "24 июн 2024",
        "Как читать условие, выбирать способ решения и проверять ответ в одном из самых коварных заданий ОГЭ.",
        "play",
        "#79ffe1",
        studyDeskUrl,
        true,
        3
      ),
      article(
        "thirty-days",
        "Если осталось 30 дней",
        "2 июл 2024",
        "Как расставить приоритеты, убрать лишнее и сохранить устойчивый темп перед экзаменом.",
        "calendar",
        "#f6c76f",
        laptopLessonUrl,
        false,
        4
      ),
      article(
        "exam-anxiety",
        "Как справляться с волнением",
        "9 июл 2024",
        "Практические приемы, которые помогают не терять внимание и не ломать темп на экзамене.",
        "target",
        "#8be6b5",
        chartsUrl,
        false,
        5
      ),
      article(
        "hard-tasks",
        "Секреты решения задач повышенной сложности",
        "16 июл 2024",
        "Как не бросать сложную задачу после первого чтения и строить решение по опорным признакам.",
        "book",
        "#d8c3ff",
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
      "Определите цель, список тем и задания, которые уже получаются уверенно. Это даст понятную точку старта."
    ),
    section(
      "routine",
      "2. Как заниматься",
      "Регулярные короткие подходы работают лучше, чем попытка выучить все за один день."
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
