import { useUserStore } from "@/store/user";
import router from "@/router";
import { loginApi, refreshApi } from "@/api/auth";
import type { ILoginReq } from "@/types/auth";

export function useAuth() {
  const userStore = useUserStore();
  const logoutUser = () => {
    userStore.removeToken();
    router.push("/login");
  };

  const loginUser = async (req: ILoginReq) => {
    try {
      const response = await loginApi(req);
      const { access, refresh } = response.data;
      userStore.setToken(access, refresh);
      router.push("/");
    } catch {
      alert("다시시도해주세요.");
    }
  };

  const refreshLogin = async () => {
    try {
      const refreshToken = userStore.token.refresh;
      const response = await refreshApi(refreshToken);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;
      userStore.setToken(newAccessToken, newRefreshToken);
    } catch (error) {
      console.error("토큰 갱신 오류:", error);
      // 테스트용
      userStore.setToken("access-test22", "refresh-test22");
    }
  };

  return {
    loginUser,
    logoutUser,
    refreshLogin,
  };
}
