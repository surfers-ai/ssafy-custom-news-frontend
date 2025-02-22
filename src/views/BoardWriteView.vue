<script setup lang="ts">
import { ref } from "vue";
import ContentBox from "@/common/ContentBox.vue";
import TheInput from "@/common/TheInput.vue";
import StateButton from "@/common/StateButton.vue";
import { postBoard } from "@/api/api";
import router from "@/router";

const title = ref("");
const category = ref("자유게시판");
const content = ref("");
const tags = ref<string[]>([]);
const isDisabled = ref(false);
const categories = ["자유게시판", "취업정보", "자소서공유"];

const newTag = ref("");
function addTag() {
  if (newTag.value && !tags.value.includes(newTag.value.trim())) {
    tags.value.push(newTag.value.trim());
    newTag.value = "";
  }
}

function removeTag(tag: string) {
  tags.value = tags.value.filter((t) => t !== tag);
}

async function handlePostBoard() {
  isDisabled.value = true;
  try {
    const response = await postBoard({
      title: title.value,
      category: category.value,
      content: content.value,
      keywords: tags.value,
    });
    if (response.status === 200) {
      alert("게시글이 등록되었습니다!");
      router.push("/board");
    }
  } catch (error) {
    console.error("Error posting data:", error);
    alert("다시 시도해주세요.");
  } finally {
    isDisabled.value = false;
  }
}
</script>

<template>
  <div class="post-form">
    <div class="submit-btn-container">
      <StateButton
        size="md"
        @click="handlePostBoard"
        isActive
        :disabled="isDisabled"
      >
        작성 완료
      </StateButton>
    </div>

    <ContentBox>
      <div class="post-form__field">
        <label for="title">제목</label>
        <TheInput
          v-model="title"
          placeholder="제목을 입력하세요"
          wrapperClass="title-input"
        />
      </div>

      <div class="post-form__field">
        <label for="category">카테고리</label>
        <select v-model="category" class="post-form__select">
          <option v-for="(cat, index) in categories" :key="index" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <div class="post-form__field">
        <label for="content">내용</label>
        <textarea
          v-model="content"
          placeholder="내용을 입력하세요"
          class="post-form__textarea"
        ></textarea>
      </div>

      <div class="post-form__field">
        <label>해시태그</label>
        <div class="post-form__tags">
          <TheInput
            v-model="newTag"
            placeholder="해시태그를 입력하세요"
            @keyup.enter="addTag"
          />
          <StateButton @click="addTag" isActive>추가</StateButton>
        </div>
        <div class="post-form__tag-list">
          <span
            v-for="(tag, index) in tags"
            :key="index"
            class="post-form__tag"
          >
            #{{ tag }}
            <button @click="removeTag(tag)" class="post-form__tag-remove">
              x
            </button>
          </span>
        </div>
      </div>
    </ContentBox>
  </div>
</template>

<style scoped lang="scss">
.post-form {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  :deep(.title-input) {
    border-color: #ccc !important;
  }

  &__field {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 14px;
    }
  }

  &__select,
  &__textarea {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
    &::placeholder {
      color: #aaa;
    }
  }

  &__textarea {
    height: 250px;
  }

  &__tags {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 300px;
  }

  &__tag-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  &__tag {
    background-color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  &__tag-remove {
    margin-left: 5px;
    cursor: pointer;
    background: none;
    border: none;
  }

  .submit-btn-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2px;
  }
}
</style>
