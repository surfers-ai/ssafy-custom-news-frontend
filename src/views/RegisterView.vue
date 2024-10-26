<script setup lang="ts">
import { registerApi } from "@/api/auth";
import StateButton from "@/common/StateButton.vue";
import TheInput from "@/common/TheInput.vue";
import TheFooter from "@/components/TheFooter.vue";
import router from "@/router";
import { useUserStore } from "@/store/user";
import type { IRegisterReq } from "@/types/auth";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");

const userStore = useUserStore();
const submitForm = async () => {
  const req: IRegisterReq = {
    username: name.value,
    email: email.value,
    password1: password.value,
    password2: password.value,
  };

  try {
    const response = await registerApi(req);
    userStore.setToken(response.data.access, response.data.refresh);
    alert("회원가입이 완료되었습니다!");
    router.push("/");
  } catch (error) {
    console.error("Registration failed:", error);
    alert(`회원가입에 실패했습니다. 다시 시도해주세요. ${error}"`);
  }
};
</script>

<template>
  <div class="signup-page">
    <div class="header">
      <h1>SSAFYNEWS</h1>
      <p>맞춤형 AI 뉴스 큐레이션</p>
    </div>

    <div class="signup-form">
      <h2>회원가입</h2>
      <p>SSAFY 뉴스 서비스에 오신 것을 환영합니다</p>

      <form @submit.prevent="submitForm">
        <div>
          <label>이름</label>
          <TheInput placeholder="이름" v-model="name" />
        </div>

        <div>
          <label>이메일</label>
          <TheInput placeholder="이메일" v-model="email" />
        </div>

        <div>
          <label>비밀번호</label>
          <TheInput
            placeholder="8자 이상 입력해주세요"
            v-model="password"
            type="password"
          />
        </div>

        <StateButton type="button" isActive>가입하기</StateButton>
      </form>

      <div class="login-link">
        <span>이미 계정이 있으신가요?</span>
        <RouterLink to="login">로그인하기 </RouterLink>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.signup-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7fafc;
  font-family: Arial, sans-serif;
  padding-top: 50px;

  .header {
    text-align: center;
    margin-bottom: 20px;

    h1 {
      font-size: 2rem;
      font-weight: bold;
      color: #111;
    }

    p {
      color: #666;
      margin-top: 5px;
    }
  }

  .signup-form {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;

    h2 {
      font-size: 1.5rem;
      color: #111;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      margin-bottom: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      text-align: left;

      label {
        display: block;
        margin-bottom: 5px;
        padding-left: 3px;
      }
    }

    .submit-button {
      background-color: #111;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 10px 0;
      font-size: 1rem;
      cursor: pointer;
    }

    .login-link {
      margin-top: 50px;
      font-size: 0.9rem;
      color: #666;

      a {
        color: #111;
        font-weight: bold;
        text-decoration: none;
        margin-left: 5px;
      }
    }
  }

  .footer {
    margin-top: 80px;
    text-align: center;
    font-size: 0.8rem;
    color: #666;

    a {
      color: #666;
      text-decoration: none;
      margin: 0 10px;
    }

    p {
      margin-top: 5px;
      color: #aaa;
    }
  }
}
</style>
