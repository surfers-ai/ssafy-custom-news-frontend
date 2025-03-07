import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const username = ref("");
    const token = reactive({
      access: "",
      refresh: "",
    });

    const isLoggedIn = computed(() => (token.access ? true : false));

    function setToken(accessToken: string, refreshToken: string) {
      token.access = accessToken;
      token.refresh = refreshToken;
    }

    function removeToken() {
      token.access = "";
      token.refresh = "";
    }

    return {
      setToken,
      removeToken,
      username,
      token,
      isLoggedIn,
    };
  },
  {
    persist: {
      pick: ["token", "username"],
    },
  }
);
