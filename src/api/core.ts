import { useUserStore } from "@/store/user";
import axios from "axios";
import { storeToRefs } from "pinia";

const http = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });
http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore(); 
    const { token } = storeToRefs(userStore); 

    if (token.value.access) {
      config.headers["Authorization"] = `Bearer ${token.value.access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default http;
