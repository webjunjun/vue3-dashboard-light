<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { zhCn } from 'element-plus/es/locales.mjs'
import useScalePage from '@/hooks/useScalePage'

defineOptions({
  name: 'App'
})

const size = ref<'large' | 'default' | 'small'>('small')
const zIndex = ref<number>(2000)
// 缩放大屏页面
const main = ref(document.querySelector('body'))
const scaleData = ref()

onMounted(() => {
  scaleData.value = useScalePage(main)
})

onUnmounted(() => {
  scaleData.value.scope.stop()
})
</script>

<template>
  <ElConfigProvider
    :size="size"
    :z-index="zIndex"
    :locale="zhCn"
    :message="{ max: 1 }"
  >
    <RouterView />
  </ElConfigProvider>
</template>
