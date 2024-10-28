import type { IArticle } from "./data";

export interface IChatReq {
  article_id: string;
  question: string;
}

export interface IBoardResponse {
  id: number;
  title: string;
  writer: string;
  write_date: Date;
  category: string;
  content: string;
  keywords: string;
  related_article: IArticle[];
}