import { ColorGroups, FormatValue } from '@/common/types'
import { CoreBarChart, UnitPosition } from '@/core/BarChart'

import { transformGroupsToCommonGroups } from './helpers'

export type Column = Record<string, number | undefined>

export type Group = {
  groupName: string
  values: readonly Column[]
}

type Props = {
  groups: readonly Group[]
  colorGroups: ColorGroups
  gridTicks: number
  valuesTicks: number
  unit?: string
  unitPosition?: UnitPosition
  isHorizontal?: boolean
  size?: 's' | 'm'
  formatValueForLabel?: FormatValue
}

export const MultiBarChart: React.FC<Props> = ({ size = 'm', groups, colorGroups, ...rest }) => {
  return (
    <CoreBarChart
      {...rest}
      groups={transformGroupsToCommonGroups(groups, colorGroups)}
      size={size}
    />
  )
}
