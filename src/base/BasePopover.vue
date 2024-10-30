<script setup lang="ts">
import useUuid from "@@/composables/uuid";
import SvgClose from "@@/assets/svg/SvgClose.svg";

type TOffsetX = "left" | "right" | "center" | "end";
type TOffsetY = "top" | "bottom" | "center" | "end";

interface IPopover {
  option?: "auto" | "manual";
  offsetX?: { left: TOffsetX } | { right: TOffsetX };
  offsetY?: { top: TOffsetY } | { bottom: TOffsetY };
  isHover?: boolean;
  isCloseBtn?: boolean;
  theme?: "white" | "dark";
  popovertargetClass?: string;
  as?: string;
}

const props = withDefaults(defineProps<IPopover>(), {
  option: "auto",
  offsetX: () => {
    return { left: "left" };
  },
  offsetY: () => {
    return { top: "bottom" };
  },
  isCloseBtn: true,
  theme: "white",
  as: "button",
});

const uuid = `popover_${useUuid().getId()}`;

const computedPopupverOffset = computed(() => {
  const ret = {
    [Object.keys(props.offsetX)[0]]: `anchor(${Object.values(props.offsetX)[0]})`,
    [Object.keys(props.offsetY)[0]]: `calc(anchor(${Object.values(props.offsetY)[0]}) + 5px)`,
    ...(Object.values(props.offsetX)[0] === "center"
      ? {
          transform: "translateX(-50%)",
        }
      : {}),
    ...(Object.values(props.offsetY)[0] === "center"
      ? {
          transform: "translateY(-50%)",
        }
      : {}),
  };
  return ret;
});
</script>
<template>
  <div :class="['popover', { 'popover--action-hover': props.isHover }]">
    <component
      :is="props.as"
      class="popover__btn-open"
      :id="`anchor_${uuid}`"
      :popovertarget="uuid"
    >
      <slot name="button">
        <SvgNoti />
        <span class="hidden">{{ $t("common.action.open") }}</span>
      </slot>
    </component>
    <div
      class="popover__target"
      :class="[props.popovertargetClass, `popover__target--theme-${props.theme}`]"
      :id="uuid"
      :popover="props.option"
      :style="[computedPopupverOffset]"
    >
      <div class="popover__target-inner">
        <slot />

        <button
          v-if="props.isCloseBtn"
          class="popover__btn-close"
          :popovertarget="uuid"
          popovertargetaction="hide"
        >
          <SvgClose /><span class="hidden">{{ $t("common.action.close") }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.popover {
  display: inline-block;

  &__btn {
    &-open {
      anchor-name: v-bind("`--anchor-${uuid}`");
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      min-height: 16px;
      .popover--action-hover &:hover {
        & + .popover__target {
          display: block;
        }
      }
    }
    &-close {
      position: absolute;
      right: 8px;
      top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
    }
  }
  &__target {
    position: absolute;
    padding: 16px;
    position-anchor: v-bind("`--anchor-${uuid}`");
    inset: unset;
    text-align: left;
    z-index: 1;
    &-inner {
    }
    &--theme {
      &-white {
        border: 1px solid #51565c;
        border-radius: 4px;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
        background-color: #ffffff;
      }
      &-dark {
        color: #ffffff;
        border-radius: 4px;
        border: 0 none;
        background-color: rgba(32, 38, 45, 0.8);
      }
    }
  }
}
</style>
