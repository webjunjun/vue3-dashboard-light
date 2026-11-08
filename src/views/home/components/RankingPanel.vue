<script setup lang="ts">
import { ScrollRankingBoard } from '@kjgl77/datav-vue3'
import type { NameValue } from '@/utils/types/screen.type'

const props = defineProps<{
  ranking: NameValue[]
}>()

const config = computed(() => ({
  data: props.ranking,
  rowNum: 7,
  waitTime: 3000,
  carousel: 'single',
  unit: '起',
  sort: false,
  index: true
}))
</script>

<template>
  <div class="ranking-panel">
    <ScrollRankingBoard :config="config" />
  </div>
</template>

<style lang="scss" scoped>
.ranking-panel {
  width: 100%;
  height: 100%;
  padding-top: 4px;

  :deep(.dv-scroll-ranking-board) {
    color: $screen-text;
  }

  :deep(.ranking-info) {
    color: $screen-text;
    font-size: 14px;
  }

  :deep(.rank) {
    color: $screen-accent;
    font-family: 'YouSheBiaoTiHei', sans-serif;
  }

  :deep(.ranking-column) {
    border-bottom-color: rgba(51, 214, 255, 0.15);
  }

  :deep(.inside-column) {
    background: linear-gradient(90deg, $screen-primary-dim, $screen-primary);
  }
}
</style>
