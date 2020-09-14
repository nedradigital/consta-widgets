import React from 'react'

import { CoreBarChart, UnitPosition } from '@/_private/components/BarChart'
import {
  getCommonGroupsMaxColumns,
  getGroupsDomain,
  getValuesDomain,
} from '@/_private/components/BarChart/helpers'
import { defaultRenderGroup } from '@/_private/components/BarChart/renders'
import { FormatValue } from '@/_private/types'

import { getAxisShowPositions, getFormatter, transformGroupsToCommonGroups } from './helpers'

type CommonAxisShowPosition = 'both' | 'none'
export type XAxisShowPosition = 'top' | 'bottom' | CommonAxisShowPosition
export type YAxisShowPosition = 'left' | 'right' | CommonAxisShowPosition

export type Column = number | undefined

export type Group = {
  groupName: string
  values: readonly [Column, Column]
}

type Props = {
  groups: readonly Group[]
  colors: readonly [string, string]
  gridTicks: number
  valuesTicks: number
  size: 's' | 'm'
  xAxisShowPosition: XAxisShowPosition
  yAxisShowPosition: YAxisShowPosition
  unit?: string
  unitPosition?: UnitPosition
  showValues?: boolean
  formatValueForLabel?: FormatValue
}

export const TornadoChart: React.FC<Props> = props => {
  const {
    groups,
    colors,
    size = 'm',
    formatValueForLabel,
    xAxisShowPosition,
    yAxisShowPosition,
    ...rest
  } = props

  const commonGroups = transformGroupsToCommonGroups(groups, colors)
  const groupsDomain = getGroupsDomain(commonGroups)
  const valuesDomain = getValuesDomain({
    groups: commonGroups,
    showReversed: true,
  })
  const maxColumn = getCommonGroupsMaxColumns(commonGroups)
  const axisShowPositions = getAxisShowPositions(xAxisShowPosition, yAxisShowPosition)

  return (
    <CoreBarChart
      {...rest}
      groups={commonGroups}
      groupsDomain={groupsDomain}
      valuesDomain={valuesDomain}
      maxColumn={maxColumn}
      isHorizontal={true}
      size={size}
      showReversed
      formatValueForLabel={getFormatter(formatValueForLabel)}
      getAxisShowPositions={() => axisShowPositions}
      renderGroup={defaultRenderGroup}
    />
  )
}
