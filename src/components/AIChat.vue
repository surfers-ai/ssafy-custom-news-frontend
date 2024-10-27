<script setup lang="ts">
import { ref } from "vue";
import TheInput from "@/common/TheInput.vue";
import StateButton from "@/common/StateButton.vue";
import ContentBox from "@/common/ContentBox.vue";
import type { IChatReq } from "@/types/api";
import { postChat } from "@/api/api";

const messages = ref<string[]>([]);
const newMessage = ref("");

const props = defineProps<{ id: string }>();

const sendMessage = async () => {
  if (!newMessage.value) return;

  messages.value.push(newMessage.value);

  const chatRequest: IChatReq = {
    article_id: props.id,
    question: newMessage.value,
  };
  newMessage.value = "";

  try {
    const response = await postChat(chatRequest);
    const chatbotReply =
      response.data?.history || "챗봇 응답을 가져올 수 없습니다.";
    messages.value.push(chatbotReply);
  } catch (error) {
    console.error("챗봇 응답 오류:", error);
    messages.value.push("오류가 발생했습니다. 다시 시도해주세요.");
  }
};
</script>

<template>
  <ContentBox class="assistant">
    <h1 class="title">🤖 AI 뉴스 어시스턴트</h1>
    <p class="description">이 기사에 대해 궁금한 점을 자유롭게 물어보세요!</p>

    <div class="chat" v-if="messages.length > 0">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message-container"
      >
        <!-- 사용자 메시지와 챗봇 메시지 구분 -->
        <div v-if="index % 2 === 0" class="message message--user">
          <p class="message__text">{{ message }}</p>
          <span class="icon">👤</span>
        </div>

        <div v-else class="message message--ai">
          <span class="icon">🤖</span>
          <p class="message__text">{{ message }}</p>
        </div>
      </div>
    </div>

    <div class="ai__question">
      <TheInput
        v-model="newMessage"
        placeholder="질문을 입력하세요..."
        @keyup.enter="sendMessage"
      />
      <StateButton class="ai__submit-btn" isActive @click="sendMessage"
        >📤</StateButton
      >
    </div>
  </ContentBox>
</template>

<style scoped lang="scss">
.assistant {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .description {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 20px;
  }
  .prompt {
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 8px;
  }

  .chat {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    padding: 10px;
  }

  .message {
    display: flex;
    align-items: start;
    gap: 10px;
    padding: 12px;
    border-radius: 8px;

    &--ai {
      .message__text {
        background-color: #eef2f6;
      }
    }

    &--user {
      justify-content: flex-end;
      text-align: right;
      .message__text {
        background-color: #004085;
        color: white;
      }
    }

    .icon {
      padding-top: 2px;
      font-size: 18px;
    }

    .message__text {
      border-radius: 10px;
      padding: 15px;
      word-wrap: break-word;
      font-size: 0.9rem;
    }
  }

  .ai__question {
    display: flex;
    gap: 10px;
  }

  .ai__submit-btn {
    width: 70px;
  }
}
</style>
