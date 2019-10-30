import React, { createRef, useLayoutEffect } from 'react'

import * as d3 from 'd3'

import { ColorGroups } from '@/dashboard/types'

type DataItem = {
  value: number
  colorGroupName: string
}

export type Data = readonly DataItem[]

type Props = {
  data: Data
  colorGroups: ColorGroups
  innerRadius: number
  outerRadius: number
}

export const Donut: React.FC<Props> = ({ colorGroups, data, innerRadius, outerRadius }) => {
  const ref = createRef<SVGGElement>()

  useLayoutEffect(() => {
    if (ref.current) {
      const pieData = d3
        .pie<DataItem>()
        .sort(null)
        .value(d => d.value)([...data])

      const arc = d3
        .arc<d3.PieArcDatum<DataItem>>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)

      d3.select(ref.current)
        .selectAll('path')
        .data(pieData)
        .join('path')
        .attr('fill', d => colorGroups[d.data.colorGroupName])
        .attr('d', arc)
    }
  })

  return <g ref={ref} />
}
