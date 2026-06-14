export type PageKey =
  | "home"
  | "articles";

export type CardGroup = "catalog" | "results" | "directions" | "featured";

export type IconName =
  | "none"
  | "info"
  | "target"
  | "video"
  | "book"
  | "help"
  | "calendar"
  | "play"
  | "warning";

export type MessengerKey = "telegram" | "whatsapp" | "max";

export type PageConfig = {
  key: PageKey;
  href: string;
  navLabel: string;
  title: string;
  subtitle: string;
  visible: boolean;
  order: number;
};

export type StatItem = {
  value: string;
  label: string;
};

export type InfoBlock = {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  order: number;
  visible: boolean;
};

export type VideoBlock = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  visible: boolean;
  order: number;
};

export type ImportantBlock = {
  id: string;
  title: string;
  text: string;
  visible: boolean;
};

export type ContentCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  badge?: string;
  price?: string;
  ctaLabel?: string;
  order: number;
  visible: boolean;
};

export type Review = {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  visible: boolean;
  order: number;
};

export type QuizOption = {
  id: string;
  label: string;
  tag: string;
};

export type QuizQuestion = {
  id: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
  order: number;
};

export type QuizResult = {
  title: string;
  description: string;
};

export type MessengerSettings = {
  telegramUrl: string;
  whatsappUrl: string;
  maxUrl: string;
  primaryLabel: string;
  secondaryLabel: string;
};

export type MessengerLink = {
  key: MessengerKey;
  label: string;
  href: string;
};

export type SiteSettings = {
  siteName: string;
  logoLabel: string;
  seoTitle: string;
  seoDescription: string;
  accentColor: string;
  messengers: MessengerSettings;
};

export type SiteUiText = {
  adminNavLabel: string;
  homeHeroBadge: string;
  homeProofItems: string[];
  heroCardLabel: string;
  heroFormulaItems: string[];
  homeSectionBadge: string;
  homeSectionTitle: string;
  homeArticlesLinkLabel: string;
  videoBadge: string;
  articlesBackLabel: string;
  articlesBadge: string;
  articleReadLabel: string;
  articleBackToListLabel: string;
  articleBackHomeLabel: string;
  articleDetailBadgePrefix: string;
  articleSourcesTitle: string;
};

export type HomeContent = {
  teacherName: string;
  teacherRole: string;
  avatarUrl: string;
  shortBio: string;
};

export type ArticleSection = {
  id: string;
  heading: string;
  text: string;
  imageUrl?: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  icon: IconName;
  color: string;
  imageUrl: string;
  sections: ArticleSection[];
  sources: string[];
  expanded: boolean;
  order: number;
  visible: boolean;
};

export type SiteContent = {
  settings: SiteSettings;
  ui: SiteUiText;
  pages: PageConfig[];
  home: HomeContent;
  infoBlocks: InfoBlock[];
  video: VideoBlock;
  important: ImportantBlock;
  articles: Article[];
};
