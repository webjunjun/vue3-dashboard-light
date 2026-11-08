<script setup lang="ts">
import type { NameValue } from '@/utils/types/screen.type'

const props = defineProps<{
  category: NameValue[]
}>()

const total = computed(() => props.category.reduce((sum, item) => sum + item.value, 0))

const option = computed(() => ({
  color: ['#33d6ff', '#33e6a0', '#ffd35c', '#7a8cff', '#ff8f6b', '#8fa8c8'],
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(6, 27, 51, 0.92)',
    borderColor: 'rgba(51, 214, 255, 0.4)',
    textStyle: { color: '#d9ecff', fontSize: 12 },
    formatter: '{b}<br/>{c} 起（{d}%）'
  },
  title: {
    text: String(total.value),
    subtext: '事件总数（起）',
    left: 'center',
    top: '29%',
    textStyle: {
      color: '#ffffff',
      fontSize: 28,
      fontFamily: 'YouSheBiaoTiHei, sans-serif',
      textShadowBlur: 12,
      textShadowColor: 'rgba(51, 214, 255, 0.6)'
    },
    subtextStyle: { color: '#7ba6c8', fontSize: 12 }
  },
  legend: {
    bottom: 0,
    left: 'center',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 14,
    icon: 'circle',
    textStyle: { color: '#7ba6c8', fontSize: 12 }
  },
  series: [
    {
      name: '事件类型',
      type: 'pie',
      radius: ['44%', '62%'],
      center: ['50%', '40%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: 'rgba(3, 11, 25, 0.85)',
        borderWidth: 2
      },
      label: { show: false },
      labelLine: { show: false },
      emphasis: {
        scale: true,
        scaleSize: 6,
        itemStyle: { shadowBlur: 18, shadowColor: 'rgba(51, 214, 255, 0.55)' },
        label: {
          show: false,
        }
      },
      data: props.category
    }
  ]
}))
</script>

<template>
  <ChartView :option="option" class="category-chart" />
</template>

<style lang="scss" scoped>
.category-chart {
  width: 100%;
  height: 100%;
}
</style>
