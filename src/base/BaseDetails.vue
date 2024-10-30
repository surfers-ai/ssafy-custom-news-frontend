<script setup lang="ts">
interface IProps {
  /** 요약 */
  summary?: string;
  disabled?: boolean;
}

const $details = ref<HTMLDetailsElement | null>(null);

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
});
const emit = defineEmits(["toggle"]);

const open = defineModel("open", { default: true }) as Ref<boolean>;

function handleToggle(e: Event) {
  if (props.disabled) {
    return;
  } else {
    const $target = e.target as HTMLDetailsElement;
    open.value = $target.open;
    emit("toggle", $target.open);
  }
}

function onClick(e) {
  if (props.disabled) {
    e.preventDefault();
  }
}

defineExpose({
  $details,
});
</script>
<template>
  <details
    ref="$details"
    class="details"
    @click="onClick"
    @toggle="handleToggle"
    :open="open"
    :disabled="disabled"
  >
    <summary class="summary">
      <template v-if="$slots.summary">
        <slot name="summary" />
      </template>
      <template v-else>
        {{ summary }}
      </template>
    </summary>
    <div class="details-contents">
      <slot />
    </div>
  </details>
</template>

<style lang="scss" scoped>
$border: 1px solid var(--c-border);

.details {
  &-contents {
    padding: 20px;
  }
  &[disabled="true"] > .summary {
    cursor: default;
  }
}

.summary {
  position: relative;
  list-style: none;
  padding: 12px 50px 12px 16px;
  border : {
    top: $border;
    bottom: $border;
  }
  font : {
    size: 13px;
    weight: 500;
  }
  cursor: pointer;
  &::marker,
  &::-webkit-details-marker {
    display: none;
  }
  &::after {
    content: "";
    position: absolute;
    right: 28px;
    top: 50%;
    display: v-bind("`${props.disabled ?'none':'flex'}`");
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    background : {
      image: url('data:image/svg+xml,<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.624994 0.81212L4.99999 5.18712L9.375 0.81212" stroke="%2351565C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      position: 50% 50%;
      repeat: no-repeat;
    }
    line-height: 1;
  }
  .details[open] > & {
    border-bottom: $border;
    &::after {
      background-image: url('data:image/svg+xml,<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.37348 5.18706L4.99848 0.812063L0.623478 5.18706" stroke="%2351565C" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    }
  }
}
</style>
