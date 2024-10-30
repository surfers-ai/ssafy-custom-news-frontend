<script setup lang="ts">
import type { ObjectMap } from "@@/@types/common";

interface IProps {
  nodeList: ObjectMap[];
  multipleSelect: boolean;
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
  /**
   * leaf 데이터 여부 (해당 컴포넌트 재귀 시에만 사용)
   */
  /**
   * 트리 노드 검색 사용 여부
   */
  searchable?: boolean;
  /**
   * 검색 input 의 placeholder (검색 가능할 시)
   */
  placeholder?: string;
}
const props = withDefaults(defineProps<IProps>(), {});
const selectedNodeList = defineModel<ObjectMap[]>();

function isSelectedNode(node: ObjectMap) {
  return selectedNodeList.value.includes(node);
}
function selectNode(node: ObjectMap) {
  if (!isSelectedNode(node)) {
    addSelectedNode(node);
  } else {
    removeSelectedNode(node);
  }
}
function addSelectedNode(node: ObjectMap) {
  if (props.multipleSelect) {
    selectedNodeList.value.push(node);
  } else {
    selectedNodeList.value[0] = node;
  }
}
function removeSelectedNode(node: ObjectMap) {
  const idx = selectedNodeList.value.indexOf(node);
  selectedNodeList.value.splice(idx, 1);
}
</script>

<template>
  <div class="tree-area">
    <div
      v-if="searchable"
      class="tree-area__search"
    >
      <BaseTreeSearch
        :node-list="nodeList"
        :child-key="childKey"
        :label-key="labelKey"
        :leaf="leaf"
        :placeholder="placeholder"
        @select="selectNode"
      >
        <template #suggest="{ item }">
          <slot
            name="suggest"
            :item="item"
          />
        </template>
      </BaseTreeSearch>
    </div>

    <BaseTreeNode
      v-for="(node, idx) in nodeList"
      :key="idx"
      :node="node"
      :selected-node-list="selectedNodeList"
      :child-key="childKey"
      :label-key="labelKey"
      :leaf="leaf"
      @select="selectNode"
    />
  </div>
</template>

<style scoped lang="scss">
.tree-area {
  border: 1px solid var(--c-border);
  position: relative;
  &__search {
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: white;
    padding: 20px 10px;
  }
}
</style>
