<script setup lang="ts">
import { UseImage } from "@vueuse/components";
import { useImage } from "@vueuse/core";

interface IProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<{
  error: [];
}>();
const { isLoading, error } = useImage({ src: props.src });
watchEffect(() => {
  emit("error", error);
});

const noImage = "@@/assets/images/no_image.jpg";
</script>

<template>
  <UseImage
    class="image"
    :src="src"
    :alt="alt"
  >
    <template #error>
      <img
        class="image image--type-error"
        :src="noImage"
        :alt="'이미지 준비중'"
        :width="width"
        :height="height"
      />
    </template>
  </UseImage>
</template>

<style scoped lang="scss">
.image {
  width: v-bind("`${width}px`");
  height: v-bind("`${height}px`");
  object-fit: cover;
  &--type {
    &-loading {
    }
    &-error {
      //object-fit: contain;
      background-color: #e6e6e6;
    }
  }
}
</style>
