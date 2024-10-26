<script setup lang="ts">
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import { defineProps } from "vue";

interface NewsCardProps {
  title: string;
  category: string;
  date: string;
  likes: number;
}

const props = defineProps<NewsCardProps>();
</script>

<template>
  <ContentBox>
    <div class="top">
      <h1>{{ title }}</h1>
      <div class="news-card__likes">❤️ {{ props.likes.toLocaleString() }}</div>
    </div>
    <div class="bottom">
      <StateButton type="tag" size="sm">{{ category }}</StateButton>
      {{ date }}
    </div>
  </ContentBox>
</template>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  &__likes {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: #6c757d;
  }
}
.bottom {
  display: flex;
  align-items: baseline;
  gap: 10px;

  &__date {
    font-size: 0.75rem;
    color: #6c757d;
  }
}
</style>
