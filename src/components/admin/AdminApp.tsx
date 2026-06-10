"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  ImagePlus,
  LogOut,
  Plus,
  Save,
  Trash2
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import type {
  Article,
  ArticleSection,
  IconName,
  InfoBlock,
  SiteContent
} from "@/lib/types";

type AdminTab =
  | "profile"
  | "blocks"
  | "video"
  | "articles"
  | "important"
  | "contacts"
  | "settings";

type AdminAppProps = {
  initialContent: SiteContent;
  supabaseConfigured: boolean;
};

const tabs: { key: AdminTab; label: string }[] = [
  { key: "profile", label: "Профиль" },
  { key: "blocks", label: "Блоки" },
  { key: "video", label: "Видео" },
  { key: "articles", label: "Статьи" },
  { key: "important", label: "Важно" },
  { key: "contacts", label: "Контакты" },
  { key: "settings", label: "Настройки" }
];

const iconOptions: IconName[] = [
  "info",
  "target",
  "video",
  "book",
  "help",
  "calendar",
  "play",
  "warning"
];

export function AdminApp({ initialContent, supabaseConfigured }: AdminAppProps) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeTab, setActiveTab] = useState<AdminTab>("profile");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(!supabaseConfigured);
  const [status, setStatus] = useState(
    supabaseConfigured
      ? "Войдите, чтобы редактировать сайт."
      : "Supabase не настроен: открыт демо-режим без облачного сохранения."
  );
  const [busy, setBusy] = useState(false);

  const loadCloudContent = useCallback(async () => {
    if (!supabase) {
      return;
    }

    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "main")
      .maybeSingle();

    if (error) {
      setStatus(`Не удалось загрузить контент: ${error.message}`);
      return;
    }

    if (data?.content && Object.keys(data.content as object).length) {
      setContent(data.content as SiteContent);
      setStatus("Контент загружен из Supabase.");
    }
  }, [supabase]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsAuthed(true);
        loadCloudContent();
      }
    });
  }, [loadCloudContent, supabase]);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("Добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    setIsAuthed(true);
    setStatus("Вход выполнен.");
    await loadCloudContent();
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setIsAuthed(!supabaseConfigured);
    setStatus("Вы вышли из админки.");
  }

  async function saveContent() {
    if (!supabase) {
      setStatus("Демо-режим: подключите Supabase, чтобы сохранять изменения онлайн.");
      return;
    }

    setBusy(true);
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: "main", content }, { onConflict: "id" });
    setBusy(false);

    setStatus(error ? `Ошибка сохранения: ${error.message}` : "Сохранено. Обновите сайт.");
  }

  async function uploadImage(file: File, onUrl: (url: string) => void) {
    if (!supabase) {
      setStatus("Загрузка фото доступна после подключения Supabase Storage.");
      return;
    }

    const ext = file.name.split(".").pop() || "jpg";
    const path = `uploads/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    setBusy(true);
    const { error } = await supabase.storage.from("site-media").upload(path, file, {
      cacheControl: "3600",
      upsert: true
    });
    setBusy(false);

    if (error) {
      setStatus(`Фото не загружено: ${error.message}`);
      return;
    }

    const { data } = supabase.storage.from("site-media").getPublicUrl(path);
    onUrl(data.publicUrl);
    setStatus("Фото загружено. Нажмите “Сохранить”, чтобы применить.");
  }

  if (!isAuthed) {
    return (
      <main className="admin-auth">
        <form className="admin-auth-card" onSubmit={signIn}>
          <BookOpen size={34} />
          <h1>Вход в админку</h1>
          <p>Введите email и пароль владельца сайта.</p>
          <label>
            Email
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="owner@mail.ru"
              type="email"
              value={email}
            />
          </label>
          <label>
            Пароль
            <input
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Пароль"
              type="password"
              value={password}
            />
          </label>
          <button className="admin-primary" disabled={busy} type="submit">
            Войти
          </button>
          <span className="admin-status">{status}</span>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <span>Админка сайта</span>
          <strong>{content.settings.siteName}</strong>
        </div>
        <div className="admin-actions">
          <Link href="/" target="_blank">
            <Eye size={18} />
            Сайт
          </Link>
          <button onClick={saveContent} disabled={busy} type="button">
            <Save size={18} />
            Сохранить
          </button>
          {supabaseConfigured ? (
            <button onClick={signOut} type="button" aria-label="Выйти">
              <LogOut size={18} />
            </button>
          ) : null}
        </div>
      </header>

      <nav className="admin-tabs" aria-label="Разделы админки">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab.key ? "active" : ""}
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="admin-status-line">{status}</section>

      <section className="admin-panel">
        {activeTab === "profile" ? (
          <ProfileEditor content={content} setContent={setContent} uploadImage={uploadImage} />
        ) : null}
        {activeTab === "blocks" ? (
          <BlocksEditor content={content} setContent={setContent} />
        ) : null}
        {activeTab === "video" ? (
          <VideoEditor content={content} setContent={setContent} uploadImage={uploadImage} />
        ) : null}
        {activeTab === "articles" ? (
          <ArticlesEditor content={content} setContent={setContent} uploadImage={uploadImage} />
        ) : null}
        {activeTab === "important" ? (
          <ImportantEditor content={content} setContent={setContent} />
        ) : null}
        {activeTab === "contacts" ? (
          <ContactsEditor content={content} setContent={setContent} />
        ) : null}
        {activeTab === "settings" ? (
          <SettingsEditor content={content} setContent={setContent} />
        ) : null}
      </section>
    </main>
  );
}

type EditorProps = {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
};

type UploadFn = (file: File, onUrl: (url: string) => void) => Promise<void>;

function ProfileEditor({
  content,
  setContent,
  uploadImage
}: EditorProps & { uploadImage: UploadFn }) {
  return (
    <div className="admin-form-grid">
      <TextField label="Имя" value={content.home.teacherName} onChange={(value) => setHome(setContent, { teacherName: value })} />
      <TextField label="Специализация" value={content.home.teacherRole} onChange={(value) => setHome(setContent, { teacherRole: value })} />
      <TextField label="Краткое приветствие" textarea value={content.home.shortBio} onChange={(value) => setHome(setContent, { shortBio: value })} />
      <ImageField
        label="Аватар"
        value={content.home.avatarUrl}
        onUpload={(file) => uploadImage(file, (url) => setHome(setContent, { avatarUrl: url }))}
      />
    </div>
  );
}

function BlocksEditor({ content, setContent }: EditorProps) {
  return (
    <div className="admin-stack">
      <button className="admin-secondary" onClick={() => addInfoBlock(setContent)} type="button">
        <Plus size={18} />
        Добавить блок
      </button>
      {[...content.infoBlocks].sort((left, right) => left.order - right.order).map((block) => (
        <article className="admin-edit-card" key={block.id}>
          <div className="admin-card-head">
            <strong>{block.title}</strong>
            <button className="icon-danger" onClick={() => removeInfoBlock(setContent, block.id)} type="button">
              <Trash2 size={18} />
            </button>
          </div>
          <div className="admin-inline">
            <TextField label="Заголовок" value={block.title} onChange={(value) => updateInfoBlock(setContent, block.id, { title: value })} />
            <SelectField label="Иконка" value={block.icon} options={iconOptions} onChange={(value) => updateInfoBlock(setContent, block.id, { icon: value as IconName })} />
          </div>
          <TextField label="Текст" textarea value={block.description} onChange={(value) => updateInfoBlock(setContent, block.id, { description: value })} />
          <div className="admin-inline">
            <TextField label="Ссылка" value={block.href || ""} onChange={(value) => updateInfoBlock(setContent, block.id, { href: value })} />
            <TextField label="Порядок" value={String(block.order)} onChange={(value) => updateInfoBlock(setContent, block.id, { order: Number(value) || 1 })} />
          </div>
          <VisibilityField checked={block.visible} onChange={(visible) => updateInfoBlock(setContent, block.id, { visible })} />
        </article>
      ))}
    </div>
  );
}

function VideoEditor({
  content,
  setContent,
  uploadImage
}: EditorProps & { uploadImage: UploadFn }) {
  return (
    <div className="admin-form-grid">
      <TextField label="Заголовок видео" value={content.video.title} onChange={(value) => setVideo(setContent, { title: value })} />
      <TextField label="Ссылка на видео" value={content.video.videoUrl} onChange={(value) => setVideo(setContent, { videoUrl: value })} />
      <TextField label="Описание" textarea value={content.video.description} onChange={(value) => setVideo(setContent, { description: value })} />
      <ImageField
        label="Обложка видео"
        value={content.video.posterUrl}
        onUpload={(file) => uploadImage(file, (url) => setVideo(setContent, { posterUrl: url }))}
      />
      <VisibilityField checked={content.video.visible} onChange={(visible) => setVideo(setContent, { visible })} />
    </div>
  );
}

function ArticlesEditor({
  content,
  setContent,
  uploadImage
}: EditorProps & { uploadImage: UploadFn }) {
  return (
    <div className="admin-stack">
      <button className="admin-secondary" onClick={() => addArticle(setContent)} type="button">
        <Plus size={18} />
        Добавить статью
      </button>
      {[...content.articles].sort((left, right) => left.order - right.order).map((article) => (
        <article className="admin-edit-card" key={article.id}>
          <div className="admin-card-head">
            <strong>{article.title}</strong>
            <button className="icon-danger" onClick={() => removeArticle(setContent, article.id)} type="button">
              <Trash2 size={18} />
            </button>
          </div>
          <div className="admin-inline">
            <TextField label="Заголовок" value={article.title} onChange={(value) => updateArticle(setContent, article.id, { title: value })} />
            <TextField label="URL slug" value={article.slug} onChange={(value) => updateArticle(setContent, article.id, { slug: slugify(value) })} />
          </div>
          <div className="admin-inline">
            <TextField label="Дата" value={article.date} onChange={(value) => updateArticle(setContent, article.id, { date: value })} />
            <SelectField label="Иконка" value={article.icon} options={iconOptions} onChange={(value) => updateArticle(setContent, article.id, { icon: value as IconName })} />
          </div>
          <TextField label="Краткое описание" textarea value={article.excerpt} onChange={(value) => updateArticle(setContent, article.id, { excerpt: value })} />
          <div className="admin-inline">
            <TextField label="Цвет иконки" value={article.color} onChange={(value) => updateArticle(setContent, article.id, { color: value })} />
            <TextField label="Порядок" value={String(article.order)} onChange={(value) => updateArticle(setContent, article.id, { order: Number(value) || 1 })} />
          </div>
          <ImageField
            label="Картинка статьи"
            value={article.imageUrl}
            onUpload={(file) => uploadImage(file, (url) => updateArticle(setContent, article.id, { imageUrl: url }))}
          />
          <TextField label="Источники, каждый с новой строки" textarea value={article.sources.join("\n")} onChange={(value) => updateArticle(setContent, article.id, { sources: value.split("\n").filter(Boolean) })} />
          <VisibilityField checked={article.visible} onChange={(visible) => updateArticle(setContent, article.id, { visible })} />
          <VisibilityField label="Раскрыта в списке" checked={article.expanded} onChange={(expanded) => updateArticle(setContent, article.id, { expanded })} />
          <SectionsEditor article={article} setContent={setContent} uploadImage={uploadImage} />
        </article>
      ))}
    </div>
  );
}

function SectionsEditor({
  article,
  setContent,
  uploadImage
}: {
  article: Article;
  setContent: EditorProps["setContent"];
  uploadImage: UploadFn;
}) {
  return (
    <div className="admin-stack nested-editor">
      <button className="admin-secondary" onClick={() => addArticleSection(setContent, article.id)} type="button">
        <Plus size={18} />
        Добавить раздел статьи
      </button>
      {article.sections.map((section) => (
        <div className="admin-edit-card" key={section.id}>
          <TextField label="Заголовок раздела" value={section.heading} onChange={(value) => updateArticleSection(setContent, article.id, section.id, { heading: value })} />
          <TextField label="Текст раздела" textarea value={section.text} onChange={(value) => updateArticleSection(setContent, article.id, section.id, { text: value })} />
          <ImageField
            label="Картинка раздела"
            value={section.imageUrl || ""}
            onUpload={(file) => uploadImage(file, (url) => updateArticleSection(setContent, article.id, section.id, { imageUrl: url }))}
          />
          <button className="icon-danger" onClick={() => removeArticleSection(setContent, article.id, section.id)} type="button">
            <Trash2 size={18} />
            Удалить раздел
          </button>
        </div>
      ))}
    </div>
  );
}

function ImportantEditor({ content, setContent }: EditorProps) {
  return (
    <div className="admin-form-grid">
      <TextField label="Заголовок" value={content.important.title} onChange={(value) => setImportant(setContent, { title: value })} />
      <TextField label="Текст" textarea value={content.important.text} onChange={(value) => setImportant(setContent, { text: value })} />
      <VisibilityField checked={content.important.visible} onChange={(visible) => setImportant(setContent, { visible })} />
    </div>
  );
}

function ContactsEditor({ content, setContent }: EditorProps) {
  const messengers = content.settings.messengers;

  return (
    <div className="admin-form-grid">
      <TextField label="Telegram ссылка" value={messengers.telegramUrl} onChange={(value) => updateMessengers(setContent, { telegramUrl: value })} />
      <TextField label="WhatsApp ссылка" value={messengers.whatsappUrl} onChange={(value) => updateMessengers(setContent, { whatsappUrl: value })} />
      <TextField label="Max ссылка" value={messengers.maxUrl} onChange={(value) => updateMessengers(setContent, { maxUrl: value })} />
      <TextField label="Главная кнопка" value={messengers.primaryLabel} onChange={(value) => updateMessengers(setContent, { primaryLabel: value })} />
      <TextField label="Вторая кнопка" value={messengers.secondaryLabel} onChange={(value) => updateMessengers(setContent, { secondaryLabel: value })} />
    </div>
  );
}

function SettingsEditor({ content, setContent }: EditorProps) {
  return (
    <div className="admin-form-grid">
      <TextField label="Название сайта" value={content.settings.siteName} onChange={(value) => updateSettings(setContent, { siteName: value })} />
      <TextField label="Лого в шапке" value={content.settings.logoLabel} onChange={(value) => updateSettings(setContent, { logoLabel: value })} />
      <TextField label="SEO title" value={content.settings.seoTitle} onChange={(value) => updateSettings(setContent, { seoTitle: value })} />
      <TextField label="SEO description" textarea value={content.settings.seoDescription} onChange={(value) => updateSettings(setContent, { seoDescription: value })} />
      <TextField label="Акцентный цвет" value={content.settings.accentColor} onChange={(value) => updateSettings(setContent, { accentColor: value })} />
    </div>
  );
}

function TextField({
  label,
  onChange,
  textarea = false,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  value: string;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {textarea ? (
        <textarea onChange={(event) => onChange(event.target.value)} value={value} />
      ) : (
        <input onChange={(event) => onChange(event.target.value)} value={value} />
      )}
    </label>
  );
}

function SelectField({
  label,
  onChange,
  options,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function VisibilityField({
  checked,
  label = "Показывать",
  onChange
}: {
  checked: boolean;
  label?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="admin-switch">
      <input checked={checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      {label}
    </label>
  );
}

function ImageField({
  label,
  onUpload,
  value
}: {
  label: string;
  onUpload: (file: File) => void;
  value: string;
}) {
  return (
    <label className="admin-field image-field">
      <span>{label}</span>
      <input
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onUpload(file);
          }
        }}
        type="file"
      />
      <small>
        <ImagePlus size={15} />
        {value ? "Фото выбрано" : "Можно выбрать фото с телефона"}
      </small>
    </label>
  );
}

function setHome(setContent: EditorProps["setContent"], patch: Partial<SiteContent["home"]>) {
  setContent((current) => ({ ...current, home: { ...current.home, ...patch } }));
}

function setVideo(setContent: EditorProps["setContent"], patch: Partial<SiteContent["video"]>) {
  setContent((current) => ({ ...current, video: { ...current.video, ...patch } }));
}

function setImportant(
  setContent: EditorProps["setContent"],
  patch: Partial<SiteContent["important"]>
) {
  setContent((current) => ({ ...current, important: { ...current.important, ...patch } }));
}

function updateSettings(
  setContent: EditorProps["setContent"],
  patch: Partial<SiteContent["settings"]>
) {
  setContent((current) => ({
    ...current,
    settings: { ...current.settings, ...patch }
  }));
}

function updateMessengers(
  setContent: EditorProps["setContent"],
  patch: Partial<SiteContent["settings"]["messengers"]>
) {
  setContent((current) => ({
    ...current,
    settings: {
      ...current.settings,
      messengers: { ...current.settings.messengers, ...patch }
    }
  }));
}

function updateInfoBlock(
  setContent: EditorProps["setContent"],
  id: string,
  patch: Partial<InfoBlock>
) {
  setContent((current) => ({
    ...current,
    infoBlocks: current.infoBlocks.map((block) =>
      block.id === id ? { ...block, ...patch } : block
    )
  }));
}

function addInfoBlock(setContent: EditorProps["setContent"]) {
  setContent((current) => ({
    ...current,
    infoBlocks: [
      ...current.infoBlocks,
      {
        id: `block-${crypto.randomUUID()}`,
        icon: "info",
        title: "Новый блок",
        description: "Текст блока",
        order: current.infoBlocks.length + 1,
        visible: true
      }
    ]
  }));
}

function removeInfoBlock(setContent: EditorProps["setContent"], id: string) {
  setContent((current) => ({
    ...current,
    infoBlocks: current.infoBlocks.filter((block) => block.id !== id)
  }));
}

function updateArticle(
  setContent: EditorProps["setContent"],
  id: string,
  patch: Partial<Article>
) {
  setContent((current) => ({
    ...current,
    articles: current.articles.map((article) =>
      article.id === id ? { ...article, ...patch } : article
    )
  }));
}

function addArticle(setContent: EditorProps["setContent"]) {
  setContent((current) => {
    const id = crypto.randomUUID();
    return {
      ...current,
      articles: [
        ...current.articles,
        {
          id: `article-${id}`,
          slug: `new-article-${current.articles.length + 1}`,
          title: "Новая статья",
          date: "12 июн 2024",
          excerpt: "Краткое описание статьи",
          icon: "book",
          color: "#3b82f6",
          imageUrl: current.articles[0]?.imageUrl || "",
          sections: [
            {
              id: `section-${id}`,
              heading: "1. Первый раздел",
              text: "Текст раздела"
            }
          ],
          sources: ["Источник"],
          expanded: false,
          order: current.articles.length + 1,
          visible: true
        }
      ]
    };
  });
}

function removeArticle(setContent: EditorProps["setContent"], id: string) {
  setContent((current) => ({
    ...current,
    articles: current.articles.filter((article) => article.id !== id)
  }));
}

function updateArticleSection(
  setContent: EditorProps["setContent"],
  articleId: string,
  sectionId: string,
  patch: Partial<ArticleSection>
) {
  setContent((current) => ({
    ...current,
    articles: current.articles.map((article) =>
      article.id === articleId
        ? {
            ...article,
            sections: article.sections.map((section) =>
              section.id === sectionId ? { ...section, ...patch } : section
            )
          }
        : article
    )
  }));
}

function addArticleSection(setContent: EditorProps["setContent"], articleId: string) {
  setContent((current) => ({
    ...current,
    articles: current.articles.map((article) =>
      article.id === articleId
        ? {
            ...article,
            sections: [
              ...article.sections,
              {
                id: `section-${crypto.randomUUID()}`,
                heading: `${article.sections.length + 1}. Новый раздел`,
                text: "Текст раздела"
              }
            ]
          }
        : article
    )
  }));
}

function removeArticleSection(
  setContent: EditorProps["setContent"],
  articleId: string,
  sectionId: string
) {
  setContent((current) => ({
    ...current,
    articles: current.articles.map((article) =>
      article.id === articleId
        ? {
            ...article,
            sections: article.sections.filter((section) => section.id !== sectionId)
          }
        : article
    )
  }));
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}
