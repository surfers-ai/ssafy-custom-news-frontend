import type { IBoardReq, IChatReq } from "@/types/api";
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

export function getLikeStatus(id: string) {
  return http.get(`/news/like/?article_id=${id}`);
}

export function postChat(msg: IChatReq) {
  return http.post("/news/chat/", msg);
}
export function postLike(data: { article_id: string }) {
  return http.post("/news/like/", data);
}

export function deleteLike(id: string) {
  return http.delete("/news/like/", { data: { article_id: id } });
}

export function getBoardList(category: string) {
  const url = category ? `/board-list?category=${category}` : `/board-list/`;
  return http.get(url);
}

export function getBoard(id: string) {
  return http.get(`/board/${id}/`);
}

export function postBoard(data: IBoardReq) {
  return http.post("/write-posting/", data);
}

export function postComment( id: string, comment: string ) {
  return http.post(`/write-comment/${id}`, {content : comment});
}