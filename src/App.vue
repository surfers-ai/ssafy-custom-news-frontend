<script setup lang="ts">
import { useRoute } from "vue-router";
import TheHeader from "./components/TheHeader.vue";

const route = useRoute();
</script>

<template>
  <TheHeader v-if="route.path !== '/login'" />

  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
main {
  max-width: 1280px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
