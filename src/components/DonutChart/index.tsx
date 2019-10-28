import React, { useLayoutEffect } from 'react'
import useDimensions from 'react-use-dimensions'

import { getCalculatedSize } from '@gaz/utils'
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

export const DonutChart: React.FC<Props> = ({ data = [], colorGroups }) => {
  const [ref, { width, height }, el] = useDimensions()
  const size = width && height ? Math.min(width, height) : 0
  const mainRadius = size / 2
  const sizeDonut = getSizeDonut()
  const padding = getPadding()

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
        {data.map((d, index) => {
          const radius = mainRadius - (sizeDonut + padding) * index

          return (
            <Donut
              key={index}
              colorGroups={colorGroups}
              data={d}
              innerRadius={radius - sizeDonut}
              outerRadius={radius}
            />
          )
        })}
      </svg>
    </div>
  )
}
