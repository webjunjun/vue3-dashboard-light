<script setup lang="ts">
import { BorderBox1 } from '@kjgl77/datav-vue3'

defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="panel">
    <BorderBox1 :color="['#1a6fa8', '#33d6ff']" background-color="transparent">
      <div class="panel-inner">
        <div class="panel-head">
          <div class="panel-head-left">
            <i class="panel-accent" />
            <span class="panel-title">{{ title }}</span>
            <span v-if="subtitle" class="panel-sub">{{ subtitle }}</span>
          </div>
          <div class="panel-head-right">
            <slot name="extra" />
          </div>
        </div>
        <div class="panel-content">
          <slot />
        </div>
      </div>
    </BorderBox1>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.panel-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 14px 18px 16px;
  text-align: left;
}

.panel-head {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(51, 214, 255, 0.18);
}

.panel-head-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-accent {
  width: 4px;
  height: 16px;
  background: linear-gradient(180deg, $screen-primary, $screen-primary-dim);
  box-shadow: 0 0 8px rgba(51, 214, 255, 0.8);
}

.panel-title {
  color: $screen-text;
  font-family: 'YouSheBiaoTiHei', sans-serif;
  font-size: 22px;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(51, 214, 255, 0.45);
}

.panel-sub {
  color: $screen-text-dim;
  font-size: 12px;
}

.panel-head-right {
  color: $screen-text-dim;
  font-size: 12px;
}

.panel-content {
  flex: 1;
  min-height: 0;
  padding-top: 8px;
  color: $screen-text;
}
</style>
