import { FileText, Folder, Pencil, Plus, Settings, Trash2, Users } from "lucide-react";

const students = [
  ["Иван Петров", "IVAN01"],
  ["Мария Сидорова", "MARIA02"],
  ["Денис Кузнецов", "DENIS03"],
  ["Алина Смирнова", "ALINA04"]
];

const cards = ["Для тебя", "Твоя бесплатная консультация", "Домашние задания", "Что я рекомендую", "Следующий шаг", "Полезные материалы"];

export default function AdminPage() {
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
          <h1>Панель управления</h1>
          <button><Plus size={18} />Добавить ученика</button>
        </div>
        <article className="admin-card">
          <h2>Список учеников</h2>
          <table>
            <tbody>
              {students.map(([name, code]) => (
                <tr key={code}>
                  <td>{name}</td>
                  <td>{code}</td>
                  <td><Pencil size={17} /><Trash2 size={17} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className="admin-card">
          <h2>Редактирование кабинета ученика</h2>
          <div className="card-list">
            {cards.map((card) => (
              <div key={card}><span>::</span>{card}<Pencil size={17} /></div>
            ))}
          </div>
          <button className="wide-button"><Plus size={18} />Добавить карточку</button>
        </article>
      </section>
    </main>
  );
}
