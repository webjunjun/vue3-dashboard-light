import type { KpiItem, NameValue, TrendData } from '@/utils/types/screen.type'

/** 杭州市行政区，需与 src/assets/map/hangzhou.json 中的区域名称保持一致 */
export const DISTRICTS = [
  '上城区',
  '拱墅区',
  '西湖区',
  '滨江区',
  '萧山区',
  '余杭区',
  '富阳区',
  '临安区',
  '钱塘区',
  '临平区',
  '桐庐县',
  '淳安县',
  '建德市'
]

/** 区域事件基数 */
const REGION_BASE: Record<string, number> = {
  上城区: 289,
  拱墅区: 265,
  西湖区: 242,
  滨江区: 218,
  萧山区: 348,
  余杭区: 306,
  富阳区: 132,
  临安区: 108,
  钱塘区: 196,
  临平区: 174,
  桐庐县: 76,
  淳安县: 41,
  建德市: 62
}

/** 模拟实时波动 */
const jitter = (range: number) => Math.round((Math.random() - 0.5) * range)

export function mockKpi(): KpiItem[] {
  return [
    {
      label: '实时在途车辆',
      value: 12846 + jitter(160),
      unit: '辆',
      delta: 3.2,
      icon: 'Van',
      color: '#33d6ff'
    },
    {
      label: '今日人流量(人次)',
      value: 86342 + jitter(900),
      unit: '',
      delta: 1.8,
      icon: 'User',
      color: '#33e6a0'
    },
    {
      label: '在线监测设备',
      value: 3215 + jitter(30),
      unit: '台',
      delta: 0.6,
      icon: 'Cpu',
      color: '#ffd35c'
    },
    {
      label: '今日告警事件',
      value: 27 + jitter(6),
      unit: '起',
      delta: -12.5,
      icon: 'Bell',
      color: '#ff6b6b'
    }
  ]
}

/** 高斯峰叠加，模拟早晚高峰曲线 */
function curve(hours: number[], base: number, peaks: Array<[number, number, number]>, noise: number) {
  return hours.map((h) => {
    const peakValue = peaks.reduce(
      (sum, [center, amplitude, spread]) => sum + amplitude * Math.exp(-((h - center) ** 2) / spread),
      0
    )
    return Math.round(base + peakValue + (Math.random() - 0.5) * noise)
  })
}

export function mockTrend(): TrendData {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  return {
    times: hours.map((h) => `${String(h).padStart(2, '0')}:00`),
    people: curve(hours, 900, [[9, 4600, 8], [18, 4200, 12]], 160),
    vehicle: curve(hours, 600, [[8, 2500, 6], [18, 2900, 10]], 120)
  }
}

export function mockCategory(): NameValue[] {
  return [
    { name: '交通拥堵', value: 268 + jitter(20) },
    { name: '环境监测', value: 206 + jitter(16) },
    { name: '消防告警', value: 184 + jitter(14) },
    { name: '治安事件', value: 152 + jitter(12) },
    { name: '设施故障', value: 128 + jitter(10) },
    { name: '其他事件', value: 86 + jitter(8) }
  ]
}

export function mockRanking(): NameValue[] {
  return DISTRICTS.map((name) => ({ name, value: REGION_BASE[name] + jitter(12) })).sort(
    (a, b) => b.value - a.value
  )
}

export function mockRegions(): NameValue[] {
  return DISTRICTS.map((name) => ({ name, value: REGION_BASE[name] + jitter(10) }))
}
