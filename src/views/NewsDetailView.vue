<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { INews } from "@/types/data";
import { newsDummy } from "@/types/dummy";
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import TheInput from "@/common/TheInput.vue";
import AIChat from "@/components/AIChat.vue";

const route = useRoute();
const news = ref<INews | null>(null);

onMounted(() => {
  const newsId = route.params.id;
  news.value = newsDummy[0];
});
</script>

<template>
  <div class="news-detail">
    <div class="main-content">
      <ContentBox>
        <div class="article">
          <div class="article__header">
            <StateButton type="state" size="sm" isActive disabled>{{
              news?.category
            }}</StateButton>
            <h2 class="article__header-title">{{ news?.title }}</h2>
            <div class="article__header-writer">
              <span>{{ news?.writer }}</span>
              <span> 🕒 {{ news?.write_date.toLocaleDateString() }}</span>
            </div>
          </div>

          <p class="content">{{ news?.content }}</p>

          <div class="tags">
            <StateButton
              v-for="(tag, index) in news?.key_word"
              :key="index"
              type="tag"
              size="sm"
            >
              {{ tag }}
            </StateButton>
          </div>

          <div class="likes">❤️ {{ news ? 342 : "0" }}</div>
        </div>
      </ContentBox>
      <AIChat />
    </div>

    <ContentBox class="sidebar">
      <h1 class="title">관련 기사</h1>
    </ContentBox>
  </div>
</template>

<style scoped lang="scss">
.news-detail {
  margin-top: 50px;
  display: flex;
  gap: 20px;

  .main-content {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .sidebar {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.article {
  font-size: 1rem;
  padding: 20px;
  &__header {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 10px;
    &-title {
      margin: 12px 0;
      font-size: 1.6rem;
      font-weight: bold;
      color: #1c1c1e;
    }
    &-writer {
      display: flex;
      gap: 10px;
    }
  }
}

.title {
  font-weight: 700;
  font-size: 18px;
}

.content {
  margin: 16px 0;
  line-height: 1.6;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.likes {
  margin-top: 12px;
  color: #888;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}
</style>
