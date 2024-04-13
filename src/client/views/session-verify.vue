<template>
  <h2>Session Verify</h2>

  <div class="result">{{ result }}</div>

  <p>
    <el-pagination :part="page" background layout="prev, pager, next" :total="100" @current-change="verify" />
  </p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@shared/request'

const result = ref('')
const page = ref(1)

const verify = async (page: number) => {
  request.get(`/api/session-verify?page=${page}`)
    .then((data: any) => {
      result.value = data === 'Authorized'
        ? `page ${page} passed, stmp ${Date.now()}` : `page ${page} failed`
    })
    .catch(() => {
      result.value = 'failed'
    })
}

onMounted(() => {
  verify(page.value)
})
</script>
