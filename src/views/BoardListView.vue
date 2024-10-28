<script setup lang="ts">
import { onMounted } from "vue";
import ContentBox from "@/common/ContentBox.vue";
import { useNewsStore } from "@/store/news";
import StateButton from "@/common/StateButton.vue";
import TheInput from "@/common/TheInput.vue";
import { dummyNewsData } from "@/assets/data/dummy";
import { ref } from "vue";
import BoardCard from "@/components/BoardCard.vue";

const tabs = ["전체", "토론", "리뷰", "질문", "정보공유"];
const activeTab = ref(tabs[0]);

function selectTab(tab: string) {
  activeTab.value = tab;
}

const newsStore = useNewsStore();

onMounted(() => {
  newsStore.fetchNews(newsStore.currentTab);
});
</script>

<template>
  <ContentBox class="header">
    <h1>커뮤니티</h1>
    <StateButton to="/write" isActive>글쓰기</StateButton>
  </ContentBox>
  <ContentBox>
    <div class="tab-navigation">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'tab-navigation__tab',
          { 'tab-navigation__tab--active': activeTab === tab },
        ]"
        @click="selectTab(tab)"
      >
        {{ tab }}
      </button>
    </div>
    <div class="filter">
      <span>총 2개의 글</span>
      <div class="filter-tab">
        <select>
          <option>최신순</option>
          <option>인기순</option>
        </select>
        <TheInput placeholder="검색어를 입력하세요" />
      </div>
    </div>

    <div v-for="(board, idx) in dummyNewsData" :key="idx">
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
