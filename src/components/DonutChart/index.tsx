import React, { useRef, useState } from 'react'

import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import { zip } from 'lodash'

import { Tooltip } from '@/components/Tooltip'
import { TooltipContentForMultipleValues } from '@/components/TooltipContentForMultipleValues'
import { ColorGroups, FormatValue } from '@/dashboard'
import { getFormattedValue } from '@/utils/chart'
import { PositionState } from '@/utils/tooltips'

import { Data as DonutData, Donut, HalfDonut } from './components/Donut'
import { Data as TextData, DonutText } from './components/Text'
import css from './index.css'

export type Data = {
  data: ReadonlyArray<{
    name: string
    colorGroupName: string
    sections: ReadonlyArray<{
      value: number | null
      showValue?: number
    }>
  }>
  colorGroups: ColorGroups
  textData?: TextData
  formatValueForTooltip?: FormatValue
}

type Props = Data & {
  halfDonut?: HalfDonut
}

type TooltipDataState = ReadonlyArray<{
  value: string
  color: string
  name: string
}>

// Максимально кол-во кругов, которые можно отрисовать = 3
const MAX_CIRCLES = 3
const minChartSize: { [key in number]: number } = {
  1: 42,
  2: 100,
  3: 150,
}
const donutSize: { [key in number]: number } = {
  1: 18,
  2: 14,
  3: 10,
}
const paddingBetweenDonuts: { [key in number]: number } = {
  1: 0,
  2: 12,
  3: 16,
}
const getSizeDonut = (countLines: number, halfDonut?: HalfDonut) =>
  halfDonut ? 16 : donutSize[countLines]
const getPadding = (countLines: number) => paddingBetweenDonuts[countLines]

const getDonutRadius = (mainRadius: number, index: number, countLines: number) =>
  mainRadius - (getSizeDonut(countLines) + getPadding(countLines)) * index

const getSize = (width: number, height: number, halfDonut?: HalfDonut) => {
  if (!halfDonut) {
    return Math.min(width, height)
  }

  if (['left', 'right'].includes(halfDonut)) {
    return Math.min(width * 2, height)
  }

  return Math.min(width, height * 2)
}

export const DonutChart: React.FC<Props> = ({
  data = [],
  colorGroups,
  formatValueForTooltip,
  halfDonut,
  textData,
}) => {
  const [tooltipData, changeTooltipData] = useState<TooltipDataState>([])
  const [mousePosition, changeMousePosition] = useState<PositionState>()

  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const isHalfDonutHorizontal = halfDonut === 'top' || halfDonut === 'bottom'
  const isHalfDonutVertical = halfDonut === 'right' || halfDonut === 'left'
  const circlesCount = Math.min(Math.max(...data.map(i => i.sections.length)), MAX_CIRCLES)
  const size = width && height ? getSize(width, height, halfDonut) : 0
  const mainRadius = size / 2
  const sizeDonut = getSizeDonut(circlesCount, halfDonut)
  const svgOffsetX = halfDonut === 'left' ? 0 : -mainRadius
  const svgOffsetY = halfDonut === 'top' ? 0 : -mainRadius
  const svgWidth = isHalfDonutVertical ? mainRadius : size
  const svgHeight = isHalfDonutHorizontal ? mainRadius : size
  const viewBox = `${svgOffsetX}, ${svgOffsetY}, ${svgWidth}, ${svgHeight}`
  const isTooltipVisible = Boolean(tooltipData.length)

  const handleMouseOver = (d: DonutData) => {
    changeTooltipData(
      d.map(item => {
        const itemValue = isDefined(item.showValue) ? item.showValue : item.value
        const formattedValue = getFormattedValue(itemValue, formatValueForTooltip)

        return {
          value: formattedValue,
          color: colorGroups[item.colorGroupName],
          name: item.name,
        }
      })
    )
  }

  const handleMouseOut = () => {
    changeTooltipData([])
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    changeMousePosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const values = zip(
    ...data.map(item =>
      item.sections.slice(0, circlesCount).map(section => ({
        colorGroupName: item.colorGroupName,
        name: item.name,
        value: section.value,
        showValue: section.showValue,
      }))
    )
  ) as readonly DonutData[]

  return (
    <div
      ref={ref}
      className={css.main}
      style={{
        ['--min-size' as string]: `${minChartSize[circlesCount]}px`,
        ['--donut-width' as string]: `${sizeDonut}px`,
      }}
    >
      {halfDonut && values.length === 1 && textData && (
        <DonutText data={textData} maxSize={mainRadius} position={halfDonut} />
      )}
      <Tooltip isVisible={isTooltipVisible} position={mousePosition}>
        <TooltipContentForMultipleValues items={tooltipData} />
      </Tooltip>
      <svg
        className={classnames(
          css.svg,
          halfDonut &&
            {
              left: css.halfLeft,
              right: css.halfRight,
              top: css.halfTop,
              bottom: css.halfBottom,
            }[halfDonut]
        )}
        viewBox={viewBox}
        onMouseMove={handleMouseMove}
      >
        {values.map((d, index) => {
          const outerRadius = getDonutRadius(mainRadius, index, circlesCount)
          const innerRadius = outerRadius - sizeDonut

          return (
            <Donut
              key={index}
              colorGroups={colorGroups}
              data={d.filter(isDefined)}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
              isTooltipVisible={isTooltipVisible}
              halfDonut={halfDonut}
            />
          )
        })}
      </svg>
    </div>
  )
}
