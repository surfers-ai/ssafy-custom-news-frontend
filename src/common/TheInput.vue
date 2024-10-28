<script setup lang="ts">
import { withDefaults, useAttrs, defineModel, computed } from "vue";

interface InputBoxProps {
  wrapperClass?: string;
  value?: string;
  error?: string;
}

const props = withDefaults(defineProps<InputBoxProps>(), {
  wrapperClass: "",
  value: "",
});

const modelValue = defineModel<string | undefined>("modelValue", {
  default: undefined,
});

const attrs = useAttrs();

const errorClass = computed(() => {
  return props.error ? "error" : "";
});
</script>

<template>
  <div :class="['input-box', props.wrapperClass, errorClass]">
    <input type="text" v-model="modelValue" v-bind="attrs" />
  </div>
  <p class="error-msg">{{ props.error }}</p>
</template>

<style scoped lang="scss">
.input-box {
  width: 100%;
  padding: 5px 8px;
  border: 1px solid #e5e5ea;
  border-radius: 8px;
  display: flex;
  align-items: center;

  &.error {
    border-color: var(--c-error);
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: #333;
    padding: 6px;

    &::placeholder {
      color: #aaa;
    }

    &:disabled::placeholder {
      color: var(--c-text);
    }
  }
}

.error-msg {
  position: absolute;
  color: var(--c-error);
  margin: 5px 0 0 5px;
  font-size: 12px;
}
</style>
