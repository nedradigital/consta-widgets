import { Data as BarChartData } from '@/components/BarChart'
import { Data as DonutChartData } from '@/components/DonutChart'
import { Data as LegendData } from '@/components/Legend'
import { Line } from '@/components/LinearChart'
import { Data as MultiBarChartData } from '@/components/MultiBarChart'
import { Data as ProgressBarData } from '@/components/ProgressBar'
import { Data as PyramidData } from '@/components/PyramidChart'
import { Data as StatsData } from '@/components/Stats'
import { Data as TableLegendData } from '@/components/TableLegend'
import { Data as TrafficLightData } from '@/components/TrafficLight'
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
  Pyramid,
  Text,
  TableLegend,
  TrafficLight,
  MultiBarChart,
  ProgressBar,
  Legend,
}

export type ColorGroups = { [key: string]: string }
type WithColorGroups = { colorGroups: ColorGroups }

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
  [DataType.Donut]: {
    data: DonutChartData
  } & WithColorGroups
  [DataType.BarChart]: {
    data: readonly BarChartData[]
  } & WithColorGroups
  [DataType.LinearChart]: {
    data: readonly Line[]
  } & WithColorGroups
  [DataType.Pyramid]: readonly PyramidData[]
  [DataType.Text]: string
  [DataType.TableLegend]: TableLegendData
  [DataType.TrafficLight]: TrafficLightData
  [DataType.ProgressBar]: {
    data: readonly ProgressBarData[]
  } & WithColorGroups
  [DataType.MultiBarChart]: {
    data: MultiBarChartData
  } & WithColorGroups
  [DataType.Legend]: {
    data: LegendData
  } & WithColorGroups
}

export type Dataset = {
  name: string
  id: string
  type: DataType
  formatLabel?: (n: number) => string
}

export type Data = { [k: string]: DataMap[DataType] }

export type MarginSize = 's' | 'm' | 'l' | 'xl'

export type Settings = {
  cols?: number
  margin?: MarginSize
}
