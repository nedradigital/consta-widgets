import React, { createRef, useLayoutEffect } from 'react'

import * as d3 from 'd3'

import { ColorGroups } from '@/dashboard/types'

export type DataItem = {
  value: number
  colorGroupName: string
  name: string
}

export type Data = readonly DataItem[]

type Props = {
  data: Data
  colorGroups: ColorGroups
  innerRadius: number
  outerRadius: number
  padAngle: number
  handleMouseOver: (data: DataItem) => void
  handleMouseOut: () => void
  isTooltipVisible: boolean
}

export const Donut: React.FC<Props> = ({
  padAngle,
  colorGroups,
  data,
  innerRadius,
  outerRadius,
  handleMouseOver,
  handleMouseOut,
  isTooltipVisible,
}) => {
  const ref = createRef<SVGGElement>()

  useLayoutEffect(() => {
    if (ref.current) {
      const pieData = d3
        .pie<DataItem>()
        .padAngle(padAngle)
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
        .on('mouseover', d => handleMouseOver(d.data))
        .on('mouseout', handleMouseOut)
        .attr('fill', d => colorGroups[d.data.colorGroupName])
        .attr('d', arc)
        .style('opacity', isTooltipVisible ? 0.4 : 1)
    }
  })

  return <g ref={ref} />
}
