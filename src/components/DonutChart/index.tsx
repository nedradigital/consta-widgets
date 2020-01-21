import React, { useRef, useState } from 'react'

import { isDefined } from '@gaz/utils/lib/type-guards'
import useComponentSize from '@rehooks/component-size'
import { zip } from 'lodash'

import { LegendItem } from '@/components/LegendItem'
import { Tooltip } from '@/components/Tooltip'
import { ColorGroups, FormatValue } from '@/dashboard/types'

import { Data as DonutData, DataItem, Donut } from './components/Donut'
import css from './index.css'

export type Data = ReadonlyArray<{
  name: string
  colorGroupName: string
  sections: ReadonlyArray<{
    value: number
    showValue?: number
  }>
}>

type Props = {
  data: Data
  colorGroups: ColorGroups
  formatValueForTooltip?: FormatValue
}

type TooltipDataState = {
  value: string
  color: string
  name: string
}

// Максимально кол-во кругов, которые можно отрисовать = 3
const MAX_CIRCLES = 3
const minChartSize: { [key in number]: number } = {
  1: 0,
  2: 100,
  3: 150,
}
const donutSize: { [key in number]: number } = {
  1: 18,
  2: 14,
  3: 10,
}
const paddingBetweenDonuts: { [key in number]: number } = {
  1: 18,
  2: 14,
  3: 10,
}
const getSizeDonut = (countLines: number) => donutSize[countLines]
const getPadding = (countLines: number) => paddingBetweenDonuts[countLines]

const getDonutRadius = (mainRadius: number, index: number, countLines: number) =>
  mainRadius - (getSizeDonut(countLines) + getPadding(countLines)) * index

export const DonutChart: React.FC<Props> = ({ data = [], colorGroups, formatValueForTooltip }) => {
  const [tooltipData, changeTooltipData] = useState<TooltipDataState | null>(null)
  const [mousePosition, changeMousePosition] = useState({ x: 0, y: 0 })

  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const circlesCount = Math.min(Math.max(...data.map(i => i.sections.length)), MAX_CIRCLES)
  const size = width && height ? Math.min(width, height) : 0
  const mainRadius = size / 2
  const sizeDonut = getSizeDonut(circlesCount)
  const viewBox = `${-mainRadius}, ${-mainRadius}, ${mainRadius * 2}, ${mainRadius * 2}`
  const isTooltipVisible = Boolean(tooltipData)

  const handleMouseOver = (d: DataItem) => {
    const value = d.showValue ? d.showValue : d.value

    changeTooltipData({
      value: formatValueForTooltip ? formatValueForTooltip(value) : String(value),
      color: colorGroups[d.colorGroupName],
      name: d.name,
    })
  }

  const handleMouseOut = () => {
    changeTooltipData(null)
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
      <Tooltip isVisible={isTooltipVisible} direction="top" x={mousePosition.x} y={mousePosition.y}>
        {tooltipData ? (
          <LegendItem color={tooltipData.color} fontSize="xs">
            {tooltipData.name}
            <span className={css.tooltipValue}>{tooltipData.value}</span>
          </LegendItem>
        ) : null}
      </Tooltip>
      <svg viewBox={viewBox} onMouseMove={handleMouseMove}>
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
            />
          )
        })}
      </svg>
    </div>
  )
}
