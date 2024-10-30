import type { INews } from "@/types/data";

export const dummyNewsData: INews[] = [
  {
    id: 1,
    article_interaction: {
      likes: 120,
      read: 1500,
    },
    title: "AI와 미래 산업의 변화",
    writer: "홍길동",
    write_date: new Date("2024-10-01"),
    category: "기술",
    content:
      "AI 기술이 발전하면서 다양한 산업 분야에서 혁신이 일어나고 있습니다. 특히 제조업에서는 스마트 공장 도입을 통해 생산성을 크게 향상시키고 있으며, 자동화와 예측 분석을 통해 비용을 절감하고 품질을 높이는 데 기여하고 있습니다. 금융 분야에서는 인공지능을 활용한 데이터 분석으로 고객의 행동을 예측하고, 맞춤형 금융 상품을 제공하는 등의 변화가 일어나고 있습니다 헬스케어 분야에서도 AI는 큰 변화를 불러오고 있습니다. 질병의 조기 진단과 맞춤형 치료, 의료 영상 분석을 통해 의사들이 보다 정확하고 빠르게 진단을 내릴 수 있도록 돕고 있으며, 환자들의 건강 관리를 개인화하여 의료 서비스를 혁신적으로 개선하고 있습니다..",
    keywords: ["AI", "미래", "산업"],
    url: "https://example.com/article1",
  },
  {
    id: 2,
    article_interaction: {
      likes: 85,
      read: 980,
    },
    title: "환경 보호를 위한 새로운 정책",
    writer: "김영희",
    write_date: new Date("2024-09-25"),
    category: "환경",
    content: "최근 정부는 환경 보호를 위한 새로운 정책을 발표했습니다...",
    keywords: ["AI", "미래", "산업"],
    url: "https://example.com/article2",
  },
  {
    id: 3,
    article_interaction: {
      likes: 200,
      read: 2300,
    },
    title: "경제 성장률과 주식 시장의 관계",
    writer: "이철수",
    write_date: new Date("2024-08-15"),
    category: "경제",
    content: "경제 성장률이 주식 시장에 미치는 영향은 중요합니다...",
    keywords: ["AI", "미래", "산업"],
    url: "https://example.com/article3",
  },
  {
    id: 4,
    article_interaction: {
      likes: 45,
      read: 500,
    },
    title: "교육 혁신과 디지털 학습",
    writer: "박민수",
    write_date: new Date("2024-07-10"),
    category: "교육",
    content: "디지털 학습 도구가 교육 혁신을 이끌고 있습니다...",
    keywords: ["AI", "미래", "산업"],
    url: "https://example.com/article4",
  },
  {
    id: 5,
    article_interaction: {
      likes: 330,
      read: 2700,
    },
    title: "스포츠와 건강의 상관관계",
    writer: "정다은",
    write_date: new Date("2024-06-20"),
    category: "건강",
    content: "스포츠 활동이 건강에 미치는 긍정적인 영향을 살펴봅니다...",
    keywords: ["AI", "미래", "산업"],
    url: "https://example.com/article5",
  },
];

export const dummyComments = [
  {
    author: "dev_kim",
    date: "2024.10.24 15:10",
    content:
      "AI는 결국 도구일 뿐이라고 생각합니다. 기본기가 더 중요해질 것 같네요.",
  },
  {
    author: "code_lee",
    date: "2024.10.24 15:12",
    content:
      "기본기를 바탕으로 AI를 활용하는 방법을 배우는 것이 중요하다고 봅니다.",
  },
  {
    author: "tech_park",
    date: "2024.10.24 15:15",
    content:
      "AI가 많은 걸 바꿔 놓았지만, 기본적인 기술 이해는 여전히 필요하죠.",
  },
];
