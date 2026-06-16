import { createClient } from "@supabase/supabase-js";

const content = {
  brand: "RouteLab",
  logo: "R",
  navItems: [
    { label: "Главная", href: "/" },
    { label: "Материалы", href: "/materials" },
    { label: "Кабинет", href: "/cabinet" },
    { label: "Обо мне", href: "/about" },
    { label: "Контакты", href: "/contacts" }
  ],
  footerText: "Профориентация и обучение для школьников и студентов.",
  headerButtonText: "Записаться",
  phoneButtonLabel: "Позвонить",
  menuOpenLabel: "Открыть меню",
  menuCloseLabel: "Закрыть меню",
  heroTitle: "Помогаю найти свой путь и выбрать",
  heroAccent: "профессию по душе",
  heroText: "Профориентация для школьников и студентов. Определяем сильные стороны, интересы и возможности.",
  heroButtonText: "Записаться на консультацию",
  videoButtonText: "Смотреть видео о подходе",
  howBadge: "Начните отсюда",
  howTitle: "Как пользоваться сайтом?",
  howText:
    "Посмотрите короткую инструкцию: где искать материалы, как пользоваться кабинетом ученика и как получить максимум пользы от сайта.",
  howImage: "/images/hero-video.jpg",
  howVideoTitle: "Как получить максимум пользы от этого сайта",
  orbitLabels: ["Определимся с направлением", "Поймем твои сильные стороны", "Составим план действий"],
  authorName: "Павел Мингайло",
  authorRole: "Профориентация для школьников и студентов",
  contactName: "Макс",
  contactPhone: "89089771274",
  contactBadge: "Контакты",
  contactTitle: "Связь по проекту",
  contactText: "По всем вопросам звоните:",
  consultationUrl: "/consultation",
  videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  videoPlaceholderText: "Видео можно загрузить позже через админку",
  quickTitle: "Быстрый старт",
  quickText: "Выберите, что вам нужно прямо сейчас:",
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
    { title: "Индивидуальный подход", text: "Учитываем ваши интересы, способности и цели." },
    { title: "Практические рекомендации", text: "Конкретные шаги и план для достижения цели." },
    { title: "Опыт и экспертиза", text: "Помогаю школьникам и студентам найти себя с 2019 года." },
    { title: "Поддержка на пути", text: "Всегда на связи и готов помочь на каждом этапе." }
  ],
  aboutBadge: "Обо мне",
  aboutText: "Помогаю подросткам и студентам увидеть варианты, выбрать направление и собрать понятный план развития.",
  aboutImage: "/images/hero-author-v3.jpg",
  aboutCards: [
    { title: "Опыт", text: "Работаю с учебными маршрутами, профориентацией и подготовкой к образовательным решениям." },
    { title: "Достижения", text: "Помогаю ученикам переходить от тревоги к понятным действиям и результатам." },
    { title: "Подход", text: "Тестируем гипотезы, интересы, навыки и реальные варианты, а не угадываем профессию." },
    { title: "Отзывы", text: "Ученики отмечают спокойную структуру, поддержку и понятный план после консультаций." }
  ],
  consultation: {
    badge: "Консультация",
    title: "Персональный разбор образовательного маршрута",
    text:
      "Формат для тех, кто хочет не просто список профессий, а спокойный и понятный план: что проверить, куда смотреть и какие шаги сделать первыми.",
    buttonText: "Записаться",
    buttonHref: "/contacts",
    items: [
      "Разберем интересы и сильные стороны",
      "Определим несколько реалистичных направлений",
      "Соберем персональный план действий",
      "Подскажем материалы для самостоятельной работы"
    ]
  },
  materialsPage: {
    badge: "Бесплатные материалы",
    title: "База знаний для осознанного выбора",
    text: "Статьи, инструкции, полезные материалы и видеоматериалы доступны без регистрации.",
    categories: ["Все статьи", "Профориентация", "Учеба", "Саморазвитие", "Полезное"],
    readLabel: "Читать",
    allLabel: "Смотреть все статьи",
    backLabel: "Назад к материалам"
  },
  cabinet: {
    closedBadge: "Закрытая зона",
    closedTitle: "Кабинет ученика",
    closedText: "Введи код доступа, который выдал наставник. После входа откроются персональные материалы.",
    codeLabel: "Код доступа",
    codePlaceholder: "Например, IVAN01",
    loginButton: "Войти",
    errorText: "Код не найден. Проверьте правильность ввода.",
    dashboardBadge: "Кабинет ученика",
    dashboardGreeting: "Привет",
    dashboardText: "Здесь собраны материалы именно для тебя.",
    cardButtonText: "Открыть"
  },
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
    ),
    {
      slug: "test-video-material",
      title: "Тестовый материал с видео и планом",
      category: "Полезное",
      date: "16.06.2026",
      excerpt: "Проверочная статья для админки: картинка, текст, переносы и переход на полную страницу.",
      image: "/images/hero-video.jpg",
      body: [
        "Этот материал добавлен через CMS-данные, чтобы проверить, что новые статьи появляются на главной странице и в каталоге.",
        "Если изменить заголовок, картинку или текст в админке и сохранить, сайт должен сразу показать новую версию."
      ]
    },
    {
      slug: "test-growth-route",
      title: "Как собрать маршрут развития на неделю",
      category: "Учеба",
      date: "16.06.2026",
      excerpt: "Короткий тестовый материал для проверки второй карточки, изображений и абзацев.",
      image: "/images/article-stairs.jpg",
      body: [
        "Начните с одной цели на неделю и запишите три маленьких действия, которые реально выполнить без перегруза.",
        "После каждого действия отмечайте результат: что стало понятнее, что требует помощи, что можно улучшить."
      ]
    }
  ],
  students: [
    {
      code: "IVAN01",
      name: "Иван",
      cards: [
        { icon: "lock", title: "Для тебя", text: "Важная информация лично для тебя от наставника." },
        { icon: "gift", title: "Бесплатная консультация", text: "Подробные рекомендации и разбор твоей ситуации." },
        { icon: "target", title: "Домашние задания", text: "Задания и упражнения, которые помогут двигаться вперед." },
        { icon: "folder", title: "Полезные материалы", text: "Статьи, видео и ресурсы, которые пригодятся дальше." }
      ]
    }
  ]
};

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const table = process.env.SUPABASE_CONTENT_TABLE || "site_content";
const id = process.env.SUPABASE_CONTENT_ID || "site-v2";

if (!url || !key) {
  throw new Error("SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET/SUPABASE_SECRET_KEY are required");
}

const supabase = createClient(url, key);
const { error } = await supabase.from(table).upsert({ id, content }, { onConflict: "id" });

if (error) {
  throw error;
}

console.log(JSON.stringify({ ok: true, table, id, articles: content.articles.length }));

function article(slug, title, category, date, excerpt, image) {
  return {
    slug,
    title,
    category,
    date,
    excerpt,
    image,
    body: [
      "Выбор профессии становится проще, когда есть понятный маршрут: интересы, сильные стороны, пробные задачи и честная обратная связь.",
      "Главная цель материала - помочь двигаться спокойно и последовательно, без давления и случайного выбора."
    ]
  };
}
