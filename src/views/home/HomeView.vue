<script setup lang="ts">
import { WEBSITE_TITLE } from '@/utils/settings'
import { useTopTitleStore } from '@/stores/modules/topTitle'
import useScreenData from './composables/useScreenData'
import ScreenHeader from './components/ScreenHeader.vue'
import PanelBox from './components/PanelBox.vue'
import KpiCard from './components/KpiCard.vue'
import TrendPanel from './components/TrendPanel.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import RankingPanel from './components/RankingPanel.vue'
import MapPanel from './components/MapPanel.vue'

defineOptions({
  name: 'HomeView'
})

const title = useTitle()
const topTitle = useTopTitleStore()
const { kpi, trend, category, ranking, regions, updatedAt } = useScreenData()

onBeforeMount(() => {
  title.value = `${WEBSITE_TITLE} | ${WEBSITE_TITLE}`
  topTitle.setTitle(WEBSITE_TITLE)
})
</script>

<template>
  <div class="screen">
    <ScreenHeader :title="WEBSITE_TITLE" :updated-at="updatedAt" />

    <main class="screen-main">
      <section class="screen-col screen-col-left">
        <PanelBox title="今日人流量趋势" subtitle="单位：人次" class="flow-panel">
          <TrendPanel :trend="trend" field="people" />
        </PanelBox>
        <PanelBox title="今日车流量趋势" subtitle="单位：辆" class="flow-panel">
          <TrendPanel :trend="trend" field="vehicle" />
        </PanelBox>
      </section>

      <section class="screen-col screen-col-center">
        <div class="kpi-row">
          <KpiCard v-for="item in kpi" :key="item.label" v-bind="item" />
        </div>
        <PanelBox title="区域事件分布" subtitle="杭州市" class="map-panel-box">
          <MapPanel :regions="regions" />
        </PanelBox>
      </section>

      <section class="screen-col screen-col-right">
        <PanelBox title="事件类型占比" class="side-panel">
          <CategoryPanel :category="category" />
        </PanelBox>
        <PanelBox title="区域事件排行" subtitle="TOP 13" class="side-panel">
          <RankingPanel :ranking="ranking" />
        </PanelBox>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.screen {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 24px 20px;
  background:
    radial-gradient(ellipse at 50% -10%, rgba(30, 120, 190, 0.25), transparent 62%),
    linear-gradient(rgba(51, 214, 255, 0.035) 1px, transparent 1px) 0 0 / 100% 40px,
    linear-gradient(90deg, rgba(51, 214, 255, 0.035) 1px, transparent 1px) 0 0 / 40px 100%,
    $screen-bg;
}

.screen-main {
  display: grid;
  flex: 1;
  grid-template-columns: 440px 1fr 440px;
  gap: 16px;
  min-height: 0;
}

.screen-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

.flow-panel,
.side-panel,
.map-panel-box {
  flex: 1;
  min-height: 0;
}

.kpi-row {
  display: flex;
  justify-content: space-between;
  height: 152px;
}
</style>
