<template>
  <div class="back" v-if="$route.path !== '/home'">
    <RouterLink to="/">返回主页</RouterLink>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.back {
  margin-bottom: 1rem;
}
</style>
