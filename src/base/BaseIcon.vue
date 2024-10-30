<script setup lang="ts">
/**
 * https://fonts.google.com/icons?selected=Material+Icons&icon.style=Filled
 */
interface IProps {
  name: string;
  reversed?: boolean;
  type?: null | 'outline';
  color?: 'black' | 'gray';
  fontSize?: number;
}
const props = withDefaults(defineProps<IProps>(), {
  color: 'black',
});

const iconsTypeClassName = computed(() => {
  let className = 'material-icons';
  switch (props.type) {
    case 'outline':
      className = 'material-icons-outlined';
      break;
    default:
      break;
  }

  return className;
});
</script>

<template>
  <span
    :class="[
      'base-icon',
      iconsTypeClassName,
      { reversed },
      { clickable: $attrs.onClick },
      `color-${props.color}`,
    ]"
    >{{ props.name }}</span
  >
</template>

<style scoped lang="scss">
.base-icon {
  font-size: v-bind('`${props.fontSize}px`') !important;
}
.color {
  &-gray {
    color: var(--c-gray);
  }
}
.reversed {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  transform: rotate(180deg);
}
.clickable {
  cursor: pointer;
}
</style>
