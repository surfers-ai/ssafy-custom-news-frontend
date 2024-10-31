import type { IArticle, IComments} from "./data";

export interface IChatReq {
  article_id: string;
  question: string;
}

export interface IBoardResponse {
  id: number;
  title: string;
  writer_name: string;
  write_date: Date;
  category: string;
  content: string;
  keywords: string;
  related_article: IArticle[];
  posting_comments: {
    comments: IComments[];
  };
}

export interface IBoardReq {
  title: string;
  category: string;
  content: string;
  keywords: string[];
}
