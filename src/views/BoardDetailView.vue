<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import { useDate } from "@/composables/useDate";
import router from "@/router";
import LeftArrow from "@/components/icon/LeftArrow.svg";
import { getBoard, postComment } from "@/api/api";
import CommentBox from "@/components/CommentBox.vue";
import TheInput from "@/common/TheInput.vue";
import { useUserStore } from "@/store/user";
import type { IComments } from "@/types/data";
import ArticlePreview from "@/components/ArticlePreview.vue";

const route = useRoute();
const news = ref();
const newsId = ref<string>("0");
const relatedNews = ref();
const newComment = ref("");
const comments = ref<IComments[]>([]);
const userStore = useUserStore();

async function addComment() {
  if (newComment.value.trim()) {
    try {
      await postComment(newsId.value, newComment.value);

      comments.value.push({
        id: comments.value.length + 1,
        writer_name: userStore.username,
        write_date: new Date(),
        content: newComment.value,
      });

      newComment.value = "";
    } catch {
      alert("댓글 추가에 실패했습니다. 다시 시도해주세요.");
    }
  }
}

const { formatDate } = useDate();

async function fetchBoard() {
  newsId.value = route.params.id as string;

  try {
    const response = await getBoard(newsId.value);
    const fetchedBoard = response.data.data;
    comments.value = fetchedBoard.posting_comments.comments;
    news.value = fetchedBoard;

    relatedNews.value = fetchedBoard.related_articles.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

watch(
  () => route.params.id,
  (newId) => {
    newsId.value = newId as string;
    fetchBoard();
  }
);

onMounted(() => {
  fetchBoard();
});
</script>
<template>
  <button @click="() => router.back()" class="boardview__back-btn">
    <LeftArrow />
  </button>
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
          <h1 class="comments__title">
            댓글
            <span class="comments__count">{{ comments.length }}</span>
          </h1>
          <div v-for="(comment, index) in comments" :key="index">
            <CommentBox
              :writer_name="comment.writer_name"
              :write_date="comment.write_date"
              :content="comment.content"
            />
          </div>

          <div class="comments__write">
            <TheInput
              v-model="newComment"
              placeholder="댓글을 입력하세요..."
              @keyup.enter="addComment"
            />
            <StateButton
              class="comments__write-btn"
              isActive
              @click="addComment"
              >작성</StateButton
            >
          </div>
        </ContentBox>
      </div>

      <ContentBox class="boardview__sidebar">
        <h1 class="boardview__related-title">📰 추천 기사</h1>
        <div v-for="(news, index) in relatedNews" :key="index">
          <ArticlePreview :to="`/news/${news.id}`" :news="news" />
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

.comments {
  &__title {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  &__count {
    font-size: 1rem;
  }
  &__write {
    display: flex;
    gap: 10px;

    &-btn {
      width: 100px;
      padding: 0 20px;
      font-size: 14px !important;
    }
  }
}

.boardview__related-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 20px;
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
