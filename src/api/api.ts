import type { IChatReq } from "@/types/api";
import http from "./core";

export function getNewsList(category: string) {
  const url = category ? `/news-list?category=${category}` : `/news-list/`;
  return http.get(url);
}

export function getNews(id: number) {
  return http.get(`/news/${id}`);
}

export function getDashboard() {
  return http.get("/dashboard/");
}

export function postChat(msg: IChatReq) {
  return http.post("/chat/", msg);
}
export function postLike() {
  return http.post("/like");
}
