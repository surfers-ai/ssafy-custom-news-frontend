<script setup lang="ts">
import { withDefaults, useAttrs, defineModel } from "vue";

interface InputBoxProps {
  wrapperClass?: string;
  value?: string;
}

const props = withDefaults(defineProps<InputBoxProps>(), {
  wrapperClass: "",
  value: "",
});

const modelValue = defineModel<string | undefined>("modelValue", {
  default: undefined,
});

const attrs = useAttrs();
</script>

<template>
  <div :class="['input-box', props.wrapperClass]">
    <input type="text" v-model="modelValue" v-bind="attrs" />
  </div>
</template>

<style scoped lang="scss">
.input-box {
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e5ea;
  border-radius: 8px;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    background-color: transparent;
    color: #333;
    padding: 8px;

    &::placeholder {
      color: #aaa;
    }

    &:disabled::placeholder {
      color: var(--c-text);
    }
  }
}
</style>
