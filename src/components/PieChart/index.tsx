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
  data: DataItem[]
}

export const PieChart: React.FC<Props> = ({ data, total, subTotalTitle, subTotal }) => {
  const [chartRef, { width, height }, svgChartEl] = useDimensions()

  useLayoutEffect(() => {
    const pieData = d3
      .pie<DataItem>()
      .sort(null)
      .value(d => d.value)(data)

    const radius = Math.min(width, height) / 2

    const arc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(0)
      .outerRadius(radius)

    d3.select(svgChartEl)
      .attr('viewBox', `${-radius}, ${-radius}, ${radius * 2}, ${radius * 2}`)
      .select('g')
      .selectAll('path')
      .data(pieData)
      .join('path')
      .attr('fill', d => CHART_COLORS[d.data.color].chart)
      .attr('d', arc)
  })

  return (
    <div className={css.pieChart}>
      <svg ref={chartRef} className={css.chart}>
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
  )
}
