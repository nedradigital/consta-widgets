import React, { useRef, useState } from 'react'

import { createArrayOfIndexes } from '@csssr/gpn-utils/lib/array'
import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import { zip } from 'lodash'

import { ColorGroups, FormatValue } from '@/common/types'
import { getFormattedValue } from '@/common/utils/chart'
import { PositionState } from '@/common/utils/tooltips'
import { Tooltip } from '@/Tooltip'
import { TooltipContentForMultipleValues } from '@/TooltipContentForMultipleValues'

import { Data as DonutData, Donut, HalfDonut } from './components/Donut'
import { Data as TextData, DonutText } from './components/Text'
import {
  getChartSize,
  getDonutRadius,
  getMinChartSize,
  getSizeDonut,
  isHalfDonutHorizontal as getIsHalfDonutHorizontal,
  isHalfDonutVertical as getIsHalfDonutVertical,
  MAX_CIRCLES_TO_RENDER,
} from './helpers'
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

const halfDonutClasses: Record<NonNullable<HalfDonut>, string> = {
  top: css.halfTop,
  right: css.halfRight,
  bottom: css.halfBottom,
  left: css.halfLeft,
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
  const isHalfDonutHorizontal = getIsHalfDonutHorizontal(halfDonut)
  const isHalfDonutVertical = getIsHalfDonutVertical(halfDonut)
  const circlesCount = Math.min(
    Math.max(...data.map(i => i.sections.length)),
    MAX_CIRCLES_TO_RENDER
  )
  const size = width && height ? getChartSize({ width, height, halfDonut }) : 0
  const mainRadius = size / 2
  const sizeDonut = getSizeDonut(circlesCount, isDefined(textData), halfDonut)
  const svgOffsetX = halfDonut === 'left' ? 0 : -mainRadius
  const svgOffsetY = halfDonut === 'top' ? 0 : -mainRadius
  const svgWidth = isHalfDonutVertical ? mainRadius : size
  const svgHeight = isHalfDonutHorizontal ? mainRadius : size
  const viewBox = `${svgOffsetX}, ${svgOffsetY}, ${svgWidth}, ${svgHeight}`
  const shadowSize = Math.max(width, height) - sizeDonut * 2
  const isTooltipVisible = Boolean(tooltipData.length)

  const linesRadiuses = createArrayOfIndexes(circlesCount).map(index => {
    const outerRadius = getDonutRadius(mainRadius, index, circlesCount)
    const innerRadius = outerRadius - sizeDonut

    return {
      outerRadius,
      innerRadius,
    }
  })

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

  const minChartSize = getMinChartSize(circlesCount, isDefined(textData), halfDonut)
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
        ['--min-size' as string]: `${minChartSize}px`,
        ['--donut-width' as string]: `${sizeDonut}px`,
      }}
    >
      {values.length === 1 && textData && (
        <DonutText
          data={textData}
          radius={linesRadiuses[0].innerRadius}
          lineWidth={sizeDonut}
          halfDonut={halfDonut}
        />
      )}
      <Tooltip isVisible={isTooltipVisible} position={mousePosition}>
        <TooltipContentForMultipleValues items={tooltipData} />
      </Tooltip>
      {halfDonut && (
        <div
          className={classnames(css.shadow, halfDonut && halfDonutClasses[halfDonut])}
          style={{
            width: shadowSize,
            height: shadowSize,
          }}
        />
      )}
      <svg
        className={classnames(css.svg, halfDonut && halfDonutClasses[halfDonut])}
        viewBox={viewBox}
        onMouseMove={handleMouseMove}
      >
        {values.map((d, index) => {
          const { outerRadius, innerRadius } = linesRadiuses[index]

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
