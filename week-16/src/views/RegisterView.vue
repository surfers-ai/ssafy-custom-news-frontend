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
import { useValidation } from "@/composables/useValidation";

const name = ref("");
const email = ref("");
const password = ref("");
const selectedJob = ref("");

const { validatePwd } = useValidation();

const userStore = useUserStore();
const pwdError = ref("");

const handlePwdInput = () => {
  pwdError.value = validatePwd(password.value);
};
const submitForm = async () => {
  if (!selectedJob.value) {
    alert("희망 직무를 선택해주세요.");
    return;
  }
  const req: IRegisterReq = {
    username: name.value,
    email: email.value,
    password1: password.value,
    password2: password.value,
  };

  try {
    const response = await registerApi(req);
    if (response.status === 201) {
      userStore.setToken(response.data.access, response.data.refresh);
      userStore.username = response.data.user.username;
      alert("회원가입이 완료되었습니다!");
      router.push("/login");
    }
  } catch (error: any) {
    if (error.response.data) {
      const errors = error.response.data;

      const msg = Object.entries(errors)
        .map(([field, messages]) => {
          const messageText = (messages as string[]).join(", ");
          return `${field}: ${messageText}`;
        })
        .join("\n");

      alert(`회원가입에 실패했습니다.\n${msg}`);
    } else {
      alert("회원가입 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }
};
</script>

<template>
  <div class="signup">
    <div class="signup__header">
      <h1>SSAFYNEWS</h1>
      <p>맞춤형 AI 뉴스 큐레이션</p>
    </div>

    <div class="signup__box">
      <h2>회원가입</h2>
      <p>SSAFY 뉴스 서비스에 오신 것을 환영합니다</p>

      <form @submit.prevent="submitForm">
        <div>
          <label>이름</label>
          <TheInput placeholder="이름" v-model="name" />
        </div>

        <div>
          <label>희망 직무</label>
          <select v-model="selectedJob" class="job-select" required>
            <option value="" disabled selected></option>
            <option value="DS">데이터 사이언티스트</option>
          </select>
        </div>

        <div>
          <label>이메일</label>
          <TheInput placeholder="이메일" v-model="email" />
        </div>

        <div>
          <label>비밀번호</label>
          <TheInput
            placeholder="8자 이상, 숫자/한영을 포함해야 합니다."
            v-model="password"
            type="password"
            :error="pwdError"
            @input="handlePwdInput"
          />
        </div>

        <StateButton type="button" isActive class="form-btn"
          >가입하기</StateButton
        >
      </form>

      <div class="login-link">
        <span>이미 계정이 있으신가요?</span>
        <RouterLink to="login">로그인하기</RouterLink>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.signup {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7fafc;
  font-family: Arial, sans-serif;
  padding-top: 10px;

  &__header {
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

  &__box {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    min-width: 400px;
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
      margin-top: 35px;
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

    .job-select {
      width: 100%;
      padding: 9px 10px;
      border: 1px solid #e5e5ea;
      border-radius: 8px;
    }
    .form-btn {
      margin: 20px 0 10px;
    }

    .login-link {
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
