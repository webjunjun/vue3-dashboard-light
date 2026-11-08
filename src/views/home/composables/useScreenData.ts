import {
  fetchScreenCategory,
  fetchScreenKpi,
  fetchScreenRanking,
  fetchScreenRegions,
  fetchScreenTrend
} from '@/api/screen'
import type { KpiItem, NameValue, TrendData } from '@/utils/types/screen.type'

/**
 * 大屏数据聚合
 * 页面只消费这里的数据，定时轮询统一在这里控制
 */
export default function useScreenData(pollInterval = 10000) {
  const kpi = ref<KpiItem[]>([])
  const trend = ref<TrendData>({ times: [], people: [], vehicle: [] })
  const category = ref<NameValue[]>([])
  const ranking = ref<NameValue[]>([])
  const regions = ref<NameValue[]>([])
  const updatedAt = ref('')

  const load = async () => {
    const [kpiData, trendData, categoryData, rankingData, regionData] = await Promise.all([
      fetchScreenKpi(),
      fetchScreenTrend(),
      fetchScreenCategory(),
      fetchScreenRanking(),
      fetchScreenRegions()
    ])
    kpi.value = kpiData
    trend.value = trendData
    category.value = categoryData
    ranking.value = rankingData
    regions.value = regionData
    updatedAt.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
  }

  onMounted(load)
  useIntervalFn(load, pollInterval)

  return { kpi, trend, category, ranking, regions, updatedAt }
}
