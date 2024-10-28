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
import { ref, onMounted } from "vue";
import NewsPreview from "@/components/NewsPreview.vue";
import { getDashboard } from "@/api/api";
import type { IArticle, IDashboard } from "@/types/data";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const categoryData = ref({
  labels: [] as string[],
  datasets: [
    {
      data: [] as number[],
      backgroundColor: [] as string[],
    },
  ],
});
const categories = ref<[string, number][]>([]);
const favoriteArticles = ref<IArticle[]>([]);

const keywordData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: "키워드 빈도수",
      data: [] as number[],
      backgroundColor: "#C7E4B8",
    },
  ],
});

const readData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: "키워드 빈도수",
      data: [] as number[],
      backgroundColor: "#DBB8E4",
    },
  ],
});

const options = {
  plugins: {
    legend: {
      display: true,
      position: "right" as const,
      labels: {
        padding: 15,
        boxWidth: 20,
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || "";
          const value = context.raw;
          return `${label}: ${(value * 100).toFixed(1)}%`;
        },
      },
    },
    layout: {
      padding: {
        right: 40, // 레전드와 차트 사이의 간격을 늘리기 위해 오른쪽 패딩 추가
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 1,
      },
    },
  },
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

async function init() {
  try {
    const data = <IDashboard>(await getDashboard()).data.data;

    if (data.my_favorite_category) {
      categoryData.value = {
        labels: Object.keys(data.my_favorite_category),
        datasets: [
          {
            data: Object.values(data.my_favorite_category),
            backgroundColor: [
              "#F67C6C",
              "#7DA56F",
              "#4975C1",
              "#FCDC4B",
              "#FFB4CE",
            ],
          },
        ],
      };
      categories.value = Object.entries(data.my_favorite_category)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    }
    // 키워드 데이터 설정
    if (data.my_favorite_key_word) {
      keywordData.value = {
        labels: Object.keys(data.my_favorite_key_word),
        datasets: [
          {
            label: "키워드 빈도수",
            data: Object.values(data.my_favorite_key_word),
            backgroundColor: "#C7E4B8",
          },
        ],
      };
    }
    // 주간 읽은 기사 데이터 설정
    if (data.number_of_written_articles) {
      readData.value = {
        labels: Object.keys(data.number_of_written_articles),
        datasets: [
          {
            label: "주간 읽은 기사 수",
            data: Object.values(data.number_of_written_articles),
            backgroundColor: "#DBB8E4",
          },
        ],
      };
    }

    // 즐겨찾기한 기사 목록 설정
    if (data.favorite_articles) {
      favoriteArticles.value = data.favorite_articles;
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="dashboard">
    <div class="layout">
      <ContentBox class="category">
        <h1 class="title">🐤 나의 관심 카테고리</h1>
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
              {{ index + 1 }}순위: {{ category[0] }} ({{ category[1] * 100 }}%)
            </span>
          </div>
        </div>
      </ContentBox>

      <ContentBox class="keyword">
        <h1>⭐️ 주요 키워드</h1>
        <Bar :data="keywordData" :options="barOptions" />
      </ContentBox>
    </div>
    <div class="layout">
      <ContentBox>
        <h1>📰 주간 읽은 기사</h1>
        <Bar :data="readData" :options="readBarOptions" />
      </ContentBox>

      <ContentBox class="like-news">
        <h1>❤️ 좋아요 누른 기사</h1>
        <div v-for="(article, index) in favoriteArticles" :key="index">
          <NewsPreview :to="`/news/${article.id}`" :news="article" />
        </div>
      </ContentBox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.like-news {
  overflow-y: auto;
  box-sizing: border-box;
}
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
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
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
