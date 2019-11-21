import React, { useRef } from 'react'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import useComponentSize from '@rehooks/component-size'

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
  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const size = width && height ? Math.min(width, height) : 0
  const mainRadius = size / 2
  const sizeDonut = getSizeDonut()
  const viewBox = `${-mainRadius}, ${-mainRadius}, ${mainRadius * 2}, ${mainRadius * 2}`

  return (
    <div ref={ref} className={css.main}>
      <svg viewBox={viewBox}>
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
