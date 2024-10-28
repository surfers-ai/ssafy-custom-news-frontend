<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import { useDate } from "@/composables/useDate";
import router from "@/router";
import LeftArrow from "@/components/icon/LeftArrow.svg";
import { getNews } from "@/api/api";
import NewsPreview2 from "@/components/NewsPreview2.vue";
import { dummyNewsData } from "@/assets/data/dummy";
import CommentBox from "@/components/CommentBox.vue";
import { dummyComments } from "@/assets/data/dummy";
import TheInput from "@/common/TheInput.vue";

const news = ref(dummyNewsData[0]);

const route = useRoute();
const newsId = ref<string>("0");
// const relatedNews = ref<INews[] | null>(null);
const relatedNews = ref(dummyNewsData);

const { formatDate } = useDate();

const goBack = () => {
  router.push("/news");
};

// TODO: api
async function fetchNews() {
  newsId.value = route.params.id as string;

  try {
    const response = await getNews(Number(newsId.value));
    const fetchedNews = response.data.data;
    news.value = fetchedNews;

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
  <button @click="goBack" class="boardview__back-btn"><LeftArrow /></button>
  <div v-if="news" class="boardview">
    <div class="boardview__content">
      <div class="boardview__main">
        <ContentBox>
          <div class="boardview__article">
            <div class="boardview__header">
              <StateButton type="state" size="sm" isActive disabled>{{
                news?.category
              }}</StateButton>
              <h2 class="boardview__title">{{ news?.title }}</h2>
              <div class="boardview__subtitle">
                <div class="boardview__writer">
                  <span>{{ news.writer }}</span>
                  <span> 🕒 {{ formatDate(news.write_date) }}</span>
                </div>
                <span>조회수 {{ news?.article_interaction.read }}</span>
              </div>
            </div>
            <p class="boardview__text">{{ news?.content }}</p>
            <div class="boardview__tags">
              <StateButton
                v-for="(tag, index) in news.keywords"
                :key="index"
                type="tag"
                size="sm"
              >
                #{{ tag }}
              </StateButton>
            </div>
          </div>
        </ContentBox>
        <ContentBox>
          <h1 class="boardview__comments-title">
            댓글
            <span class="boardview__comments-count">{{
              dummyComments.length
            }}</span>
          </h1>
          <div v-for="(comment, index) in dummyComments" :key="index">
            <CommentBox
              :author="comment.author"
              :date="comment.date"
              :content="comment.content"
            />
          </div>

          <div class="comment__write">
            <TheInput placeholder="질문을 입력하세요..." />
            <StateButton class="comment__write-btn" isActive>작성</StateButton>
          </div>
        </ContentBox>
      </div>

      <ContentBox class="boardview__sidebar">
        <h1 class="boardview__related-title">📰 관련 기사</h1>
        <div v-for="(news, index) in relatedNews" :key="index">
          <NewsPreview2 :to="`/news/${news.id}`" :news="news" />
        </div>
      </ContentBox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.boardview {
  &__back-btn {
    margin-bottom: 10px;
  }

  &__content {
    display: flex;
    gap: 20px;
  }

  &__main {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__sidebar {
    flex: 1;
    height: fit-content;
  }

  @media (max-width: 768px) {
    &__content {
      flex-direction: column;
    }
  }
}

.boardview__article {
  font-size: 1rem;
  padding: 20px;
}

.boardview__header {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.boardview__title {
  margin: 12px 0;
  font-size: 1.6rem;
  font-weight: bold;
  color: #1c1c1e;
}

.boardview__subtitle {
  display: flex;
  justify-content: space-between;
}

.boardview__writer {
  display: flex;
  gap: 10px;
}

.boardview__text {
  margin: 16px 0;
  line-height: 1.6;
}

.boardview__tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.boardview__comments-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.boardview__comments-count {
  font-size: 1rem;
}

.boardview__related-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.comment__write {
  display: flex;
  gap: 10px;

  &-btn {
    width: 100px;
    padding: 0 20px;
    font-size: 14px !important;
  }
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
