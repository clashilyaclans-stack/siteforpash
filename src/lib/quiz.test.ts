import { describe, expect, it } from "vitest";
import { resolveQuizRecommendation } from "./quiz";

describe("quiz recommendation", () => {
  it("recommends intensive preparation when urgent tag is selected", () => {
    expect(resolveQuizRecommendation(["exam", "personal", "intensive"])).toEqual({
      title: "Интенсивная подготовка",
      description: "Нужен быстрый план: диагностика, частые занятия и фокус на самых дорогих заданиях."
    });
  });

  it("recommends mini-group when group tag is selected without urgency", () => {
    expect(resolveQuizRecommendation(["exam", "group", "steady"])).toEqual({
      title: "Мини-группа",
      description: "Подойдет обучение в небольшом темпе с регулярной практикой и поддержкой."
    });
  });
});
