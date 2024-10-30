<script lang="ts" setup>
import { ElSelect, ElOption } from "element-plus";
import type { ObjectMap } from "@@/@types/common";
import useUuid from "@@/composables/uuid";
import { useGlobalI18n } from "@@/locales";
import SvgSearch from "@@/assets/svg/SvgSearch.svg";
import SvgSearchDelete from "@@/assets/svg/SvgSearchDelete.svg";

export interface BaseSelect {
  options: ObjectMap[];
  /** 옵션의 value 값을 객체로 했을 시 valueKey 를 꼭 지정해줘야 함. 객체의 유니크한 값의 속성명이 value 일 경우 정상 동작함!!! */
  valueKey?: string;
  labelKey?: string;
  isObjectModel?: boolean;
  placeholder?: string;
  reserveKeyword?: boolean;
  /** 전체(빈 값) 옵션 있을 경우 사용 */
  emptyOption?: boolean | ObjectMap;
  /** 검색 기능 (서제스트 용으로 사용) */
  filterable?: boolean;
  multiple?: boolean;
  multipleLimit?: number;
  /** 다중 선택일 시 태그 축소 (+n) */
  collapseTags?: boolean;
  collapseTagsTooltip?: boolean;
  maxCollapseTags?: number;
  remote?: boolean;
  remoteMethod?: any;
  disabled?: boolean;
  defaultFirstOption?: boolean;
  error?: string;
  fitInputWidth?: boolean;
  isSearch?: boolean;
  onSearch?: any;
  theme?: "transparent";
  /**
   * form 이 아닌 읽기 모드 (일반 텍스트)
   */
  readMode?: boolean;
  /**
   * 다국어 사용 여부 (option 의 label 값이 다국어 key 값일 경우)
   */
  isLocale?: boolean;
  suffixIcon?: string;
}

interface IProps extends BaseSelect {
  fitInputWidth?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  valueKey: "code",
  labelKey: "name",
  fitInputWidth: true,
  suffixIcon: "SvgArrowDown",
});

const model = defineModel<any>();

const emit = defineEmits<{
  change: [value: any, oldVal: any];
  clear: [];
  blur: [e: FocusEvent];
  focus: [e: FocusEvent];
  search: [e: Event, qeury: string];
  removeTag: [value: any];
}>();

const uuid = useUuid().getId();

const $ElSelect = ref<InstanceType<typeof ElSelect> | null>(null);

let isUpdatedByChild = false;

const totalOptions = computed<ObjectMap[]>(() => {
  const { options, emptyOption } = props;
  if (!emptyOption) return options;

  let emptyOp = emptyOption;
  if (emptyOption === true) {
    emptyOp = {
      [props.valueKey]: "",
      [props.labelKey]: $t("common.label.all"),
    };
  }
  return [emptyOp, ...options];
});

const {
  searchQuery,
  computedSearchPadding,
  isSearchEvent,
  isSearchBtn,
  onClickSearch,
  onClickClear,
} = search();

function valueOnClear() {
  const { emptyOption, isObjectModel } = props;
  if (!emptyOption) return;
  return isObjectModel ? totalOptions.value[0] : totalOptions.value[0][props.valueKey];
}

const objectModel = computed(() => {
  if (props.isObjectModel) return model.value;

  const objArr = totalOptions.value.filter((item) => {
    return item[props.valueKey] === model.value;
  });
  return props.multiple ? objArr : objArr[0];
});

function onUpdateModel(value: any) {
  console.log("onUpdateModel", value);
  isUpdatedByChild = true;
  const { multiple, options, emptyOption, isObjectModel } = props;
  if (!multiple || !emptyOption) return;

  const isCheckedAll = value.some((item: any) => {
    const itemValue = isObjectModel ? item[props.valueKey] : item;
    return itemValue === totalOptions.value[0][props.valueKey];
  });

  if (model.value.length === totalOptions.value.length) {
    // 기존에 전부 선택되어 있는 상태에서 변경하는 경우

    if (!isCheckedAll) {
      // 전체 클릭
      model.value = [];
    } else {
      // 그외 옵션 클릭
      model.value = value.slice(1);
    }
  } else {
    // 기존에 전부 선택되어 있지 않은 상태에서 변경하는 경우

    if (isCheckedAll) {
      // 전체 클릭
      checkAll();
    } else {
      // 그외 옵션 클릭했는데, 전체 외에 다 선택된 경우
      if (value.length === options.length) {
        checkAll();
      }
    }
  }
}
function onRemoveTag(removedItem: any) {
  checkAllWhenMultipleEmpty();
  console.log("onRemoveTag", removedItem);
  emit("removeTag", removedItem);
}
function checkAllWhenMultipleEmpty() {
  if (props.multiple && props.emptyOption) {
    if (model.value.length === 0) {
      console.log("checkAllWhenMultipleEmpty: 검색 초기화 시", model.value);

      checkAll();
    }
  }
}
function checkAll() {
  const { isObjectModel, valueKey } = props;
  model.value = isObjectModel
    ? totalOptions.value
    : totalOptions.value.map((item) => item[valueKey]);
}

function onChange(value: any) {
  console.log("onChange");
  emit("change", value, model.value);
}
function onClear() {
  emit("clear");
}
function onBlur(e: FocusEvent) {
  if (isSearchEvent) {
    searchQuery.value = (e.target as HTMLInputElement).value;
    e.preventDefault();
  }

  checkAllWhenMultipleEmpty();

  emit("blur", e);
  e.preventDefault();
}
function onFocus(e: FocusEvent) {
  if (isSearchEvent) {
    searchQuery.value = "";
  }
  emit("focus", e);
}

function search() {
  const searchQuery = ref("");
  const computedSearchPadding = computed(() => {
    return !props.isSearch ? "0 12px" : "0 48px 0 12px";
  });
  const isSearchEvent = computed(() => {
    return Boolean(props.onSearch);
  });
  const isSearchBtn = computed(() => {
    console.log("onClickSearch :>> ", isSearchEvent.value);

    return isSearchEvent.value ? "button" : "span";
  });
  function onClickSearch(e: FocusEvent) {
    if (isSearchEvent.value) {
      emit("search", e, searchQuery.value);

      $ElSelect?.value?.handleFocus(e);
    } else {
      return;
    }
  }
  function onClickClear() {
    model.value = null;
  }
  return {
    searchQuery,
    computedSearchPadding,
    isSearchEvent,
    isSearchBtn,
    onClickSearch,
    onClickClear,
  };
}

const computedSuffixIcon = computed(() => {
  return props.isSearch ? "" : props.suffixIcon;
});

// 다국어 처리
const { $t } = useGlobalI18n();
const localePlaceholder = computed(() => {
  return props.placeholder ?? $t("common.label.selectItem");
});

onMounted(() => {
  // 전체 옵션 있고, modelValue 초기값이 세팅 되어있지 않을 경우 디폴트로 전체 선택 되도록 처리
  if (!props.multiple) {
    if (props.emptyOption && [null, undefined].includes(model.value)) {
      model.value = valueOnClear();
    }
  } else {
    if (props.emptyOption && model.value.length === 0) {
      checkAll();
    }
  }
});

// 멀티셀렉트에 전체옵션 있는 경우, 검색 초기화 버튼 클릭 시 전체 체크 처리
watch(
  () => model.value,
  () => {
    console.log(model.value);
    if (!isUpdatedByChild) {
      console.log("isUpdatedByChild false");
      checkAllWhenMultipleEmpty();
    }
    isUpdatedByChild = false;
  },
);

// 서제스트 시 검색 지연 처리
function debounce(func, delay) {
  let timeout;

  // 선택된 항목 삭제 후 포커스 시 간헐적으로 기존 옵션 목록 노출 이슈 해결
  if (!searchQuery.value) {
    return props.remoteMethod;
  }

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
const debouncedSearch = debounce(props.remoteMethod, 300);
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
      {{ objectModel[labelKey] }}
    </slot>
    <span v-else>-</span>
  </span>

  <span
    v-else
    :class="['select', { error }, { 'select--theme-transparent': props.theme }]"
    v-bind="{ style: { ...$attrs.style } }"
  >
    <ElSelect
      ref="$ElSelect"
      :id="uuid"
      v-model="model"
      v-bind="props"
      :empty-values="emptyOption ? [null, undefined] : [null, undefined, '']"
      :placeholder="localePlaceholder"
      :teleported="false"
      placement="bottom-end"
      :popper-class="`select-popper ${props.theme ? 'select-popper--theme-transparent' : ''}`"
      :suffix-icon="computedSuffixIcon"
      :popper-options="{ strategy: 'fixed' }"
      :remote-method="debouncedSearch"
      @update:modelValue="onUpdateModel"
      @change="onChange"
      @clear="onClear"
      @blur="onBlur"
      @focus="onFocus"
      @remove-tag="onRemoveTag"
    >
      <template #label="{ label, value }">
        <slot
          name="selectedLabel"
          v-bind="{ label, value }"
        />
      </template>
      <ElOption
        v-for="option in totalOptions"
        :key="option[valueKey]"
        :value="isObjectModel ? option : option[valueKey]"
        :label="isLocale ? $t(`${option[labelKey]}`) : option[labelKey]"
        :disabled="option.disabled"
      >
        <slot v-bind="option as ObjectMap" />
      </ElOption>

      <template #empty>
        <strong class="select--is-empty">no data</strong>
      </template>
    </ElSelect>

    <!-- 서제스트일 시 돋보기 및 클리어 아이콘 표시 -->
    <Component
      v-if="isSearch"
      :is="isSearchBtn"
      class="select__search"
      :theme="'none'"
      :size="'auto'"
      :disabled="$attrs.disabled"
      @click="onClickSearch"
    >
      <button
        v-if="!!model"
        class="select__search-clear"
        @click="onClickClear"
      >
        <SvgSearchDelete style="color: #8f9396" />
      </button>
      <SvgSearch class="select__search-icon" />
    </Component>

    <FormErrorMessage
      v-if="error"
      class="form__error"
      :id="uuid"
      >{{ error }}
    </FormErrorMessage>
  </span>
</template>

<style lang="scss" scoped>
.select {
  --select-width: 100%;
  --select-height: var(--form-height);

  min-width: 184px;
  max-width: 292px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  &--is {
    &-empty {
      display: block;
      padding: 17px 16px;
      font-size: 13px;
      color: #999;
      text-align: center;
    }
  }
  &__search {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 8px;
    height: var(--form-height);
    padding: 0 8px;
    line-height: 1;
    &-clear {
      line-height: 1;
    }
    &-icon {
      padding: 1px;
      width: 14px;
      height: 14px;
    }
  }

  & :deep() {
    .org-member {
      padding: 4px 0;
    }
    .el-select {
      min-width: inherit;
      width: inherit;
      max-width: inherit;
      &__wrapper {
        min-height: 34px;
        padding: v-bind("`${isSearch ?'0 56px 0 16px':'0px 8px 0 16px'}`");
        border: 1px solid var(--c-inputBorder);
        box-shadow: none;
        transition: none;
        &.is-hovering {
          border: 1px solid #51565c;
          box-shadow: none;
          .el-select__placeholder {
            color: #6a6e73;
          }
        }
        &.is-focused {
          border: 1px solid #51565c;
          box-shadow: none;
          .el-select__placeholder {
            color: #20262d;
          }
        }
        &.is-disabled {
          background-color: #fafafa;
        }
      }
      &__placeholder {
        color: #6a6e73;
        font-size: 13px;
      }
      &__suffix {
        .el-select__icon {
          width: 16px;
          height: 16px;
          svg {
            width: 100%;
            height: 100%;
            color: #51565c;
          }
        }
      }
      // TODO (yuna.j - 2024. 7. 31.): 멀티 셀렉트 디자인 나오면 css 수정 필요
      .el-tag {
        background-color: #f5f5f6;
        .el-tag__close:hover {
          background-color: var(--el-tag-hover-color);
          color: var(--el-color-white);
        }
      }
    }

    .el-input {
      width: var(--select-width);
      height: var(--select-height);
      &__wrapper {
        box-sizing: border-box;
        width: var(--select-width);
        height: var(--select-height);
        padding: 0;
        box-shadow: none;
        border-radius: var(--form-radius);
        border: 1px solid #e5e5e5;
        &:hover {
          box-shadow: none;
          border: 1px solid #4c4c4c;
        }
      }
      &__inner {
        padding-left: 15px;
        height: 32px;
      }
      &__suffix {
        width: 30px;
      }
    }
  }

  &.select--theme-transparent :deep() {
    min-width: auto;
    .el-select {
      &__wrapper {
        padding: 0 8px;
        border: 0 none;
        &.is-hovering {
          border: 0 none;
          .el-select__placeholder {
            color: #20262d;
          }
        }
        &.is-focused {
          border: 0 none;
        }
      }
      &__placeholder {
        color: #20262d;
      }

      &__selected-item {
        &.el-select__placeholder {
          transform: none;
          position: static;
        }
      }
      &__suffix {
        .el-select__icon {
          width: 16px;
          height: 16px;
          svg {
            width: 100%;
            height: 100%;
            color: #51565c;
          }
        }
      }
    }

    .el-input {
      &__wrapper {
        &:hover {
        }
      }
      &__inner {
      }
      &__suffix {
      }
    }
  }
}
.error {
  display: block;
  width: 100%;

  & :deep() {
    .el-select__wrapper {
      border: 1px solid var(--c-errorLine);
    }
  }
}
.form__error {
  display: block;
  padding-top: 8px;
}
</style>

<style lang="scss">
.el-select {
  &__popper {
    &.el-popper {
      box-sizing: border-box;
      margin-top: -8px;
      margin-bottom: -8px;
      border: 0 none;
      box-shadow: none;
      background-color: #ffffff;
      .el-popper__arrow {
        display: none;
      }
    }
  }

  &-dropdown {
    border: 1px solid var(--c-color);
    box-shadow: none; // 0 2px 8px rgba(0, 0, 0, 0.16);
    &__wrap {
    }
    &__list {
      padding: 8px 0;
    }
    &__item {
      height: auto;
      padding: 0 16px;
      text-align: left;
      color: #6a6e73;
      &:hover {
        color: #20262d;
        background-color: #f2f6ff;
      }
      &.is-selected {
        background-color: #f2f6ff;
        color: #20262d;
        font-weight: 400;
      }
    }
    &.select-popper--theme-transparent {
      border: 0 none;
      border-radius: 12px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
      .el-select {
        &-dropdown {
          &__wrap {
          }
          &__list {
            padding: 8px 0;
          }
          &__item {
            color: #51565c;
            font-size: 15px;
            font-weight: 500;
            line-height: 37px;
            &:hover {
              color: #20262d;
              background-color: #f2f6ff;
            }
            &.is-selected {
              background-color: #f2f6ff;
              color: #20262d;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
.read-mode {
  vertical-align: middle;
}
</style>
