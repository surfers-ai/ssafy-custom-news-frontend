<script setup lang="ts">
import StateButton from "@/common/StateButton.vue";
import type { INews } from "@/types/data";

const props = defineProps<{ data: INews }>();
</script>

<template>
  <div class="card">
    <div class="card__header">
      <StateButton type="state" size="sm" disabled>{{
        props.data.category
      }}</StateButton>
      <span class="subcategory">{{ props.data.writer }}</span>
      <span class="date"
        >· {{ props.data.write_date.toLocaleDateString() }}</span
      >
    </div>
    <RouterLink :to="{ name: 'newsDetail', params: { id: props.data.id } }">
      <h2 class="title">{{ props.data.title }}</h2>
      <p class="description">{{ props.data.content }}</p>
    </RouterLink>
    <div class="stats">
      <span>❤️ 128</span>
      <span>📄</span>
    </div>

    <div class="tags">
      <StateButton
        v-for="(tag, index) in props.data.key_word"
        :key="index"
        type="tag"
        size="sm"
      >
        {{ tag }}
      </StateButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: white;
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #888;
  }
}

.subcategory,
.date {
  font-weight: normal;
}

.title {
  margin: 12px 0;
  font-size: 22px;
  font-weight: bold;
  color: #1c1c1e;
}

.description {
  font-size: 1rem;
  color: var(--c-gray-600);
  margin: 15px 0;
}

.stats {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: var(--c-gray-500);
  margin-bottom: 15px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding-bottom: 40px;
  border-bottom: 1px solid #e7e6e6;
}

.tags .state-button {
  background-color: #f5f5f7;
  color: #333;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: default;
}
</style>
