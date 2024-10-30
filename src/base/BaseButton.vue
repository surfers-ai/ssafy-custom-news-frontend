<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
import { RouterLink } from "vue-router";
type ButtonType = "button" | "submit" | "reset";
interface IProps {
  /** 버튼 사이즈 */
  size?:
    | "large"
    | "medium"
    | "medium-fit"
    | "small"
    | "small-fit"
    | "auto"
    | "filter"
    | "text"
    | "tight";
  /** 버튼 color */
  theme?:
    | "yellow"
    | "black"
    | "gray"
    | "white"
    | "red"
    | "blue"
    | "blueLine"
    | "blackLine"
    | "grayLine"
    | "navy"
    | "none";
  decoration?: "none" | "underline";
}
const attrs = useAttrs();

const isRouterLink = computed(() => {
  let ret = false;
  if (Object.prototype.hasOwnProperty.call(attrs, "to") && attrs.to) {
    ret = true;
  }

  return ret;
  //attrs.to
});

const props = withDefaults(defineProps<IProps>(), {
  size: "medium",
  theme: "white",
  decoration: "none",
});

const classes = computed(() => {
  return [`btn--size-${props.size}`, `btn--theme-${props.theme}`];
});
</script>

<template>
  <template v-if="!isRouterLink">
    <button
      v-bind="{ ...$attrs, type: ($attrs.type || 'button') as ButtonType }"
      :class="['btn', ...classes]"
    >
      <slot />
    </button>
  </template>
  <template v-else>
    <RouterLink
      :to="`${$attrs.to as RouteRecordRaw}`"
      :class="['btn', ...classes]"
    >
      <slot />
    </RouterLink>
  </template>
</template>

<style lang="scss" scoped>
@mixin buttonTheme($normalBg, $hoverBg, $disabledBg, $normalColor, $hoverColor, $disabledColor) {
  border-color: $normalBg;
  background-color: $normalBg;
  color: $normalColor;
  &:hover {
    border-color: $hoverBg;
    background-color: $hoverBg;
    color: $hoverColor;
  }
  &:disabled {
    border-color: $disabledBg;
    background-color: $disabledBg;
    color: $disabledColor;
  }
}
:deep() {
  //override 하기 쉽게 단일 class로 뽑는다
  //[class^="material-icons"]
  .material-icons,
  .material-icons-outlined,
  .material-symbols-outlined,
  .material-icons-round,
  .material-icons-sharp {
    font-size: inherit;
    vertical-align: top;
  }
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 4px;
  border: {
    width: 1px;
    style: solid;
    color: #b3b3b3;
  }
  border-radius: var(--form-radius);
  color: var(--c-color);
  line-height: 1.5;
  //line-height: normal;
  text-align: center;
  text-decoration: v-bind("props.decoration");
  &:disabled {
    cursor: not-allowed;
  }
  & :deep(svg) {
    color: inherit;
  }

  &--size {
    &-large {
      min-width: 120px;
      padding: 8px 16px 10px;
      font: {
        size: 16px;
        weight: 700;
      }
    }
    &-medium {
      min-width: 64px;
      padding: 9px 8px 10px;
      line-height: 1;
      font: {
        size: 13px;
        weight: 500;
      }
      &-fit {
        padding: 13px 13px;
        line-height: 1;
      }
    }
    &-small {
      min-width: 56px;
      padding: 3px 0px 4px;
      font: {
        size: 13px;
        weight: 500;
      }
      &-fit {
        padding: 8px 8px;
        line-height: 1;
      }
    }
    &-filter {
      min-width: 120px;
      height: 44px;
      font: {
        size: 16px;
        weight: 700;
      }
    }
    &-auto {
      padding: 4px;
      font: {
        size: 14px;
        weight: 500;
      }
    }
    &-text {
      padding: 2px;
      font: {
        size: 16px;
        weight: 500;
      }
    }
    &-tight {
      padding: 0;
      font: {
        size: 12px;
        weight: 500;
      }
    }
  }
  &--theme {
    &-blue {
      @include buttonTheme(#1a66ff, #0055ff, #ccddff, #ffffff, #ffffff, #ffffff);
    }
    &-blueLine {
      @include buttonTheme(#ffffff, #f2f6ff, #cdcfd0, #2c3239, #2c3239, #cdcfd0);
      & {
        border-color: #3377ff;
      }
      &:hover {
        border-color: #3377ff;
      }
      &:disabled {
        border-color: #cdcfd0;
      }
    }
    &-black {
      @include buttonTheme(#42484e, #2c3239, #e6e7e8, #ffffff, #ffffff, #cdcfd0);
    }
    &-blackLine {
      @include buttonTheme(#f0f1f1, #f0f1f1, #fafafa, #2c3239, #2c3239, #cdcfd0);
      & {
        border-color: #b5b7b9;
      }
      &:hover {
        border-color: #42484e;
      }
      &:disabled {
        border-color: #cdcfd0;
      }
    }
    &-gray {
      @include buttonTheme(#f0f1f1, #dadbdc, #fafafa, #2c3239, #2c3239, #cdcfd0);
    }

    &-white {
      @include buttonTheme(#ffffff, #fafafa, #fafafa, #51565c, #2c3239, #cdcfd0);
      & {
        border-color: #b5b7b9;
      }
      &:hover {
        border-color: #42484e;
      }
      &:disabled {
        border-color: #cdcfd0;
      }
    }
    &-red {
      @include buttonTheme(#ec0000, #d90000, #fbcccc, #ffffff, #ffffff, #ffffff);
    }
    &-navy {
      @include buttonTheme(#31408e, #1d266b, #c4cae3, #ffffff, #ffffff, #ffffff);
    }
    &-yellow {
      @include buttonTheme(#ffdd00, #e5c700, #fff8cc, #1a1a1a, #1a1a1a, #d9d9d9);
    }
    &-none {
      @include buttonTheme(transparent, transparent, transparent, #1a1a1a, #1a1a1a, #1a1a1a);
    }
  }
}
</style>
