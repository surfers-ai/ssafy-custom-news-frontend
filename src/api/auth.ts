import type { ILoginReq, IRegisterReq } from "@/types/auth";
import http from "./core";

export function loginApi(req: ILoginReq) {
  return http.post("/auth/login/", req);
}

export function registerApi(req: IRegisterReq) {
  return http.post("/auth/registration/", req);
}

export function refreshApi(refreshToken: string | null) {
  return http.post("/api/refresh/", { refreshToken });
}
