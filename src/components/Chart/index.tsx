import React from 'react'
import useDimensions from 'react-use-dimensions'

import classnames from 'classnames'
import { isNumber, uniq } from 'lodash'

import { ChartContent } from '@/components/ChartContent'
import { Hint } from '@/components/Hint'

import css from './index.css'

type Line = {
  value: number[]
  classNameLine?: string
  classNameBackground?: string
  classNameCircle?: string
  background?: boolean
  circle?: boolean
  hint?: boolean
  lineStyles?: React.CSSProperties
  areaStyles?: React.CSSProperties
  circleArea?: React.CSSProperties
  colors: {
    line: string
    background?: {
      start: string
      end?: string
    }
  }
}

type Params = {
  widthRange: [number, number]
  heightDomain: [number, number]
  heightRange: [number, number]
}

type Legend = {
  name: string
  value?: number
}

type Props = {
  labels: {
    x: string[]
    y: any[]
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

export const Chart: React.FC<Props> = ({
  labels,
  lines,
  minValue,
  maxValue,
  legend = [],
  heightChart = 150,
  unitName,
}) => {
  const [ref, { width = 0 }] = useDimensions()

  const params: Params = {
    widthRange: [0, width],
    heightDomain: [minValue, maxValue],
    heightRange: [heightChart, 5],
  }

  const hints = uniq(
    lines
      .map(({ hint, value }) => (hint ? value[value.length - 1] : null))
      .filter(isNumber)
      .sort((a, b) => b - a)
  )

  return (
    <div className={css.main}>
      <div className={classnames(css.topBlock, css.row)}>
        <div className={css.left}>
          {legend.map((item, index) => (
            <div key={item.name} className={css.legendItem}>
              <span
                className={css.legendMarker}
                style={{
                  background: lines[index] && lines[index].colors.line,
                }}
              />
              {item.name}
              {item.value ? <span className={css.legendValue}>{item.value}</span> : null}
            </div>
          ))}
        </div>
        <div className={css.right}>{unitName}</div>
      </div>
      <div
        className={css.row}
        style={{
          height: heightChart,
        }}
      >
        <div className={css.left}>
          <div className={classnames(css.columnsGroup, css.grid)}>
            {labels.x.map((_, index) => (
              <div key={index} className={classnames(css.column, css.lineColumn)} />
            ))}
          </div>
          {hints.map(value => {
            const bottom = ((value - minValue) / (maxValue - minValue)) * 100
            const top = 100 - bottom

            return (
              <Hint
                key={value}
                className={classnames(css.hint, bottom > 80 ? css.top : css.bottom)}
                agle={bottom > 80 ? 'top' : 'bottom'}
                styles={{
                  bottom: bottom + '%',
                  top: top + '%',
                }}
              >
                {value}
              </Hint>
            )
          })}
          <svg className={css.svg} ref={ref}>
            <defs>
              {lines.map((line, index) =>
                line.background ? (
                  <linearGradient
                    key={index}
                    id={`${areaGradientId}_${index}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{
                        stopColor: line.colors.background && line.colors.background.start,
                      }}
                    />
                    <stop
                      offset="100%"
                      className={classnames(css.area, css.isEnd)}
                      style={{
                        stopColor: line.colors.background && line.colors.background.end,
                      }}
                    />
                  </linearGradient>
                ) : null
              )}
            </defs>
            <ChartContent
              orientation="horizontal"
              lines={lines.map(({ hint, ...rest }, index) => ({
                ...rest,
                ...params,
                widthDomain: [0, rest.value.length - 1],
                classNameLine: classnames(css.line, rest.classNameLine),
                areaStyles: {
                  fill: `url(#${areaGradientId}_${index})`,
                  ...rest.areaStyles,
                },
              }))}
            />
          </svg>
        </div>
        <div className={css.right}>
          <div className={css.rowsGroup}>
            {labels.y.map((y, index) => (
              <div key={index} className={css.verticalName}>
                {y}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={classnames(css.row, css.footer)}>
        <div className={css.left}>
          <div className={css.columnsGroup}>
            {labels.x.map((x, index) => (
              <div key={index} className={classnames(css.column, css.descriptionColumn)}>
                <div className={css.horizontalName}>{x}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={css.right}>
          <div className={classnames(css.rowsGroup, css.hidden)}>
            <div className={css.verticalName}>{labels.y[0]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
