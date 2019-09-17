import React from 'react'
import { useUID } from 'react-uid'

import classnames from 'classnames'
import { isNil } from 'lodash'

import { LinearChart } from '@/legacy/LinearChart'

import css from './index.css'

const statuses = ['danger', 'normal', 'warning'] as const
export type Status = typeof statuses[number]
export type Data = readonly number[] | number

type SummaryData = {
  factData?: Data
  planData?: Data
}

type Props = {
  className?: string
  status?: Status
} & SummaryData

type LinearGradientProps = {
  type: 'linear' | 'area'
  status?: Status
  id: string
}

type CastSafeData = SummaryData

export const castData = (data?: Data, length = 2) => {
  return (Array.isArray(data)
    ? data.length > 1
      ? data
      : new Array(2).fill(data[0])
    : new Array(length).fill(data)
  ).filter(value => !isNil(value))
}

export const castSafeData = ({ planData, factData }: CastSafeData) => {
  const maxDuration = Math.max(
    planData && Array.isArray(planData) ? planData.length - 1 : 0,
    factData && Array.isArray(factData) ? factData.length - 1 : 0
  )

  const safePlanData = castData(planData, maxDuration)
  const safeFactData = castData(factData, maxDuration)

  return { safePlanData, safeFactData }
}

const LinearGradient: React.FunctionComponent<LinearGradientProps> = ({ type, status, id }) => {
  if (!status) {
    return null
  }

  const gradientClass = type === 'linear' ? css.linearGradient : css.areaGradient

  return (
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" className={classnames(gradientClass, css.isStart, css[status])} />
      <stop offset="100%" className={classnames(gradientClass, css.isEnd, css[status])} />
    </linearGradient>
  )
}

export const KPIChart: React.FC<Props> = ({ planData, factData, className, status = 'normal' }) => {
  const uid = useUID()
  const areaGradientId = `area-gradient-${uid}`
  const linearGradientId = `linear-gradient-${uid}`

  const { safePlanData, safeFactData } = castSafeData({
    planData,
    factData,
  })

  return (
    <div className={classnames(css.kpiChart, className)}>
      <svg className={css.svgDefs}>
        <defs>
          <LinearGradient type="linear" status={status} id={linearGradientId} />
          <LinearGradient type="area" status={status} id={areaGradientId} />
        </defs>
      </svg>

      <LinearChart
        lines={[
          {
            values: safeFactData,
            classNameLine: css.lineForeground,
            areaStyles: {
              fill: `url(#${areaGradientId})`,
            },
            color: `url(#${linearGradientId})`,
            circle: true,
            circleStyles: {
              fill: '#fff',
            },
          },
          {
            values: safePlanData,
            classNameLine: css.lineBackground,
            color: 'rgba(196, 196, 196, 0.2)',
          },
        ]}
      />
    </div>
  )
}
