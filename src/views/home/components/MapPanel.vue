<script setup lang="ts">
import * as echarts from 'echarts'
import hangzhouGeo from '@/assets/map/hangzhou.json'
import type { NameValue } from '@/utils/types/screen.type'

// 地图只需注册一次；后续更换城市时替换 src/assets/map 下的文件与这里的名称即可
echarts.registerMap('hangzhou', hangzhouGeo as unknown as Parameters<typeof echarts.registerMap>[1])

const props = defineProps<{
  regions: NameValue[]
}>()

const total = computed(() => props.regions.reduce((sum, item) => sum + item.value, 0))

const option = computed(() => {
  const values = props.regions.map((item) => item.value)
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6, 27, 51, 0.92)',
      borderColor: 'rgba(51, 214, 255, 0.4)',
      textStyle: { color: '#d9ecff', fontSize: 12 },
      formatter: '{b}<br/>事件数：{c} 起'
    },
    visualMap: {
      show: false,
      min: values.length ? Math.min(...values) : 0,
      max: values.length ? Math.max(...values) : 1,
      inRange: { color: ['#08325a', '#12648f', '#2aa7c9', '#33d6ff'] }
    },
    series: [
      {
        name: '区域事件数',
        type: 'map',
        map: 'hangzhou',
        roam: false,
        zoom: 1.02,
        layoutCenter: ['50%', '50%'],
        layoutSize: '97%',
        label: { show: true, color: '#cfeaff', fontSize: 12 },
        itemStyle: {
          areaColor: '#0a2c4d',
          borderColor: '#3aa8d6',
          borderWidth: 1,
          shadowColor: 'rgba(51, 214, 255, 0.4)',
          shadowBlur: 14
        },
        emphasis: {
          label: { color: '#ffffff', fontSize: 13 },
          itemStyle: { areaColor: '#ffd35c' }
        },
        select: { disabled: true },
        data: props.regions
      }
    ]
  }
})
</script>

<template>
  <div class="map-panel">
    <ChartView :option="option" class="map-chart" />

    <div class="map-footer">
      <span class="map-total">全市今日事件 <b>{{ total }}</b> 起</span>
      <span class="map-legend">
        <i class="legend-bar" />
        <span>低</span>
        <span>高</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map-panel {
  position: relative;
  width: 100%;
  height: 100%;
}

.map-chart {
  width: 100%;
  height: 100%;
}

.map-footer {
  position: absolute;
  right: 14px;
  bottom: 8px;
  display: flex;
  align-items: center;
  gap: 24px;
  color: $screen-text-dim;
  font-size: 13px;
}

.map-total b {
  color: $screen-primary;
  font-family: 'YouSheBiaoTiHei', sans-serif;
  font-size: 20px;
  text-shadow: 0 0 10px rgba(51, 214, 255, 0.6);
}

.map-legend {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-bar {
  width: 78px;
  height: 6px;
  background: linear-gradient(90deg, #08325a, #12648f, #2aa7c9, #33d6ff);
  border-radius: 3px;
}
</style>
