import { ColorGroups, FormatValue } from '@/common/types'
import { CoreBarChart, UnitPosition } from '@/core/BarChart'

import { transformGroupsToCoreGroups } from './helpers'

export type Group = {
  groupName: string
  values: ReadonlyArray<{
    colorGroupName: string
    value: number | undefined
  }>
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
      groups={transformGroupsToCoreGroups(groups)}
      showValues={showValues && !isVerticalMultiColumn}
      size={size}
      isHorizontal={isHorizontal}
    />
  )
}
