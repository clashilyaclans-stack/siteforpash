import type { QuizResult } from "./types";

export function resolveQuizRecommendation(tags: string[]): QuizResult {
  if (tags.includes("intensive")) {
    return {
      title: "Интенсивная подготовка",
      description:
        "Нужен быстрый план: диагностика, частые занятия и фокус на самых дорогих заданиях."
    };
  }

  if (tags.includes("group")) {
    return {
      title: "Мини-группа",
      description:
        "Подойдет обучение в небольшом темпе с регулярной практикой и поддержкой."
    };
  }

  return {
    title: "Индивидуальный план",
    description:
      "Лучше начать с диагностики и собрать маршрут под цель, уровень и сроки."
  };
}
