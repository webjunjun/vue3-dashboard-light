<script setup lang="ts">
import type { KpiItem } from '@/utils/types/screen.type'

defineProps<KpiItem>()
</script>

<template>
  <div class="kpi-card">
    <div class="kpi-icon" :style="{ color, borderColor: `${color}55` }">
      <el-icon :size="30">
        <component :is="icon" />
      </el-icon>
    </div>
    <div class="kpi-info">
      <div class="kpi-label">{{ label }}</div>
      <div class="kpi-value">
        <span class="kpi-num">
          <CountTo :value="value" :decimal="decimal ?? 0" :speed="1.2" separator />
        </span>
        <span class="kpi-unit">{{ unit }}</span>
      </div>
      <div class="kpi-delta" :class="delta >= 0 ? 'is-up' : 'is-down'">
        较昨日
        <span class="kpi-delta-value">{{ delta >= 0 ? '+' : '' }}{{ delta }}%</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kpi-card {
  width: calc(25% - 9px);
  height: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 100%;
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(19, 68, 112, 0.5), rgba(7, 27, 52, 0.35));
  border-left: 2px solid rgba(51, 214, 255, 0.55);
  box-shadow: inset 0 0 22px rgba(51, 214, 255, 0.08);
}

.kpi-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(51, 214, 255, 0.08);
  border: 1px solid;
  border-radius: 50%;
}

.kpi-info {
  min-width: 0;
}

.kpi-label {
  color: $screen-text-dim;
  font-size: 14px;
  letter-spacing: 1px;
}

.kpi-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 2px 0 4px;
}

.kpi-num {
  color: $screen-text;
  font-family: 'YouSheBiaoTiHei', sans-serif;
  font-size: 34px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  text-shadow: 0 0 14px rgba(51, 214, 255, 0.5);
}

.kpi-unit {
  color: $screen-text-dim;
  font-size: 13px;
}

.kpi-delta {
  color: $screen-text-dim;
  font-size: 12px;
}

.is-up .kpi-delta-value {
  color: $screen-success;
}

.is-down .kpi-delta-value {
  color: $screen-danger;
}
</style>
