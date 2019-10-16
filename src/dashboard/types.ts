import { Data as BarChartData } from '@/components/BarChart'
import { Data as DonutChartData } from '@/components/DonutChart'
import { Line } from '@/components/LinearChart'
import { Data as StatsData } from '@/components/Stats'
import { Status } from '@/ui/Badge'

export enum DataType {
  Chart2D,
  PieChart,
  Number,
  NumberWithPercentAndStatus,
  Stats,
  Donut,
  BarChart,
  LinearChart,
}

export type DataMap = {
  [DataType.Chart2D]: {
    values: readonly number[]
  }
  [DataType.PieChart]: {
    values: readonly number[]
    color: readonly string[]
  }
  [DataType.Number]: number
  [DataType.NumberWithPercentAndStatus]: {
    value: number
    percentage: number
    status: Status
  }
  [DataType.Stats]: StatsData
  [DataType.Donut]: DonutChartData
  // tslint:disable-next-line:readonly-array
  [DataType.BarChart]: BarChartData[]
  // tslint:disable-next-line:readonly-array
  [DataType.LinearChart]: Line[]
}

export type Dataset = {
  type: DataType
  name: string
  id: string
}

export type Data = { [k: string]: DataMap[DataType] }

export type MarginSize = 's' | 'm' | 'l' | 'xl'

export type Settings = {
  cols?: number
  margin?: MarginSize
}
