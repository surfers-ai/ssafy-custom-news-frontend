import type { IChatReq } from "@/types/api";
import http from "./core";

export function getNewsList(category: string) {
  return http.get(`/news-list?category=${category}`);
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
