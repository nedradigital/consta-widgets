import React, { useLayoutEffect } from 'react'
import useDimensions from 'react-use-dimensions'

import * as d3 from 'd3'

import { ReactComponent as ChartBorder } from './images/chart-border.svg'
import css from './index.css'

export const CHART_COLORS = {
  red: {
    legend: '#EB5757',
    chart: '#D43535',
  },
  blue: {
    legend: '#56B9F2',
    chart: '#29B0FF',
  },
  yellow: {
    legend: '#F2C94C',
    chart: '#FDD835',
  },
  purple: {
    legend: '#9B51E0',
    chart: '#9F0CE9',
  },
  green: {
    legend: '#0FC75D',
    chart: '#36C936',
  },
}

type Color = keyof typeof CHART_COLORS

type DataItem = {
  color: Color
  value: number
}

type Props = {
  total: number
  subTotalTitle: string
  subTotal: number
  data: readonly DataItem[]
}

export const PieChart: React.FC<Props> = ({ data, total, subTotalTitle, subTotal }) => {
  const [ref, { width, height }, el] = useDimensions()
  const size = Math.min(width, height) || 0

  useLayoutEffect(() => {
    const pieData = d3
      .pie<DataItem>()
      .sort(null)
      .value(d => d.value)(data as Writeable<typeof data>)

    const radius = size / 2

    const arc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(0)
      .outerRadius(radius)

    d3.select(el)
      .select('svg')
      .attr('viewBox', `${-radius}, ${-radius}, ${radius * 2}, ${radius * 2}`)
      .select('g')
      .selectAll('path')
      .data(pieData)
      .join('path')
      .attr('fill', d => CHART_COLORS[d.data.color].chart)
      .attr('d', arc)
  })

  return (
    <div
      ref={ref}
      className={css.pieChart}
      style={{
        fontSize: (14 * size) / 300, // 300 — исходный размер из макета, используется как отправная точка
      }}
    >
      <div className={css.container} style={{ width: size, height: size }}>
        <svg className={css.chart}>
          <g />
        </svg>
        <ChartBorder className={css.border} />
        <div className={css.inner}>
          <div className={css.totalTitle}>Всего</div>
          <div className={css.total}>{total}</div>
          <div className={css.subTotal}>
            {subTotalTitle}: <span className={css.subTotalValue}>{subTotal}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
