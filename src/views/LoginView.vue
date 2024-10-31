<script setup lang="ts">
import { loginApi } from "@/api/auth";
import StateButton from "@/common/StateButton.vue";
import TheInput from "@/common/TheInput.vue";
import TheFooter from "@/components/TheFooter.vue";
import { useValidation } from "@/composables/useValidation";
import router from "@/router";
import { useUserStore } from "@/store/user";
import type { ILoginReq } from "@/types/auth";
import { ref } from "vue";

const email = ref("");
const password = ref("");

const userStore = useUserStore();
const { validatePwd } = useValidation();

const pwdError = ref("");

const handlePwdInput = () => {
  pwdError.value = validatePwd(password.value);
};

const submitForm = async () => {
  const req: ILoginReq = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await loginApi(req);
    if (response.status === 200) {
      userStore.setToken(response.data.access, response.data.refresh);
      userStore.username = response.data.user.username;
      router.push("/news");
    }
  } catch {
    alert("로그인에 실패하였습니다.");
  }
};
</script>

<template>
  <div class="signup-page">
    <div class="signup-header">
      <h1>SSAFYNEWS</h1>
      <p>맞춤형 AI 뉴스 큐레이션</p>
    </div>

    <div class="box">
      <h2 class="box__title">로그인</h2>
      <p class="box__subtitle">SSAFY 뉴스 서비스에 오신 것을 환영합니다</p>

      <form @submit.prevent="submitForm">
        <div>
          <label>이메일</label>
          <TheInput placeholder="이메일" v-model="email" />
        </div>

        <div>
          <label>비밀번호</label>
          <TheInput
            placeholder="숫자, 한영 포함 8자 이상 입력해주세요."
            v-model="password"
            type="password"
            :error="pwdError"
            @input="handlePwdInput"
            @keyup.enter="submitForm"
          />
        </div>

        <StateButton class="submit-button" type="button" isActive
          >로그인하기</StateButton
        >
      </form>

      <div class="login-link">
        <span>아직 계정이 없으신가요?</span>
        <RouterLink to="/register">가입하기</RouterLink>
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
  padding-top: 80px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7fafc;
  font-family: Arial, sans-serif;

  .signup-header {
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

  .box {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    min-width: 400px;
    text-align: center;

    &__title {
      font-size: 1.5rem;
      color: #111;
      margin-bottom: 10px;
    }

    &__subtitle {
      color: #666;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      text-align: left;
      margin-top: 40px;

      label {
        display: block;
        margin-bottom: 5px;
        padding-left: 3px;
      }

      .submit-button {
        margin-top: 30px;
      }
    }

    .login-link {
      margin-top: 15px;
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
}
</style>
