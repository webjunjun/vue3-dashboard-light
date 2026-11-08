<script lang="ts" setup>
import gsap from 'gsap'

defineOptions({
  name: 'CountTo'
})

// 数字滚动组件
const props = defineProps({
  // 待滚动的数字
  value: {
    type: [Number, String],
    default: () => ''
  },
  // 限制滚动的小数位
  decimal: {
    type: Number,
    default: () => 0
  },
  // 滚动速率
  speed: {
    type: Number,
    default: () => 1
  },
  // 是否使用千分位分隔符
  separator: {
    type: Boolean,
    default: () => false
  }
})

const initVal = reactive({
  num: 0
})

const displayValue = computed(() => {
  const fixed = initVal.num.toFixed(props.decimal)
  if (!props.separator) return fixed
  const [int, dec] = fixed.split('.')
  const intWithSeparator = Number(int).toLocaleString('en-US')
  return dec ? `${intWithSeparator}.${dec}` : intWithSeparator
})

const animateToValue = () => {
  if (typeof props.value === 'number') {
    gsap.to(initVal, {
      duration: props.speed,
      num: props.value
    })
  }
}

onMounted(() => {
  animateToValue()
})

watch(
  () => props.value,
  () => animateToValue()
)
</script>

<template>
  {{ displayValue }}
</template>
