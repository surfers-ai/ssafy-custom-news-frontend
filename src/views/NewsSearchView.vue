<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import ContentBox from "@/common/ContentBox.vue";
import NewsSearchCard from "@/components/NewsSearchCard.vue";
import { searchNews } from "@/api/api";
import type { INews } from "@/types/data";

const router = useRouter();
const route = useRoute();
const searchQuery = ref("");
const newsList = ref<INews[]>([]);

async function search(searchText: string): Promise<INews[]> {
  const { data } = await searchNews(searchText);
  return data.data;
}

watch(
  [() => searchQuery.value],
  async ([query]) => {
    if (!query) return;

    try {
      const articles = await search(query);
      newsList.value = articles;
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  },
  { immediate: true }
);

onMounted(() => {
  // 라우터가 준비된 후 쿼리 파라미터 읽기
  router.isReady().then(() => {
    searchQuery.value = (route.query.q as string) || "";
  });
});
</script>

<template>
  <div class="news">
    <ContentBox class="news__box">
      <div class="news__box__title-container">
        <h1 class="news__box__title">
          <span
            ><span class="news__box__title-username">{{ searchQuery }}</span> 에
            대한 검색결과입니다.</span
          >
        </h1>
      </div>

      <div class="news__box__cards" v-for="news in newsList" :key="news.id">
        <NewsSearchCard :data="news" :simple="true" />
      </div>
    </ContentBox>
  </div>
</template>

<style scoped lang="scss">
.news {
  display: flex;
  flex-direction: column;
  gap: 20px;

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
