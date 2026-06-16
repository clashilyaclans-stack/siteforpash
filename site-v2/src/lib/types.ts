export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  body: string[];
};

export type StudentCard = {
  title: string;
  text: string;
  icon: string;
};

export type Student = {
  code: string;
  name: string;
  cards: StudentCard[];
};

export type QuickCard = {
  title: string;
  text: string;
  action: string;
  href: string;
  tone: "blue" | "orange" | "violet";
};

export type Benefit = {
  title: string;
  text: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type AboutCard = {
  title: string;
  text: string;
};

export type ConsultationContent = {
  badge: string;
  title: string;
  text: string;
  buttonText: string;
  buttonHref: string;
  items: string[];
};

export type MaterialsContent = {
  badge: string;
  title: string;
  text: string;
  categories: string[];
  readLabel: string;
  allLabel: string;
  backLabel: string;
};

export type CabinetContent = {
  closedBadge: string;
  closedTitle: string;
  closedText: string;
  codeLabel: string;
  codePlaceholder: string;
  loginButton: string;
  errorText: string;
  dashboardBadge: string;
  dashboardGreeting: string;
  dashboardText: string;
  cardButtonText: string;
};

export type SiteContent = {
  brand: string;
  logo: string;
  navItems: NavItem[];
  footerText: string;
  headerButtonText: string;
  phoneButtonLabel: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  heroTitle: string;
  heroAccent: string;
  heroText: string;
  heroButtonText: string;
  videoButtonText: string;
  howBadge: string;
  howTitle: string;
  howText: string;
  howImage: string;
  howVideoTitle: string;
  orbitLabels: string[];
  authorName: string;
  authorRole: string;
  contactName: string;
  contactPhone: string;
  contactBadge: string;
  contactTitle: string;
  contactText: string;
  consultationUrl: string;
  videoUrl: string;
  videoPlaceholderText: string;
  quickCards: QuickCard[];
  benefits: Benefit[];
  quickTitle: string;
  quickText: string;
  aboutBadge: string;
  aboutText: string;
  aboutImage: string;
  aboutCards: AboutCard[];
  consultation: ConsultationContent;
  materialsPage: MaterialsContent;
  cabinet: CabinetContent;
  articles: Article[];
  students: Student[];
};
