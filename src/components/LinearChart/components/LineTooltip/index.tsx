import React from 'react'

import { isDefined, isNotNil } from '@gaz/utils/lib/type-guards'
import * as _ from 'lodash'

import { Tooltip } from '@/components/Tooltip'
import { TooltipContentForMultipleValues } from '@/components/TooltipContentForMultipleValues'
import { ColorGroups, FormatValue } from '@/dashboard/types'

import { HoveredMainValue, Line, ScaleLinear } from '../..'

export type HoverLine = {
  color: string
  formattedValue: string
  name: string
}

type Props = {
  lines: readonly Line[]
  isHorizontal: boolean
  anchorEl: Element | null
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  colorGroups: ColorGroups
  hoveredMainValue: HoveredMainValue
  formatValueForLabel: FormatValue
  formatValueForTooltip?: FormatValue
  formatValueForTooltipTitle?: FormatValue
}

export const LineTooltip: React.FC<Props> = ({
  lines,
  anchorEl,
  isHorizontal,
  scaleX,
  scaleY,
  hoveredMainValue,
  colorGroups,
  formatValueForLabel,
  formatValueForTooltipTitle,
  formatValueForTooltip = String,
}) => {
  if (!anchorEl || !isNotNil(hoveredMainValue)) {
    return null
  }

  const mainValueKey = isHorizontal ? 'x' : 'y'
  const secondaryValueKey = isHorizontal ? 'y' : 'x'

  const tooltipItems = lines.map(line => {
    const item = line.values.find(v => v[mainValueKey] === hoveredMainValue)

    return {
      color: colorGroups[line.colorGroupName],
      name: line.lineName,
      value: item ? item[secondaryValueKey] : undefined,
    }
  })

  const maxSecondaryValue = Math.max(...tooltipItems.map(line => line.value).filter(isDefined))

  const getTooltipPosition = ({ xValue, yValue }: { xValue: number; yValue: number }) => {
    const { left, top } = anchorEl.getBoundingClientRect()

    return {
      x: scaleX(xValue) + left,
      y: scaleY(yValue) + top,
    }
  }

  const position = isHorizontal
    ? getTooltipPosition({ xValue: hoveredMainValue, yValue: maxSecondaryValue })
    : getTooltipPosition({ xValue: maxSecondaryValue, yValue: hoveredMainValue })

  const title = (formatValueForTooltipTitle || formatValueForLabel)(hoveredMainValue)

  return (
    <Tooltip isVisible x={position.x} y={position.y} direction={isHorizontal ? 'top' : 'right'}>
      <TooltipContentForMultipleValues
        title={title}
        items={tooltipItems.map(item => ({
          color: item.color,
          name: item.name,
          value: isNotNil(item.value) ? formatValueForTooltip(item.value) : '—',
        }))}
      />
    </Tooltip>
  )
}
