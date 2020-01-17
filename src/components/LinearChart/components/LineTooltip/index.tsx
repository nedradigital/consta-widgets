import React from 'react'

import { isDefined, isNotNil } from '@gaz/utils/lib/type-guards'

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

  const lineValues = tooltipItems.map(line => line.value).filter(isNotNil)
  const maxSecondaryValue = lineValues.length ? Math.max(...lineValues) : undefined

  const getTooltipPosition = ({
    xValue,
    yValue,
  }: {
    xValue: number | undefined
    yValue: number | undefined
  }) => {
    const { left, top, width, height } = anchorEl.getBoundingClientRect()

    return {
      // Для пропусков располагаем тултип по центру
      x: left + (isDefined(xValue) ? scaleX(xValue) : width / 2),
      y: top + (isDefined(yValue) ? scaleY(yValue) : height / 2),
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
