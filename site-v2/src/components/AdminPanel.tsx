"use client";

import { FileText, Lock, Plus, Save, Settings, Trash2, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import type { AboutCard, Article, Benefit, NavItem, QuickCard, SiteContent, Student, StudentCard } from "@/lib/types";

type Tab = "site" | "pages" | "articles" | "students";

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

  function updateNavItem(index: number, patch: Partial<NavItem>) {
    setContent((current) => ({
      ...current,
      navItems: current.navItems.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
    }));
  }

  function addNavItem() {
    setContent((current) => ({ ...current, navItems: [...current.navItems, { label: "Новый пункт", href: "/" }] }));
  }

  function deleteNavItem(index: number) {
    setContent((current) => ({ ...current, navItems: current.navItems.filter((_, itemIndex) => itemIndex !== index) }));
  }

  function updateQuickCard(index: number, patch: Partial<QuickCard>) {
    setContent((current) => ({
      ...current,
      quickCards: current.quickCards.map((card, cardIndex) => (cardIndex === index ? { ...card, ...patch } : card))
    }));
  }

  function addQuickCard() {
    setContent((current) => ({
      ...current,
      quickCards: [...current.quickCards, { title: "Новая карточка", text: "Описание", action: "Открыть", href: "/", tone: "blue" }]
    }));
  }

  function deleteQuickCard(index: number) {
    setContent((current) => ({ ...current, quickCards: current.quickCards.filter((_, cardIndex) => cardIndex !== index) }));
  }

  function updateBenefit(index: number, patch: Partial<Benefit>) {
    setContent((current) => ({
      ...current,
      benefits: current.benefits.map((benefit, benefitIndex) => (benefitIndex === index ? { ...benefit, ...patch } : benefit))
    }));
  }

  function addBenefit() {
    setContent((current) => ({ ...current, benefits: [...current.benefits, { title: "Преимущество", text: "Описание" }] }));
  }

  function deleteBenefit(index: number) {
    setContent((current) => ({ ...current, benefits: current.benefits.filter((_, benefitIndex) => benefitIndex !== index) }));
  }

  function updateOrbitLabel(index: number, value: string) {
    setContent((current) => ({
      ...current,
      orbitLabels: current.orbitLabels.map((label, labelIndex) => (labelIndex === index ? value : label))
    }));
  }

  function updateAboutCard(index: number, patch: Partial<AboutCard>) {
    setContent((current) => ({
      ...current,
      aboutCards: current.aboutCards.map((card, cardIndex) => (cardIndex === index ? { ...card, ...patch } : card))
    }));
  }

  function addAboutCard() {
    setContent((current) => ({ ...current, aboutCards: [...current.aboutCards, { title: "Новый блок", text: "Описание" }] }));
  }

  function deleteAboutCard(index: number) {
    setContent((current) => ({ ...current, aboutCards: current.aboutCards.filter((_, cardIndex) => cardIndex !== index) }));
  }

  function updateConsultationItem(index: number, value: string) {
    setContent((current) => ({
      ...current,
      consultation: {
        ...current.consultation,
        items: current.consultation.items.map((item, itemIndex) => (itemIndex === index ? value : item))
      }
    }));
  }

  function addConsultationItem() {
    setContent((current) => ({
      ...current,
      consultation: { ...current.consultation, items: [...current.consultation.items, "Новый пункт"] }
    }));
  }

  function deleteConsultationItem(index: number) {
    setContent((current) => ({
      ...current,
      consultation: { ...current.consultation, items: current.consultation.items.filter((_, itemIndex) => itemIndex !== index) }
    }));
  }

  function updateCategory(index: number, value: string) {
    setContent((current) => ({
      ...current,
      materialsPage: {
        ...current.materialsPage,
        categories: current.materialsPage.categories.map((item, itemIndex) => (itemIndex === index ? value : item))
      }
    }));
  }

  function addCategory() {
    setContent((current) => ({
      ...current,
      materialsPage: { ...current.materialsPage, categories: [...current.materialsPage.categories, "Новая категория"] }
    }));
  }

  function deleteCategory(index: number) {
    setContent((current) => ({
      ...current,
      materialsPage: { ...current.materialsPage, categories: current.materialsPage.categories.filter((_, itemIndex) => itemIndex !== index) }
    }));
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
          cards: [{ icon: "folder", title: "Материалы", text: "Персональные материалы ученика." }]
        }
      ]
    }));
  }

  function deleteStudent(index: number) {
    setContent((current) => ({
      ...current,
      students: current.students.filter((_, studentIndex) => studentIndex !== index)
    }));
  }

  function updateStudentCard(studentIndex: number, cardIndex: number, patch: Partial<StudentCard>) {
    setContent((current) => ({
      ...current,
      students: current.students.map((student, index) =>
        index === studentIndex
          ? {
              ...student,
              cards: student.cards.map((card, indexCard) => (indexCard === cardIndex ? { ...card, ...patch } : card))
            }
          : student
      )
    }));
  }

  function addStudentCard(studentIndex: number) {
    setContent((current) => ({
      ...current,
      students: current.students.map((student, index) =>
        index === studentIndex
          ? { ...student, cards: [...student.cards, { icon: "folder", title: "Новая карточка", text: "Описание карточки." }] }
          : student
      )
    }));
  }

  function deleteStudentCard(studentIndex: number, cardIndex: number) {
    setContent((current) => ({
      ...current,
      students: current.students.map((student, index) =>
        index === studentIndex
          ? { ...student, cards: student.cards.filter((_, indexCard) => indexCard !== cardIndex) }
          : student
      )
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
          <Settings /> Главная
        </button>
        <button className={tab === "pages" ? "active" : ""} onClick={() => setTab("pages")} type="button">
          <Settings /> Страницы
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
            <h1>Пульт управления сайтом</h1>
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
            <h2>Главная, меню, футер и медиа</h2>
            <div className="cms-form">
              <label>Название проекта<input value={content.brand} onChange={(event) => updateContent({ brand: event.target.value })} /></label>
              <label>Логотип<input value={content.logo} onChange={(event) => updateContent({ logo: event.target.value })} /></label>
              <label>Верхняя кнопка<input value={content.headerButtonText} onChange={(event) => updateContent({ headerButtonText: event.target.value })} /></label>
              <label>Текст кнопки звонка/консультации<input value={content.phoneButtonLabel} onChange={(event) => updateContent({ phoneButtonLabel: event.target.value })} /></label>
              <label>Открыть меню<input value={content.menuOpenLabel} onChange={(event) => updateContent({ menuOpenLabel: event.target.value })} /></label>
              <label>Закрыть меню<input value={content.menuCloseLabel} onChange={(event) => updateContent({ menuCloseLabel: event.target.value })} /></label>
              <label className="wide-field">Текст в футере<textarea value={content.footerText} onChange={(event) => updateContent({ footerText: event.target.value })} /></label>
            </div>

            <h3>Меню сайта</h3>
            <div className="cms-stack">
              {content.navItems.map((item, index) => (
                <section className="cms-item" key={`${item.href}-${index}`}>
                  <div className="cms-toolbar">
                    <strong>Пункт меню {index + 1}</strong>
                    <button className="danger-action" onClick={() => deleteNavItem(index)} type="button"><Trash2 size={16} />Удалить</button>
                  </div>
                  <div className="cms-form">
                    <label>Название<input value={item.label} onChange={(event) => updateNavItem(index, { label: event.target.value })} /></label>
                    <label>Ссылка<input value={item.href} onChange={(event) => updateNavItem(index, { href: event.target.value })} /></label>
                  </div>
                </section>
              ))}
              <button className="quiet-action" onClick={addNavItem} type="button"><Plus size={17} />Добавить пункт меню</button>
            </div>

            <h3>Первый экран</h3>
            <div className="cms-form">
              <label className="wide-field">Заголовок<input value={content.heroTitle} onChange={(event) => updateContent({ heroTitle: event.target.value })} /></label>
              <label className="wide-field">Фиолетовая строка<input value={content.heroAccent} onChange={(event) => updateContent({ heroAccent: event.target.value })} /></label>
              <label className="wide-field">Описание<textarea value={content.heroText} onChange={(event) => updateContent({ heroText: event.target.value })} /></label>
              <label>Текст главной кнопки<input value={content.heroButtonText} onChange={(event) => updateContent({ heroButtonText: event.target.value })} /></label>
              <label>Ссылка консультации<input value={content.consultationUrl} onChange={(event) => updateContent({ consultationUrl: event.target.value })} /></label>
              <label>Имя автора<input value={content.authorName} onChange={(event) => updateContent({ authorName: event.target.value })} /></label>
              <label>Роль автора<input value={content.authorRole} onChange={(event) => updateContent({ authorRole: event.target.value })} /></label>
              <label>Фото автора<input value={content.aboutImage} onChange={(event) => updateContent({ aboutImage: event.target.value })} /></label>
              {content.orbitLabels.map((label, index) => (
                <label key={`orbit-${index}`}>Плашка вокруг фото {index + 1}<input value={label} onChange={(event) => updateOrbitLabel(index, event.target.value)} /></label>
              ))}
            </div>

            <h3>Видео-инструкция</h3>
            <div className="cms-form">
              <label>Плашка<input value={content.howBadge} onChange={(event) => updateContent({ howBadge: event.target.value })} /></label>
              <label>Заголовок<input value={content.howTitle} onChange={(event) => updateContent({ howTitle: event.target.value })} /></label>
              <label className="wide-field">Текст<textarea value={content.howText} onChange={(event) => updateContent({ howText: event.target.value })} /></label>
              <label>Картинка блока<input value={content.howImage} onChange={(event) => updateContent({ howImage: event.target.value })} /></label>
              <label>Заголовок внутри видео<input value={content.howVideoTitle} onChange={(event) => updateContent({ howVideoTitle: event.target.value })} /></label>
              <label>Видео MP4 / ссылка<input value={content.videoUrl} onChange={(event) => updateContent({ videoUrl: event.target.value })} /></label>
              <label className="wide-field">Текст, если видео не загружено<textarea value={content.videoPlaceholderText} onChange={(event) => updateContent({ videoPlaceholderText: event.target.value })} /></label>
            </div>

            <h3>Быстрый старт</h3>
            <div className="cms-form">
              <label>Заголовок<input value={content.quickTitle} onChange={(event) => updateContent({ quickTitle: event.target.value })} /></label>
              <label className="wide-field">Описание<textarea value={content.quickText} onChange={(event) => updateContent({ quickText: event.target.value })} /></label>
            </div>
            <div className="cms-stack">
              {content.quickCards.map((card, index) => (
                <section className="cms-item" key={`${card.title}-${index}`}>
                  <div className="cms-toolbar">
                    <strong>Карточка быстрого старта {index + 1}</strong>
                    <button className="danger-action" onClick={() => deleteQuickCard(index)} type="button"><Trash2 size={16} />Удалить</button>
                  </div>
                  <div className="cms-form">
                    <label>Заголовок<input value={card.title} onChange={(event) => updateQuickCard(index, { title: event.target.value })} /></label>
                    <label>Текст кнопки<input value={card.action} onChange={(event) => updateQuickCard(index, { action: event.target.value })} /></label>
                    <label>Ссылка<input value={card.href} onChange={(event) => updateQuickCard(index, { href: event.target.value })} /></label>
                    <label>Цвет<select value={card.tone} onChange={(event) => updateQuickCard(index, { tone: event.target.value as QuickCard["tone"] })}><option value="blue">Синий</option><option value="violet">Фиолетовый</option><option value="orange">Оранжевый</option></select></label>
                    <label className="wide-field">Описание<textarea value={card.text} onChange={(event) => updateQuickCard(index, { text: event.target.value })} /></label>
                  </div>
                </section>
              ))}
              <button className="quiet-action" onClick={addQuickCard} type="button"><Plus size={17} />Добавить карточку</button>
            </div>

            <h3>Преимущества</h3>
            <div className="cms-stack">
              {content.benefits.map((benefit, index) => (
                <section className="cms-item" key={`${benefit.title}-${index}`}>
                  <div className="cms-toolbar">
                    <strong>Преимущество {index + 1}</strong>
                    <button className="danger-action" onClick={() => deleteBenefit(index)} type="button"><Trash2 size={16} />Удалить</button>
                  </div>
                  <div className="cms-form">
                    <label>Заголовок<input value={benefit.title} onChange={(event) => updateBenefit(index, { title: event.target.value })} /></label>
                    <label className="wide-field">Текст<textarea value={benefit.text} onChange={(event) => updateBenefit(index, { text: event.target.value })} /></label>
                  </div>
                </section>
              ))}
              <button className="quiet-action" onClick={addBenefit} type="button"><Plus size={17} />Добавить преимущество</button>
            </div>
          </article>
        ) : null}

        {tab === "pages" ? (
          <article className="admin-card cms-editor">
            <h2>Остальные страницы сайта</h2>
            <h3>Контакты</h3>
            <div className="cms-form">
              <label>Контактное имя<input value={content.contactName} onChange={(event) => updateContent({ contactName: event.target.value })} /></label>
              <label>Телефон<input value={content.contactPhone} onChange={(event) => updateContent({ contactPhone: event.target.value })} /></label>
              <label>Плашка<input value={content.contactBadge} onChange={(event) => updateContent({ contactBadge: event.target.value })} /></label>
              <label>Заголовок<input value={content.contactTitle} onChange={(event) => updateContent({ contactTitle: event.target.value })} /></label>
              <label className="wide-field">Описание<textarea value={content.contactText} onChange={(event) => updateContent({ contactText: event.target.value })} /></label>
            </div>

            <h3>Обо мне</h3>
            <div className="cms-form">
              <label>Плашка<input value={content.aboutBadge} onChange={(event) => updateContent({ aboutBadge: event.target.value })} /></label>
              <label className="wide-field">Основной текст<textarea value={content.aboutText} onChange={(event) => updateContent({ aboutText: event.target.value })} /></label>
              <label>Фото<input value={content.aboutImage} onChange={(event) => updateContent({ aboutImage: event.target.value })} /></label>
            </div>
            <div className="cms-stack">
              {content.aboutCards.map((card, index) => (
                <section className="cms-item" key={`${card.title}-${index}`}>
                  <div className="cms-toolbar">
                    <strong>Блок “Обо мне” {index + 1}</strong>
                    <button className="danger-action" onClick={() => deleteAboutCard(index)} type="button"><Trash2 size={16} />Удалить</button>
                  </div>
                  <div className="cms-form">
                    <label>Заголовок<input value={card.title} onChange={(event) => updateAboutCard(index, { title: event.target.value })} /></label>
                    <label className="wide-field">Текст<textarea value={card.text} onChange={(event) => updateAboutCard(index, { text: event.target.value })} /></label>
                  </div>
                </section>
              ))}
              <button className="quiet-action" onClick={addAboutCard} type="button"><Plus size={17} />Добавить блок</button>
            </div>

            <h3>Консультация</h3>
            <div className="cms-form">
              <label>Плашка<input value={content.consultation.badge} onChange={(event) => updateContent({ consultation: { ...content.consultation, badge: event.target.value } })} /></label>
              <label className="wide-field">Заголовок<input value={content.consultation.title} onChange={(event) => updateContent({ consultation: { ...content.consultation, title: event.target.value } })} /></label>
              <label className="wide-field">Описание<textarea value={content.consultation.text} onChange={(event) => updateContent({ consultation: { ...content.consultation, text: event.target.value } })} /></label>
              <label>Текст кнопки<input value={content.consultation.buttonText} onChange={(event) => updateContent({ consultation: { ...content.consultation, buttonText: event.target.value } })} /></label>
              <label>Ссылка кнопки<input value={content.consultation.buttonHref} onChange={(event) => updateContent({ consultation: { ...content.consultation, buttonHref: event.target.value } })} /></label>
            </div>
            <div className="cms-stack">
              {content.consultation.items.map((item, index) => (
                <section className="cms-item" key={`${item}-${index}`}>
                  <div className="cms-toolbar">
                    <strong>Пункт консультации {index + 1}</strong>
                    <button className="danger-action" onClick={() => deleteConsultationItem(index)} type="button"><Trash2 size={16} />Удалить</button>
                  </div>
                  <div className="cms-form">
                    <label className="wide-field">Текст пункта<input value={item} onChange={(event) => updateConsultationItem(index, event.target.value)} /></label>
                  </div>
                </section>
              ))}
              <button className="quiet-action" onClick={addConsultationItem} type="button"><Plus size={17} />Добавить пункт</button>
            </div>

            <h3>Материалы</h3>
            <div className="cms-form">
              <label>Плашка<input value={content.materialsPage.badge} onChange={(event) => updateContent({ materialsPage: { ...content.materialsPage, badge: event.target.value } })} /></label>
              <label className="wide-field">Заголовок<input value={content.materialsPage.title} onChange={(event) => updateContent({ materialsPage: { ...content.materialsPage, title: event.target.value } })} /></label>
              <label className="wide-field">Описание<textarea value={content.materialsPage.text} onChange={(event) => updateContent({ materialsPage: { ...content.materialsPage, text: event.target.value } })} /></label>
              <label>Кнопка “читать”<input value={content.materialsPage.readLabel} onChange={(event) => updateContent({ materialsPage: { ...content.materialsPage, readLabel: event.target.value } })} /></label>
              <label>Кнопка “все статьи”<input value={content.materialsPage.allLabel} onChange={(event) => updateContent({ materialsPage: { ...content.materialsPage, allLabel: event.target.value } })} /></label>
              <label>Кнопка назад / все статьи<input value={content.materialsPage.backLabel} onChange={(event) => updateContent({ materialsPage: { ...content.materialsPage, backLabel: event.target.value } })} /></label>
            </div>
            <div className="cms-stack">
              {content.materialsPage.categories.map((category, index) => (
                <section className="cms-item" key={`${category}-${index}`}>
                  <div className="cms-toolbar">
                    <strong>Категория {index + 1}</strong>
                    <button className="danger-action" onClick={() => deleteCategory(index)} type="button"><Trash2 size={16} />Удалить</button>
                  </div>
                  <div className="cms-form">
                    <label>Название<input value={category} onChange={(event) => updateCategory(index, event.target.value)} /></label>
                  </div>
                </section>
              ))}
              <button className="quiet-action" onClick={addCategory} type="button"><Plus size={17} />Добавить категорию</button>
            </div>

            <h3>Кабинет ученика</h3>
            <div className="cms-form">
              <label>Плашка входа<input value={content.cabinet.closedBadge} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, closedBadge: event.target.value } })} /></label>
              <label>Заголовок входа<input value={content.cabinet.closedTitle} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, closedTitle: event.target.value } })} /></label>
              <label className="wide-field">Описание входа<textarea value={content.cabinet.closedText} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, closedText: event.target.value } })} /></label>
              <label>Подпись поля кода<input value={content.cabinet.codeLabel} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, codeLabel: event.target.value } })} /></label>
              <label>Подсказка поля кода<input value={content.cabinet.codePlaceholder} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, codePlaceholder: event.target.value } })} /></label>
              <label>Кнопка входа<input value={content.cabinet.loginButton} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, loginButton: event.target.value } })} /></label>
              <label className="wide-field">Текст ошибки<textarea value={content.cabinet.errorText} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, errorText: event.target.value } })} /></label>
              <label>Плашка после входа<input value={content.cabinet.dashboardBadge} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, dashboardBadge: event.target.value } })} /></label>
              <label>Приветствие<input value={content.cabinet.dashboardGreeting} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, dashboardGreeting: event.target.value } })} /></label>
              <label className="wide-field">Описание после входа<textarea value={content.cabinet.dashboardText} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, dashboardText: event.target.value } })} /></label>
              <label>Текст кнопки карточек<input value={content.cabinet.cardButtonText} onChange={(event) => updateContent({ cabinet: { ...content.cabinet, cardButtonText: event.target.value } })} /></label>
            </div>
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
                  <p className="admin-note">Для нового абзаца нажмите Enter два раза. Один Enter остаётся переносом внутри текущего абзаца.</p>
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
              {content.students.map((student, studentIndex) => (
                <section className="cms-item" key={`${student.code}-${studentIndex}`}>
                  <div className="cms-toolbar">
                    <strong>{student.name} / код: {student.code}</strong>
                    <button className="danger-action" onClick={() => deleteStudent(studentIndex)} type="button"><Trash2 size={16} />Удалить ученика</button>
                  </div>
                  <div className="cms-form">
                    <label>Имя<input value={student.name} onChange={(event) => updateStudent(studentIndex, { name: event.target.value })} /></label>
                    <label>Код входа<input value={student.code} onChange={(event) => updateStudent(studentIndex, { code: event.target.value })} /></label>
                  </div>
                  <div className="cms-stack">
                    {student.cards.map((card, cardIndex) => (
                      <section className="cms-item" key={`${card.title}-${cardIndex}`}>
                        <div className="cms-toolbar">
                          <strong>Карточка ученика {cardIndex + 1}</strong>
                          <button className="danger-action" onClick={() => deleteStudentCard(studentIndex, cardIndex)} type="button"><Trash2 size={16} />Удалить карточку</button>
                        </div>
                        <div className="cms-form">
                          <label>Иконка<input value={card.icon} onChange={(event) => updateStudentCard(studentIndex, cardIndex, { icon: event.target.value })} /></label>
                          <label>Заголовок<input value={card.title} onChange={(event) => updateStudentCard(studentIndex, cardIndex, { title: event.target.value })} /></label>
                          <label className="wide-field">Текст<textarea value={card.text} onChange={(event) => updateStudentCard(studentIndex, cardIndex, { text: event.target.value })} /></label>
                        </div>
                      </section>
                    ))}
                    <button className="quiet-action" onClick={() => addStudentCard(studentIndex)} type="button"><Plus size={17} />Добавить карточку ученика</button>
                  </div>
                </section>
              ))}
            </div>
          </article>
        ) : null}
      </section>
    </main>
  );
}
