import React, { useRef, useState } from 'react'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import useComponentSize from '@rehooks/component-size'
import { zip } from 'lodash'

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

const getSizeDonut = () => getCalculatedSize(16)
const getPadding = () => getCalculatedSize(8)

const getDonutRadius = (mainRadius: number, index: number) =>
  mainRadius - (getSizeDonut() + getPadding()) * index

export const DonutChart: React.FC<Props> = ({ data = [], colorGroups, formatValueForTooltip }) => {
  const [tooltipData, changeTooltipData] = useState<TooltipDataState | null>(null)
  const [mousePosition, changeMousePosition] = useState({ x: 0, y: 0 })

  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const size = width && height ? Math.min(width, height) : 0
  const mainRadius = size / 2
  const sizeDonut = getSizeDonut()
  const viewBox = `${-mainRadius}, ${-mainRadius}, ${mainRadius * 2}, ${mainRadius * 2}`
  const isTooltipVisible = Boolean(tooltipData)
  const maxCirclesCount = Math.min(...data.map(i => i.sections.length), 3)

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
      item.sections.slice(0, maxCirclesCount).map(section => ({
        colorGroupName: item.colorGroupName,
        name: item.name,
        value: section.value || 0,
        showValue: section.showValue,
      }))
    )
  ) as readonly DonutData[]

  return (
    <div ref={ref} className={css.main}>
      <Tooltip isVisible={isTooltipVisible} direction="top" x={mousePosition.x} y={mousePosition.y}>
        {tooltipData ? (
          <>
            <span className={css.tooltipColor} style={{ background: tooltipData.color }} />
            {tooltipData.name}
            <span className={css.tooltipValue}>{tooltipData.value}</span>
          </>
        ) : null}
      </Tooltip>
      <svg viewBox={viewBox} onMouseMove={handleMouseMove}>
        {values.map((d, index) => {
          const outerRadius = getDonutRadius(mainRadius, index)
          const innerRadius = outerRadius - sizeDonut

          return (
            <Donut
              key={index}
              colorGroups={colorGroups}
              data={d}
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
