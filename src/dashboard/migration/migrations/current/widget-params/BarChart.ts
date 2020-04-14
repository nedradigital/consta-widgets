const sizes = ['s', 'm'] as const
const unitPositions = ['left', 'bottom', 'left-and-bottom', 'none'] as const

export type BarChartParams = {
  orientation: 'horizontal' | 'vertical'
  size: typeof sizes[number]
  showValues: boolean
  gridTicks: number
  valuesTicks: number
  unitPosition: typeof unitPositions[number]
}

export const barChartParams = {
  sizes,
  unitPositions,
}
