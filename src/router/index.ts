import { useUserStore } from "@/store/user";
import NotFoundView from "@/views/NotFoundView.vue";
import { createRouter, createWebHistory } from "vue-router";
import NewsView from "@/views/NewsView.vue";
import LoginView from "@/views/LoginView.vue";
import NewsDetailView from "@/views/NewsDetailView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashBoardView from "@/views/DashBoardView.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      redirect: "/news",
    },
    {
      path: "/news",
      name: "News",
      component: NewsView,
      // meta: { requiresAuth: true },
    },
    {
      path: "/news/:id",
      name: "newsDetail",
      component: NewsDetailView,
      props: true,
      // meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashBoardView,
      // meta: { requiresAuth: true },
    },
    {
      path: "/mypage",
      name: "mypage",
      component: NewsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  const isRequiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (isRequiresAuth && !userStore.isLoggedIn) {
    next({
      path: "/login",
    });
  }

  if (to.path === "/login" && userStore.isLoggedIn) {
    next({
      path: "/",
    });
  } else {
    next();
  }
});

export default router;
