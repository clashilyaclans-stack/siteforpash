"use client";

import { ArrowRight, Folder, Gift, Lock, Rocket, Target } from "lucide-react";
import { useState } from "react";
import type { Student } from "@/lib/types";

const icons = {
  folder: Folder,
  gift: Gift,
  lock: Lock,
  rocket: Rocket,
  target: Target
};

export function CabinetAccess({ students }: { students: Student[] }) {
  const [code, setCode] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = students.find((item) => item.code.toLowerCase() === code.trim().toLowerCase());
    if (!found) {
      setStudent(null);
      setError("Код не найден. Проверьте правильность ввода.");
      return;
    }

    setStudent(found);
    setError("");
  }

  if (student) {
    return (
      <section className="cabinet-dashboard">
        <div className="page-title">
          <span>Кабинет ученика</span>
          <h1>Привет, {student.name}!</h1>
          <p>Здесь собраны материалы именно для тебя.</p>
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
                  Открыть
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
        <span>Закрытая зона</span>
        <h1>Кабинет ученика</h1>
        <p>Введи код доступа, который выдал наставник. После входа откроются персональные материалы.</p>
      </div>
      <form onSubmit={submit}>
        <label>
          Код доступа
          <input
            autoComplete="one-time-code"
            onChange={(event) => setCode(event.target.value)}
            placeholder="Например, IVAN01"
            value={code}
          />
        </label>
        <button type="submit">
          Войти
          <ArrowRight size={18} />
        </button>
        {error ? <p className="form-error">{error}</p> : null}
      </form>
    </section>
  );
}
