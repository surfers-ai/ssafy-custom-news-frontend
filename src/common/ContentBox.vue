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
  border : 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1) ;
  width: 100%;
  padding: 20px;
}
</style>
