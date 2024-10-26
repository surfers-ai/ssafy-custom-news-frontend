<script setup lang="ts">
import { Bar, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ContentBox from "@/common/ContentBox.vue";
import { ref } from "vue";
import NewsPreview from "@/components/NewsPreview.vue";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const categoryData = {
  labels: ["기술", "경제", "문화", "스포츠"],
  datasets: [
    {
      data: [40, 30, 20, 10],
      backgroundColor: ["#F67C6C", "#7DA56F", "#FCDC4B", "#4975C1"],
    },
  ],
};

const categories = ref([
  ["기술", 40],
  ["경제", 30],
  ["음악", 30],
]);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const keywordData = {
  labels: ["AI", "주식", "영화", "메타버스", "반도체"],
  datasets: [
    {
      label: "키워드 빈도수",
      data: [28, 20, 18, 15, 10],
      backgroundColor: "#C7E4B8",
    },
  ],
};

const readData = {
  labels: ["AI", "주식", "영화", "메타버스", "반도체"],
  datasets: [
    {
      label: "키워드 빈도수",
      data: [28, 20, 18, 15, 10, 1, 1, 1],
      backgroundColor: "#DBB8E4",
    },
  ],
};

const barOptions = {
  indexAxis: "y" as const,
  scales: {
    x: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const readBarOptions = {
  indexAxis: "x" as const,
  scales: {
    x: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
</script>

<template>
  <div class="dashboard">
    <div class="layout">
      <ContentBox class="category">
        <h1 class="title">나의 관심 카테고리</h1>
        <div class="category__chart">
          <Doughnut :data="categoryData" :options="options" />
          <div class="category__labels">
            <span
              v-for="(category, index) in categories"
              :key="index"
              :style="{
                borderColor: categoryData.datasets[0].backgroundColor[index],
                color: categoryData.datasets[0].backgroundColor[index],
              }"
              class="category__label"
            >
              {{ category[0] }} {{ category[1] }}%
            </span>
          </div>
        </div>
      </ContentBox>

      <ContentBox class="keyword">
        <h1>주요 키워드</h1>
        <Bar :data="keywordData" :options="barOptions" />
      </ContentBox>
    </div>
    <div class="layout">
      <ContentBox>
        <h1>주간 읽은 기사</h1>
        <Bar :data="readData" :options="readBarOptions" />
      </ContentBox>

      <ContentBox>
        <h1>좋아요 누른 기사</h1>
        <NewsPreview
          title="zzzzzz"
          date="11.11.11"
          category="기술"
          :likes="1"
        />
      </ContentBox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.layout {
  display: flex;
  gap: 20px;
  > * {
    height: 400px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.category {
  &__chart {
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding-bottom: 30px;
  }
  &__label {
    border: 1px solid;
    padding: 3px 5px;
    border-radius: 10px;
    margin-right: 10px;
  }
}

h1 {
  margin-bottom: 20px;
}
</style>
