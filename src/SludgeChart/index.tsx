import { CoreBarChart, OnMouseHoverColumn } from '@/_private/components/BarChart'
import { FormatValue } from '@/_private/types'
import { Group } from '@/MultiBarChart'
import { transformGroupsToCommonGroups } from '@/MultiBarChart/helpers'

type Props = {
  groups: readonly Group[]
  activeSectionIndex?: number
  activeGroup?: string
  formatValueForLabel?: FormatValue
  onMouseEnterColumn?: OnMouseHoverColumn
  onMouseLeaveColumn?: OnMouseHoverColumn
}

export const SludgeChart: React.FC<Props> = ({ groups, ...rest }) => {
  return (
    <CoreBarChart
      {...rest}
      groups={transformGroupsToCommonGroups(groups)}
      gridTicks={0}
      valuesTicks={0}
      size="l"
      isHorizontal
      isDense
    />
  )
}
