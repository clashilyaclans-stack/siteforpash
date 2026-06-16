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

export type SiteContent = {
  brand: string;
  logo: string;
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
  authorName: string;
  authorRole: string;
  contactName: string;
  contactPhone: string;
  consultationUrl: string;
  videoUrl: string;
  quickCards: QuickCard[];
  benefits: Benefit[];
  articles: Article[];
  students: Student[];
};
