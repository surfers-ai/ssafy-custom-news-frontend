<script setup lang="ts">
import { defineModel } from "vue";

const pageModel = defineModel<number>({ default: 1 });

const props = defineProps<{
  totalPages: number;
}>();

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    pageModel.value = page;
  }
}
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <button @click="goToPage(pageModel - 1)" :disabled="pageModel === 1">
      이전
    </button>
    <span> {{ pageModel }} / {{ totalPages }}</span>
    <button
      @click="goToPage(pageModel + 1)"
      :disabled="pageModel === totalPages"
    >
      다음
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.pagination button {
  font-size: 13px;
  padding: 4px 8px;
  border: none;
  background-color: #0c3057;
  color: white;
  border-radius: 100px;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
