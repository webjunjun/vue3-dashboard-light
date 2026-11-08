<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'

defineOptions({
  name: 'ChartView'
})

const props = defineProps({
  option: {
    type: Object,
    default: () => {}
  },
  width: {
    type: [Number, String],
    default: () => '100%'
  },
  height: {
    type: [Number, String],
    default: () => '100%'
  }
})

const chartRef = ref<HTMLElement>()
const _eChartsRef = shallowRef<EChartsType | null>(null)
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  _eChartsRef.value = echarts.init(chartRef.value)
  _eChartsRef.value.setOption(props.option)
  // 容器尺寸变化时自适应
  if (chartRef.value) {
    resizeObserver = new ResizeObserver(() => _eChartsRef.value?.resize())
    resizeObserver.observe(chartRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  if (_eChartsRef.value) {
    _eChartsRef.value.dispose()
    _eChartsRef.value = null
  }
})

watch(
  () => props.option,
  (val: echarts.EChartsOption) => {
    if (val && _eChartsRef.value) {
      // 采用合并更新，避免定时刷新时重播入场动画
      _eChartsRef.value.setOption(val)
    }
  }
)

// 暴露接口
defineExpose({chartRef, _eChartsRef})
</script>

<template>
  <div ref="chartRef" class="echarts-box" :style="{
    width: typeof width === 'string' ? width : width + 'px',
    height: typeof height === 'string' ? height : height + 'px'
  }" />
</template>
