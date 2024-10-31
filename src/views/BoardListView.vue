<script setup lang="ts">
import { watch } from "vue";
import ContentBox from "@/common/ContentBox.vue";
import StateButton from "@/common/StateButton.vue";
import TheInput from "@/common/TheInput.vue";
import { ref } from "vue";
import BoardCard from "@/components/BoardCard.vue";
import type { IBoard } from "@/types/data";
import { getBoardList } from "@/api/api";

const tabs = [
  { id: 0, value: "전체" },
  { id: 1, value: "자유게시판" },
  { id: 2, value: "취업정보" },
  { id: 3, value: "자소서공유" },
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
  <div>
    <h1 class="board__title">커뮤니티</h1>
    <p class="description">
      취업에 필요한 다양한 정보를 한눈에 확인하고, 최신 취업 트렌드와 꿀팁을
      놓치지 마세요! <br />각 분야의 유익한 정보와 기사 추천을 통해 성공적인
      취업을 위한 여정을 함께합니다.<br />
      여러분의 취업 준비에 꼭 필요한 모든 정보를 제공합니다!
    </p>
    <div class="wrtie-btn__container">
      <StateButton to="/write" isActive>글쓰기</StateButton>
    </div>
  </div>
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

<style scoped lang="scss">
.wrtie-btn__container {
  display: flex;
  justify-content: end;
}
.board__title {
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10px;
  margin-top: 30px;
}

.description {
  font-size: 16px;
  font-weight: 400;
  color: #575757;
  line-height: normal;
  margin: 15px 0 30px;
}

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
