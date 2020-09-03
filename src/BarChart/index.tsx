import React from 'react'

import { CoreBarChart, Threshold, UnitPosition } from '@/_private/components/BarChart'
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
  threshold?: Threshold
  formatValueForLabel?: FormatValue
}

export const BarChart: React.FC<Props> = props => {
  const { groups, size = 'm', colors, ...rest } = props

  return (
    <CoreBarChart {...rest} groups={transformGroupsToCommonGroups(groups, colors)} size={size} />
  )
}
