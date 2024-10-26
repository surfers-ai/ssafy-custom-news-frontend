<script setup lang="ts">
import { computed } from "vue";

interface IButtonProps {
  type?: "state" | "tag" | "button";
  size?: "sm" | "md";
  isActive?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IButtonProps>(), {
  type: "button",
  size: "md",
  isActive: false,
  disabled: false,
});

const emit = defineEmits(["click"]);

const buttonType = computed(() => props.type);
const buttonSizeClass = computed(() => props.size);
const buttonTypeClass = computed(() => props.type);

const handleClick = () => {
  if (buttonType.value === "state") {
    emit("click");
  }
};
</script>

<template>
  <button
    :class="[
      'toggle-button',
      buttonSizeClass,
      buttonTypeClass,
      { active: props.isActive && buttonType === 'state' },
    ]"
    @click="handleClick"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.toggle-button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  color: var(--c-text);
  transition:
    background-color 0.1s ease,
    color 0.1s ease;

  &.tag {
    background-color: #f5f5f5;
    cursor: default;
    border: none;
    font-weight: 600;
  }

  &.active {
    background-color: #000;
    color: #fff;
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
