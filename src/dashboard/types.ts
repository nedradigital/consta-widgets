import { Data as BarChartData } from '@/components/BarChart'
import { Data as DonutChartData } from '@/components/DonutChart'
import { Status } from '@/ui/Badge'

export enum DataType {
  Chart2D,
  PieChart,
  Number,
  NumberWithPercentAndStatus,
  Donut,
  BarChart,
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
  [DataType.Donut]: DonutChartData
  // tslint:disable-next-line:readonly-array
  [DataType.BarChart]: BarChartData[]
}

export type Dataset = {
  type: DataType
  name: string
  id: string
}

export type Data = { [k: string]: DataMap[DataType] }
