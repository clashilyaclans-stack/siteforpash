"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
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
import { getFallbackContent } from "@/lib/fallback-content";
import { resolveStoredContent } from "@/lib/content";
import type {
  Article,
  ArticleSection,
  IconName,
  InfoBlock,
  PageConfig,
  SiteContent,
  SiteUiText
} from "@/lib/types";

type AdminTab = "homePage" | "articlesPage" | "articleItems" | "ui" | "contacts" | "settings";

type AdminAppProps = {
  initialContent: SiteContent;
  supabaseConfigured: boolean;
};

const tabs: { key: AdminTab; label: string }[] = [
  { key: "homePage", label: "Главная" },
  { key: "articlesPage", label: "Страница статей" },
  { key: "articleItems", label: "Статьи" },
  { key: "ui", label: "Кнопки и плашки" },
  { key: "contacts", label: "Контакты" },
  { key: "settings", label: "Настройки" }
];

const iconOptions: IconName[] = [
  "none",
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
  const [activeTab, setActiveTab] = useState<AdminTab>("homePage");
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
      setContent(resolveStoredContent(data.content, getFallbackContent()));
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

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("Добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setStatus("Введите email и пароль.");
      return;
    }

    setBusy(true);
    setStatus("Входим...");
    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: normalizedPassword
    });
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

    if (error) {
      setStatus(`Ошибка сохранения: ${error.message}`);
      return;
    }

    setStatus("Сохранено. Изменения сразу читаются сайтом из Supabase.");
  }

  async function uploadImage(file: File, onUrl: (url: string) => void) {
    if (!supabase) {
      setStatus("Загрузка файлов доступна после подключения Supabase Storage.");
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
      setStatus(`Файл не загружен: ${error.message}`);
      return;
    }

    const { data } = supabase.storage.from("site-media").getPublicUrl(path);
    onUrl(data.publicUrl);
    setStatus("Файл загружен. Нажмите «Сохранить», чтобы применить.");
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
              autoCapitalize="none"
              autoCorrect="off"
              inputMode="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="owner@mail.ru"
              spellCheck={false}
              type="email"
              value={email}
            />
          </label>
          <label>
            Пароль
            <input
              autoComplete="current-password"
              autoCapitalize="none"
              autoCorrect="off"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Пароль"
              spellCheck={false}
              type="password"
              value={password}
            />
          </label>
          <button className="admin-primary" disabled={busy} type="submit">
            {busy ? "Входим..." : "Войти"}
          </button>
          <span className="admin-status" role="status" aria-live="polite">{status}</span>
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
        {activeTab === "homePage" ? (
          <HomePageEditor content={content} setContent={setContent} uploadImage={uploadImage} />
        ) : null}
        {activeTab === "articlesPage" ? (
          <ArticlesPageEditor content={content} setContent={setContent} />
        ) : null}
        {activeTab === "articleItems" ? (
          <ArticlesEditor content={content} setContent={setContent} uploadImage={uploadImage} />
        ) : null}
        {activeTab === "ui" ? (
          <UiTextEditor content={content} setContent={setContent} />
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
  setContent: Dispatch<SetStateAction<SiteContent>>;
};

type UploadFn = (file: File, onUrl: (url: string) => void) => Promise<void>;

function HomePageEditor({
  content,
  setContent,
  uploadImage
}: EditorProps & { uploadImage: UploadFn }) {
  return (
    <div className="admin-stack">
      <AdminSectionTitle
        title="Страница 1: Главная"
        text="Здесь редактируются шапка главной страницы, профиль, блоки и видео."
      />
      <PageMetaEditor pageKey="home" content={content} setContent={setContent} />
      <ProfileEditor content={content} setContent={setContent} uploadImage={uploadImage} />
      <BlocksEditor content={content} setContent={setContent} />
      <VideoEditor content={content} setContent={setContent} uploadImage={uploadImage} />
    </div>
  );
}

function ArticlesPageEditor({ content, setContent }: EditorProps) {
  return (
    <div className="admin-stack">
      <AdminSectionTitle
        title="Страница 2: Статьи"
        text="Здесь редактируются заголовок страницы статей и блок «Важно»."
      />
      <PageMetaEditor pageKey="articles" content={content} setContent={setContent} />
      <ImportantEditor content={content} setContent={setContent} />
    </div>
  );
}

function AdminSectionTitle({ text, title }: { text: string; title: string }) {
  return (
    <div className="admin-section-title">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function PageMetaEditor({
  content,
  pageKey,
  setContent
}: EditorProps & { pageKey: PageConfig["key"] }) {
  const page = content.pages.find((item) => item.key === pageKey);

  if (!page) {
    return <div className="admin-status-line">Настройки страницы не найдены.</div>;
  }

  return (
    <article className="admin-edit-card">
      <div className="admin-card-head">
        <strong>Настройки страницы</strong>
        <Link href={page.href} target="_blank">
          Открыть
        </Link>
      </div>
      <div className="admin-inline">
        <TextField
          label="Пункт меню"
          value={page.navLabel}
          onChange={(value) => updatePage(setContent, page.key, { navLabel: value })}
        />
        <TextField
          label="Порядок"
          value={String(page.order)}
          onChange={(value) => updatePage(setContent, page.key, { order: Number(value) || 1 })}
        />
      </div>
      <TextField
        label="Заголовок страницы"
        value={page.title}
        onChange={(value) => updatePage(setContent, page.key, { title: value })}
      />
      <TextField
        label="Подзаголовок страницы"
        textarea
        value={page.subtitle}
        onChange={(value) => updatePage(setContent, page.key, { subtitle: value })}
      />
      <VisibilityField
        checked={page.visible}
        onChange={(visible) => updatePage(setContent, page.key, { visible })}
      />
    </article>
  );
}

function ProfileEditor({
  content,
  setContent,
  uploadImage
}: EditorProps & { uploadImage: UploadFn }) {
  return (
    <article className="admin-edit-card">
      <div className="admin-card-head">
        <strong>Профиль преподавателя</strong>
      </div>
      <div className="admin-form-grid">
        <TextField
          label="Имя"
          value={content.home.teacherName}
          onChange={(value) => setHome(setContent, { teacherName: value })}
        />
        <TextField
          label="Специализация"
          value={content.home.teacherRole}
          onChange={(value) => setHome(setContent, { teacherRole: value })}
        />
        <TextField
          label="Краткое приветствие"
          textarea
          value={content.home.shortBio}
          onChange={(value) => setHome(setContent, { shortBio: value })}
        />
        <ImageField
          label="Аватар"
          value={content.home.avatarUrl}
          onUpload={(file) => uploadImage(file, (url) => setHome(setContent, { avatarUrl: url }))}
        />
      </div>
    </article>
  );
}

function BlocksEditor({ content, setContent }: EditorProps) {
  return (
    <article className="admin-edit-card">
      <div className="admin-card-head">
        <strong>Блоки главной</strong>
        <button className="admin-secondary" onClick={() => addInfoBlock(setContent)} type="button">
          <Plus size={18} />
          Добавить блок
        </button>
      </div>
      <div className="admin-stack">
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
              <TextField label="Подпись ссылки / кнопки" value={block.ctaLabel || ""} onChange={(value) => updateInfoBlock(setContent, block.id, { ctaLabel: value })} />
            </div>
            <div className="admin-inline">
              <TextField label="Порядок" value={String(block.order)} onChange={(value) => updateInfoBlock(setContent, block.id, { order: Number(value) || 1 })} />
            </div>
            <VisibilityField checked={block.visible} onChange={(visible) => updateInfoBlock(setContent, block.id, { visible })} />
          </article>
        ))}
      </div>
    </article>
  );
}

function VideoEditor({
  content,
  setContent,
  uploadImage
}: EditorProps & { uploadImage: UploadFn }) {
  return (
    <article className="admin-edit-card">
      <div className="admin-card-head">
        <strong>Видео на главной</strong>
      </div>
      <div className="admin-form-grid">
        <TextField label="Заголовок видео" value={content.video.title} onChange={(value) => setVideo(setContent, { title: value })} />
        <TextField label="Ссылка на видео" value={content.video.videoUrl} onChange={(value) => setVideo(setContent, { videoUrl: value })} />
        <TextField label="Порядок видео среди блоков" value={String(content.video.order)} onChange={(value) => setVideo(setContent, { order: Number(value) || 1 })} />
        <TextField label="Описание" textarea value={content.video.description} onChange={(value) => setVideo(setContent, { description: value })} />
        <ImageField
          accept="video/*"
          emptyLabel="Можно выбрать видео с компьютера или телефона"
          label="Видеофайл"
          selectedLabel="Видео выбрано"
          value={content.video.videoUrl}
          onUpload={(file) => uploadImage(file, (url) => setVideo(setContent, { videoUrl: url }))}
        />
        <ImageField
          label="Обложка видео"
          value={content.video.posterUrl}
          onUpload={(file) => uploadImage(file, (url) => setVideo(setContent, { posterUrl: url }))}
        />
        <VisibilityField checked={content.video.visible} onChange={(visible) => setVideo(setContent, { visible })} />
      </div>
    </article>
  );
}

function ArticlesEditor({
  content,
  setContent,
  uploadImage
}: EditorProps & { uploadImage: UploadFn }) {
  return (
    <div className="admin-stack">
      <AdminSectionTitle
        title="Полные статьи"
        text="Создание, порядок, изображения, разделы и источники для каждой статьи."
      />
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
    <article className="admin-edit-card">
      <div className="admin-card-head">
        <strong>Блок «Важно»</strong>
      </div>
      <div className="admin-form-grid">
        <TextField label="Заголовок" value={content.important.title} onChange={(value) => setImportant(setContent, { title: value })} />
        <TextField label="Текст" textarea value={content.important.text} onChange={(value) => setImportant(setContent, { text: value })} />
        <VisibilityField checked={content.important.visible} onChange={(visible) => setImportant(setContent, { visible })} />
      </div>
    </article>
  );
}

function UiTextEditor({ content, setContent }: EditorProps) {
  const ui = content.ui;

  return (
    <div className="admin-stack">
      <AdminSectionTitle
        title="Кнопки и плашки сайта"
        text="Все короткие подписи, бейджи, плашки и навигационные кнопки, которые видны на публичном сайте."
      />
      <article className="admin-edit-card">
        <div className="admin-card-head">
          <strong>Шапка и главная</strong>
        </div>
        <div className="admin-form-grid">
          <TextField label="Ссылка на админку в меню" value={ui.adminNavLabel} onChange={(value) => updateUi(setContent, { adminNavLabel: value })} />
          <TextField label="Верхняя плашка hero" value={ui.homeHeroBadge} onChange={(value) => updateUi(setContent, { homeHeroBadge: value })} />
          <TextField label="Плашки под описанием, каждая с новой строки" textarea value={ui.homeProofItems.join("\n")} onChange={(value) => updateUi(setContent, { homeProofItems: linesToItems(value) })} />
          <TextField label="Подпись карточки с фото" value={ui.heroCardLabel} onChange={(value) => updateUi(setContent, { heroCardLabel: value })} />
          <TextField label="Нижние плашки карточки, каждая с новой строки" textarea value={ui.heroFormulaItems.join("\n")} onChange={(value) => updateUi(setContent, { heroFormulaItems: linesToItems(value) })} />
          <TextField label="Плашка над блоками" value={ui.homeSectionBadge} onChange={(value) => updateUi(setContent, { homeSectionBadge: value })} />
          <TextField label="Заголовок над блоками" textarea value={ui.homeSectionTitle} onChange={(value) => updateUi(setContent, { homeSectionTitle: value })} />
          <TextField label="Кнопка перехода к журналу" value={ui.homeArticlesLinkLabel} onChange={(value) => updateUi(setContent, { homeArticlesLinkLabel: value })} />
          <TextField label="Плашка у видео" value={ui.videoBadge} onChange={(value) => updateUi(setContent, { videoBadge: value })} />
        </div>
      </article>
      <article className="admin-edit-card">
        <div className="admin-card-head">
          <strong>Статьи и навигация</strong>
        </div>
        <div className="admin-form-grid">
          <TextField label="Кнопка назад на странице статей" value={ui.articlesBackLabel} onChange={(value) => updateUi(setContent, { articlesBackLabel: value })} />
          <TextField label="Плашка страницы статей" value={ui.articlesBadge} onChange={(value) => updateUi(setContent, { articlesBadge: value })} />
          <TextField label="Кнопка карточки статьи" value={ui.articleReadLabel} onChange={(value) => updateUi(setContent, { articleReadLabel: value })} />
          <TextField label="Кнопка назад внутри статьи" value={ui.articleBackToListLabel} onChange={(value) => updateUi(setContent, { articleBackToListLabel: value })} />
          <TextField label="Кнопка главной внутри статьи" value={ui.articleBackHomeLabel} onChange={(value) => updateUi(setContent, { articleBackHomeLabel: value })} />
          <TextField label="Префикс плашки внутри статьи" value={ui.articleDetailBadgePrefix} onChange={(value) => updateUi(setContent, { articleDetailBadgePrefix: value })} />
          <TextField label="Заголовок источников внутри статьи" value={ui.articleSourcesTitle} onChange={(value) => updateUi(setContent, { articleSourcesTitle: value })} />
        </div>
      </article>
    </div>
  );
}

function ContactsEditor({ content, setContent }: EditorProps) {
  const messengers = content.settings.messengers;

  return (
    <div className="admin-stack">
      <AdminSectionTitle
        title="Контакты и кнопки"
        text="Ссылки и подписи кнопок связи на сайте."
      />
      <div className="admin-form-grid">
        <TextField label="Telegram ссылка" value={messengers.telegramUrl} onChange={(value) => updateMessengers(setContent, { telegramUrl: value })} />
        <TextField label="WhatsApp ссылка" value={messengers.whatsappUrl} onChange={(value) => updateMessengers(setContent, { whatsappUrl: value })} />
        <TextField label="Max ссылка" value={messengers.maxUrl} onChange={(value) => updateMessengers(setContent, { maxUrl: value })} />
        <TextField label="Главная кнопка" value={messengers.primaryLabel} onChange={(value) => updateMessengers(setContent, { primaryLabel: value })} />
        <TextField label="Вторая кнопка" value={messengers.secondaryLabel} onChange={(value) => updateMessengers(setContent, { secondaryLabel: value })} />
      </div>
    </div>
  );
}

function SettingsEditor({ content, setContent }: EditorProps) {
  return (
    <div className="admin-stack">
      <AdminSectionTitle
        title="Общие настройки"
        text="Название сайта, SEO и базовый цвет проекта."
      />
      <div className="admin-form-grid">
        <TextField label="Название сайта" value={content.settings.siteName} onChange={(value) => updateSettings(setContent, { siteName: value })} />
        <TextField label="Лого в шапке" value={content.settings.logoLabel} onChange={(value) => updateSettings(setContent, { logoLabel: value })} />
        <TextField label="SEO title" value={content.settings.seoTitle} onChange={(value) => updateSettings(setContent, { seoTitle: value })} />
        <TextField label="SEO description" textarea value={content.settings.seoDescription} onChange={(value) => updateSettings(setContent, { seoDescription: value })} />
        <TextField label="Акцентный цвет" value={content.settings.accentColor} onChange={(value) => updateSettings(setContent, { accentColor: value })} />
      </div>
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
  accept = "image/*",
  emptyLabel = "Можно выбрать фото с телефона",
  label,
  onUpload,
  selectedLabel = "Фото выбрано",
  value
}: {
  accept?: string;
  emptyLabel?: string;
  label: string;
  onUpload: (file: File) => void;
  selectedLabel?: string;
  value: string;
}) {
  return (
    <label className="admin-field image-field">
      <span>{label}</span>
      <input
        accept={accept}
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
        {value ? selectedLabel : emptyLabel}
      </small>
    </label>
  );
}

function updatePage(
  setContent: EditorProps["setContent"],
  key: PageConfig["key"],
  patch: Partial<PageConfig>
) {
  setContent((current) => ({
    ...current,
    pages: current.pages.map((page) => (page.key === key ? { ...page, ...patch } : page))
  }));
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

function updateUi(setContent: EditorProps["setContent"], patch: Partial<SiteUiText>) {
  setContent((current) => ({
    ...current,
    ui: { ...current.ui, ...patch }
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

function linesToItems(value: string) {
  const items = value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length ? items : [""];
}
