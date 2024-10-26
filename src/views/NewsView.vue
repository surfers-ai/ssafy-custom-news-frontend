<script setup lang="ts">
import { tabs } from "@/assets/data/tabs";
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import { newsDummy } from "@/types/dummy";
import { ref } from "vue";

const currentTab = ref(1);

const setActiveTab = (tabId: number) => {
  currentTab.value = tabId;
};
</script>

<template>
  <div class="news">
    <ContentBox class="news__tabs">
      <StateButton
        v-for="tab in tabs"
        :key="tab.id"
        type="state"
        :is-active="currentTab === tab.id"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
      </StateButton>
    </ContentBox>

    <ContentBox class="news__box">
      <h1 class="news__box__title">🤖 AI 맞춤 추천 뉴스</h1>
      <div class="news__box__cards">
        <NewsCard v-for="news in newsDummy" :data="news" :key="news.id" />
      </div>
    </ContentBox>
  </div>
</template>

<style scoped lang="scss">
.news {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  &__tabs {
    display: flex;
    gap: 20px;
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
    }
  }
}
</style>
