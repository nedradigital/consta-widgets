import React, { useRef, useState } from 'react'

import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import { zip } from 'lodash'

import { Tooltip } from '@/components/Tooltip'
import { TooltipContentForMultipleValues } from '@/components/TooltipContentForMultipleValues'
import { ColorGroups, FormatValue } from '@/dashboard/types'

import { Data as DonutData, Donut, HalfDonut } from './components/Donut'
import { Data as TextData, Text } from './components/Text'
import css from './index.css'

export type Data = ReadonlyArray<{
  name: string
  colorGroupName: string
  sections: ReadonlyArray<{
    value: number
    showValue?: number
  }>
}>

export type HalfDonutData = {
  halfDonut?: HalfDonut
  textData?: TextData
}

type Props = {
  data: Data
  colorGroups: ColorGroups
  formatValueForTooltip?: FormatValue
} & HalfDonutData

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
  const [mousePosition, changeMousePosition] = useState({ x: 0, y: 0 })

  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const circlesCount = Math.min(Math.max(...data.map(i => i.sections.length)), MAX_CIRCLES)
  const size = width && height ? getSize(width, height, halfDonut) : 0
  const mainRadius = size / 2
  const sizeDonut = getSizeDonut(circlesCount, halfDonut)
  const viewBox = `${-mainRadius}, ${-mainRadius}, ${mainRadius * 2}, ${mainRadius * 2}`
  const isTooltipVisible = Boolean(tooltipData.length)

  const handleMouseOver = (d: DonutData) => {
    changeTooltipData(
      d.map(item => {
        const value = item.showValue ? item.showValue : item.value

        return {
          value: formatValueForTooltip ? formatValueForTooltip(value) : String(value),
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
        value: section.value || 0,
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
      }}
    >
      {halfDonut && values.length === 1 && textData && (
        <Text data={textData} maxSize={mainRadius} position={halfDonut} />
      )}
      <Tooltip isVisible={isTooltipVisible} x={mousePosition.x} y={mousePosition.y}>
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
