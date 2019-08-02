import React from 'react'

import classnames from 'classnames'

import { Props as TrajectoryChartProps, TrajectoryChart } from '../TrajectoryChart'

import css from './index.css'

type Props = {
  className?: string
  isChartHidden?: boolean

  /** TVDSS */
  absoluteDepth: number

  /** Азимут угол */
  azimuth: number

  /** Положение клиноотклонителя */
  deflectorWedgePosition: number

  /** Пространственная интенсивность (AС) */
  dimensionalIntensity: number

  /** TVD */
  verticalDepth: number

  /** Зенитный угол */
  zenith: number

  /** Отклонение глубины */
  depthDeviation: number

  /** temporary params */
  indicatorRight: number
  indicatorBottom: number
} & TrajectoryChartProps

const minDepthDeviation = -5
const maxDepthDeviation = 5

export const TrajectoryBlock: React.FC<Props> = ({
  className,
  isChartHidden,
  absoluteDepth,
  azimuth,
  deflectorWedgePosition,
  dimensionalIntensity,
  verticalDepth,
  zenith,
  status,
  indicatorRight,
  indicatorBottom,
  depthDeviation,
}) => {
  const depthDeviationSummary =
    depthDeviation * (maxDepthDeviation - minDepthDeviation) -
    (maxDepthDeviation - minDepthDeviation) / 2

  return (
    <div className={classnames(css.trajectoryBlock, status && css[status], className)}>
      <div className={css.header}>
        <div className={css.cell}>
          <span className={css.cellContent}>
            ЗУ {zenith !== null && zenith !== undefined ? zenith : '--'}°
          </span>
        </div>
        <div className={css.cell}>
          <span className={css.cellContent}>
            Аз {azimuth !== null && azimuth !== undefined ? azimuth : '--'}°
          </span>
        </div>
        <div className={css.cell}>
          <span className={css.cellContent}>
            {dimensionalIntensity !== null && dimensionalIntensity !== undefined
              ? dimensionalIntensity
              : '--'}
            °/10м
          </span>
        </div>
      </div>
      {!isChartHidden && (
        <div className={css.chartWrapper}>
          <div className={css.chart}>
            <div className={css.chartIndicatorRight}>
              {indicatorRight !== null && indicatorRight !== undefined ? indicatorRight : '--'}
            </div>
            <div className={css.chartIndicatorBottom}>
              {indicatorBottom !== null && indicatorBottom !== undefined ? indicatorBottom : '--'}
            </div>
            <div className={css.depth}>
              <div className={css.depthPlan} />
              <div className={css.depthValue}>
                {depthDeviationSummary !== null && depthDeviationSummary !== undefined
                  ? depthDeviationSummary.toFixed(1) + 'м'
                  : '--'}
              </div>
              <div
                className={css.depthTriangle}
                style={{
                  top:
                    ((depthDeviationSummary + (maxDepthDeviation - minDepthDeviation) / 2) /
                      (maxDepthDeviation - minDepthDeviation)) *
                      100 +
                    '%',
                }}
              />
              <div className={css.depthLine} />
            </div>
            {deflectorWedgePosition !== null && deflectorWedgePosition !== undefined && (
              <div
                className={css.chartTriangle}
                style={{ transform: 'rotate(' + (deflectorWedgePosition || 0) + 'deg)' }}
              />
            )}
            <TrajectoryChart status={status} />
          </div>
        </div>
      )}
      <div className={css.footer}>
        <span className={css.footerContent}>
          TVD / -SS: {verticalDepth !== null && verticalDepth !== undefined ? verticalDepth : '--'}{' '}
          / {absoluteDepth !== null && absoluteDepth !== undefined ? absoluteDepth : '--'} м
        </span>
      </div>
    </div>
  )
}
