<script setup lang="ts">
import { computed } from "vue";
import useUuid from "@@/composables/uuid";
import { useGlobalI18n } from "@@/locales";

// boolean 일 경우에는 체크여부, 배열일 경우에는 체크된 항목 배열
type MODEL_VALUE_TYPE = boolean | string[] | number[] | string | number;
interface IProps {
  value?: any; // model 가 배열일 경우에 사용
  label?: string;
  isRtl?: boolean; // label 왼쪽 위치 여부
  /**
   * 다국어 사용 여부 (option 의 label 값이 다국어 key 값일 경우)
   */
  isLocale?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {});
const model = defineModel<MODEL_VALUE_TYPE>();
const emit = defineEmits<{}>();

const uuid = useUuid().getId();

// 다국어 처리
const { $t } = useGlobalI18n();

const rtlStyle = computed(() => {
  return {
    padding: props.isRtl ? "0px 8px 0px 8px" : "0px 8px 0px 8px",
    order: props.isRtl ? -1 : 0,
  };
});
</script>

<template>
  <span class="checkbox">
    <input
      v-bind="$attrs"
      v-model="model"
      :value="value"
      :id="uuid"
      type="checkbox"
      class="checkbox-input"
    />
    <label
      class="checkbox-label"
      v-if="label"
      :for="uuid"
      >{{ isLocale ? $t(`${label}`) : label }}
    </label>
  </span>
</template>

<style lang="scss" scoped>
.checkbox {
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
      background : {
        color: #ffffff;
        position: 50% 50%;
        repeat: no-repeat;
      }
      border-radius: 4px;
    }
    &:checked {
      &::before {
        border: 1px solid var(--c-checked);
        background : {
          color: var(--c-checked);
          image: url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.05341 0.792893C8.44394 0.402369 9.0771 0.402369 9.46763 0.792893C9.82811 1.15338 9.85584 1.72061 9.55082 2.1129L9.46763 2.20711L4.53282 7.14191C4.17234 7.5024 3.60511 7.53013 3.21282 7.2251L3.11861 7.14191L0.792893 4.8162C0.402369 4.42567 0.402369 3.79251 0.792893 3.40199C1.15338 3.0415 1.72061 3.01377 2.1129 3.3188L2.20711 3.40199L3.82471 5.01998L8.05341 0.792893Z' fill='%23ffffff'/%3E%3C/svg%3E%0A");
        }
      }
    }
    &:disabled {
      cursor: not-allowed;
      &::before {
        background-color: #fafafa;
      }
      & + .checkbox-label {
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
    cursor: pointer;
  }
}
</style>
