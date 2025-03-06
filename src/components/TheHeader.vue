<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useAuth } from "@/composables/useAuth";
import { useUserStore } from "@/store/user";

const { logoutUser } = useAuth();
const userStore = useUserStore();
const router = useRouter();

const searchQuery = ref("");

const handleAuthAction = () => {
  if (userStore.isLoggedIn) {
    logoutUser();
  } else {
    router.push("/login");
  }
};

const refreshPage = (event: MouseEvent) => {
  event.preventDefault();
  router.push("/").then(() => {
    window.location.reload();
  });
};

const searchArticle = () => {
  document.location.href = `/news/search?q=${searchQuery.value}`;
};
</script>

<template>
  <div class="header__container">
    <header>
      <router-link to="/" @click="refreshPage">
        <span class="logo"> SSAFYNEWS </span>
      </router-link>

      <nav class="menus">
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="검색어를 입력하세요"
          @keyup.enter="searchArticle"
        />
        <button @click="searchArticle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
            />
          </svg>
        </button>
        <router-link to="/news">나만의 뉴스 큐레이팅</router-link>
        <router-link to="/dashboard">대시보드</router-link>
        <button @click="handleAuthAction">
          {{ userStore.isLoggedIn ? "로그아웃" : "로그인" }}
        </button>
      </nav>
    </header>
  </div>
</template>

<style scoped lang="scss">
.header__container {
  background-color: white;
  border-bottom: 1px solid #d4d4d4;
  header {
    max-width: 1280px;
    margin: 0 auto;
    color: black;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding: 0 15px;
  }

  .logo {
    font-size: x-large;
    font-weight: 800;
  }

  .menus {
    display: flex;
    align-items: center;
    gap: 23px;
  }

  a.router-link-active {
    font-weight: bold;
  }

  .search-input {
    border: 1px solid #000000;
    padding: 8px 16px;
    border-radius: 8px;
    margin-right: -10px;
  }
}
</style>
