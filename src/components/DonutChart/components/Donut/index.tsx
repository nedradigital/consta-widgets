import React from 'react'

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
  const pieData = d3
    .pie<DataItem>()
    .padAngle(padAngle)
    .sort(null)
    .value(d => d.value)([...data])

  const arc = d3
    .arc<d3.PieArcDatum<DataItem>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

  return (
    <g>
      {pieData.map((pieDatum, idx) => (
        <path
          key={idx}
          d={arc(pieDatum) || undefined}
          fill={colorGroups[pieDatum.data.colorGroupName]}
          onMouseOver={() => handleMouseOver(pieDatum.data)}
          onMouseOut={handleMouseOut}
          style={{
            opacity: isTooltipVisible ? 0.4 : 1,
          }}
        />
      ))}
    </g>
  )
}
