const content = {
  brand: "RouteLab",
  logo: "R",
  heroTitle: "Помогаю найти свой путь и выбрать",
  heroAccent: "профессию по душе",
  heroText: "Профориентация для школьников и студентов. Определяем сильные стороны, интересы и возможности.",
  heroButtonText: "Записаться на консультацию",
  videoButtonText: "Смотреть видео о подходе",
  howBadge: "Начните отсюда",
  howTitle: "Как пользоваться сайтом?",
  howText: "Посмотрите короткую инструкцию: где искать материалы, как пользоваться кабинетом ученика и как получить максимум пользы от сайта.",
  howImage: "/images/hero-video.jpg",
  howVideoTitle: "Как получить максимум пользы от этого сайта",
  authorName: "Павел Мингайло",
  authorRole: "Профориентация для школьников и студентов",
  contactName: "Макс",
  contactPhone: "89089771274",
  consultationUrl: "/consultation",
  videoUrl: "",
  quickCards: [
    { title: "Я впервые на сайте", text: "Изучите бесплатные материалы и полезные статьи.", action: "Перейти к материалам", href: "/materials", tone: "blue" },
    { title: "Я уже ученик", text: "Войдите в свой кабинет и получите доступ к персональным материалам.", action: "Ввести код доступа", href: "/cabinet", tone: "violet" },
    { title: "Хочу консультацию", text: "Узнайте подробнее о консультации и запишитесь на удобное время.", action: "Подробнее", href: "/consultation", tone: "orange" }
  ],
  benefits: [
    { title: "Индивидуальный подход", text: "Учитываем ваши интересы, способности и цели." },
    { title: "Практические рекомендации", text: "Конкретные шаги и план для достижения цели." },
    { title: "Опыт и экспертиза", text: "Помогаю школьникам и студентам найти себя с 2019 года." },
    { title: "Поддержка на пути", text: "Всегда на связи и готов помочь на каждом этапе." }
  ],
  articles: [
    {
      slug: "kak-ponyat-professiyu",
      title: "Как понять, какая профессия тебе подходит",
      category: "Профориентация",
      date: "12.05.2024",
      excerpt: "Короткий алгоритм, который помогает связать интересы, навыки и реальный рынок.",
      image: "/images/article-compass.jpg",
      body: [
        "Выбор профессии становится проще, когда есть понятный маршрут: интересы, сильные стороны, пробные задачи и честная обратная связь."
      ]
    },
    {
      slug: "5-shagov-k-mechte",
      title: "5 шагов к выбору профессии мечты",
      category: "Саморазвитие",
      date: "08.05.2024",
      excerpt: "Как не потеряться среди вариантов и собрать понятный план действий.",
      image: "/images/article-stairs.jpg",
      body: [
        "Соберите список направлений, проверьте интерес через практику и выберите первые действия на ближайшие недели."
      ]
    },
    {
      slug: "confidence",
      title: "Как развить уверенность в себе",
      category: "Саморазвитие",
      date: "02.05.2024",
      excerpt: "Почему уверенность строится на маленьких проверяемых шагах.",
      image: "/images/article-light.jpg",
      body: [
        "Уверенность появляется не от мотивации, а от опыта: маленьких решений, выполненных задач и понятной обратной связи."
      ]
    },
    {
      slug: "study-system",
      title: "Как эффективно учиться",
      category: "Учеба",
      date: "28.04.2024",
      excerpt: "Простая система повторения, конспектов и разбора ошибок.",
      image: "/images/article-notes.jpg",
      body: [
        "Хорошая учебная система держится на регулярности, коротких повторах и честном разборе ошибок."
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

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET;

if (!url || !key) {
  throw new Error("SUPABASE_URL and SUPABASE_SECRET are required");
}

const response = await fetch(`${url}/rest/v1/site_content`, {
  method: "POST",
  headers: {
    apikey: key,
    authorization: `Bearer ${key}`,
    "content-type": "application/json; charset=utf-8",
    Prefer: "resolution=merge-duplicates,return=representation"
  },
  body: JSON.stringify({ id: "site-v2", content })
});

console.log(response.status, await response.text());
