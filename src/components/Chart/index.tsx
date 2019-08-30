import React from 'react'
import useDimensions from 'react-use-dimensions'

import classnames from 'classnames'

import { ChartContent } from '@/components/ChartContent'

import css from './index.css'

type Line = {
  value: number[]
  classNameLine?: string
  classNameBackground?: string
  classNameCircle?: string
  background?: boolean
  circle?: boolean
  lineStyles?: string
  areaStyles?: string
  circleArea?: string
}

type Params = {
  widthRange: [number, number]
  heightDomain: [number, number]
  heightRange: [number, number]
}

type Legend = {
  name: string
  value: number
}

type Props = {
  labels: {
    x: string[]
    y: string[]
  }
  legend?: Legend[]
  lines: Line[]
  /** Минимальное возможное значение */
  minValue: number
  /** Максимальное возможное значение */
  maxValue: number
  heightChart?: number
  unitName: string
}

const areaGradientId = 'areaGradientId'

const colors = ['blue', 'green'] as const

export const Chart: React.FC<Props> = ({
  labels,
  lines,
  minValue,
  maxValue,
  legend = [],
  heightChart = 150,
  unitName,
}) => {
  const [ref, { width: widthParent, height: heightParent }] = useDimensions()
  const width = widthParent - 30
  const height = heightParent - 27

  const params: Params = {
    widthRange: [0, width],
    heightDomain: [minValue, maxValue],
    heightRange: [height, 5],
  }

  return (
    <div className={css.main}>
      {legend.length ? (
        <div className={css.legend}>
          {legend.map((item, index) => (
            <div key={item.name} className={classnames(css.legendItem, css[colors[index]])}>
              {item.name}
              {item.value ? <span className={css.legendValue}>{item.value}</span> : null}
            </div>
          ))}
        </div>
      ) : null}
      <div style={{ height: heightChart }} className={css.chart} ref={ref}>
        <div className={css.columnsGroup}>
          {labels.x.map((x, index) => (
            <div key={index} className={css.column}>
              <div className={css.columnName}>{x}</div>
            </div>
          ))}
        </div>
        <div className={css.rowsGroup}>
          {labels.y.map((y, index) => (
            <div key={index} className={css.row}>
              {y}
            </div>
          ))}
        </div>
        <div className={css.unitName}>{unitName}</div>
        <svg className={css.svg} width={width + 5} height={height + 5}>
          <defs>
            {lines.map((line, index) =>
              line.background ? (
                <linearGradient id={`${areaGradientId}_${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    className={classnames(css.area, css.isStart, css[colors[index]])}
                  />
                  <stop offset="100%" className={classnames(css.area, css.isEnd)} />
                </linearGradient>
              ) : null
            )}
          </defs>
          <ChartContent
            orientation="horizontal"
            lines={lines.map((line, index) => ({
              ...line,
              ...params,
              widthDomain: [0, line.value.length - 1],
              classNameLine: classnames(css.line, css[colors[index]], line.classNameLine),
              classNameCircle: classnames(css.circle, css[colors[index]], line.classNameCircle),
              areaStyles: `fill: url(#${areaGradientId}_${index}); ${line.areaStyles || ''}`,
            }))}
          />
        </svg>
      </div>
    </div>
  )
}
