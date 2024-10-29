<script setup lang="ts">
import { ref } from "vue";
import ContentBox from "@/common/ContentBox.vue";
import TheInput from "@/common/TheInput.vue";
import StateButton from "@/common/StateButton.vue";
import { postBoard } from "@/api/api";

const title = ref("");
const category = ref("기술");
const content = ref("");
const tags = ref<string[]>([]);

const categories = ["토론", "자유", "질문", "정보"];

const newTag = ref("");
function addTag() {
  if (newTag.value && !tags.value.includes(newTag.value)) {
    tags.value.push(newTag.value);
    newTag.value = "";
  }
}

function removeTag(tag: string) {
  tags.value = tags.value.filter((t) => t !== tag);
}
async function handlePostBoard() {
  const postData = {
    title: title.value,
    category: category.value,
    content: content.value,
    keywords: tags.value,
  };
  try {
    const response = await postBoard(postData);
    console.log("Post successful:", response);
  } catch (error) {
    console.error("Error posting data:", error);
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
        class="submit-btn"
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

<style lang="scss">
.post-form {
  max-width: 900px;
  margin: 0 auto;

  .title-input {
    border-color: #ccc;
  }

  &__field {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 1rem;
    }
  }

  &__select {
    width: 100%;
    padding: 8px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 1rem;
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
    font-size: 0.9rem;
  }

  &__tag-remove {
    margin-left: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding-bottom: 3px;
  }

  &__textarea {
    width: 100%;
    height: 250px;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .submit-btn-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2px;
  }
  .submit-btn {
    padding: 10px 20px;
    font-size: 1rem;
  }
}
</style>
