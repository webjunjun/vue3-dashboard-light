<script setup lang="ts">
import { graphic } from 'echarts'
import type { TrendData } from '@/utils/types/screen.type'

const props = defineProps<{
  trend: TrendData
  /** 只展示其中一条曲线，便于左栏拆成两个面板 */
  field: 'people' | 'vehicle'
}>()

const SERIES_CONFIG = {
  people: { name: '人流量', color: '#33d6ff' },
  vehicle: { name: '车流量', color: '#ffd35c' }
} as const

const series = computed(() => {
  const { name, color } = SERIES_CONFIG[props.field]
  const data = props.trend[props.field]
  return [
    {
      name,
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbolSize: 4,
      lineStyle: { width: 2, color },
      itemStyle: { color },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: `${color}55` },
          { offset: 1, color: `${color}00` }
        ])
      },
      data
    }
  ]
})

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(6, 27, 51, 0.92)',
    borderColor: 'rgba(51, 214, 255, 0.4)',
    textStyle: { color: '#d9ecff', fontSize: 12 }
  },
  grid: { left: 44, right: 14, top: 16, bottom: 24 },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.trend.times,
    axisLine: { lineStyle: { color: 'rgba(51, 214, 255, 0.25)' } },
    axisTick: { show: false },
    axisLabel: { color: '#7ba6c8', fontSize: 11, interval: 3 }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#7ba6c8', fontSize: 11 },
    splitLine: { lineStyle: { color: 'rgba(51, 214, 255, 0.1)' } }
  },
  series: series.value
}))
</script>

<template>
  <ChartView :option="option" class="trend-chart" />
</template>

<style lang="scss" scoped>
.trend-chart {
  width: 100%;
  height: 100%;
}
</style>
