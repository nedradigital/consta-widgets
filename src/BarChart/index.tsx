import { ColorGroups, FormatValue } from '@/common/types'
import { CoreBarChart, UnitPosition } from '@/core/BarChart'

import { transformGroupsToCommonGroups } from './helpers'

export type Column = {
  colorGroupName: string
  value: number | undefined
}

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
  size?: 's' | 'm' | 'auto'
  showValues?: boolean
  isHorizontal?: boolean
  formatValueForLabel?: FormatValue
}

export const BarChart: React.FC<Props> = props => {
  const { groups, showValues, size = 'm', isHorizontal, ...rest } = props

  const isMultiColumn = groups.some(group => group.values.length > 2)
  const isVerticalMultiColumn = !isHorizontal && isMultiColumn

  return (
    <CoreBarChart
      {...rest}
      groups={transformGroupsToCommonGroups(groups, props.colorGroups)}
      showValues={showValues && !isVerticalMultiColumn}
      size={size}
      isHorizontal={isHorizontal}
    />
  )
}
