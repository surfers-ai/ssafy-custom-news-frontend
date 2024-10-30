<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  scrollTableWidth: {
    type: String,
    default: '500px',
  },
  scrollHeight: {
    type: String,
  },
});
</script>
<template>
  <div
    class="table-wrapper"
    :class="{ 'scroll-height': scrollHeight }"
  >
    <divs
      class="fixed"
      :class="{ fullWidth: !$slots.scroll }"
    >
      <slot name="fixed" />
    </divs>
    <div
      class="scroll"
      :class="{ width: $slots.scroll }"
    >
      <slot name="scroll" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.table-wrapper {
  width: v-bind('width');
  height: v-bind('scrollHeight');
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  position: relative;
}

.fixed {
  &.fullWidth {
    width: 100%;
  }
}
.scroll {
  overflow-x: auto;
  &.width {
    width: v-bind('scrollTableWidth');
  }
  &:deep() {
    .table--scroll-horizontal {
      border-left: 1px solid var(--c-cell);
      &::-webkit-scrollbar {
        height: 20px;
        background-color: #fbfbfb;
      }
      &::-webkit-scrollbar-thumb {
        background-color: var(--c-cell);
        border: 5px solid #fbfbfb;
        border-radius: 10px;
      }
    }
  }
}

:deep() {
  table {
    margin-bottom: 0px;
  }
}
</style>
