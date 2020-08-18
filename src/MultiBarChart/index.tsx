import React from 'react'

import { CoreBarChart, Threshold, UnitPosition } from '@/_private/components/BarChart'
import { FormatValue } from '@/_private/types'

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
  showValues?: boolean
  isHorizontal?: boolean
  size?: 's' | 'm'
  threshold?: Threshold
  formatValueForLabel?: FormatValue
}

export const MultiBarChart: React.FC<Props> = ({ size = 'm', groups, ...rest }) => {
  return <CoreBarChart {...rest} groups={transformGroupsToCommonGroups(groups)} size={size} />
}
