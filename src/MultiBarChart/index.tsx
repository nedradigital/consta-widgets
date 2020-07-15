import { FormatValue } from '@/common/types'
import { CoreBarChart, UnitPosition } from '@/core/BarChart'

import { transformGroupsToCommonGroups } from './helpers'

export type Column = ReadonlyArray<{ value: number | undefined; color: string }>

export type Group = {
  groupName: string
  values: readonly Column[]
}

type Props = {
  groups: readonly Group[]
  gridTicks: number
  valuesTicks: number
  unit?: string
  unitPosition?: UnitPosition
  isHorizontal?: boolean
  size?: 's' | 'm'
  formatValueForLabel?: FormatValue
}

export const MultiBarChart: React.FC<Props> = ({ size = 'm', groups, ...rest }) => {
  return <CoreBarChart {...rest} groups={transformGroupsToCommonGroups(groups)} size={size} />
}
