import { BarChartParams } from './BarChart'

export type CommonShowPosition = 'both' | 'none'
export type XAxisShowPosition = 'top' | 'bottom' | CommonShowPosition
export type YAxisShowPosition = 'left' | 'right' | CommonShowPosition

export type TornadoChartParams = {
  gridTicks: number
  valuesTicks: number
  xAxisShowPosition: XAxisShowPosition
  yAxisShowPosition: YAxisShowPosition
  size?: BarChartParams['size']
  unitPosition?: BarChartParams['unitPosition']
  showValues?: BarChartParams['showValues']
}
