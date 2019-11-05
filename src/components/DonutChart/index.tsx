import React, { useLayoutEffect } from 'react'
import useDimensions from 'react-use-dimensions'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import * as d3 from 'd3'

import { ColorGroups } from '@/dashboard/types'

import { Data as DonutData, Donut } from './components/Donut'
import css from './index.css'

export type Data = readonly DonutData[]

type Props = {
  data: Data
  colorGroups: ColorGroups
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
  const [ref, { width, height }, el] = useDimensions()
  const size = width && height ? Math.min(width, height) : 0
  const mainRadius = size / 2
  const sizeDonut = getSizeDonut()

  useLayoutEffect(() => {
    if (mainRadius) {
      d3.select(el)
        .select('svg')
        .attr('viewBox', `${-mainRadius}, ${-mainRadius}, ${mainRadius * 2}, ${mainRadius * 2}`)
    }
  })

  return (
    <div ref={ref} className={css.main}>
      <svg width={size} height={size}>
        {data.slice(0, 3).map((d, index) => {
          const outerRadius = getDonutRadius(mainRadius, index)
          const innerRadius = outerRadius - sizeDonut
          const padAngle = getPadAngle(mainRadius, index)

          return (
            <Donut
              key={index}
              padAngle={padAngle}
              colorGroups={colorGroups}
              data={d}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
            />
          )
        })}
      </svg>
    </div>
  )
}
