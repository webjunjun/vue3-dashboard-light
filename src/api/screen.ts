import type { KpiItem, NameValue, TrendData } from '@/utils/types/screen.type'
import { mockCategory, mockKpi, mockRanking, mockRegions, mockTrend } from '@/mock/screen'

/**
 * 大屏数据接口层
 * 当前使用 mock 数据，接入真实接口时只需把 mockRequest 换成 request 即可，
 * 页面与组件不需要改动。
 */

const MOCK_DELAY = 320

function mockRequest<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), MOCK_DELAY)
  })
}

/** 核心指标 */
export function fetchScreenKpi(): Promise<KpiItem[]> {
  return mockRequest(mockKpi())
}

/** 24 小时运行趋势 */
export function fetchScreenTrend(): Promise<TrendData> {
  return mockRequest(mockTrend())
}

/** 事件类型占比 */
export function fetchScreenCategory(): Promise<NameValue[]> {
  return mockRequest(mockCategory())
}

/** 区域事件排行 */
export function fetchScreenRanking(): Promise<NameValue[]> {
  return mockRequest(mockRanking())
}

/** 区域事件分布 */
export function fetchScreenRegions(): Promise<NameValue[]> {
  return mockRequest(mockRegions())
}
