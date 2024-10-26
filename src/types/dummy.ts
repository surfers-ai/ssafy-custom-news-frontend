import type { INews } from "./data";

export const newsDummy: INews[] = [
  {
    id: 1,
    title: "AI 혁신의 새 시대, 인간과 기계의 공존",
    writer: "TechDaily",
    write_date: new Date("2024-10-20"),
    category: "기술",
    content:
      "인공지능 기술이 급속히 발전하며 인간과 기계의 협업 가능성이 새로운 시대를 열고 있습니다. 특히 의료와 금융 분야에서 AI의 활용이 크게 증가하고 있으며, 이는 업무의 효율성을 극대화하고 새로운 가치를 창출하고 있습니다.",
    key_word: ["#AI", "#혁신", "#기술"],
    url: "https://techdaily.com/ai-coexistence",
  },
  {
    id: 2,
    title: "AI로 진화하는 헬스케어: 미래의 의료 혁신",
    writer: "HealthTech News",
    write_date: new Date("2024-09-15"),
    category: "헬스케어",
    content:
      "AI가 의료 분야에서 혁신을 이끌고 있습니다. 병원의 진단 과정에 AI 분석을 접목하여 정확성을 높이고 있으며, 환자 맞춤형 치료법 추천에 활용되는 AI 솔루션이 주목받고 있습니다.",
    key_word: ["#AI", "#헬스케어", "#의료혁신"],
    url: "https://healthtechnews.com/ai-healthcare",
  },
  {
    id: 3,
    title: "AI와 금융: 새로운 투자 전략을 제시하다",
    writer: "Finance World",
    write_date: new Date("2024-08-30"),
    category: "금융",
    content:
      "금융 시장에서도 AI의 영향력이 커지고 있습니다. AI 기반의 예측 모델과 데이터 분석을 통해 투자 전략을 최적화하고 리스크를 관리하는 다양한 AI 도구들이 등장하고 있습니다.",
    key_word: ["#AI", "#금융", "#투자"],
    url: "https://financeworld.com/ai-investment",
  },
  {
    id: 4,
    title: "AI 챗봇, 고객 서비스의 새로운 표준이 되다",
    writer: "Customer Service Weekly",
    write_date: new Date("2024-07-10"),
    category: "고객 서비스",
    content:
      "AI 챗봇이 고객 서비스의 새로운 표준으로 자리잡고 있습니다. 다양한 산업에서 AI 챗봇을 활용하여 고객 문의에 실시간으로 대응하고 있으며, 이는 고객 만족도 향상에 기여하고 있습니다.",
    key_word: ["#AI", "#챗봇", "#고객서비스"],
    url: "https://customerserviceweekly.com/ai-chatbot",
  },
];
