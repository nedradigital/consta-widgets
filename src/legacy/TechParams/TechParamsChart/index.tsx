import React from 'react'
import { useUID } from 'react-uid'

import classnames from 'classnames'
import { isNil } from 'lodash'

import { LinearChart } from '@/legacy/LinearChart'

import css from './index.css'

const statuses = [
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
  dataRange: DataRange
  mainChartData: readonly number[]
  additionalChartData?: readonly number[]
  additionalDataDefaultLoBound?: number
  additionalDataDefaultHiBound?: number
}

export const TechParamsChart: React.FC<Props> = ({
  mainChartData,
  additionalChartData = [],
  dataRange,
  additionalDataDefaultLoBound,
  additionalDataDefaultHiBound,
  status,
}) => {
  const foregroundGradientId = `foreground-gradient-${useUID()}`

  const additionalDataMinimum = !isNil(additionalDataDefaultLoBound)
    ? Math.min(additionalDataDefaultLoBound, ...additionalChartData)
    : Math.min(...additionalChartData)

  const additionalDataMaximum = !isNil(additionalDataDefaultHiBound)
    ? Math.max(additionalDataDefaultHiBound, ...additionalChartData)
    : Math.max(...additionalChartData)

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
      <svg className={css.svgDefs}>
        <defs>
          <linearGradient
            id={foregroundGradientId}
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
      <LinearChart
        orientation="vertical"
        lines={[
          {
            values: mainChartData,
            color: `url(#${foregroundGradientId})`,
            classNameLine: css.lineForeground,
            valueRange: [dataRange.minimum, dataRange.maximum],
          },
          {
            values: additionalChartData,
            classNameLine: css.lineBackground,
            color: '#b1c4e3',
            valueRange: [additionalDataMinimum, additionalDataMaximum],
          },
        ]}
      />
    </div>
  )
}
