import { alertDialog } from "@@/plugins/alert";
import { useAuthStore } from "@@/stores/auth";

export default function useErrorHandler() {
  const router = useRouter();
  const API_ERROR_MESSAGE = "요청 처리 중 에러가 발생했습니다.";

  function handleGlobalError(err: any, instance?: any, info?: any) {
    const ERROR_PAGE_CODES = ["404", "403", "5023"];
    const AUTH_ERROR_CODES = ["401", "4000", "4001", "4002", "4003", "5021", "TOKEN_ERROR"];
    console.log("handleGlobalError", err);
    const authStore = useAuthStore();

    if (err.errorType === "api") {
      console.log("api Error", err.response);
      const { code, message } = err.response.data;
      console.log(code);

      if (AUTH_ERROR_CODES.includes(code)) {
        if (authStore.hasTokenError) return;

        alert(message);
        authStore.hasTokenError = true;
        authStore.clearToken();
        return;
      }

      if (!ERROR_PAGE_CODES.includes(code) || import.meta.env.MODE === "localhost") {
        return alertDialog({ multiple: true, message: message || API_ERROR_MESSAGE });
      }

      return redirectErrorPage(code, err.response);
    }

    if (err.errorType === "server") {
      const status = err.error.response.status;
      console.log("server error", status);
      if (ERROR_PAGE_CODES.includes(status.toString()) || status === "500") {
        return redirectErrorPage(status.toString(), err.error);
      }
    }
  }

  function redirectErrorPage(code = "404", response: any) {
    // 얼럿에서 api 호출하여 에러 발생했을 경우 // TODO (yuna.j - 2024. 9. 25.): 얼럿에서 api 에러났어도 에러페이지 이동 가능하도록 리팩토링 필요
    if (!router) {
      const message = response.data.message || API_ERROR_MESSAGE;
      return alertDialog({ multiple: true, message });
    }

    console.log("redirectErrorPage", code);
    const { pathname, hash, search } = location;
    const startIndex = pathname.indexOf("/");
    const toRoutePath = pathname.slice(startIndex);
    const query = Object.fromEntries(new URLSearchParams(search));
    const pathMatch = toRoutePath.substring(1).split("/");
    console.log(pathMatch);
    const errorRoute = {
      name: `ErrorView`,
      state: { code },
      params: { pathMatch },
      query,
      hash,
    };

    console.log(router);
    return router.replace(errorRoute);
  }

  return { handleGlobalError, redirectErrorPage };
}
