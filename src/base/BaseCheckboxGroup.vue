<script setup lang="ts">
import type { ObjectMap } from "@@/@types/common";
import { useGlobalI18n } from "@@/locales";

// boolean 일 경우에는 체크여부, 배열일 경우에는 체크된 항목 배열
type MODEL_VALUE_TYPE = boolean | string[] | number[] | string | number;
interface IProps {
  options: any[];
  valueKey?: string;
  labelKey?: string;
  isObjectModel?: boolean;
  emptyOption?: boolean | ObjectMap;
  checkAllFirst?: boolean;
  isRtl?: boolean; // label 왼쪽 위치 여부
  /**
   * 다국어 사용 여부 (option 의 label 값이 다국어 key 값일 경우)
   */
  isLocale?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  valueKey: "code",
  labelKey: "name",
});
const model = defineModel<MODEL_VALUE_TYPE>();
const emit = defineEmits<{}>();

// 다국어 처리
const { $t } = useGlobalI18n();

// 전체 체크박스
const isCheckedAll = ref(false);
function onChangeCheckedAll() {
  console.log("onChangeCheckedAll");
  if (!isCheckedAll.value) {
    model.value = [];
    return;
  }
  checkAll();
}

function checkAll() {
  const { isObjectModel, options, valueKey } = props;
  model.value = isObjectModel ? options : options.map((item) => item[valueKey]);
}
watch(
  () => model.value,
  () => {
    const isAll = model.value.length === props.options.length;
    isCheckedAll.value = isAll;
  },
);

onMounted(() => {
  if (props.checkAllFirst) {
    checkAll();
  }
});
</script>

<template>
  <BaseCheckbox
    v-if="emptyOption"
    v-model="isCheckedAll"
    :label="isLocale ? $t('common.label.all') : '전체'"
    @change="onChangeCheckedAll"
  />
  <BaseCheckbox
    v-for="option in options"
    :key="option.code"
    v-model="model"
    :value="isObjectModel ? option : option[valueKey]"
    :label="isLocale ? $t(`${option[labelKey]}`) : option[labelKey]"
  />
</template>

<style lang="scss" scoped></style>
