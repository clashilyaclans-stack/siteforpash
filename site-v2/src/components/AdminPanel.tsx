"use client";

import { FileText, Lock, Plus, Save, Settings, Trash2, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import type { Article, Benefit, QuickCard, SiteContent, Student } from "@/lib/types";

type Tab = "site" | "articles" | "students";

const defaultEmail = "admin@site.ru";
const defaultPassword = "Admin2026!";

export function AdminPanel({ initialContent }: { initialContent: SiteContent }) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>("site");
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [status, setStatus] = useState("Войдите, чтобы редактировать сайт.");
  const [saving, setSaving] = useState(false);

  const canSave = useMemo(() => loggedIn && !saving, [loggedIn, saving]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Проверяю доступ...");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      setLoggedIn(false);
      setStatus("Неверный логин или пароль.");
      return;
    }

    setLoggedIn(true);
    setStatus("Доступ открыт. Можно редактировать сайт.");
  }

  async function saveContent() {
    if (!canSave) return;
    setSaving(true);
    setStatus("Сохраняю изменения в Supabase...");
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, content })
    });
    const result = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    setSaving(false);

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Не удалось сохранить изменения.");
      return;
    }

    setStatus("Сохранено онлайн. Обновите сайт - изменения уже опубликованы.");
  }

  function updateContent(patch: Partial<SiteContent>) {
    setContent((current) => ({ ...current, ...patch }));
  }

  function updateArticle(index: number, patch: Partial<Article>) {
    setContent((current) => ({
      ...current,
      articles: current.articles.map((article, articleIndex) =>
        articleIndex === index ? { ...article, ...patch } : article
      )
    }));
  }

  function addArticle() {
    setContent((current) => ({
      ...current,
      articles: [
        ...current.articles,
        {
          slug: `article-${Date.now()}`,
          title: "Новая статья",
          category: "Материалы",
          date: new Date().toLocaleDateString("ru-RU"),
          excerpt: "Краткое описание статьи.",
          image: "/images/article-notes.jpg",
          body: ["Первый абзац статьи."]
        }
      ]
    }));
  }

  function deleteArticle(index: number) {
    setContent((current) => ({
      ...current,
      articles: current.articles.filter((_, articleIndex) => articleIndex !== index)
    }));
  }

  function updateStudent(index: number, patch: Partial<Student>) {
    setContent((current) => ({
      ...current,
      students: current.students.map((student, studentIndex) =>
        studentIndex === index ? { ...student, ...patch } : student
      )
    }));
  }

  function addStudent() {
    setContent((current) => ({
      ...current,
      students: [
        ...current.students,
        {
          code: `CODE${current.students.length + 1}`,
          name: "Новый ученик",
          cards: [
            {
              icon: "folder",
              title: "Материалы",
              text: "Персональные материалы ученика."
            }
          ]
        }
      ]
    }));
  }

  function parseQuickCards(value: string): QuickCard[] {
    return value.split("\n").filter(Boolean).map((line) => {
      const [title = "Карточка", text = "Описание", action = "Открыть", href = "/", tone = "blue"] = line.split("|");
      return {
        title,
        text,
        action,
        href,
        tone: tone === "orange" || tone === "violet" ? tone : "blue"
      };
    });
  }

  function parseBenefits(value: string): Benefit[] {
    return value.split("\n").filter(Boolean).map((line) => {
      const [title = "Преимущество", text = "Описание"] = line.split("|");
      return { title, text };
    });
  }

  function deleteStudent(index: number) {
    setContent((current) => ({
      ...current,
      students: current.students.filter((_, studentIndex) => studentIndex !== index)
    }));
  }

  if (!loggedIn) {
    return (
      <main className="admin-page cms-admin">
        <section className="admin-board admin-login">
          <div className="admin-head">
            <div>
              <h1>Вход в админку</h1>
              <p>{status}</p>
            </div>
            <Lock size={34} />
          </div>
          <form className="cms-form" onSubmit={login}>
            <label>
              Почта
              <input autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label>
              Пароль
              <input
                autoComplete="current-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button className="wide-button" type="submit">
              Войти
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page cms-admin">
      <aside className="admin-sidebar">
        <strong>Панель управления</strong>
        <button className={tab === "site" ? "active" : ""} onClick={() => setTab("site")} type="button">
          <Settings /> Сайт
        </button>
        <button className={tab === "articles" ? "active" : ""} onClick={() => setTab("articles")} type="button">
          <FileText /> Статьи
        </button>
        <button className={tab === "students" ? "active" : ""} onClick={() => setTab("students")} type="button">
          <UserRound /> Ученики
        </button>
      </aside>

      <section className="admin-board">
        <div className="admin-head">
          <div>
            <h1>Мини-CMS сайта</h1>
            <p>{status}</p>
          </div>
          <div className="admin-actions">
            <button className="quiet-action" disabled={saving} onClick={saveContent} type="button">
              <Save size={18} />
              {saving ? "Сохраняю..." : "Сохранить онлайн"}
            </button>
          </div>
        </div>

        {tab === "site" ? (
          <article className="admin-card cms-editor">
            <h2>Главная и общие настройки</h2>
            <div className="cms-form">
              <label>Название проекта<input value={content.brand} onChange={(event) => updateContent({ brand: event.target.value })} /></label>
              <label>Логотип<input value={content.logo} onChange={(event) => updateContent({ logo: event.target.value })} /></label>
              <label className="wide-field">Заголовок<input value={content.heroTitle} onChange={(event) => updateContent({ heroTitle: event.target.value })} /></label>
              <label className="wide-field">Фиолетовая строка<input value={content.heroAccent} onChange={(event) => updateContent({ heroAccent: event.target.value })} /></label>
              <label className="wide-field">Описание<textarea value={content.heroText} onChange={(event) => updateContent({ heroText: event.target.value })} /></label>
              <label>Текст главной кнопки<input value={content.heroButtonText} onChange={(event) => updateContent({ heroButtonText: event.target.value })} /></label>
              <label>Текст кнопки видео<input value={content.videoButtonText} onChange={(event) => updateContent({ videoButtonText: event.target.value })} /></label>
              <label>Имя автора<input value={content.authorName} onChange={(event) => updateContent({ authorName: event.target.value })} /></label>
              <label>Роль автора<input value={content.authorRole} onChange={(event) => updateContent({ authorRole: event.target.value })} /></label>
              <label>Ссылка консультации<input value={content.consultationUrl} onChange={(event) => updateContent({ consultationUrl: event.target.value })} /></label>
              <label>Видео MP4 / ссылка<input value={content.videoUrl} onChange={(event) => updateContent({ videoUrl: event.target.value })} /></label>
              <label>Плашка инструкции<input value={content.howBadge} onChange={(event) => updateContent({ howBadge: event.target.value })} /></label>
              <label>Заголовок инструкции<input value={content.howTitle} onChange={(event) => updateContent({ howTitle: event.target.value })} /></label>
              <label className="wide-field">Текст инструкции<textarea value={content.howText} onChange={(event) => updateContent({ howText: event.target.value })} /></label>
              <label>Картинка инструкции<input value={content.howImage} onChange={(event) => updateContent({ howImage: event.target.value })} /></label>
              <label>Заголовок видео-инструкции<input value={content.howVideoTitle} onChange={(event) => updateContent({ howVideoTitle: event.target.value })} /></label>
              <label className="wide-field">
                Быстрый старт
                <textarea
                  value={content.quickCards.map((card) => `${card.title}|${card.text}|${card.action}|${card.href}|${card.tone}`).join("\n")}
                  onChange={(event) => updateContent({ quickCards: parseQuickCards(event.target.value) })}
                />
              </label>
              <label className="wide-field">
                Преимущества
                <textarea
                  value={content.benefits.map((benefit) => `${benefit.title}|${benefit.text}`).join("\n")}
                  onChange={(event) => updateContent({ benefits: parseBenefits(event.target.value) })}
                />
              </label>
            </div>
            <p className="admin-note">Формат быстрого старта: заголовок|текст|кнопка|ссылка|цвет. Цвет: blue, violet или orange.</p>
            <p className="admin-note">Формат преимуществ: заголовок|текст. Каждое преимущество с новой строки.</p>
          </article>
        ) : null}

        {tab === "articles" ? (
          <article className="admin-card cms-editor">
            <div className="section-head">
              <h2>Статьи и материалы</h2>
              <button className="quiet-action" onClick={addArticle} type="button"><Plus size={17} />Добавить статью</button>
            </div>
            <div className="cms-stack">
              {content.articles.map((article, index) => (
                <section className="cms-item" key={`${article.slug}-${index}`}>
                  <div className="cms-toolbar">
                    <strong>Статья {index + 1}</strong>
                    <button className="danger-action" onClick={() => deleteArticle(index)} type="button"><Trash2 size={16} />Удалить</button>
                  </div>
                  <div className="cms-form">
                    <label>Slug<input value={article.slug} onChange={(event) => updateArticle(index, { slug: event.target.value })} /></label>
                    <label>Дата<input value={article.date} onChange={(event) => updateArticle(index, { date: event.target.value })} /></label>
                    <label>Категория<input value={article.category} onChange={(event) => updateArticle(index, { category: event.target.value })} /></label>
                    <label>Картинка<input value={article.image} onChange={(event) => updateArticle(index, { image: event.target.value })} /></label>
                    <label className="wide-field">Название<input value={article.title} onChange={(event) => updateArticle(index, { title: event.target.value })} /></label>
                    <label className="wide-field">Краткое описание<textarea value={article.excerpt} onChange={(event) => updateArticle(index, { excerpt: event.target.value })} /></label>
                    <label className="wide-field">Текст статьи<textarea value={article.body.join("\n\n")} onChange={(event) => updateArticle(index, { body: event.target.value.split(/\n{2,}/).filter(Boolean) })} /></label>
                  </div>
                </section>
              ))}
            </div>
          </article>
        ) : null}

        {tab === "students" ? (
          <article className="admin-card cms-editor">
            <div className="section-head">
              <h2>Личные кабинеты учеников</h2>
              <button className="quiet-action" onClick={addStudent} type="button"><Plus size={17} />Добавить ученика</button>
            </div>
            <div className="cms-stack">
              {content.students.map((student, index) => (
                <section className="cms-item" key={`${student.code}-${index}`}>
                  <div className="cms-toolbar">
                    <strong>{student.name} / код: {student.code}</strong>
                    <button className="danger-action" onClick={() => deleteStudent(index)} type="button"><Trash2 size={16} />Удалить</button>
                  </div>
                  <div className="cms-form">
                    <label>Имя<input value={student.name} onChange={(event) => updateStudent(index, { name: event.target.value })} /></label>
                    <label>Код входа<input value={student.code} onChange={(event) => updateStudent(index, { code: event.target.value })} /></label>
                    <label className="wide-field">Карточки ученика<textarea value={student.cards.map((card) => `${card.icon}|${card.title}|${card.text}`).join("\n")} onChange={(event) => updateStudent(index, { cards: event.target.value.split("\n").filter(Boolean).map((line) => {
                      const [icon = "folder", title = "Карточка", text = "Описание"] = line.split("|");
                      return { icon, title, text };
                    }) })} /></label>
                  </div>
                  <p className="admin-note">Формат карточки: icon|заголовок|текст. Каждая карточка с новой строки.</p>
                </section>
              ))}
            </div>
          </article>
        ) : null}
      </section>
    </main>
  );
}
