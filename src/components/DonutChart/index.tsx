/* tslint:disable:readonly-array */
import React, { useLayoutEffect } from 'react'
import useDimensions from 'react-use-dimensions'

import * as d3 from 'd3'

import { Data as DonutData, Donut } from './components/Donut'
import css from './index.css'

export type Colors = { [key in string]: string }

export type Data = DonutData[]

type Props = {
  data: Data
  colors: Colors
}

// TODO дефолтные ширина доната и отступы, которые нужно потом подстроить под адаптив
const sizeDonut = 16
const padding = 8

export const DonutChart: React.FC<Props> = ({ data = [], colors }) => {
  const [ref, { width, height }, el] = useDimensions()
  const size = Math.min(width, height)
  const mainRadius = size / 2

  useLayoutEffect(() => {
    d3.select(el)
      .select('svg')
      .attr('viewBox', `${-mainRadius}, ${-mainRadius}, ${mainRadius * 2}, ${mainRadius * 2}`)
  })

  return (
    <div ref={ref} className={css.main}>
      <svg width={size} height={size}>
        {data.map((d, index) => {
          const radius = mainRadius - (sizeDonut + padding) * index

          return (
            <Donut
              key={index}
              colors={colors}
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
