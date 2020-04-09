import { Orientation } from '@/components/BarChart'
import { UnitPosition } from '@/components/BarChartAxis'

export type MultiBarChartParams = {
  orientation: Orientation
  hasRatio: boolean
  gridTicks: number
  valuesTicks: number
  unitPosition: UnitPosition
}
