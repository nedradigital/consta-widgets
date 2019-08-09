import React, { createRef, useLayoutEffect, useState } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'
import { isNil } from 'lodash'

import css from './index.css'

export const statuses = [
  'warning',
  'danger',
  'warning-possible-danger',
  'normal',
  'possible-warning',
] as const
export type Status = typeof statuses[number]

export type DataRange = {
  minimum: number
  lowerDanger: number
  lowerWarning: number
  upperWarning: number
  upperDanger: number
  maximum: number
  originalLowerDanger?: number
  originalLowerWarning?: number
  originalUpperWarning?: number
  originalUpperDanger?: number
}

type Props = {
  status: Status
  id: string
  dataRange: DataRange
  mainChartData: number[]
  additionalChartData?: number[]
  additionalDataDefaultLoBound?: number
  additionalDataDefaultHiBound?: number
}

export const TechParamsChart: React.FC<Props> = ({
  id,
  mainChartData,
  additionalChartData,
  dataRange,
  additionalDataDefaultLoBound,
  additionalDataDefaultHiBound,
  status,
}) => {
  const scaleHeightBackground = d3.scaleLinear()
  const scaleHeightForeground = d3.scaleLinear()
  const scaleWidthBackground = d3.scaleLinear()
  const scaleWidthForeground = d3.scaleLinear()
  const [width, changeWidth] = useState(0)
  const [height, changeHeight] = useState(0)
  const ref = createRef<SVGSVGElement>()

  useLayoutEffect(() => {
    if (ref.current) {
      changeHeight(ref.current.getBoundingClientRect().height)
      changeWidth(ref.current.getBoundingClientRect().width)
    }

    if (additionalChartData) {
      const additionalDataMinimum = !isNil(additionalDataDefaultLoBound)
        ? Math.min(additionalDataDefaultLoBound, ...additionalChartData)
        : Math.min(...additionalChartData)

      const additionalDataMaximum = !isNil(additionalDataDefaultHiBound)
        ? Math.max(additionalDataDefaultHiBound, ...additionalChartData)
        : Math.max(...additionalChartData)

      scaleWidthBackground.domain([additionalDataMinimum, additionalDataMaximum]).range([0, width])

      scaleHeightBackground.domain([0, additionalChartData.length - 1]).range([0, height])
    }

    scaleWidthForeground.domain([dataRange.minimum, dataRange.maximum]).range([0, width])

    scaleHeightForeground.domain([0, mainChartData.length - 1]).range([0, height])

    const lineBackground = d3
      .line<number>()
      .x(value => {
        return scaleWidthBackground(value) // set the x values for the line generator
      })
      .y((_, index) => {
        return scaleHeightBackground(index) // set the y values for the line generator
      })
      .curve(d3.curveMonotoneY) // apply smoothing to the line

    const lineForeground = d3
      .line<number>()
      .x(value => {
        return scaleWidthForeground(value) // set the x values for the line generator
      })
      .y((_, index) => {
        return scaleHeightForeground(index) // set the y values for the line generator
      })

    d3.select(ref.current)
      .select(`.${css.lineBackground}`)
      .remove()

    if (additionalChartData) {
      d3.select(ref.current)
        .datum(additionalChartData)
        .append('path')
        .attr('class', css.lineBackground)
        .attr('d', lineBackground)
    }

    d3.select(ref.current)
      .select(`.${css.lineForeground}`)
      .remove()

    d3.select(ref.current)
      .datum(mainChartData)
      .append('path')
      .attr('class', css.lineForeground)
      .attr('style', 'stroke: url(#foreground-gradient-' + id + ');')
      .attr('d', lineForeground)
  })

  const fullRange = Math.abs(dataRange.maximum - dataRange.minimum)
  const dataMinimum = Math.min(...mainChartData)
  const dataMaximum = Math.max(...mainChartData)
  const lowerDangerRatio = !isNil(dataRange.originalLowerDanger)
    ? (dataRange.lowerDanger - dataRange.minimum) / (fullRange || 1) || 0
    : 0
  const lowerWarningRatio = !isNil(dataRange.originalLowerWarning)
    ? (dataRange.lowerWarning - dataRange.minimum) / (fullRange || 1) || 0
    : 0
  const upperWarningRatio = !isNil(dataRange.originalUpperWarning)
    ? (dataRange.upperWarning - dataRange.minimum) / (fullRange || 1) || 1
    : 1
  const upperDangerRatio = !isNil(dataRange.originalUpperDanger)
    ? (dataRange.upperDanger - dataRange.minimum) / (fullRange || 1) || 1
    : 1
  const chartOverhangLeft =
    dataMinimum > dataRange.minimum
      ? Math.abs(dataMinimum - dataRange.minimum) / (dataMaximum - dataMinimum || 1) || 0
      : 0
  const chartOverhangRight =
    dataMaximum < dataRange.maximum
      ? Math.abs(dataRange.maximum - dataMaximum) / (dataMaximum - dataMinimum || 1) || 0
      : 0

  return (
    <div
      className={classnames(
        css.techParamsChart,
        {
          warning: css.statusWarning,
          danger: css.statusDanger,
          'warning-possible-danger': css.statusWarningPossibleDanger,
          normal: '',
          'possible-warning': '',
        }[status]
      )}
    >
      <svg className={css.svg} ref={ref}>
        <defs>
          <linearGradient
            id={`foreground-gradient-${id}`}
            x1={`${-1 * chartOverhangLeft * 100}%`}
            y1="0%"
            x2={`${(1 + chartOverhangRight) * 100}%`}
            y2="0%"
          >
            {lowerDangerRatio > 0 && <stop offset="0%" className={css.lineForegroundDanger} />}
            {lowerDangerRatio > 0 && (
              <stop offset={lowerDangerRatio * 100 + '%'} className={css.lineForegroundDanger} />
            )}
            {lowerWarningRatio > 0 && (
              <stop offset={lowerDangerRatio * 100 + '%'} className={css.lineForegroundWarning} />
            )}
            {lowerWarningRatio > 0 && (
              <stop offset={lowerWarningRatio * 100 + '%'} className={css.lineForegroundWarning} />
            )}
            <stop offset={lowerWarningRatio * 100 + '%'} className={css.lineForegroundNormal} />
            <stop offset={upperWarningRatio * 100 + '%'} className={css.lineForegroundNormal} />
            {upperWarningRatio < 1 && (
              <stop offset={upperWarningRatio * 100 + '%'} className={css.lineForegroundWarning} />
            )}
            {upperWarningRatio < 1 && (
              <stop offset={upperDangerRatio * 100 + '%'} className={css.lineForegroundWarning} />
            )}
            {upperDangerRatio < 1 && (
              <stop offset={upperDangerRatio * 100 + '%'} className={css.lineForegroundDanger} />
            )}
            {upperDangerRatio < 1 && <stop offset="100%" className={css.lineForegroundDanger} />}
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
