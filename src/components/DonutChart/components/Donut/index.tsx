import React from 'react'

import * as d3 from 'd3'

import { ColorGroups } from '@/dashboard/types'

export type DataItem = {
  value: number
  colorGroupName: string
  name: string
  showValue?: number
}

export type Data = readonly DataItem[]

type Props = {
  data: Data
  colorGroups: ColorGroups
  innerRadius: number
  outerRadius: number
  handleMouseOver: (data: DataItem) => void
  handleMouseOut: () => void
  isTooltipVisible: boolean
}

/**
 * Отступ между D3.arc элементами, указывается в пикселях.
 */
const ARC_PAD = 1
const ARC_RADIUS = 100

export const Donut: React.FC<Props> = ({
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
    .sort(null)
    .value(d => d.value)([...data])

  const arc = d3
    .arc<d3.PieArcDatum<DataItem>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    /**
     * padAngle для каждого D3.arc расчитывается по формуле:
     *
     * `padRadius * [переданное значение]`
     *
     * https://github.com/d3/d3-shape#arc_padAngle
     */
    .padAngle(ARC_PAD / ARC_RADIUS)
    /**
     * Указывается специфичный радиус для правильного расчета `padAngle`, если
     * не указать значение или указать `null`, то расчет этого параметра
     * производится по формуле:
     *
     * `sqrt(innerRadius * innerRadius + outerRadius * outerRadius)`
     *
     * Т.е. для каждого вложенного компонента Donut, размер отступа будет меньше
     * чем у предыдущего, чтобы это исправить указываем фиксированное значение
     * которое исправляет расчеты.
     *
     * https://github.com/d3/d3-shape#arc_padRadius
     */
    .padRadius(ARC_RADIUS)

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
