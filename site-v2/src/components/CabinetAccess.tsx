"use client";

import { ArrowRight, Folder, Gift, Lock, Rocket, Target } from "lucide-react";
import { useState } from "react";
import type { CabinetContent, Student } from "@/lib/types";

const icons = {
  folder: Folder,
  gift: Gift,
  lock: Lock,
  rocket: Rocket,
  target: Target
};

export function CabinetAccess({ cabinet, students }: { cabinet: CabinetContent; students: Student[] }) {
  const [code, setCode] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = students.find((item) => item.code.toLowerCase() === code.trim().toLowerCase());
    if (!found) {
      setStudent(null);
      setError(cabinet.errorText);
      return;
    }

    setStudent(found);
    setError("");
  }

  if (student) {
    return (
      <section className="cabinet-dashboard">
        <div className="page-title">
          <span>{cabinet.dashboardBadge}</span>
          <h1>{cabinet.dashboardGreeting}, {student.name}!</h1>
          <p>{cabinet.dashboardText}</p>
        </div>
        <div className="student-grid">
          {student.cards.map((card) => {
            const Icon = icons[card.icon as keyof typeof icons] || Folder;
            return (
              <article className="student-card" key={card.title}>
                <Icon size={38} />
                <h2>{card.title}</h2>
                <p>{card.text}</p>
                <button type="button">
                  {cabinet.cardButtonText}
                  <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="access-panel">
      <div>
        <span>{cabinet.closedBadge}</span>
        <h1>{cabinet.closedTitle}</h1>
        <p>{cabinet.closedText}</p>
      </div>
      <form onSubmit={submit}>
        <label>
          {cabinet.codeLabel}
          <input
            autoComplete="one-time-code"
            onChange={(event) => setCode(event.target.value)}
            placeholder={cabinet.codePlaceholder}
            value={code}
          />
        </label>
        <button type="submit">
          {cabinet.loginButton}
          <ArrowRight size={18} />
        </button>
        {error ? <p className="form-error">{error}</p> : null}
      </form>
    </section>
  );
}
