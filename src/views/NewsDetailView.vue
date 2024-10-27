<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import AIChat from "@/components/AIChat.vue";
import { useNewsStore } from "@/store/news";
import { useDate } from "@/composables/useDate";
import router from "@/router";
import LeftArrow from "@/components/icon/LeftArrow.svg";

const route = useRoute();
const newsId = ref<string>("0");
const newsStore = useNewsStore();

const { formatDate } = useDate();
const news = computed(() =>
  newsStore.newsList.find((news) => String(news.id) === newsId.value)
);

const goBack = () => {
  router.push("/news");
};

onMounted(() => {
  newsId.value = route.params.id[0];
});
</script>

<template>
  <button @click="goBack" class="back-btn"><LeftArrow /></button>
  <div v-if="news" class="news-detail">
    <div class="main-content">
      <ContentBox>
        <div class="article">
          <div class="article__header">
            <StateButton type="state" size="sm" isActive disabled>{{
              news?.category
            }}</StateButton>
            <h2 class="article__header-title">{{ news?.title }}</h2>
            <div class="article__header-writer">
              <span>{{ news.writer }}</span>
              <span> 🕒 {{ formatDate(news.write_date) }}</span>
            </div>
          </div>

          <p class="content">{{ news?.content }}</p>

          <div class="tags">
            <StateButton
              v-for="(tag, index) in news.keywords"
              :key="index"
              type="tag"
              size="sm"
            >
              {{ tag }}
            </StateButton>
          </div>
          <div class="content__emoji">
            <div>❤️ {{ news.article_interaction.likes }}</div>
            <div>👀 {{ news.article_interaction.read }}</div>
            <a :href="news.url">📄</a>
          </div>
        </div>
      </ContentBox>
      <AIChat :id="newsId" />
    </div>

    <ContentBox class="sidebar">
      <h1 class="title">관련 기사</h1>
    </ContentBox>
  </div>
</template>

<style scoped lang="scss">
.back-btn {
  margin: 50px 0 10px;
}

.news-detail {
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
  &__emoji {
    margin-top: 30px;
    color: #888;
    font-size: 0.9rem;
    display: flex;
    gap: 30px;
    align-items: center;
  }
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.likes {
  align-items: center;
}
</style>
