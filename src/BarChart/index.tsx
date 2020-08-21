import React from 'react'

import { CoreBarChart, UnitPosition } from '@/_private/components/BarChart'
import { FormatValue } from '@/_private/types'

import { transformGroupsToCommonGroups } from './helpers'

export type Column = number | undefined

export type Group = {
  groupName: string
  values: readonly Column[]
}

type Props = {
  groups: readonly Group[]
  colors: readonly string[]
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
  const { groups, showValues, size = 'm', isHorizontal, colors, ...rest } = props

  const isMultiColumn = groups.some(group => group.values.length > 2)
  const isVerticalMultiColumn = !isHorizontal && isMultiColumn

  return (
    <CoreBarChart
      {...rest}
      groups={transformGroupsToCommonGroups(groups, colors)}
      showValues={showValues && !isVerticalMultiColumn}
      size={size}
      isHorizontal={isHorizontal}
    />
  )
}
