<script setup lang="ts">
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import TheInput from "@/common/TheInput.vue";
import { ref } from "vue";

const text = ref("이 기사에 대해 궁금한 점을 자유롭게 물어보세요!");
</script>

<template>
  <ContentBox class="ai">
    <h1 class="title">🤖 AI 뉴스 어시스턴트</h1>

    <TheInput v-model="text" disabled />
    <div class="ai__question">
      <TheInput placeholder="질문을 입력하세요..." />
      <StateButton class="ai__submit-btn" isActive> 📤 </StateButton>
    </div>
  </ContentBox>
</template>

<style scoped lang="scss">
.title {
  font-weight: 700;
  font-size: 18px;
}

.ai {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__question {
    display: flex;
    gap: 10px;
  }
  &__submit-btn {
    width: 70px;
  }
}
</style>
