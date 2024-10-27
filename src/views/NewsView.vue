<script setup lang="ts">
import { onMounted } from "vue";

import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import NewsCard from "@/components/NewsCard.vue";
import { useNewsStore } from "@/store/news";
import { tabs } from "@/assets/data/tabs";

const newsStore = useNewsStore();

onMounted(() => {
  newsStore.fetchNews(newsStore.currentTab);
});
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
      <div
        class="news__box__cards"
        v-for="news in newsStore.newsList"
        :key="news.id"
      >
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
  margin-top: 50px;

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
