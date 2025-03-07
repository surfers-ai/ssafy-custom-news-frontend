<script setup lang="ts">
import { ref, watch } from "vue";
import ContentBox from "@/common/ContentBox.vue";
import NewsCard from "@/components/NewsCard.vue";
import { tabs } from "@/assets/data/tabs";
import { getNewsList } from "@/api/api";
import type { INews } from "@/types/data";
import { useUserStore } from "@/store/user";
import PaginationButton from "@/common/PaginationButton.vue";
import StateButton from "@/common/StateButton.vue";

const userStore = useUserStore();
const newsList = ref<INews[]>([]);
const sortBy = ref<"latest" | "recommend">("latest");
const activeTab = ref(tabs[0].id);
const currentPage = ref(1);
const totalPages = ref(1);

async function fetchNews(
  tabId: number,
  page: number
): Promise<{
  articles: INews[];
  pagination: { total_pages: number; limit: number };
}> {
  const category = tabs.find((tab) => tab.id === tabId)?.value || "";
  const response = await getNewsList(category, "latest", page);
  return response.data.data;
}

watch(
  [() => activeTab.value, () => sortBy.value, () => currentPage.value],
  async ([tabId, sortOption], [oldTabId, oldSortOption]) => {
    try {
      if (tabId !== oldTabId || sortOption !== oldSortOption) {
        currentPage.value = 1;
      }
      const data = await fetchNews(tabId, currentPage.value);
      newsList.value = data.articles;
      totalPages.value = data.pagination.total_pages;
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="news">
    <div>
      <h1 class="news__title">🤖 AI 맞춤 추천 뉴스</h1>
      <p class="news__description">
        당신이 원하는 뉴스, 이제 AI가 직접 추천해드립니다!<br />
        나만의 취향을 기반으로, 맞춤형 뉴스만 쏙쏙 골라주는<br />
        뉴스 큐레이팅 서비스
        <strong style="font-weight: bold">SSAFYNEWS</strong>에 빠져보세요.
        <br />AI 챗봇과 기사에 대해 대화하며 궁금한 점을 물어보고, <br />한눈에
        보기 쉬운 대시보드를 통해 나의 뉴스 소비 패턴도 확인할 수 있습니다.
      </p>
      <p v-if="userStore.isLoggedIn" class="news__description--job">
        <span style="text-decoration: underline">데이터사이언티스트 </span>
        관련 정보를 보시려면 IT/과학 카테고리를 클릭하세요 !
      </p>

      <ContentBox class="news__tabs">
        <StateButton
          v-for="tab in tabs"
          :key="tab.id"
          type="state"
          :is-active="activeTab === tab.id"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </StateButton>
      </ContentBox>
    </div>
    <ContentBox class="news__box">
      <div class="news__box__title-container">
        <h1 class="news__box__title">
          <span v-if="userStore.isLoggedIn"
            ><span class="news__box__title-username">{{
              userStore.username
            }}</span>
            님을 위한</span
          >
          뉴스 피드
          <span v-if="userStore.isLoggedIn" class="news__box__title-icon">
            ❓</span
          >
        </h1>
        <RouterLink
          to="/login"
          class="news__box__noti"
          v-if="!userStore.isLoggedIn"
        >
          ❗️로그인하시면 취향에 맞는 맞춤 뉴스를 전달해드려요.
        </RouterLink>

        <span v-if="userStore.isLoggedIn" class="news__box__subtitle-loggedin">
          취향에 맞는 맞춤 뉴스를 골라 전달해드려요.
        </span>
      </div>

      <div class="news__box__cards" v-for="news in newsList" :key="news.id">
        <NewsCard :data="news" />
      </div>

      <PaginationButton v-model="currentPage" :totalPages="totalPages" />
    </ContentBox>
  </div>
</template>

<style scoped lang="scss">
.news {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;

  &__title {
    font-size: 20px;
    font-weight: 700;
    border-bottom: 1px solid #e2e2e2;
    padding-bottom: 10px;
  }

  &__description {
    font-size: 16px;
    font-weight: 400;
    color: #575757;
    line-height: normal;
    margin: 15px 0 25px;

    &--job {
      color: red;
      margin-bottom: 20px;
    }
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 12px 30px !important;
  }

  &__box {
    padding: 30px !important;

    &__noti {
      color: #666666;
      font-size: 12px;
      padding: 5px 10px;
    }

    &__title-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    &__title {
      font-weight: 700;
      font-size: 21px;
      cursor: pointer;

      &-username {
        font-weight: 400;
        padding: 3px;
        border-bottom: 2px solid #272c97;
      }
      &-icon {
        font-size: 15px;
      }
    }

    &__subtitle-loggedin {
      font-weight: 400;
      padding: 10px 0 0 10px;
      color: #575757;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      text-decoration: underline;
    }

    &__title-container:hover .news__box__subtitle-loggedin {
      opacity: 1;
    }

    .filters__container {
      position: absolute;
      right: 0;
    }

    &__cards {
      margin-top: 30px;
      margin-left: 30px;
    }
  }
}
</style>
