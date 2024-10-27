import { defineStore } from "pinia";
import type { INews } from "@/types/data";
import { getNewsList } from "@/api/api";
import { tabs } from "@/assets/data/tabs";

export const useNewsStore = defineStore("news", {
  state: () => ({
    newsList: [] as INews[],
    currentTab: 1,
  }),

  actions: {
    async fetchNews(tabId: number) {
      try {
        const category = tabs.find((tab) => tab.id === tabId)?.value || "";
        const response = await getNewsList(category);
        this.newsList = response.data.data;
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },

    setActiveTab(tabId: number) {
      this.currentTab = tabId;
      this.fetchNews(tabId);
    },
  },
});
