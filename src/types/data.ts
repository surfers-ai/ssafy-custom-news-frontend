export interface INews {
  id: number;
  title: string;
  writer: string;
  write_date: Date;
  category: string;
  content: string;
  key_word: string[];
  url: string;
}
