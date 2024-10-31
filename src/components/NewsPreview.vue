<script setup lang="ts">
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import type { IArticle } from "@/types/data";
import { defineProps, computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
  news: IArticle;
  to?: string;
}>();

const linkComponent = computed(() => (props.to ? RouterLink : "div"));
</script>

<template>
  <component :is="linkComponent" v-bind="props.to ? { to: props.to } : {}">
    <ContentBox>
      <div class="top">
        <h1>{{ props.news.title }}</h1>
      </div>
      <div class="bottom">
        <StateButton type="tag" size="sm">{{ props.news.writer }}</StateButton>
        {{ props.news.write_date }}
      </div>
    </ContentBox>
  </component>
</template>

<style scoped lang="scss">
.top {
  h1 {
    font-size: 15px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.bottom {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
</style>
