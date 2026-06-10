"use client";

import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { CtaButtons } from "@/components/CtaButtons";
import { resolveQuizRecommendation } from "@/lib/quiz";
import type { MessengerSettings, QuizQuestion, QuizResult } from "@/lib/types";

type QuizClientProps = {
  fallbackResult: QuizResult;
  messengers: MessengerSettings;
  questions: QuizQuestion[];
};

export function QuizClient({
  fallbackResult,
  messengers,
  questions
}: QuizClientProps) {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const sortedQuestions = useMemo(
    () => [...questions].sort((left, right) => left.order - right.order),
    [questions]
  );
  const current = sortedQuestions[step];
  const isDone = step >= sortedQuestions.length;
  const result = tags.length ? resolveQuizRecommendation(tags) : fallbackResult;

  function choose(tag: string) {
    setTags((currentTags) => [...currentTags, tag]);
    setStep((currentStep) => currentStep + 1);
  }

  function reset() {
    setTags([]);
    setStep(0);
  }

  if (isDone) {
    return (
      <div className="quiz-panel">
        <span className="section-kicker">Рекомендация</span>
        <h2>{result.title}</h2>
        <p>{result.description}</p>
        <CtaButtons messengers={messengers} />
        <button className="reset-button" onClick={reset} type="button">
          <RotateCcw size={18} />
          Пройти заново
        </button>
      </div>
    );
  }

  if (!current) {
    return null;
  }

  return (
    <div className="quiz-panel">
      <div className="quiz-progress" aria-label={`Вопрос ${step + 1} из ${sortedQuestions.length}`}>
        {sortedQuestions.map((question, index) => (
          <span className={index <= step ? "active" : ""} key={question.id} />
        ))}
      </div>
      <h2>{current.title}</h2>
      <p>{current.subtitle}</p>
      <div className="quiz-options">
        {current.options.map((option) => (
          <button key={option.id} onClick={() => choose(option.tag)} type="button">
            <span>{option.label}</span>
            <ArrowRight size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
