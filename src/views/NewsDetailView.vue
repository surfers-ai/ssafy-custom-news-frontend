<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import AIChat from "@/components/AIChat.vue";
import { useDate } from "@/composables/useDate";
import router from "@/router";
import LeftArrow from "@/components/icon/LeftArrow.svg";
import { deleteLike, getNews, postLike } from "@/api/api";
import type { INews } from "@/types/data";
import NewsPreview2 from "@/components/NewsPreview2.vue";

const news = ref();
const route = useRoute();
const newsId = ref<string>("0");
const relatedNews = ref<INews[] | null>(null);

const { formatDate } = useDate();

const goBack = () => {
  router.push("/news");
};

const liked = ref(false);
const likeCount = ref(0);
const isAnimating = ref(false);

async function toggleLike() {
  try {
    await postLike({ article_id: newsId.value });
    liked.value = true;
    likeCount.value += 1;
    triggerHeartAnimation();
  } catch {
    try {
      await deleteLike(newsId.value);
      liked.value = false;
      likeCount.value -= 1;
      triggerHeartAnimation();
    } catch (deleteError) {
      console.error("Error removing like:", deleteError);
    }
  }
}

function triggerHeartAnimation() {
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
  }, 600);
}

async function fetchNews() {
  newsId.value = route.params.id as string;

  try {
    const response = await getNews(Number(newsId.value));
    const fetchedNews = response.data.data;
    news.value = fetchedNews;
    likeCount.value = fetchedNews.article_interaction.likes;
    relatedNews.value = fetchedNews.related_articles.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

onMounted(() => {
  fetchNews();
});

watch(
  () => route.params.id,
  (newId) => {
    newsId.value = newId as string;
    fetchNews();
  }
);
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

          <div class="content__footer">
            <div class="content__emoji">
              <span class="emoji-btn"> ❤️ {{ likeCount }} </span>
              <div class="emoji-btn">
                <span class="content__emoji-eye"> 👀 </span
                >{{ news?.article_interaction.read }}
              </div>

              <a :href="news.url">📄</a>
            </div>
            <button @click="toggleLike" class="emoji-btn">
              <span>{{ liked ? "❤️" : "🤍" }} 좋아요</span>
            </button>
            <!-- 애니메이션 하트 -->
            <transition name="heart-float">
              <span v-if="isAnimating" class="floating-heart">❤️</span>
            </transition>
          </div>
        </div>
      </ContentBox>
      <AIChat :id="newsId" />
    </div>

    <ContentBox class="sidebar">
      <h1 class="title">📰 관련 기사</h1>
      <div v-for="(news, index) in relatedNews" :key="index">
        <NewsPreview2 :to="`/news/${news.id}`" :news="news" />
      </div>
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
  margin-bottom: 20px;
}

.content {
  margin: 16px 0;
  line-height: 1.6;

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }

  &__emoji {
    color: #888;
    font-size: 16px;
    display: flex;
    gap: 30px;
    align-items: center;
    &-eye {
      font-size: 17px;
    }
  }
}

.emoji-btn {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #888;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.floating-heart {
  position: absolute;
  font-size: 24px;
  color: red;
  animation: heartFloat 0.6s ease-out forwards;
}

@keyframes heartFloat {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-20px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) scale(0.8);
  }
}
</style>
