import React from 'react'

import { CoreBarChart, UnitPosition } from '@/_private/components/BarChart'
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

  const axisShowPositions = getAxisShowPositions(xAxisShowPosition, yAxisShowPosition)

  return (
    <CoreBarChart
      {...rest}
      groups={transformGroupsToCommonGroups(groups, colors)}
      isHorizontal={true}
      size={size}
      formatValueForLabel={getFormatter(formatValueForLabel)}
      getAxisShowPositions={() => axisShowPositions}
    />
  )
}
