<script setup lang="ts">
import { watch } from "vue";
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import { ref } from "vue";
import BoardCard from "@/components/BoardCard.vue";
import type { IBoard } from "@/types/data";
import { getBoardList } from "@/api/api";
import PaginationButton from "@/common/PaginationButton.vue";

const tabs = [
  { id: 0, value: "전체" },
  { id: 1, value: "자유게시판" },
  { id: 2, value: "취업정보" },
  { id: 3, value: "자소서공유" },
];

const activeTab = ref(tabs[0].id);
const boadList = ref<IBoard[]>([]);
const Boards = ref<Record<number, IBoard[]>>({});
const currentPage = ref(1);
const totalPages = ref(1);

function selectTab(id: number) {
  activeTab.value = id;
  currentPage.value = 1;
  loadBoards(id, currentPage.value);
}

const loadBoards = async (tabId: number, page: number = 1) => {
  try {
    const data = await fetchBoard(tabId, page);
    boadList.value = data.postings;
    Boards.value[tabId] = data.postings;
    totalPages.value = data.pagination.total_pages;
  } catch (error) {
    console.error("Error fetching boards:", error);
  }
};

watch(
  [() => activeTab.value, () => currentPage.value],
  ([tabId, page]) => loadBoards(tabId, page),
  { immediate: true }
);

async function fetchBoard(
  tabId: number,
  page: number
): Promise<{
  postings: IBoard[];
  pagination: { total_pages: number };
}> {
  const category = tabs.find((tab) => tab.id === tabId)?.value || "";
  const response = await getBoardList(category, page);
  return response.data.data;
}
</script>
<template>
  <div>
    <h1 class="title">커뮤니티</h1>
    <p class="description">
      취업에 필요한 다양한 정보를 한눈에 확인하고, 최신 취업 트렌드와 꿀팁을
      놓치지 마세요! <br />각 분야의 유익한 정보와 기사 추천을 통해 성공적인
      취업을 위한 여정을 함께합니다.<br />
      여러분의 취업 준비에 꼭 필요한 모든 정보를 제공합니다!
    </p>
    <div class="write-btn__container">
      <StateButton to="/write" isActive>글쓰기</StateButton>
    </div>
  </div>

  <ContentBox>
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tabs__item', { 'tabs__item-active': activeTab === tab.id }]"
        @click="selectTab(tab.id)"
      >
        {{ tab.value }}
      </button>
    </div>

    <div v-if="boadList.length > 0">
      <div v-for="(board, idx) in boadList" :key="idx">
        <BoardCard :data="board" />
      </div>
    </div>

    <div v-else class="no-data">데이터가 없습니다.</div>

    <PaginationButton v-model="currentPage" :totalPages="totalPages" />
  </ContentBox>
</template>

<style scoped lang="scss">
.write-btn__container {
  width: 100%;
  display: flex;
  justify-content: end;
}

.title {
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10px;
  margin-top: 30px;
  border-bottom: 1px solid #e2e2e2;
}

.description {
  font-size: 16px;
  font-weight: 400;
  color: #575757;
  line-height: normal;
  margin: 15px 0 30px;
}

.tabs {
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #e5e5ea;
  background-color: #ebebeb;
  width: fit-content;
  border-radius: 10px;

  &__item {
    padding: 6px 12px;
    color: #666;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    &-active {
      margin: 2px;
      font-weight: 500;
      color: #000;
      background-color: #fff;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
