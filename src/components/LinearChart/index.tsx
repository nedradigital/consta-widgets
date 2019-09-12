import React from 'react'

import { chain, isNumber, last, uniq } from 'lodash'
import * as _ from 'lodash'

import { Hint } from '@/ui/Hint'

import { LinearChartLegend } from './components/LinearChartLegend'
import { SVGChart } from './components/SVGChart'
import css from './index.css'

export type Line = {
  values: number[]
  /** Мин/макс значение для конкретной линии (если не указать, вычисляется автоматически) */
  valueRange?: [number, number]
  classNameLine?: string
  color?: string
  background?: {
    start: string
    end?: string
  }
  circle?: boolean
  hint?: boolean
  lineStyles?: React.CSSProperties
  areaStyles?: React.CSSProperties
  circleStyles?: React.CSSProperties
}

export type Legend = {
  name: string
  value?: number
}

export type Orientation = 'horizontal' | 'vertical'
export type ChartDirection = 'up-right' | 'up-left' | 'down-right' | 'down-left'

type RenderScaleFunc = (props: { minValue: number; maxValue: number }) => React.ReactNode

type Props = {
  orientation?: Orientation
  chartDirection?: ChartDirection
  lines: Line[]
  legend?: Legend[]
  /** Свободное место под/над графиком, от 0 до 1 */
  valuePadding?: [number, number]
  /** Точность округления нижней и верхней границ графика */
  paddingPrecision?: number
  unitName?: string
  renderHorizontalScale?: RenderScaleFunc
  renderVerticalScale?: RenderScaleFunc
  renderGridLines?: () => React.ReactNode
}

export const getValueRange = (
  lines: Line[],
  valuePadding: [number, number],
  paddingPrecision: number
): [number, number] => {
  const allValues = chain(lines)
    .map('values')
    .flatten()
    .uniq()
    .value()
  const allLinesMin = Math.min(...allValues)
  const allLinesMax = Math.max(...allValues)
  const delta = allLinesMax - allLinesMin

  return [
    _.floor(allLinesMin - delta * valuePadding[0], paddingPrecision),
    _.ceil(allLinesMax + delta * valuePadding[1], paddingPrecision),
  ]
}

export const LinearChart: React.FC<Props> = ({
  lines,
  legend = [],
  unitName,
  renderHorizontalScale,
  renderVerticalScale,
  renderGridLines,
  valuePadding = [0, 0],
  paddingPrecision = 0,
  orientation = 'horizontal',
  chartDirection = 'up-right',
}) => {
  const hints = uniq(
    lines
      .map(({ hint, values }) => (hint ? last(values) : null))
      .filter(isNumber)
      .sort((a, b) => b - a)
  )

  const [minValue, maxValue] = getValueRange(lines, valuePadding, paddingPrecision)

  return (
    <div className={css.main}>
      {legend.length || unitName ? (
        <div className={css.top}>
          <LinearChartLegend items={legend} lines={lines} />
          <div className={css.unit}>{unitName}</div>
        </div>
      ) : null}

      <div className={css.chartWrapper}>
        <div className={css.chartContent}>
          {renderGridLines && <div className={css.grid}>{renderGridLines()}</div>}

          <SVGChart
            orientation={orientation}
            chartDirection={chartDirection}
            lines={lines}
            minValue={minValue}
            maxValue={maxValue}
          />

          {hints.map(value => {
            const bottom = ((value - minValue) / (maxValue - minValue)) * 100
            const openToBottom = bottom > 80

            return (
              <Hint
                key={value}
                className={css.hint}
                direction={openToBottom ? 'bottom' : 'top'}
                styles={
                  openToBottom
                    ? {
                        top: `${100 - bottom}%`,
                      }
                    : {
                        bottom: `${bottom}%`,
                      }
                }
              >
                {value}
              </Hint>
            )
          })}
        </div>

        {renderVerticalScale && (
          <div className={css.verticalScale}>{renderVerticalScale({ minValue, maxValue })}</div>
        )}

        {renderHorizontalScale && (
          <div className={css.horizontalScale}>{renderHorizontalScale({ minValue, maxValue })}</div>
        )}
      </div>
    </div>
  )
}
