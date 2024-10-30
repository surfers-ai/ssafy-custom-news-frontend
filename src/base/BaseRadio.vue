<script setup lang="ts">
import { computed } from "vue";
import useUuid from "@@/composables/uuid";

export type VALUE_TYPE = any;
interface IProps {
  modelValue: VALUE_TYPE; // 선택된 value 값
  value: VALUE_TYPE; // 선택할 데이터 값
  label: string;
  isRtl?: boolean; // label 왼쪽 위치 여부
}

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<{
  "update:modelValue": [value: VALUE_TYPE];
}>();

const uuid = useUuid().getId();

const modelValueSync = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const rtlStyle = computed(() => {
  return {
    padding: props.isRtl ? "0px 8px 0px 8px" : "0px 8px 0px 8px",
    order: props.isRtl ? -1 : 0,
  };
});
</script>

<template>
  <span class="radio">
    <input
      v-bind="$attrs"
      v-model="modelValueSync"
      :value="value"
      :id="uuid"
      type="radio"
      class="radio-input"
    />
    <label
      v-if="label"
      :for="uuid"
      class="radio-label"
    >
      <slot :option="value">{{ label }}</slot>
    </label>
  </span>
</template>

<style lang="scss" scoped>
.radio {
  display: inline-flex;
  align-items: center;
  &-input {
    appearance: none;
    cursor: pointer;
    line-height: 0;
    &::before {
      content: "";
      display: inline-flex;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      border: 1px solid var(--c-inputBorder);
      background-color: #ffffff;
      border-radius: 50%;
    }
    &:checked {
      &::before {
        border: 1px solid var(--c-checked);
        box-shadow:
          inset 0 0 0 1px var(--c-checked),
          inset 0 0 0 3px rgba(255, 255, 255, 1);
        background-color: var(--c-checked);
      }
    }
    &:disabled {
      cursor: not-allowed;
      &::before {
        background-color: #fafafa;
      }
      & + .radio-label {
        cursor: not-allowed;
      }
    }
    &:disabled:checked {
      &::before {
        border: 2px solid var(--c-disabled);
        background-color: var(--c-disabled);
      }
    }
  }
  &-label {
    padding: v-bind("rtlStyle.padding");
    order: v-bind("rtlStyle.order");
    display: inline-flex;
    vertical-align: top;
    cursor: pointer;
  }
}
</style>
