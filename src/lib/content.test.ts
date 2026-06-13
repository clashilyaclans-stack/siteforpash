import { describe, expect, it } from "vitest";
import { getFallbackContent } from "./fallback-content";
import { getVisiblePages, resolveStoredContent } from "./content";

describe("site content model", () => {
  it("ships editable content for the tutor app structure", () => {
    const content = getFallbackContent();

    expect(content.pages.map((page) => page.key)).toEqual(["home", "articles"]);
    expect(content.infoBlocks).toHaveLength(4);
    expect(content.video.title).toBeTruthy();
    expect(content.important.visible).toBe(true);
    expect(content.ui.articleReadLabel).toBeTruthy();
    expect(content.articles.length).toBeGreaterThanOrEqual(5);
    expect(content.articles[0].sections.length).toBeGreaterThan(1);
  });

  it("returns only visible pages in navigation order", () => {
    const content = getFallbackContent();
    const pages = getVisiblePages({
      ...content,
      pages: content.pages.map((page) =>
        page.key === "articles" ? { ...page, visible: false } : page
      )
    });

    expect(pages.map((page) => page.key)).toEqual(["home"]);
  });

  it("uses stored JSON content only when it has the expected shape", () => {
    const fallback = getFallbackContent();
    const stored = {
      ...fallback,
      settings: {
        ...fallback.settings,
        siteName: "Saved Name"
      }
    };

    expect(resolveStoredContent(stored, fallback).settings.siteName).toBe("Saved Name");
    expect(resolveStoredContent({ broken: true }, fallback).settings.siteName).toBe(
      fallback.settings.siteName
    );
  });

  it("keeps older stored content usable when global UI labels are missing", () => {
    const fallback = getFallbackContent();
    const storedWithoutUi = Object.fromEntries(
      Object.entries(fallback).filter(([key]) => key !== "ui")
    );

    expect(resolveStoredContent(storedWithoutUi, fallback).ui.articleReadLabel).toBe(
      fallback.ui.articleReadLabel
    );
  });
});
