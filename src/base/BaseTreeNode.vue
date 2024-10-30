<script setup lang="ts">
import type { ObjectMap } from "@@/@types/common";

interface IProps {
  node: ObjectMap;
  selectedNodeList: ObjectMap[];
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
  isLeaf?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<{
  expand: [];
  select: [value: ObjectMap];
}>();

const isExpanded = ref(false);
function onClickExpand() {
  isExpanded.value = !isExpanded.value;
}

const isSelected = computed(() => {
  return props.selectedNodeList.includes(props.node);
});
function onSelectNode() {
  emit("select", props.node);
}
function onExpandNode() {
  isExpanded.value = true;
  emit("expand");
}
// 선택 시 부모 노드 확장
watch(
  () => isSelected.value,
  () => {
    if (isSelected.value) {
      emit("expand");
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="tree-node">
    <div
      :class="['tree-node__item', { active: isSelected }]"
      @click="onSelectNode"
    >
      <!-- 노드 아이콘 -->
      <div class="tree-node__icon">
        <div
          v-if="!isLeaf"
          :class="['tree-node__icon-expand', { expanded: isExpanded }]"
        >
          <BaseButton
            @click.stop="onClickExpand"
            size="tight"
          >
            <BaseIcon :name="isExpanded ? 'remove' : 'add'" />
          </BaseButton>
        </div>
        <div
          v-else
          class="tree-node__icon-leaf"
        >
          <BaseIcon name="remove" />
        </div>
      </div>

      <!-- 노드 레이블 -->
      <div class="tree-node__content">
        <div class="tree-node__content-form">
          <div :class="['tree-node__content-label']">
            <span v-if="!isLeaf">{{ node[labelKey] }}</span>
            <span v-else>{{ node[leaf.labelKey] }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 자식 노드 -->
    <div
      v-show="isExpanded"
      class="tree-node__children"
    >
      <BaseTreeNode
        v-for="(childNode, childIdx) in node[childKey]"
        :key="childIdx"
        :node="childNode"
        :selected-node-list="selectedNodeList"
        :child-key="childKey"
        :label-key="labelKey"
        :leaf="leaf"
        @expand="onExpandNode"
        @select="$emit('select', $event)"
      />
      <!-- <BaseTreeNode
        v-for="(leafNode, leafIdx) in node[leaf.key]"
        :key="leafIdx"
        :node="leafNode"
        :selected-node-list="selectedNodeList"
        :child-key="childKey"
        :label-key="labelKey"
        :leaf="leaf"
        is-leaf
        @expand="onExpandNode"
        @select="$emit('select', $event)"
      /> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.tree-node {
  &__item {
    display: flex;
    align-items: flex-start;
    gap: 3px;
    padding: 5px 10px;
    cursor: pointer;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 200%;
      height: 100%;
      display: none;
      z-index: -1;
    }
    &.active,
    &:hover {
      background: #f2f6ff;
      &::before {
        display: block;
        background-color: inherit;
      }
    }
    &.active {
      color: #3377ff;
    }
  }
  &__children {
    margin-left: 10px;
  }
}
</style>
