export interface INews {
  id: number;
  article_interaction: {
    likes: number;
    read: number;
  };
  title: string;
  writer: string;
  write_date: Date;
  category: string;
  content: string;
  keywords: string[];
  url: string;
}

export interface IArticle {
  id: number;
  title: string;
  author: string;
  write_date: string;
}

export interface IDashboard {
  message: string;
  my_favorite_category: Record<string, number>;
  my_favorite_key_word: Record<string, number>;
  number_of_written_articles: Record<string, number>;
  favorite_articles: IArticle[];
}

export interface IBoard {
  id: number;
  title: string;
  writer: string;
  write_date: Date;
  category: string;
  content: string;
  keywords: string;
}

export interface IComments {
  id: number;
  writer_name: string;
  write_date: string;
  content: string;
}
