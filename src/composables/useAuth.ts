import { useUserStore } from "@/store/user";
import router from "@/router";
import { loginApi } from "@/api/auth";
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

  return {
    loginUser,
    logoutUser,
  };
}
