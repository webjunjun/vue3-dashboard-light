import '@/styles/main.scss' // 全局样式
import '@kjgl77/datav-vue3/dist/style.css' // DataV 组件样式

import { createApp } from 'vue'
import store from '@/stores'

import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register' // 引入svg组件的注册脚本

const app = createApp(App)
// 全局注册el的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)

app.mount('#app')
