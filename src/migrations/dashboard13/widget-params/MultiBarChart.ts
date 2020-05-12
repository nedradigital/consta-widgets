import { BarChartParams } from './BarChart'

export type MultiBarChartParams = {
  orientation: BarChartParams['orientation']
  hasRatio: boolean
  gridTicks: number
  valuesTicks: number
  unitPosition: BarChartParams['unitPosition']
}
