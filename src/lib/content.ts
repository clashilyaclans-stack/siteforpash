import { getFallbackContent } from "./fallback-content";
import { createSupabaseServerClient } from "./supabase";
import type { Article, PageConfig, SiteContent } from "./types";

export async function getSiteContent(): Promise<SiteContent> {
  const fallback = getFallbackContent();
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", "main")
    .maybeSingle();

  if (error || !data) {
    return fallback;
  }

  return resolveStoredContent(data.content, fallback);
}

export function resolveStoredContent(
  stored: unknown,
  fallback: SiteContent
): SiteContent {
  if (!isRecord(stored)) {
    return fallback;
  }

  const candidate = stored as Partial<SiteContent>;

  if (
    !isRecord(candidate.settings) ||
    !Array.isArray(candidate.pages) ||
    !isRecord(candidate.home) ||
    !Array.isArray(candidate.infoBlocks) ||
    !isRecord(candidate.video) ||
    !isRecord(candidate.important) ||
    !Array.isArray(candidate.articles)
  ) {
    return fallback;
  }

  return {
    ...fallback,
    ...candidate,
    settings: {
      ...fallback.settings,
      ...candidate.settings,
      messengers: {
        ...fallback.settings.messengers,
        ...candidate.settings.messengers
      }
    },
    ui: {
      ...fallback.ui,
      ...(isRecord(candidate.ui) ? candidate.ui : {})
    },
    pages: candidate.pages as SiteContent["pages"],
    home: candidate.home as SiteContent["home"],
    infoBlocks: candidate.infoBlocks as SiteContent["infoBlocks"],
    video: candidate.video as SiteContent["video"],
    important: candidate.important as SiteContent["important"],
    articles: candidate.articles as SiteContent["articles"]
  };
}

export function getVisiblePages(content: SiteContent): PageConfig[] {
  return [...content.pages]
    .filter((page) => page.visible)
    .sort((left, right) => left.order - right.order);
}

export function getPage(content: SiteContent, key: PageConfig["key"]): PageConfig {
  const page = content.pages.find((item) => item.key === key);

  if (!page) {
    throw new Error(`Missing fixed page config: ${key}`);
  }

  return page;
}

export function getVisibleArticles(content: SiteContent): Article[] {
  return [...content.articles]
    .filter((article) => article.visible)
    .sort((left, right) => left.order - right.order);
}

export function getArticle(content: SiteContent, slug: string): Article | undefined {
  return getVisibleArticles(content).find((article) => article.slug === slug);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
