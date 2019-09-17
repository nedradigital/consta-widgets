import { Status } from '@/ui/Badge'

export enum DataType {
  Chart2D,
  PieChart,
  Number,
  NumberWithPercentAndStatus,
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
}

export type Dataset = {
  type: DataType
  name: string
  id: string
}

export type Data = { [k: string]: DataMap[DataType] }
