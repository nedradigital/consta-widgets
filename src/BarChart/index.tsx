import React from 'react'

import { CoreBarChart, Threshold, UnitPosition } from '@/_private/components/BarChart'
import {
  getCommonGroupsMaxColumns,
  getGroupsDomain,
  getValuesDomain,
  isShowReversed,
} from '@/_private/components/BarChart/helpers'
import { defaultRenderGroup } from '@/_private/components/BarChart/renders'
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
  isXAxisLabelsSlanted?: boolean
  threshold?: Threshold
  formatValueForLabel?: FormatValue
}

export const BarChart: React.FC<Props> = props => {
  const { groups, size = 'm', colors, showValues, threshold, ...rest } = props

  const commonGroups = transformGroupsToCommonGroups(groups, colors)
  const isMultiColumn = commonGroups.some(group => group.columns.length > 1)
  const computedShowValues = showValues && (rest.isHorizontal || !isMultiColumn)
  const showReversed = isShowReversed({ groups: commonGroups, threshold: props.threshold })
  const groupsDomain = getGroupsDomain(commonGroups)
  const valuesDomain = getValuesDomain({
    groups: commonGroups,
    threshold: props.threshold,
    showReversed,
  })
  const maxColumn = getCommonGroupsMaxColumns(commonGroups)

  return (
    <CoreBarChart
      {...rest}
      groups={commonGroups}
      groupsDomain={groupsDomain}
      valuesDomain={valuesDomain}
      maxColumn={maxColumn}
      size={size}
      showValues={computedShowValues}
      showReversed={showReversed}
      threshold={threshold}
      renderGroup={defaultRenderGroup}
    />
  )
}
