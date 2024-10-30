<script setup lang="ts">
import { computed } from "vue";
import useUuid from "@@/composables/uuid";
import { convertFormatBirthday } from "@@/utils/format";
import { REG_EXP_EMOJI } from "@@/constants/regExp";
import SvgSearch from "@@/assets/svg/SvgSearch.svg";

defineOptions({
  inheritAttrs: false,
});
interface IProps {
  // modelValue: string | number;
  type?: "text" | "number" | "password" | "email" | "tel" | "search";
  regExp?: RegExp;
  maxlength?: number;
  placeholder?: string;
  isTransparent?: boolean;
  error?: string;
  hasCounter?: boolean;
  inputClass?: string;
  isBirthday?: boolean;
  isSearch?: boolean;
  onSearch?: any;
  /**
   * form 이 아닌 읽기 모드 (일반 텍스트)
   */
  readMode?: boolean;
  suffix?: string;
  regExpTooltip?: string;
  regExpTooltipPosition?: "top" | "bottom";
}

const modelValue = defineModel();

const props = withDefaults(defineProps<IProps>(), {
  type: "text",
  maxlength: 50,
  placeholder: "내용 입력",
  isTransparent: false,
  error: "",
  hasCounter: false,
  inputClass: "",
  regExpTooltipPosition: "top",
});

const emit = defineEmits<{
  search: [e: Event];
}>();

const attrs = useAttrs();
const $input = ref<HTMLInputElement | null>(null);

const uuid = useUuid().getId();

const isRegExpTooltip = ref(false);

const { computedSearchPadding, isSearchEvent, isSearchBtn, onClickSearch } = search();

function handleInput(e: Event) {
  validateInputValue(e);
}

function validateInputValue(e: Event) {
  let value = (e.target as HTMLInputElement).value;
  value = value.substring(0, props.maxlength);

  if (props.regExp) {
    //onCompositionupdate(e);

    if (props.regExp.test(value)) {
      isRegExpTooltip.value = true;
    }
    value = value.replace(props.regExp, "");
    //value = value.replace(/[^0-9-]/g, "");
  }

  // 이모지 제한
  // if (typeof value === "string") {
  //   value = value.replace(REG_EXP_EMOJI, "");
  // }

  // 전화번호 포맷팅
  if (props.type === "tel") {
    isRegExpTooltip.value = true;
    const onlyTelRegExp = /[^\d]/g;
    value = value.replace(onlyTelRegExp, "").slice(0, 13);
    //value = convertFormatPhoneNumber(value);
  }

  if (props.isBirthday) {
    value = convertFormatBirthday(value);
  }
  (e.target as HTMLInputElement).value = value;
}

const computedTransparent = computed(() => {
  return props.isTransparent ? "var(--c-transparent)" : "var(--c-inputBorder)";
});

function search() {
  const computedSearchPadding = computed(() => {
    return !props.isSearch ? "0 16px" : "0 48px 0 16px";
  });
  const isSearchEvent = computed(() => {
    return Boolean(props.onSearch);
  });
  const isSearchBtn = computed(() => {
    return isSearchEvent.value ? "button" : "span";
  });
  function onClickSearch(e: Event) {
    if (isSearchEvent.value) {
      emit("search", e);
    } else {
      return;
    }
  }
  return { computedSearchPadding, isSearchEvent, isSearchBtn, onClickSearch };
}
function onCompositionupdate(e: Event) {}

onMounted(() => {});
</script>

<template>
  <span
    class="read-mode"
    v-if="readMode"
  >
    {{ modelValue || "-" }}
    <span v-if="suffix">{{ suffix }}</span>
  </span>
  <span
    v-else
    v-bind="{ style: { ...$attrs.style } }"
    :class="['form', $attrs.class, { 'is-error': error }]"
  >
    <input
      ref="$input"
      v-bind="{ ...attrs, class: props.inputClass, style: null }"
      :type="type"
      v-model="modelValue"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :id="uuid"
      class="form__input"
      @input="handleInput"
    />
    <template v-if="isSearch || suffix">
      <Component
        :is="isSearchBtn"
        class="form__search"
        :theme="'none'"
        :size="'auto'"
        :disabled="$attrs.disabled"
        @click="onClickSearch"
      >
        <span v-if="suffix">{{ suffix }}</span>
        <SvgSearch v-else />
      </Component>
    </template>
    <TextCounter
      v-if="hasCounter"
      :text="modelValue"
      :maxlength="maxlength"
      class="form__counter"
    />
    <FormErrorMessage
      class="form__error"
      v-if="error"
      :id="uuid"
      >{{ error }}
    </FormErrorMessage>

    <strong
      v-if="isRegExpTooltip"
      class="form__regExp"
      >{{ props.regExpTooltip }}</strong
    >
  </span>
</template>

<style lang="scss" scoped>
.form {
  min-width: 184px;
  max-width: 292px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  &__input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: var(--form-height);
    padding: 0 16px;
    border: 1px solid v-bind(computedTransparent);
    border-radius: var(--form-radius);
    &:hover {
      border-color: #51565c;
    }
    &:focus {
      outline: 0 none;
      border-color: #20262d;
    }
    &:disabled {
      border-color: #e6e7e8;
      background-color: #fafafa;
      color: #b5b7b9;
    }
    &[readonly] {
      border-color: #e6e7e8;
      background-color: #fafafa;
    }
    &[type="search"] {
      &::-webkit-search-cancel-button {
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: {
          color: var(--c-Black04);
          image: url('data:image/svg+xml,<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"><line x1="7.2002" y1="0.707107" x2="0.707552" y2="7.19975" stroke="white" stroke-linecap="round"/><line x1="7.12981" y1="7.20001" x2="0.637165" y2="0.707369" stroke="white" stroke-linecap="round"/></svg>');
          position: 50% 50%;
          repeat: no-repeat;
        }
        cursor: pointer;
      }
    }
  }
  &__search {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--form-height);
    height: var(--form-height);
    line-height: 1;
    &-icon {
      font-size: 16px;
    }
  }
  &__counter {
    display: flex;
    align-items: end;
    justify-content: right;
    flex: 0 0 auto;
    box-sizing: border-box;
    padding-left: 4px;
    color: #6a6e73;
    font-size: 13px;
    text-align: right;
  }
  &__error {
    flex: 0 0 100%;
    display: block;
    width: 100%;
    margin-top: 8px;
  }

  &.is-error {
    .form__input {
      border-color: var(--c-error);
    }
  }

  &__regExp {
    position: absolute;
    left: 0;
    top: v-bind("`${props.regExpTooltipPosition === 'top' ? 'auto' : 'calc(100% + 4px)'}`");
    bottom: v-bind("`${props.regExpTooltipPosition === 'top' ? ' calc(100% + 4px)' : 'auto'}`");
    display: block;
    padding: 2px 5px;
    border-radius: 4px;
    white-space: nowrap;
    background-color: #000000;
    color: #ffffff;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1;
  }
}
.read-mode {
  vertical-align: middle;
}
</style>
