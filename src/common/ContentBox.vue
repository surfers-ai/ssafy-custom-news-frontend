<script setup lang="ts">
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>

<template>
  <div class="box" v-bind="attrs">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.box {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 15px;
}
</style>
