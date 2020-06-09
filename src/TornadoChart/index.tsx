import { ColorGroups, FormatValue } from '@/common/types'
import { CoreBarChart, UnitPosition } from '@/core/BarChart'

import { getAxisShowPositions, getFormatter, getGroupsDomain, getValuesDomain } from './helpers'

type CommonAxisShowPosition = 'both' | 'none'
export type XAxisShowPosition = 'top' | 'bottom' | CommonAxisShowPosition
export type YAxisShowPosition = 'left' | 'right' | CommonAxisShowPosition

export type Group = {
  groupName: string
  values: ReadonlyArray<Record<string, number | undefined>>
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
  const { size = 'm', formatValueForLabel, xAxisShowPosition, yAxisShowPosition, ...rest } = props

  const axisShowPositions = getAxisShowPositions(xAxisShowPosition, yAxisShowPosition)

  return (
    <CoreBarChart
      {...rest}
      isTornado={true}
      isHorizontal={true}
      size={size}
      formatValueForLabel={getFormatter(formatValueForLabel)}
      getGroupSize={({ columnWidth }) => columnWidth}
      getGroupsDomain={getGroupsDomain}
      getValuesDomain={getValuesDomain}
      getAxisShowPositions={() => axisShowPositions}
    />
  )
}
