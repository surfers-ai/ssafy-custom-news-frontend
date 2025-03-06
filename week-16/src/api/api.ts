import http from "./core";

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
