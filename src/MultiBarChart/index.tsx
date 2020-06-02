import { ColorGroups, FormatValue } from '@/common/types'
import { CoreBarChart, UnitPosition } from '@/core/BarChart'

export type Group = {
  groupName: string
  values: ReadonlyArray<Record<string, number | undefined>>
}

type Props = {
  groups: readonly Group[]
  colorGroups: ColorGroups
  gridTicks: number
  valuesTicks: number
  unit?: string
  unitPosition?: UnitPosition
  hasRatio?: boolean
  isHorizontal?: boolean
  size?: 's' | 'm'
  formatValueForLabel?: FormatValue
}

export const MultiBarChart: React.FC<Props> = ({ size = 'm', ...rest }) => {
  return <CoreBarChart {...rest} size={size} />
}
