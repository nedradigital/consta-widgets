import React, { useRef, useState } from 'react'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import useComponentSize from '@rehooks/component-size'

import { Tooltip } from '@/components/Tooltip'
import { ColorGroups } from '@/dashboard/types'

import { Data as DonutData, DataItem, Donut } from './components/Donut'
import css from './index.css'

export type Data = {
  values: DonutData
  name: string
}

type Props = {
  data: readonly Data[]
  colorGroups: ColorGroups
}

type TooltipDataState = {
  value: number
  color: string
  unit: string
  name: string
}

const getSizeDonut = () => getCalculatedSize(16)
const getPadding = () => getCalculatedSize(8)

const getDonutRadius = (mainRadius: number, index: number) =>
  mainRadius - (getSizeDonut() + getPadding()) * index

const MIN_VISIBLE_GAP_WIDTH_RATIO = 0.0002
const revertIndexes = [2, 1, 0] as const
const getPadAngle = (mainRadius: number, index: number) => {
  return getDonutRadius(mainRadius, revertIndexes[index]) * MIN_VISIBLE_GAP_WIDTH_RATIO
}

export const DonutChart: React.FC<Props> = ({ data = [], colorGroups }) => {
  const [tooltipData, changeTooltipData] = useState<TooltipDataState | null>(null)
  const [mousePosition, changeMousePosition] = useState({ x: 0, y: 0 })

  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const size = width && height ? Math.min(width, height) : 0
  const mainRadius = size / 2
  const sizeDonut = getSizeDonut()
  const viewBox = `${-mainRadius}, ${-mainRadius}, ${mainRadius * 2}, ${mainRadius * 2}`
  const isTooltipVisible = Boolean(tooltipData)

  const handleMouseOver = (index: number, d: DataItem) => {
    changeTooltipData({
      value: d.value,
      color: colorGroups[d.colorGroupName],
      unit: d.unit,
      name: data[index].name,
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

  return (
    <div ref={ref} className={css.main}>
      <Tooltip isVisible={isTooltipVisible} direction="top" x={mousePosition.x} y={mousePosition.y}>
        {tooltipData ? (
          <>
            <span className={css.tooltipColor} style={{ background: tooltipData.color }} />
            {tooltipData.name}
            <span className={css.tooltipValue}>
              {tooltipData.value} {tooltipData.unit}
            </span>
          </>
        ) : null}
      </Tooltip>
      <svg viewBox={viewBox} onMouseMove={handleMouseMove}>
        {data.slice(0, 3).map((d, index) => {
          const outerRadius = getDonutRadius(mainRadius, index)
          const innerRadius = outerRadius - sizeDonut
          const padAngle = getPadAngle(mainRadius, index)

          return (
            <Donut
              key={index}
              padAngle={padAngle}
              colorGroups={colorGroups}
              data={d.values}
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
