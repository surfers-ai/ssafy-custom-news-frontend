<script setup lang="ts">
import type Node from "element-plus/es/components/tree/src/model/node";
import type { DragEvents } from "element-plus/es/components/tree/src/model/useDragNode";
import type { AllowDropType, NodeDropType } from "element-plus/es/components/tree/src/tree.type";
import { ElTree } from "element-plus";

import teamProfile_dummy from "@@/assets/images/teamProfile_dummy.png";

interface IProps {
  treeData: any[];
  uid?: string;
  /** tree 표기 label */
  label?: string;
  /** tree 표기 children */
  children?: string;
  /** 검색 */
  isSearch?: boolean;
  /** 전체열기 */
  expandAll?: boolean;
  /** 특정depth */
  expandedDepth?: number;
  expandedKeys?: string[];
  draggable?: boolean;
}
type IEmit = {
  /**
   * 노드 틀릭
   */
  nodeClick: [traget: any, node: Node, tree: typeof ElTree, e: PointerEvent];
  /**
   * 노드 변경
   */
  currentChange: [traget: any, node: Node];

  onDragStart: [node: Node, e: DragEvent];
  onDragEnter: [draggingNode: Node, dropNode: Node, e: DragEvents];
  onDragLeave: [draggingNode: Node, dropNode: Node, e: DragEvents];
  onDragOver: [draggingNode: Node, dropNode: Node, e: DragEvents];
  onDragEnd: [draggingNode: Node, dropNode: Node, dropType: NodeDropType, e: DragEvents];
  onDrop: [draggingNode: Node, dropNode: Node, dropType: NodeDropType, e: DragEvents];
  allowDrop: [draggingNode: Node, dropNode: Node, type: AllowDropType];
  allowDrag: [draggingNode: Node];

  treeSearch: [team: Node];
};

const props = withDefaults(defineProps<IProps>(), {
  treeData: () => [],
  children: "childOrgUnit",
  label: "orgUnitName",
  uid: "orgUnitId",
  expandedDepth: 2,
  expandedKeys: () => [],
});
const refEltree = ref<InstanceType<typeof ElTree>>();
const disabledDragBtn = ref(false);
const expendKeys = ref([]);

const emit = defineEmits<IEmit>();

const {
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragEnd,
  onDrop,
  allowDrop,
  allowDrag,
} = treeDragEvents();
const { onNodeClick, onCurrentChange } = treeEvents();

const { searchTextSync, onInputTreeSearch, filterArray, onTreeFilter, onClickFilterItem } =
  treeSearch();
function initExpendNode() {
  if (props.expandedKeys.length > 0) {
    return props.expandedKeys;
  }
  const getItem = (acc: any, item: any, limit: number) => {
    limit++;
    if (limit <= props.expandedDepth && Array.isArray(item[props.children])) {
      acc = [...acc, ...item[props.children]];
      return item[props.children].reduce((acc: any, item: any) => {
        return getItem(acc, item, limit);
      }, acc);
    }
    return acc;
  };
  const flatArray = props.treeData.reduce((acc, item) => {
    return getItem(acc, item, 1);
  }, []);
  const flatUidArray = flatArray.map((item: any): string[] => item[props.uid]);
  expendKeys.value = flatUidArray;
}

const computedFlatTreeData = computed(() => {
  const getItem = (acc: any, item: any) => {
    if (Array.isArray(item[props.children])) {
      acc = [...acc, ...item[props.children]];
      return item[props.children].reduce((acc: any, item: any) => {
        return getItem(acc, item);
      }, acc);
    }
    return acc;
  };

  const flatArray = props.treeData.reduce((acc, item) => {
    return getItem(acc, item);
  }, []);
  return flatArray;
});

function treeDragEvents() {
  const onDragStart = (node: Node, e: DragEvent) => {
    console.log("drag start", node, e);
    const dragPreivew = document.createElement("div");
    dragPreivew.id = "dragPreivew";
    dragPreivew.textContent = node.data.orgUnitName;
    dragPreivew.style.backgroundColor = "#ffffff";
    dragPreivew.style.position = "absolute";
    dragPreivew.style.left = "-500px";
    dragPreivew.style.padding = "10px 20px";
    document.body.appendChild(dragPreivew);
    e.dataTransfer?.setDragImage(dragPreivew, 0, 0);
    //node.expanded = false;
    emit("onDragStart", node, e);
  };
  const onDragEnter = (draggingNode: Node, dropNode: Node, e: DragEvents) => {
    //console.log("tree drag enter:", dropNode);
    emit("onDragEnter", draggingNode, dropNode, e);
  };
  const onDragLeave = (draggingNode: Node, dropNode: Node, e: DragEvents) => {
    //console.log("tree drag leave:", dropNode);
    emit("onDragLeave", draggingNode, dropNode, e);
  };
  const onDragOver = (draggingNode: Node, dropNode: Node, e: DragEvents) => {
    //console.log("tree drag over:", dropNode);
    emit("onDragOver", draggingNode, dropNode, e);
  };
  const onDragEnd = (draggingNode: Node, dropNode: Node, dropType: NodeDropType, e: DragEvents) => {
    document.querySelector("#dragPreivew")?.remove();
    //console.log("tree drag end:", dropNode && dropNode.label, dropType);

    emit("onDragEnd", draggingNode, dropNode, dropType, e);
  };
  const onDrop = (draggingNode: Node, dropNode: Node, dropType: NodeDropType, e: DragEvents) => {
    console.log("tree drop:", dropNode.label, dropType);

    emit("onDrop", draggingNode, dropNode, dropType, e);
  };
  const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
    emit("allowDrop", draggingNode, dropNode, type);
    draggingNode.expanded = false;
    if (
      type !== "inner" &&
      draggingNode.data.parentOrgUnitCode === dropNode.data.parentOrgUnitCode &&
      draggingNode.level === dropNode.level
    ) {
      dropNode.expanded = false;
      return true;
    }
    return false;
  };
  const allowDrag = (draggingNode: Node) => {
    emit("allowDrag", draggingNode);
    return isDrag.value;
    // return !draggingNode.data.label.includes("Level three 3-1-1");
  };

  return {
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragEnd,
    onDrop,
    allowDrop,
    allowDrag,
  };
}

function treeEvents() {
  function onNodeClick(traget: any, node: Node, tree: typeof ElTree, e: PointerEvent) {
    //console.log("%c======>onNodeClick ", "font-size:50px", node, tree, tree, e);
    emit("nodeClick", traget, node, tree, e);
  }

  async function onCurrentChange(traget: any, node: Node) {
    //console.log("%c======> onCurrentChange", "font-size:50px", traget, node);

    emit("currentChange", traget, node);
  }

  return {
    onNodeClick,
    onCurrentChange,
  };
}

const isDrag = ref(false);
function dragBtnMouseDown(e: MouseEvent) {
  isDrag.value = true;
}
function dragBtnMouseLeave(e: MouseEvent) {
  isDrag.value = false;
}

function treeSearch() {
  const searchTextSync = ref("");
  const filterArray = ref([]);

  watch(
    () => searchTextSync.value,
    (newVal, oldVal) => {
      if (newVal.length > 0) {
        onTreeFilter();
        disabledDragBtn.value = true;
      } else {
        onTreeFilter();
        disabledDragBtn.value = false;
      }
    },
  );
  function onInputTreeSearch(e) {
    searchTextSync.value = e.target.value;
  }

  function onTreeFilter() {
    if (!searchTextSync.value) {
      filterArray.value = [];
    } else {
      filterArray.value = computedFlatTreeData.value.filter((item) => {
        return item[props.label].toLowerCase().includes(searchTextSync.value);
      });
    }
  }

  async function onClickFilterItem(e: Event, team: any) {
    console.log("%c======> ", "font-size:50px", team);
    searchTextSync.value = "";
    filterArray.value = [];

    //team.parentOrgUnitCode
    const getItem = (acc: any, item: any, parentOrgUnitCode: string) => {
      if (parentOrgUnitCode && item.orgUnitCode === parentOrgUnitCode) {
        acc = [...acc, { ...item }];

        return computedFlatTreeData.value.reduce((flatAcc: any, flatItem: any) => {
          return getItem(flatAcc, flatItem, item.parentOrgUnitCode);
        }, acc);
      }
      return acc;
    };

    const expendKeyArr = computedFlatTreeData.value.reduce((flatAcc, flatItem) => {
      return getItem(flatAcc, flatItem, team.parentOrgUnitCode);
    }, []);

    expendKeys.value = expendKeyArr.map((item: any): string[] => item[props.uid]);

    await refEltree.value!.setCurrentKey(team[props.uid], false);

    emit("treeSearch", team);
  }

  return { searchTextSync, onInputTreeSearch, onTreeFilter, filterArray, onClickFilterItem };
}
function setCurrentKey(currentKey) {
  refEltree.value!.setCurrentKey(currentKey, false);
}
async function created() {
  initExpendNode();
}

onMounted(async () => {
  //setCurrentKey(props.treeData[0].orgUnitId);
});

defineExpose({ setCurrentKey });
await created();
</script>
<template>
  <div class="tree">
    <template v-if="props.isSearch">
      <div class="tree-filter">
        <div class="tree-filter__inner">
          <input
            class="tree-filter__input"
            type="text"
            :placeholder="$t('hr.action.searchDept')"
            @input="onInputTreeSearch"
            @keyup.enter="onTreeFilter"
          />
          <!--v-model.trim="searchTextSync"-->
          <template v-if="filterArray.length > 0">
            <ul class="tree-filter__list">
              <li
                class="tree-filter__item"
                v-for="option in filterArray"
                :key="option[props.uid]"
              >
                <button
                  class="tree-filter__item-btn"
                  @click="
                    (e) => {
                      onClickFilterItem(e, option);
                    }
                  "
                >
                  <img
                    class="tree-filter__item-img"
                    :src="teamProfile_dummy"
                    :alt="option[props.label]"
                  />
                  <span class="tree-filter__item-info">
                    <strong class="tree-filter__item-label">{{ option[props.label] }}</strong>
                    <span class="tree-filter__item-code">{{ option[props.uid] }}</span>
                  </span>
                </button>
              </li>
            </ul>
          </template>
          <button
            class="tree-filter__btn"
            @click="onTreeFilter"
          >
            <SvgSearch />
            <span class="hidden">검색</span>
          </button>
        </div>
      </div>
    </template>
    <div class="tree__inner">
      <el-tree
        ref="refEltree"
        style="max-width: 600px"
        :draggable="props.draggable"
        :expand-on-click-node="false"
        :default-expand-all="props.expandAll"
        :node-key="props.uid"
        :show-checkbox="false"
        :data="props.treeData"
        :indent="20"
        :props="{
          children: props.children,
          label: props.label,
        }"
        :default-expanded-keys="expendKeys"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        @node-drag-start="onDragStart"
        @node-drag-enter="onDragEnter"
        @node-drag-leave="onDragLeave"
        @node-drag-over="onDragOver"
        @node-drag-end="onDragEnd"
        @node-drop="onDrop"
        @node-click="onNodeClick"
        @current-change="onCurrentChange"
      >
        <template #default="{ node, data }">
          <span
            class="tree-item"
            :class="{
              'tree-item--type-hidden': !node.data.displayYn,
            }"
          >
            <span class="tree-item__inner">
              <span class="tree-item__label">
                {{ node.label }}
                <span>({{ data.memberCount }}) </span>
              </span>

              <span class="tree-item__options">
                <span class="tree-item__option">
                  <small
                    v-if="node.data.untilDaysOrgEndDate && node.data.untilDaysOrgEndDate < 4"
                    class="tree-item__option-alert"
                  >
                    <SvgNoti style="width: 16px; height: 16px; color: inherit" />
                  </small>
                  <!-- <small class="tree-item__option-nosync">수동</small> -->
                </span>
                <span
                  class="tree-item__option"
                  v-if="props.draggable"
                >
                  <button
                    class="tree-item__option-drag"
                    :disabled="disabledDragBtn"
                    @mousedown="dragBtnMouseDown"
                    @mouseleave="dragBtnMouseLeave"
                  >
                    <SvgDrag />
                  </button>
                </span>
              </span>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tree {
  //height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: var(--form-radius);
  border: 1px solid var(--c-border);
  &__inner {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: 16px 0 16px 10px;
    overflow: auto;
  }
  &-filter {
    padding: 11px 16px;
    background-color: #f8f8f8;
    &__inner {
      position: relative;
    }
    &__input {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 34px;
      padding: 7px 34px 7px 16px;
      border-radius: var(--form-radius);
      border: 1px solid var(--c-border);
      font-size: 13px;
      &:hover {
        border-color: #51565c;
      }
      &:focus {
        outline: 0 none;
        border-color: #20262d;
      }
    }
    &__btn {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 34px;
    }
    &__list {
      position: absolute;
      left: 0;
      top: calc(100% + 4px);
      display: block;
      box-sizing: border-box;
      width: 100%;
      padding: 8px 0;
      border: 1px solid var(--c-color);
      border-radius: var(--form-radius);
      background-color: #ffffff;
      z-index: 10;
    }
    &__item {
    }
    &__item {
      &-btn {
        display: flex;
        align-items: center;
        column-gap: 12px;
        box-sizing: border-box;
        width: 100%;
        padding: 8px 16px;
        text-align: left;
        &:hover {
          background-color: #f2f6ff;
        }
      }
      &-img {
        flex: 0 0 auto;
        width: 34px;
        height: 34px;
      }
      &-info {
        flex: 1 1 auto;
        width: calc(100% - 34px - 12px);
        display: block;
      }

      &-label {
        display: block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: var(--c-color);
      }
      &-code {
        display: block;
        margin-top: 3px;
        font-size: 12px;
        color: #6a6e73;
      }
    }
  }
  &-item {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    width: calc(100% - 24px);
    height: var(--el-tree-node-content-height);
    &__inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 8px;
      width: 100%;
      height: var(--el-tree-node-content-height);
    }
    &__label {
      flex: 1 1 auto;
      display: block;
      width: 100%;
      height: var(--el-tree-node-content-height);
      line-height: var(--el-tree-node-content-height);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__options {
      flex: 0 1 auto;
      display: flex;
      align-items: center;
      column-gap: 8px;
      height: var(--el-tree-node-content-height);
    }
    &__option {
      line-height: 1;
      &-alert {
        flex: 0 0 auto;
        display: block;
        width: 16px;
        height: 16px;
        color: var(--c-error);
      }
      &-nosync {
        position: relative;
        display: block;
        padding-left: 12px;
        color: #4052a3;
        font-size: 13px;
        &::before {
          content: "";
          position: absolute;
          left: 2px;
          top: 50%;
          display: block;
          width: 6px;
          height: 6px;
          margin-top: -3px;
          border-radius: 50%;
          background-color: #4052a3;
        }
      }
      &-drag {
        width: 16px;
        height: 16px;
        &:disabled {
          cursor: not-allowed;
        }
      }
    }
    &--type {
      &-hidden {
        opacity: 0.4;
      }
    }
  }

  &:deep() {
    $selector: "";
    $defaultSize: 20;
    @for $i from 1 through 10 {
      $selector: $selector + " .el-tree-node__children";
      #{$selector} {
        .el-tree-node__content {
          &::before {
            left: #{$defaultSize * $i + 8}px;
          }
        }
        .el-tree-node__children {
          &::before {
            left: #{$defaultSize * $i + 8}px;
          }
        }
      }
    }

    .el-tree {
      --el-tree-node-content-height: 32px;
      & > .el-tree-node {
        & > .el-tree-node__content {
          & > .el-tree-node__expand-icon {
            &::after {
              display: none;
            }
          }
        }
        & > .el-tree-node__children {
          &::before {
            display: none;
          }
        }
      }
      &__empty {
        &-block {
          box-sizing: border-box;
          padding-left: 10px;
        }
      }
    }

    .el-tree-node__expand-icon {
      flex: 0 0 auto;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      padding: 0;
      & > svg {
        display: none;
      }
      &::before {
        content: "";
        position: relative;
        display: block;
        width: 16px;
        height: 16px;
        z-index: 1;
        background-image: url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="%23FFFFFF" color="%2351565C" xmlns="http://www.w3.org/2000/svg"><path d="M7.99992 4.74988L7.99992 11.2499M4.75002 7.99999L11.25 7.99999M3.00005 1.49985L13.0001 1.49985C13.8285 1.49985 14.5001 2.17142 14.5001 2.99985L14.5001 12.9998C14.5001 13.8283 13.8285 14.4998 13.0001 14.4998L3.00005 14.4998C2.17163 14.4998 1.50005 13.8283 1.50005 12.9998L1.50005 2.99985C1.50005 2.17142 2.17163 1.49985 3.00005 1.49985Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        background-position: 50% 50%;
        background-repeat: no-repeat;
      }
      &::after {
        content: "";
        position: absolute;
        left: 8px;
        top: calc(0px - 12px);
        bottom: calc(0px - 12px);
        display: block;
        width: 1px;
        background-color: #cdcfd0;
      }

      &.expanded {
        transform: rotate(0);
        &::before {
          background-image: url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="%23FFFFFF" color="%2351565C" xmlns="http://www.w3.org/2000/svg" ><path d="M13 1.5H3C2.17157 1.5 1.5 2.17157 1.5 3V13C1.5 13.8284 2.17157 14.5 3 14.5H13C13.8284 14.5 14.5 13.8284 14.5 13V3C14.5 2.17157 13.8284 1.5 13 1.5Z" stroke="currentColor" stroke-linecap="square" stroke-linejoin="round"/><path d="M4.75 8H11.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        }
      }
      &.is-leaf {
        position: relative;
        visibility: visible;
        &::before {
          background-image: none;
          position: absolute;
          left: 8px;
          top: 7px;
          width: 50%;
          height: 1px;
          background-color: #cdcfd0;
        }
        /**
        &::after {
          content: "";
          position: absolute;
          left: 8px;
          top: calc(0px - 24px);
          bottom: calc(0px - 24px);
          display: block;
          width: 1px;

          background-color: #cdcfd0;
        }
           */
      }
    }
    .el-tree-node {
      position: relative;
      color: var(--c-color);
      font-size: 13px;
      &:focus {
        & > .el-tree-node__content {
          background-color: transparent;
        }
        &:hover {
          & > .el-tree-node__content {
            background-color: #f2f6ff;
          }
        }
      }
      &:first-child {
        & > .el-tree-node__content {
          .el-tree-node__expand-icon {
            &::after {
              top: 8px;
            }
          }
        }
      }
      &:last-child {
        & > .el-tree-node__content {
          .el-tree-node__expand-icon {
            &::after {
              bottom: 8px;
            }
          }
        }
        & > .el-tree-node__children {
          &::before {
            display: none;
          }
        }
      }
      &:only-child {
        & > .el-tree-node__children {
          &::before {
            display: none;
          }
        }
      }

      &.is-current {
        & > .el-tree-node__content {
          color: #0055ff;
          font-weight: 700;
        }
      }
    }

    .el-tree-node__content {
      padding: 0px 16px 0px 0px;
      position: relative;
      &:hover {
        background-color: #f2f6ff;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0px;
        bottom: 0px;
        display: none;
        width: 1px;
        background-color: #cdcfd0;
      }
    }
    .el-tree-node__children {
      position: relative;
      overflow: visible;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: -8px;
        bottom: -8px;
        display: block;
        width: 1px;
        background-color: #cdcfd0;
        z-index: 1;
      }
      &:empty {
        &::before {
          display: none;
        }
      }
    }

    .el-tree__drop-indicator {
      height: 3px;
    }
  }
}
</style>
