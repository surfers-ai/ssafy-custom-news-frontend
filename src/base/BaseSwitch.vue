<script setup lang="ts">
import { computed } from "vue";
import useUuid from "@@/composables/uuid";
defineOptions({
  inheritAttrs: false,
});
type MODEL_VALUE_TYPE = boolean | string[];
interface IProps {
  modelValue: MODEL_VALUE_TYPE; // boolean 일 경우에는 체크여부, 배열일 경우에는 체크된 항목 배열
  value?: any;
  inputClass?: string;
  size?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  size: 14,
});

const sizePx = computed(() => {
  return `${props.size}px`;
});

const emit = defineEmits<{
  "update:modelValue": [value: MODEL_VALUE_TYPE];
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
</script>

<template>
  <span
    class="switch"
    :class="$attrs.class"
  >
    <input
      class="switch__checkbox"
      type="checkbox"
      v-bind="{ ...$attrs, class: props.inputClass }"
      v-model="modelValueSync"
      :value="value"
      :id="uuid"
    />
    <label
      class="switch__label"
      :for="uuid"
    >
      {{ modelValueSync ? "on" : "off" }}
    </label>
  </span>
</template>

<style lang="scss" scoped>
$size: v-bind(sizePx);
.switch {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  &__checkbox {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    &:checked {
      & + .switch__label {
        background-color: var(--c-blue);
        &::before {
          transform: translateX(calc($size - 4px));
          box-shadow: -1px 0 3px 1px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  &__label {
    position: relative;
    display: block;
    width: calc($size * 2 - 2px);
    height: calc($size + 2px);
    border-radius: calc(($size + 2px) * 0.5);
    background-color: #cccccc;
    font: 0/0 a;
    &::before {
      content: "";
      position: absolute;
      left: 1px;
      top: 1px;
      display: block;
      width: $size;
      height: $size;
      border-radius: 50%;
      background-color: #ffffff;
      box-shadow: 1px 0 3px 1px rgba(0, 0, 0, 0.1);
      transform: translateX(0);
      transition: transform 0.1s linear 0s;
    }
  }
}
</style>
