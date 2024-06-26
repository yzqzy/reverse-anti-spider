import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import './style.css'

import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router).mount('#app')
