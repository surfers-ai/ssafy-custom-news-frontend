import type { INews } from "./data";

export interface IChatReq {
  article_id: string;
  chat_history: string[];
}
export interface IDashboard {
  message: string;
  my_favorite_category: Record<string, number>;
  favorite_key_word: Record<string, number>; 
  number_of_written_articles: Record<string, number>; 
  favorite_articles: INews[];
}