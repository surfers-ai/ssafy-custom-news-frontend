<script setup lang="ts">
import useUuid from "@@/composables/uuid";
import { REG_EXP_EMOJI } from "@@/constants/regExp";

defineOptions({ inheritAttrs: false });

interface IProps {
  modelValue?: string | number;
  maxlength?: number;
  placeholder?: string;
  error?: string;
  hasCounter?: boolean;
  textareaClass?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: "",
  maxlength: 1000,
  placeholder: "내용 입력",
  error: "",
  hasCounter: true,
  textareaClass: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const uuid = useUuid().getId();

function onInput(e: Event) {
  validateInputValue(e);
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
function validateInputValue(e: Event) {
  let value = (e.target as HTMLInputElement).value;

  // 이모지 제한
  if (typeof value === "string") {
    value = value.replace(REG_EXP_EMOJI, "");
  }

  (e.target as HTMLInputElement).value = value;
}
</script>

<template>
  <span
    class="form"
    :class="[$attrs.class, { error, 'is-nocount': !hasCounter }]"
  >
    <textarea
      class="form-textarea"
      v-bind="{ ...$attrs, class: props.textareaClass }"
      :value="modelValue"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :id="uuid"
      @input="onInput"
    />
    <FormErrorMessage
      v-if="error"
      :id="uuid"
      >{{ error }}
    </FormErrorMessage>
    <TextCounter
      v-if="hasCounter"
      :text="modelValue"
      :maxlength="maxlength"
      class="form-counter"
    />
  </span>
</template>

<style lang="scss" scoped>
.form {
  display: block;
  position: relative;
  &-textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-height: 140px;
    padding: 16px 16px 44px;
    border: 1px solid var(--c-inputBorder);
    border-radius: var(--form-radius);
    resize: vertical;
    .form.error & {
      border-color: var(--c-error);
    }
    &:hover,
    &:focus {
      outline: 0 none;
      border: 1px solid var(--c-color);
    }
    &::placeholder {
      color: var(--c-placeholder);
    }
    .is-nocount & {
      padding-bottom: 16px;
    }
  }
  &-counter {
    position: absolute;
    right: 5px;
    bottom: 16px;
    display: block;
    padding: 0 16px;
    color: #4c4c4c;
    font : {
      size: 13px;
      family: var(--font-roboto);
    }
    .error & {
      bottom: 26px;
    }
    &__length {
    }
  }
}
</style>
