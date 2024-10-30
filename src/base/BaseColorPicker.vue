<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <span class="colorpicker">
    <input
      class="colorpicker__color"
      type="color"
      v-model="model"
      pattern="#[a-f0-9]{6}"
    />
    <input
      class="colorpicker__text"
      type="text"
      pattern="#[a-f0-9]{6}"
      :placeholder="'#HEX code'"
      v-model="model"
      maxlength="7"
    />
  </span>
</template>

<style lang="scss" scoped>
.colorpicker {
  display: inline-flex;
  min-width: 120px;
  column-gap: 5px;
  &__color {
    flex: 1 0 auto;
    width: 26px;
    height: 26px;
    margin: 0;
    padding: 0;
    border: 0px none;
    background-color: transparent;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
  }
  &__text {
    width: 100%;
    font-size: 12px;
    padding: 0 5px;
    border-radius: var(--form-radius);
    border: 1px solid var(--c-border);
  }
}
</style>
