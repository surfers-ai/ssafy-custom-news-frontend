<script setup lang="ts">
import { computed } from "vue";
import useUuid from "@@/composables/uuid";
import type { ObjectMap } from "@@/@types/common";
import { useGlobalI18n } from "@@/locales";

/**
 * option 은 {code, name}객체, 그 외일 경우 선택된 값 객체값만 가능함
 * 선택된 값(model)을 객체로 받고 싶으면 valueKey 값을 넘겨야 함. 또는 model 초기값이 객체여야 함
 */
interface IProps {
  options: any[] | readonly any[];
  vertical?: boolean; // 목록 종방향 디스플레이
  valueKey?: string;
  labelKey?: string;
  isObjectModel?: boolean;
  emptyOption?: boolean | ObjectMap;
  isRtl?: boolean;
  name?: string;
  disabled?: boolean;
  /**
   * form 이 아닌 읽기 모드 (일반 텍스트)
   */
  readMode?: boolean;
  /**
   * 다국어 사용 여부 (option 의 label 값이 다국어 key 값일 경우)
   */
  isLocale?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  name: useUuid().getId(),
  valueKey: "code",
  labelKey: "name",
});

const model = defineModel<any>();

const emit = defineEmits<{
  "update:code": [value: string];
}>();

// 다국어 처리
const { $t } = useGlobalI18n();

const totalOptions = computed<ObjectMap[]>(() => {
  const { options, emptyOption } = props;
  if (!emptyOption) return options;

  let emptyOp = emptyOption;
  if (emptyOption === true) {
    emptyOp = {
      [props.valueKey]: undefined,
      [props.labelKey]: $t("common.label.all"),
    };
  }
  return [emptyOp, ...options];
});

const objectModel = computed(() => {
  if (props.isObjectModel) return model.value;

  const objArr = totalOptions.value.filter((item) => {
    return item[props.valueKey] === model.value;
  });
  return objArr[0];
});
</script>

<template>
  <span
    v-if="readMode"
    class="read-mode"
  >
    <slot
      v-if="objectModel"
      name="readMode"
      :objectModel="objectModel"
    >
      {{ isLocale ? $t(`${objectModel[labelKey]}`) : objectModel[labelKey] }}
    </slot>
    <span v-else>-</span>
  </span>

  <div
    v-else
    :class="['radio-group', { 'radio-group--direction-vertical': vertical }]"
  >
    <BaseRadio
      v-for="option in totalOptions"
      :key="option[valueKey]"
      v-model="model"
      :name="props.name"
      :value="isObjectModel ? option : option[valueKey]"
      :label="isLocale ? $t(`${option[labelKey]}`) : option[labelKey]"
      :disabled="disabled || option?.disabled"
      :is-rtl="isRtl"
    >
      <slot v-bind="option" />
    </BaseRadio>
  </div>
</template>

<style lang="scss" scoped>
.radio-group {
  display: inline-flex;
  align-self: center;
  column-gap: 8px;

  &--direction {
    &-vertical {
      & :deep(.radio) {
        display: flex;
      }
    }
  }
}
</style>
