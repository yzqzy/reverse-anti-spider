<template>
  <h2>Anti Spider</h2>

  <div class="example-wrap">
    <router-link to="/token-verify" class="example">1. 时间戳、token 校验</router-link>
    <router-link to="/caesar-cipher-verify" class="example">2. 凯撒密码校验</router-link>
    <router-link to="/cookie-verify" class="example">3. cookie 校验</router-link>
    <router-link to="/session-verify" class="example">4. session 保持校验</router-link>
    <router-link to="/cookie-plus-verify" class="example">5. cookie 校验 Plus</router-link>
    <router-link to="/link-method-verify" class="example">6. link 请求校验</router-link>
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
