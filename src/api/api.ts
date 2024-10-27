import type { IChatReq } from "@/types/api";
import http from "./core";

export function getNewsList(category: string) {
  const url = category ? `/news-list?category=${category}` : `/news-list/`;
  return http.get(url);
}

export function getNews(id: number) {
  return http.get(`/news/${id}/`);
}

export function getDashboard() {
  return http.get("/dashboard");
}

export function postChat(msg: IChatReq) {
  return http.post("/news/chat/", msg);
}
export function postLike(data: { article_id: string }) {
  return http.post("/news/like/", data);
}

export function deleteLike(article_id: string) {
  return http.delete("/news/like/", { data: { article_id } });
}
