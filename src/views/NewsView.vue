<script setup lang="ts">
import { ref, watch } from "vue";

import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import NewsCard from "@/components/NewsCard.vue";
import { tabs } from "@/assets/data/tabs";
import { getNewsList } from "@/api/api";
import type { INews } from "@/types/data";
import { useNewsStore } from "@/store/news";

const newsStore = useNewsStore();
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
      <h1 class="news__box__title">🤖 AI 맞춤 추천 뉴스</h1>
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

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 12px 30px !important;
  }
  &__box {
    padding: 30px !important;

    &__title {
      font-weight: 700;
      font-size: 21px;
    }

    &__cards {
      margin-top: 30px;
      margin-left: 30px;
    }
  }
}
</style>
