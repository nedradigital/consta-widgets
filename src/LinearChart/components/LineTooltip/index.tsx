import React from 'react'

import { isDefined, isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import { Position } from '@gpn-design/uikit/Popover'
import { Tooltip } from '@gpn-design/uikit/Tooltip'

import { FormatValue } from '@/common/types'
import { TooltipContentForMultipleValues } from '@/core/TooltipContentForMultipleValues'

import { Boundary, HoveredMainValue, Item, Line, ScaleLinear, Threshold } from '../..'
import { getBoundary } from '../../helpers'
import { THRESHOLD_COLOR } from '../Threshold'

type Props = {
  lines: readonly Line[]
  isHorizontal: boolean
  anchorEl: Element | null
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  boundaries?: readonly Boundary[]
  hoveredMainValue: HoveredMainValue
  threshold?: Threshold
  formatValueForLabel: FormatValue
  formatValueForTooltip?: FormatValue
  formatValueForTooltipTitle?: FormatValue
}

type TooltipItem = {
  color?: string
  name: string
  value: number | null
}

export const LineTooltip: React.FC<Props> = ({
  lines,
  anchorEl,
  isHorizontal,
  scaleX,
  scaleY,
  hoveredMainValue,
  boundaries,
  threshold,
  formatValueForLabel,
  formatValueForTooltipTitle,
  formatValueForTooltip = String,
}) => {
  if (!anchorEl || !isNotNil(hoveredMainValue)) {
    return null
  }

  const mainValueKey = isHorizontal ? 'x' : 'y'
  const secondaryValueKey = isHorizontal ? 'y' : 'x'
  const isItemHovered = (item: Item) => item[mainValueKey] === hoveredMainValue
  const getSecondaryValue = (item?: Item) => (item ? item[secondaryValueKey] : null)

  const tooltipItems: readonly TooltipItem[] = lines.map(line => {
    const item = line.values.find(isItemHovered)
    const secondaryValue = getSecondaryValue(item)

    const getItemColor = () => {
      if (line.withBoundaries) {
        const boundaryColor =
          (boundaries && item && getBoundary({ boundaries, item, isHorizontal })?.color) ??
          line.color

        return isNotNil(secondaryValue) ? boundaryColor : undefined
      }

      return line.color
    }
    return {
      color: getItemColor(),
      name: line.lineName,
      value: secondaryValue,
    }
  })

  const thresholdItems: readonly TooltipItem[] = threshold
    ? [threshold.max, threshold.min].filter(isDefined).map((thresholdLine, idx) => {
        const item = thresholdLine.values.find(isItemHovered)
        const defaultName = threshold.min
          ? `${idx === 0 ? 'Верхнее' : 'Нижнее'} пороговое значение`
          : 'Пороговое значение'

        return {
          color: THRESHOLD_COLOR,
          name: thresholdLine.name || defaultName,
          value: getSecondaryValue(item),
        }
      })
    : []

  const lineValues = tooltipItems.map(line => line.value).filter(isNotNil)
  const maxSecondaryValue = lineValues.length ? Math.max(...lineValues) : undefined

  const getTooltipPosition = ({
    xValue,
    yValue,
  }: {
    xValue: number | undefined
    yValue: number | undefined
  }): Position => {
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
    <Tooltip
      size="l"
      position={position}
      direction={isHorizontal ? 'upCenter' : 'rightCenter'}
      isInteractive={false}
    >
      <TooltipContentForMultipleValues
        title={title}
        items={[...tooltipItems, ...thresholdItems].map(item => ({
          color: item.color,
          name: item.name,
          value: item.value,
        }))}
        formatValueForTooltip={formatValueForTooltip}
      />
    </Tooltip>
  )
}
