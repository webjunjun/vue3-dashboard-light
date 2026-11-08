<script setup lang="ts">
import { Decoration5 } from '@kjgl77/datav-vue3'

defineProps<{
  title: string
  updatedAt: string
}>()

const now = useNow()
const dateText = computed(
  () => `${now.value.getFullYear()}年${now.value.getMonth() + 1}月${now.value.getDate()}日`
)
const weekText = computed(() => `星期${'日一二三四五六'[now.value.getDay()]}`)
const timeText = useDateFormat(now, 'HH:mm:ss')
</script>

<template>
  <header class="screen-header">
    <div class="header-side header-left">
      <span class="side-label">数据更新</span>
      <span class="side-value">{{ updatedAt || '--:--:--' }}</span>
    </div>

    <div class="header-center">
      <h1 class="header-title">{{ title }}</h1>
    </div>

    <div class="header-side header-right">
      <span class="side-date">{{ dateText }} {{ weekText }}</span>
      <span class="side-clock">{{ timeText }}</span>
    </div>

    <div class="header-deco">
      <Decoration5 :color="['#33d6ff', '#1a6fa8']" :dur="2.4" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.screen-header {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 96px;
  padding-bottom: 8px;
}

.header-center {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
}

.header-title {
  padding: 0 40px;
  background: linear-gradient(180deg, #ffffff 20%, #8fe4ff 55%, #2fa9d6 100%);
  background-clip: text;
  font-family: 'YouSheBiaoTiHei', sans-serif;
  font-size: 42px;
  font-weight: normal;
  letter-spacing: 8px;
  line-height: 1;
  text-shadow: 0 0 24px rgba(51, 214, 255, 0.45);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-side {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 30%;
  color: $screen-text-dim;
  font-size: 14px;
}

.header-right {
  justify-content: flex-end;
}

.side-label {
  color: $screen-text-dim;
}

.side-value {
  color: $screen-primary;
  font-variant-numeric: tabular-nums;
}

.side-date {
  color: $screen-text-dim;
}

.side-clock {
  display: inline-block;
  width: 120px;
  color: $screen-text;
  font-family: 'YouSheBiaoTiHei', sans-serif;
  font-size: 26px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 1px;
}

.header-deco {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  height: 6px;
  opacity: 0.9;
}
</style>
