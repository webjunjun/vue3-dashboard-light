/**
 * 大屏数据类型定义
 * mock 与真实接口共用这些结构，切换数据源时只需替换 api 实现
 */

/** 核心指标 */
export interface KpiItem {
  label: string
  value: number
  /** 小数位 */
  decimal?: number
  unit: string
  /** 较昨日变化百分比 */
  delta: number
  /** Element Plus 图标名 */
  icon: string
  color?: string
}

/** 名称-数值通用结构（分类占比、区域排行、区域分布共用） */
export interface NameValue {
  name: string
  value: number
}

/** 24 小时趋势 */
export interface TrendData {
  times: string[]
  people: number[]
  vehicle: number[]
}
