"use client";

import { FileText, Folder, Pencil, Plus, Save, Settings, Trash2, Users } from "lucide-react";
import { useState } from "react";

type AdminStudent = {
  name: string;
  code: string;
};

const initialStudents: AdminStudent[] = [
  { name: "Иван Петров", code: "IVAN01" },
  { name: "Мария Сидорова", code: "MARIA02" },
  { name: "Денис Кузнецов", code: "DENIS03" },
  { name: "Алина Смирнова", code: "ALINA04" }
];

const initialCards = [
  "Для тебя",
  "Твоя бесплатная консультация",
  "Домашние задания",
  "Что я рекомендую",
  "Следующий шаг",
  "Полезные материалы"
];

export function AdminPanel() {
  const [students, setStudents] = useState(initialStudents);
  const [cards, setCards] = useState(initialCards);
  const [selectedName, setSelectedName] = useState(initialStudents[0].name);
  const [status, setStatus] = useState("Панель работает в демо-режиме до подключения нового Supabase.");

  function addStudent() {
    const nextIndex = students.length + 1;
    const nextStudent = {
      name: `Новый ученик ${nextIndex}`,
      code: `CODE${String(nextIndex).padStart(2, "0")}`
    };
    setStudents((current) => [...current, nextStudent]);
    setSelectedName(nextStudent.name);
    setStatus("Ученик добавлен в демо-панель.");
  }

  function deleteStudent(code: string) {
    setStudents((current) => current.filter((student) => student.code !== code));
    setStatus("Ученик удален из демо-панели.");
  }

  function editStudent(code: string) {
    setStudents((current) =>
      current.map((student) =>
        student.code === code
          ? { ...student, name: `${student.name} • ред.`, code: `${student.code}-A` }
          : student
      )
    );
    setStatus("Данные ученика изменены.");
  }

  function addCard() {
    setCards((current) => [...current, `Новая карточка ${current.length + 1}`]);
    setStatus("Карточка добавлена.");
  }

  function deleteCard(title: string) {
    setCards((current) => current.filter((card) => card !== title));
    setStatus("Карточка удалена.");
  }

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <strong>Панель управления</strong>
        <a className="active"><Users /> Ученики</a>
        <a><FileText /> Консультации</a>
        <a><Folder /> Материалы</a>
        <a><Settings /> Настройки</a>
      </aside>
      <section className="admin-board">
        <div className="admin-head">
          <div>
            <h1>Панель управления</h1>
            <p>{status}</p>
          </div>
          <button onClick={addStudent} type="button"><Plus size={18} />Добавить ученика</button>
        </div>
        <article className="admin-card">
          <h2>Список учеников</h2>
          <table>
            <tbody>
              {students.map((student) => (
                <tr key={student.code}>
                  <td>
                    <button className="table-link" onClick={() => setSelectedName(student.name)} type="button">
                      {student.name}
                    </button>
                  </td>
                  <td>{student.code}</td>
                  <td>
                    <button aria-label={`Редактировать ${student.name}`} onClick={() => editStudent(student.code)} type="button"><Pencil size={17} /></button>
                    <button aria-label={`Удалить ${student.name}`} onClick={() => deleteStudent(student.code)} type="button"><Trash2 size={17} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className="admin-card">
          <h2>Редактирование: {selectedName}</h2>
          <div className="card-list">
            {cards.map((card) => (
              <div key={card}>
                <span>::</span>
                {card}
                <button aria-label={`Редактировать ${card}`} onClick={() => setStatus(`Карточка «${card}» выбрана для редактирования.`)} type="button"><Pencil size={17} /></button>
                <button aria-label={`Удалить ${card}`} onClick={() => deleteCard(card)} type="button"><Trash2 size={17} /></button>
              </div>
            ))}
          </div>
          <button className="wide-button" onClick={addCard} type="button"><Plus size={18} />Добавить карточку</button>
          <button className="wide-button quiet" onClick={() => setStatus("Изменения сохранены локально. Для онлайн-сохранения нужен новый Supabase.")} type="button">
            <Save size={18} />
            Сохранить изменения
          </button>
        </article>
      </section>
    </main>
  );
}
