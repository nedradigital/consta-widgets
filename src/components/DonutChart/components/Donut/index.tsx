/* tslint:disable:readonly-array */
import React, { createRef, useLayoutEffect } from 'react'

import * as d3 from 'd3'

import { Colors } from '../../'

type DataItem = {
  color: string
  value: number
}

export type Data = DataItem[]

type Props = {
  data: Data
  colors: Colors
  innerRadius: number
  outerRadius: number
}

export const Donut: React.FC<Props> = ({ colors, data, innerRadius, outerRadius }) => {
  const ref = createRef<SVGGElement>()

  useLayoutEffect(() => {
    if (ref.current) {
      const pieData = d3
        .pie<DataItem>()
        .sort(null)
        .value(d => d.value)(data)

      const arc = d3
        .arc<d3.PieArcDatum<DataItem>>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)

      d3.select(ref.current)
        .selectAll('path')
        .data(pieData)
        .join('path')
        .attr('fill', d => colors[d.data.color])
        .attr('d', arc)
    }
  })

  return <g ref={ref} />
}
