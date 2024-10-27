<script setup lang="ts">
import { computed, useAttrs } from "vue";

interface IButtonProps {
  class?: string;
  type?: "state" | "tag" | "button";
  size?: "sm" | "md";
  isActive?: boolean;
}

const props = withDefaults(defineProps<IButtonProps>(), {
  type: "button",
  size: "md",
  isActive: false,
});

const buttonSizeClass = computed(() => props.size);
const buttonTypeClass = computed(() => props.type);

const attrs = useAttrs();
</script>

<template>
  <button
    :class="[
      'toggle-button',
      props.class,
      buttonSizeClass,
      buttonTypeClass,
      { active: props.isActive },
    ]"
    v-bind="attrs"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.toggle-button {
  white-space: nowrap;
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  color: var(--c-text);
  text-align: center;

  &.tag {
    background-color: #f5f5f5;
    cursor: default;
    border: none;
    font-weight: 600;
  }

  &.active {
    background-color: #000;
    color: #fff;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  &:hover {
    background-color: rgba(236, 236, 236, 0.5);
  }

  &.sm {
    padding: 4px 10px;
    font-size: 12px;
  }

  &.md {
    padding: 8px 12px;
    font-size: 16px;
  }

  &:disabled {
    pointer-events: none;
  }
}
</style>
