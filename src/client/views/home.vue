<template>
  <h2>Anti Spider</h2>

  <div class="example-wrap">
    <router-link to="/token-verify" class="example">1. 时间戳、token 校验</router-link>
    <router-link to="/caesar-cipher" class="example">2. 凯撒密码</router-link>
    <router-link to="/cookie-verify" class="example">3. cookie 校验</router-link>
  </div>

</template>

<style lang="scss" scoped>
.example-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    line-height: 2rem;
  }
}
</style>