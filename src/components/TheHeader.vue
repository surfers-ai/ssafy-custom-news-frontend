<script setup lang="ts"></script>

<template>
  <div class="header__container">
    <header>
      <span class="logo"> SSAFYNEWS </span>

      <nav class="menus">
        <router-link to="/dashboard">대시보드</router-link>
        <router-link to="/profile">내 정보</router-link>
      </nav>
    </header>
  </div>
</template>

<style scoped lang="scss">
.header__container {
  background-color: white;
  border-bottom: 1px solid #d4d4d4;
}

header {
  width: 1280px;
  margin: 0 auto;
  color: black;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.logo {
  font-size: x-large;
  font-weight: 800;
}

.menus {
  display: flex;
  gap: 40px;
}

a.router-link-active {
  font-weight: bold;
}
</style>
