import { ColorGroups, FormatValue } from '@/common/types'
import { CoreBarChart, UnitPosition } from '@/core/BarChart'

import { getAxisShowPositions, getFormatter, transformGroupsToCommonGroups } from './helpers'

type CommonAxisShowPosition = 'both' | 'none'
export type XAxisShowPosition = 'top' | 'bottom' | CommonAxisShowPosition
export type YAxisShowPosition = 'left' | 'right' | CommonAxisShowPosition

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
    colorGroups,
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
      groups={transformGroupsToCommonGroups(groups, colorGroups)}
      isHorizontal={true}
      size={size}
      formatValueForLabel={getFormatter(formatValueForLabel)}
      getAxisShowPositions={() => axisShowPositions}
    />
  )
}
