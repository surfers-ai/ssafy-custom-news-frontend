<script setup lang="ts">
import { ref, watch } from "vue";

import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import NewsCard from "@/components/NewsCard.vue";
import { tabs } from "@/assets/data/tabs";
import { getNewsList } from "@/api/api";
import type { INews } from "@/types/data";
import { useNewsStore } from "@/store/news";
import { useUserStore } from "@/store/user";

const newsStore = useNewsStore();
const userStore = useUserStore();
const newsList = ref<INews[]>([]);
const cachedNews = ref<Record<number, INews[]>>({});

const loadNews = async (tabId: number) => {
  if (cachedNews.value[tabId]) {
    newsList.value = cachedNews.value[tabId];
    return;
  }

  try {
    const data = await fetchNews(tabId);
    newsList.value = data;
    cachedNews.value[tabId] = data;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

watch(
  () => newsStore.currentTab,
  (tabId) => loadNews(tabId),
  { immediate: true }
);

async function fetchNews(tabId: number): Promise<INews[]> {
  const category = tabs.find((tab) => tab.id === tabId)?.value || "";
  const response = await getNewsList(category);
  return response.data.data;
}
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
    </div>

    <ContentBox class="news__tabs">
      <StateButton
        v-for="tab in tabs"
        :key="tab.id"
        type="state"
        :is-active="newsStore.currentTab === tab.id"
        @click="newsStore.setActiveTab(tab.id)"
      >
        {{ tab.label }}
      </StateButton>
    </ContentBox>

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
          class="news__box__subtitle"
          v-if="!userStore.isLoggedIn"
        >
          로그인하시면 취향에 맞는 맞춤 뉴스를 전달해드려요.
        </RouterLink>
        <span class="news__box__subtitle-loggedin">
          취향에 맞는 맞춤 뉴스를 골라 전달해드려요.
        </span>
      </div>

      <div class="news__box__cards" v-for="news in newsList" :key="news.id">
        <NewsCard :data="news" />
      </div>
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
    margin: 15px 0 30px;
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 12px 30px !important;
  }

  &__box {
    padding: 30px !important;

    &__title-container {
      position: relative;
      display: flex;
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

    &__subtitle {
      position: absolute;
      right: 0;
      color: #575757;
      text-decoration: underline;
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

    &__title:hover + .news__box__subtitle-loggedin {
      opacity: 1;
    }

    &__cards {
      margin-top: 30px;
      margin-left: 30px;
    }
  }
}
</style>
