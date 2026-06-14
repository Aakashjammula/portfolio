export interface BlogLink {
  text: string;
  url: string;
}

export interface BlogContentItem {
  type: "heading" | "paragraph" | "list" | "code" | "divider" | "image" | "links";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  content?: string;
  id?: string;
  style?: "unordered" | "ordered";
  items?: string[] | BlogLink[];
  language?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  content: BlogContentItem[];
}
