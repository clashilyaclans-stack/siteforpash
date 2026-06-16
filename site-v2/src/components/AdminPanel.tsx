"use client";

import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  FileArchive,
  FileText,
  Folder,
  ImageIcon,
  Link2,
  Plus,
  Save,
  Settings,
  Trash2,
  Video
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CmsBlock = {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  text: string;
  buttonText: string;
  buttonUrl: string;
  icon: string;
  image: string;
  video: string;
  file: string;
  visible: boolean;
};

const initialBlocks: CmsBlock[] = [
  {
    id: "hero",
    section: "Главная",
    title: "Помогаю найти свой путь и выбрать профессию по душе",
    subtitle: "Профориентация для школьников и студентов",
    text: "Определяем сильные стороны, интересы и возможности.",
    buttonText: "Записаться на консультацию",
    buttonUrl: "/consultation",
    icon: "Compass",
    image: "/images/hero-author-v3.jpg",
    video: "",
    file: "",
    visible: true
  },
  {
    id: "how-to",
    section: "Главная",
    title: "Как пользоваться сайтом?",
    subtitle: "Начните отсюда",
    text: "Текст инструкции. После текста размещается изображение, затем видео и дополнительные материалы.",
    buttonText: "Запустить видео",
    buttonUrl: "",
    icon: "Video",
    image: "/images/hero-video.jpg",
    video: "",
    file: "",
    visible: true
  },
  {
    id: "quick-start",
    section: "Главная",
    title: "Быстрый старт",
    subtitle: "Навигационные карточки",
    text: "Три карточки: впервые на сайте, ученик, консультация.",
    buttonText: "Редактировать карточки",
    buttonUrl: "",
    icon: "Folder",
    image: "",
    video: "",
    file: "",
    visible: true
  },
  {
    id: "benefits",
    section: "Главная",
    title: "Преимущества",
    subtitle: "Последний блок главной",
    text: "Индивидуальный подход, практические рекомендации, опыт и экспертиза, поддержка на пути.",
    buttonText: "",
    buttonUrl: "",
    icon: "Users",
    image: "",
    video: "",
    file: "",
    visible: true
  },
  {
    id: "about-cards",
    section: "Обо мне",
    title: "Карточки автора",
    subtitle: "Опыт, достижения, подход",
    text: "Каждая карточка поддерживает заголовок, описание, иконку, порядок, изображение, видео и файл.",
    buttonText: "",
    buttonUrl: "",
    icon: "Pencil",
    image: "",
    video: "",
    file: "",
    visible: true
  },
  {
    id: "materials",
    section: "Материалы",
    title: "Бесплатные материалы",
    subtitle: "Отдельный раздел сайта",
    text: "Статьи и материалы не показываются на главной и управляются отдельно.",
    buttonText: "Смотреть все статьи",
    buttonUrl: "/materials",
    icon: "FileText",
    image: "",
    video: "",
    file: "",
    visible: true
  }
];

const iconOptions = ["Compass", "Video", "Folder", "Users", "FileText", "Pencil", "Target", "Heart", "Shield", "BookOpen"];

export function AdminPanel() {
  const [blocks, setBlocks] = useState<CmsBlock[]>(initialBlocks);
  const [activeId, setActiveId] = useState(initialBlocks[0].id);
  const [status, setStatus] = useState("Черновик готов к редактированию.");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-v2-cms-draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CmsBlock[];
        setBlocks(parsed);
        setActiveId(parsed[0]?.id || initialBlocks[0].id);
      } catch {
        setStatus("Не удалось прочитать локальный черновик.");
      }
    }
  }, []);

  const activeBlock = useMemo(
    () => blocks.find((block) => block.id === activeId) || blocks[0],
    [activeId, blocks]
  );

  function updateBlock(patch: Partial<CmsBlock>) {
    setBlocks((current) => current.map((block) => (block.id === activeBlock.id ? { ...block, ...patch } : block)));
  }

  function addBlock() {
    const next: CmsBlock = {
      id: `block-${Date.now()}`,
      section: "Новый раздел",
      title: "Новый блок",
      subtitle: "Подзаголовок",
      text: "Текст блока",
      buttonText: "Кнопка",
      buttonUrl: "",
      icon: "Folder",
      image: "",
      video: "",
      file: "",
      visible: true
    };
    setBlocks((current) => [...current, next]);
    setActiveId(next.id);
    setStatus("Новый блок добавлен.");
  }

  function deleteBlock(id: string) {
    setBlocks((current) => {
      const next = current.filter((block) => block.id !== id);
      setActiveId(next[0]?.id || "");
      return next;
    });
    setStatus("Блок удален из черновика.");
  }

  function moveBlock(id: string, direction: -1 | 1) {
    setBlocks((current) => {
      const index = current.findIndex((block) => block.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setStatus("Порядок блоков изменен.");
  }

  function saveDraft() {
    window.localStorage.setItem("site-v2-cms-draft", JSON.stringify(blocks));
    setStatus("Изменения сохранены локально. Для онлайн-сохранения подключите Supabase запись.");
  }

  return (
    <main className="admin-page cms-admin">
      <aside className="admin-sidebar">
        <strong>Панель управления</strong>
        <a className="active"><Folder /> Разделы и блоки</a>
        <a><FileText /> Тексты</a>
        <a><ImageIcon /> Изображения</a>
        <a><Video /> Видео</a>
        <a><FileArchive /> Файлы</a>
        <a><Settings /> Настройки</a>
      </aside>

      <section className="admin-board">
        <div className="admin-head">
          <div>
            <h1>Мини-CMS сайта</h1>
            <p>{status}</p>
          </div>
          <div className="admin-actions">
            <button onClick={addBlock} type="button"><Plus size={18} />Добавить блок</button>
            <button className="quiet-action" onClick={saveDraft} type="button"><Save size={18} />Сохранить</button>
          </div>
        </div>

        <div className="cms-grid">
          <article className="admin-card">
            <h2>Структура сайта</h2>
            <p className="admin-note">Здесь меняются порядок, видимость, названия разделов и карточек.</p>
            <div className="cms-block-list">
              {blocks.map((block, index) => (
                <button
                  className={block.id === activeBlock.id ? "selected" : ""}
                  key={block.id}
                  onClick={() => setActiveId(block.id)}
                  type="button"
                >
                  <span>
                    <b>{index + 1}. {block.section}</b>
                    <small>{block.title}</small>
                  </span>
                  {block.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              ))}
            </div>
          </article>

          <article className="admin-card cms-editor">
            <h2>Редактирование блока</h2>
            {activeBlock ? (
              <>
                <div className="cms-toolbar">
                  <button onClick={() => moveBlock(activeBlock.id, -1)} type="button"><ArrowUp size={16} />Выше</button>
                  <button onClick={() => moveBlock(activeBlock.id, 1)} type="button"><ArrowDown size={16} />Ниже</button>
                  <button onClick={() => updateBlock({ visible: !activeBlock.visible })} type="button">
                    {activeBlock.visible ? <EyeOff size={16} /> : <Eye size={16} />}
                    {activeBlock.visible ? "Скрыть" : "Показать"}
                  </button>
                  <button className="danger-action" onClick={() => deleteBlock(activeBlock.id)} type="button"><Trash2 size={16} />Удалить</button>
                </div>

                <div className="cms-form">
                  <label>Раздел<input value={activeBlock.section} onChange={(event) => updateBlock({ section: event.target.value })} /></label>
                  <label>Заголовок<input value={activeBlock.title} onChange={(event) => updateBlock({ title: event.target.value })} /></label>
                  <label>Подзаголовок<input value={activeBlock.subtitle} onChange={(event) => updateBlock({ subtitle: event.target.value })} /></label>
                  <label className="wide-field">Текст<textarea value={activeBlock.text} onChange={(event) => updateBlock({ text: event.target.value })} /></label>
                  <label>Текст кнопки<input value={activeBlock.buttonText} onChange={(event) => updateBlock({ buttonText: event.target.value })} /></label>
                  <label>Ссылка кнопки<input value={activeBlock.buttonUrl} onChange={(event) => updateBlock({ buttonUrl: event.target.value })} /></label>
                  <label>
                    Иконка
                    <select value={activeBlock.icon} onChange={(event) => updateBlock({ icon: event.target.value })}>
                      {iconOptions.map((icon) => <option key={icon}>{icon}</option>)}
                    </select>
                  </label>
                  <label>Изображение<input value={activeBlock.image} onChange={(event) => updateBlock({ image: event.target.value })} placeholder="/images/example.png" /></label>
                  <label>Видео<input value={activeBlock.video} onChange={(event) => updateBlock({ video: event.target.value })} placeholder="MP4, YouTube, VK, Rutube" /></label>
                  <label>Файл<input value={activeBlock.file} onChange={(event) => updateBlock({ file: event.target.value })} placeholder="PDF, DOCX, ZIP..." /></label>
                </div>
              </>
            ) : null}
          </article>

          <article className="admin-card cms-preview">
            <h2>Предпросмотр структуры блока</h2>
            <div className="preview-sequence">
              <strong>{activeBlock?.title}</strong>
              <p>{activeBlock?.text}</p>
              <span><ImageIcon size={17} /> Изображение: {activeBlock?.image || "не задано"}</span>
              <span><Video size={17} /> Видео: {activeBlock?.video || "не задано"}</span>
              <span><FileArchive size={17} /> Файл: {activeBlock?.file || "не задано"}</span>
              <span><Link2 size={17} /> Кнопка: {activeBlock?.buttonText || "не задана"}</span>
            </div>
            <p className="admin-note">
              Единый порядок для информационных разделов: заголовок, текст, изображение, видео, файл.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
