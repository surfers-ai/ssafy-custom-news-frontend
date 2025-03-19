import type { IBoardReq } from "@/types/api";
import http from "./core";

export function searchNews(searchText: string) {
  return http.get(
    searchText ? `/news/search/?q=${searchText}` : "/news/search/"
  );
}

export function getNewsList(
  category: string,
  sort: "latest" | "recommend",
  page: number
) {
  const url = category
    ? `/news-list?category=${category}&sort_by=${sort}&page=${page}`
    : `/news-list/?sort_by=${sort}&page=${page}`;
  return http.get(url);
}

export function getNews(id: string) {
  return http.get(`/news/${id}/`);
}

export function getDashboard() {
  return http.get("/dashboard");
}

export function getLikeStatus(id: string) {
  return http.get(`/news/like/?article_id=${id}`);
}

export function postLike(data: { article_id: string }) {
  return http.post("/news/like/", data);
}

export function deleteLike(id: string) {
  return http.delete("/news/like/", { data: { article_id: id } });
}

export function getBoardList(category: string, page: number) {
  const url = category
    ? `/board-list?category=${category}&page=${page}`
    : `/board-list/?page=${page}`;
  return http.get(url);
}

export function getBoard(id: string) {
  return http.get(`/board/${id}/`);
}

export function postBoard(data: IBoardReq) {
  return http.post("/write-posting/", data);
}

export function postComment(id: string, comment: string) {
  return http.post(`/write-comment/${id}/`, { content: comment });
}
