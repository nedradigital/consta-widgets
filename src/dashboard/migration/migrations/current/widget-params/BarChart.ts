import { Orientation, Size } from '@/components/BarChart'
import { UnitPosition } from '@/components/BarChartAxis'

export type BarChartParams = {
  orientation: Orientation
  size: Size
  showValues: boolean
  gridTicks: number
  valuesTicks: number
  unitPosition: UnitPosition
}
