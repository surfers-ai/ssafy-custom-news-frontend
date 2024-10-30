import { useRouter } from 'vue-router';
import { onBeforeRouteLeave } from 'vue-router';
import type { RouteNamedMap } from 'vue-router/auto';
export default function useGoToList() {
  const router = useRouter();
  const route = useRoute();

  // 목록페이지 이동
  function goToList(route?: RouteNamedMap) {
    console.log(router);

    if (window.history.state.back) {
      router.go(-1);
    } else {
      return router.push(route);
    }
  }

  function goToListByConfirm(path) {
    console.log('confirm');
    if (window.history.state.back) {
      console.log(window.history.state.back);
      window.history.back();
    } else {
      window.location.href = path;
    }
  }

  return { goToList, goToListByConfirm };
}
