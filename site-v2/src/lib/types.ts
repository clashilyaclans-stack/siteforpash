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

export type SiteContent = {
  brand: string;
  logo: string;
  heroTitle: string;
  heroAccent: string;
  heroText: string;
  authorName: string;
  authorRole: string;
  consultationUrl: string;
  videoUrl: string;
  articles: Article[];
  students: Student[];
};
