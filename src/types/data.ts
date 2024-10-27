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
  keywords: string;
  url: string;
}
