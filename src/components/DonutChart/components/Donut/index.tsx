import React from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

import { ColorGroups } from '@/dashboard'

import css from './index.css'

export type DataItem = {
  value: number
  colorGroupName: string
  name: string
  showValue?: number
}

export type Data = readonly DataItem[]

export type HalfDonut = 'top' | 'left' | 'right' | 'bottom'

type Props = {
  data: Data
  colorGroups: ColorGroups
  innerRadius: number
  outerRadius: number
  handleMouseOver: (data: Data) => void
  handleMouseOut: () => void
  isTooltipVisible: boolean
  halfDonut?: HalfDonut
}

/**
 * Отступ между D3.arc элементами, указывается в пикселях.
 */
const ARC_PAD = 1
const ARC_RADIUS = 100

const fullCircleAngle = {
  startAngle: 0,
  endAngle: 2 * Math.PI,
}

const getAnglesByHalfDonut = (halfDonut?: HalfDonut) => {
  switch (halfDonut) {
    case 'top': {
      return {
        startAngle: Math.PI * 1.5,
        endAngle: Math.PI * 0.5,
      }
    }
    case 'right': {
      return {
        startAngle: 2 * Math.PI,
        endAngle: Math.PI,
      }
    }
    case 'bottom': {
      return {
        startAngle: Math.PI * -0.5,
        endAngle: Math.PI * 0.5,
      }
    }
    case 'left': {
      return {
        startAngle: 0,
        endAngle: Math.PI,
      }
    }
    default: {
      return fullCircleAngle
    }
  }
}

const isEmpty = (pieData: ReadonlyArray<Omit<DataItem, 'colorGroupName' | 'name'>>) => {
  return pieData.map(pieDatum => pieDatum.value).every(value => value === 0)
}

export const Donut: React.FC<Props> = ({
  colorGroups,
  data,
  innerRadius,
  outerRadius,
  handleMouseOver,
  handleMouseOut,
  isTooltipVisible,
  halfDonut,
}) => {
  const { startAngle, endAngle } = getAnglesByHalfDonut(halfDonut)

  const pieData = d3
    .pie<DataItem>()
    .sort(null)
    .startAngle(startAngle)
    .endAngle(endAngle)
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
    <g
      onMouseOver={() => handleMouseOver(data)}
      onMouseOut={handleMouseOut}
      className={classnames(css.donut, isTooltipVisible && css.isTransparent)}
    >
      {isEmpty(pieData) ? (
        <path
          d={arc({ ...pieData[0], ...fullCircleAngle }) || undefined}
          fill="var(--color-bg-ghost)"
        />
      ) : (
        pieData.map((pieDatum, idx) => (
          <path
            key={idx}
            d={arc(pieDatum) || undefined}
            fill={colorGroups[pieDatum.data.colorGroupName]}
          />
        ))
      )}
    </g>
  )
}
