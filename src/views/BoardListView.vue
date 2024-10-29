<script setup lang="ts">
import { onMounted, watch } from "vue";
import ContentBox from "@/common/ContentBox.vue";
import { useNewsStore } from "@/store/news";
import StateButton from "@/common/StateButton.vue";
import TheInput from "@/common/TheInput.vue";
import { dummyNewsData } from "@/assets/data/dummy";
import { ref } from "vue";
import BoardCard from "@/components/BoardCard.vue";
import type { IBoard } from "@/types/data";
import { getBoardList } from "@/api/api";

const tabs = [
  { id: 0, value: "전체" },
  { id: 1, value: "토론" },
  { id: 2, value: "리뷰" },
  { id: 3, value: "질문" },
  { id: 4, value: "정보공유" },
];
const activeTab = ref(tabs[0].id);

function selectTab(id: number) {
  activeTab.value = id;
}

const boadList = ref<IBoard[]>([]);
const Boards = ref<Record<number, IBoard[]>>({});

const loadBoards = async (tabId: number) => {
  if (Boards.value[tabId]) {
    boadList.value = Boards.value[tabId];
    return;
  }

  try {
    const data = await fetchBoard(tabId);
    boadList.value = data;
    Boards.value[tabId] = data;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

watch(
  () => activeTab.value,
  (tabId) => loadBoards(tabId),
  { immediate: true }
);

async function fetchBoard(tabId: number): Promise<IBoard[]> {
  const category = tabs.find((tab) => tab.id === tabId)?.value || "";
  const response = await getBoardList(category);
  return response.data.data;
}
</script>

<template>
  <ContentBox class="header">
    <h1>커뮤니티</h1>
    <StateButton to="/write" isActive>글쓰기</StateButton>
  </ContentBox>
  <ContentBox>
    <div class="tab-navigation">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'tab-navigation__tab',
          { 'tab-navigation__tab--active': activeTab === tab.id },
        ]"
        @click="selectTab(tab.id)"
      >
        {{ tab.value }}
      </button>
    </div>

    <div v-for="(board, idx) in boadList" :key="idx">
      <BoardCard :data="board" />
    </div>
  </ContentBox>
</template>

<style lang="scss">
.header {
  border: none !important;
  padding: 10px 20px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  span {
    color: gray;
  }
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tab-navigation {
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #e5e5ea;
  background-color: #ebebeb;
  width: fit-content;
  border-radius: 10px;

  &__tab {
    padding: 6px 12px;
    color: #666;
    border: none;
    cursor: pointer;
    border-radius: 6px;
  }

  &__tab--active {
    margin: 2px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.news {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 12px 30px !important;
  }
  &__box {
    padding: 30px !important;

    &__title {
      font-weight: 700;
      font-size: 21px;
    }

    &__cards {
      margin-top: 30px;
      margin-left: 30px;
    }
  }
}
</style>
