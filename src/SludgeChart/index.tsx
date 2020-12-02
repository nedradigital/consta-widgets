import React from 'react'

import { CoreBarChart, OnMouseHoverColumn } from '@/_private/components/BarChart'
import {
  getCommonGroupsMaxColumns,
  getGroupsDomain,
  getValuesDomain,
} from '@/_private/components/BarChart/helpers'
import { defaultRenderGroup } from '@/_private/components/BarChart/renders'
import { FormatValue } from '@/_private/types'
import { Group } from '@/MultiBarChart'
import { transformGroupsToCommonGroups } from '@/MultiBarChart/helpers'

type Props = {
  groups: readonly Group[]
  activeSectionIndex?: number
  activeGroup?: string
  withScroll?: boolean
  formatValueForLabel?: FormatValue
  formatValueForTooltip?: FormatValue
  onMouseEnterColumn?: OnMouseHoverColumn
  onMouseLeaveColumn?: OnMouseHoverColumn
}

export const SludgeChart: React.FC<Props> = ({ groups, ...rest }) => {
  const commonGroups = transformGroupsToCommonGroups(groups)
  const groupsDomain = getGroupsDomain(commonGroups)
  const valuesDomain = getValuesDomain({
    groups: commonGroups,
    showReversed: false,
  })
  const maxColumn = getCommonGroupsMaxColumns(commonGroups)

  return (
    <CoreBarChart
      {...rest}
      gridRowGap={0}
      groups={commonGroups}
      groupsDomain={groupsDomain}
      valuesDomain={valuesDomain}
      maxColumn={maxColumn}
      gridTicks={0}
      valuesTicks={0}
      size="l"
      isHorizontal
      renderGroup={defaultRenderGroup}
    />
  )
}
