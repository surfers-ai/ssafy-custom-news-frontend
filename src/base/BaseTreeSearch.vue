<script setup lang="ts">
import type { ObjectMap } from "@@/@types/common";

interface IProps {
  nodeList: ObjectMap[];
  /**
   * 자식 노드 데이터 키
   */
  childKey: string;
  /**
   * 노드 레이블 키
   */
  labelKey: string;
  /**
   * 노드 데이터 포맷과 상이한 leaf 노드 데이터
   */
  leaf?: { key: string; labelKey: string };
  placeholder?: string;
}

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<{
  select: [node: ObjectMap];
}>();

// 트리 검색
const searchKeyword = ref("");
const filteredNodeList = ref([]);
const filteredLeafNodeList = ref([]);
const filteredList = computed(() => {
  return [...filteredNodeList.value, ...filteredLeafNodeList.value];
});
function searchNodesByKeyword(node, keyword) {
  if (node[props.labelKey].includes(keyword)) {
    filteredNodeList.value.push(node);
  }
  if (props.leaf && node[props.leaf.key]) {
    filteredLeafNodeList.value.push(
      ...node.members.filter((member) => member.personName.includes(keyword)),
    );
  }
  if (node[props.childKey]) {
    node[props.childKey].forEach((child) => searchNodesByKeyword(child, keyword));
  }
}
function searchTree() {
  initFilteredList();
  if (searchKeyword.value.length < 2) return;
  props.nodeList.forEach((node) => searchNodesByKeyword(node, searchKeyword.value));
  if (filteredList.value.length > 0) {
    isOpen.value = true;
  }
  console.log("searchTree");
  console.log(filteredNodeList.value);
  console.log(filteredLeafNodeList.value);
}
function initFilteredList() {
  filteredNodeList.value = [];
  filteredLeafNodeList.value = [];
}
function onClickSuggestItem(item: ObjectMap) {
  console.log(item);
  emit("select", item);
  isOpen.value = false;
}

const isFocusedInput = ref(false);
const isOpen = ref(false);
async function init() {}

await init();
</script>

<template>
  <div class="tree-search">
    <BaseInput
      class="search-input"
      v-model="searchKeyword"
      :placeholder="placeholder"
      autocomplete="off"
      is-search
      @onKeyUpEnter="searchTree"
      @update:modelValue="searchTree"
      @focusin="isFocusedInput = true"
      @focusout="isFocusedInput = false"
    />
    <div
      v-show="isOpen"
      class="search-suggest"
    >
      <div
        v-for="item in filteredList"
        :key="`${item[labelKey]}${item?.[leaf.labelKey]}`"
        :item="item"
        class="suggest-item"
        @click="onClickSuggestItem(item)"
      >
        <button class="suggest-item__info">
          <slot
            name="suggest"
            :item="item"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tree-search {
  position: relative;
  width: 100%;
  .search-suggest {
    position: absolute;
    left: 0;
    top: calc(100% + 5px);
    box-sizing: border-box;
    width: inherit;
    max-height: 300px;
    background-color: #ffffff;
    border: 1px solid #e1e1e1;
    overflow: auto;
    z-index: 1;
  }
  .suggest-item {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--c-border);
    &:hover {
      background-color: #f2f6ff;
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1 0 auto;
      :first-child {
        font-size: 14px;
      }
      :not(:first-child) {
        font-size: 12px;
      }
    }
  }
}
</style>
