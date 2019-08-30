import React, { createRef, useEffect, useState } from 'react'

import classnames from 'classnames'
import { isNil } from 'lodash'

import { ChartContent } from '@/components/ChartContent'

import css from './index.css'

const statuses = ['danger', 'normal', 'warning'] as const
export type Status = typeof statuses[number]
export type Data = number[] | number

type SummaryData = {
  factData?: Data
  planData?: Data
}

type Props = {
  className?: string
  status?: Status
  id: string
} & SummaryData

type CircleData = {
  safeFactData: number[]
  maxDuration: number
  minValue: number
  maxValue: number
}

type CircleProps = {
  height?: number
} & CircleData

type LinearGradientProps = {
  type: 'linear' | 'area'
  status?: Status
  id: string
}

type Params = {
  widthDomain: [number, number]
  widthRange: [number, number]
  heightDomain: [number, number]
  heightRange: [number, number]
}

type CastSafeData = SummaryData

const MIN_WIDTH = 234
const MIN_HEIGHT = 95

const CLASS_LINE_BACKGROUND = css.lineBackground
const CLASS_LINE_FOREGROUND = css.lineForeground
const CLASS_AREA_FOREGROUND = css.areaForeground

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

  const minValue = Math.min(...safePlanData, ...safeFactData)
  const maxValue = Math.max(...safePlanData, ...safeFactData)

  return { safePlanData, safeFactData, maxDuration, minValue, maxValue }
}

export const castCircleData = ({ safeFactData, maxDuration, minValue, maxValue }: CircleData) => {
  const circleLeft = Math.min(1, Math.max(0, (safeFactData.length - 1) / maxDuration))
  const circleBottom = Math.min(
    1,
    Math.max(0, (safeFactData[safeFactData.length - 1] - minValue) / (maxValue - minValue))
  )

  return { circleLeft, circleBottom }
}

const Circle: React.FunctionComponent<CircleProps> = ({
  height = MIN_HEIGHT,
  safeFactData,
  maxDuration,
  minValue,
  maxValue,
}) => {
  const { circleLeft, circleBottom } = castCircleData({
    safeFactData,
    maxDuration,
    minValue,
    maxValue,
  })

  const isVisible =
    !isNil(circleLeft) && !isNil(circleBottom) && !isNaN(circleLeft) && !isNaN(circleBottom)

  if (isVisible) {
    return (
      <div
        className={css.circle}
        style={{
          left: circleLeft * 100 + '%',
          bottom: circleBottom * height + 'px',
        }}
      />
    )
  }

  return null
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

export const KPIChart: React.FC<Props> = ({
  id,
  planData,
  factData,
  className,
  status = 'normal',
}) => {
  const areaGradientId = `area-gradient-${id}`
  const linearGradientId = `linear-gradient-${id}`
  const [width, changeWidth] = useState(MIN_WIDTH)
  const [height, changeHeight] = useState(MIN_HEIGHT)
  const ref = createRef<SVGSVGElement>()

  const { safePlanData, safeFactData, maxDuration, minValue, maxValue } = castSafeData({
    planData,
    factData,
  })

  useEffect(() => {
    if (ref.current) {
      changeWidth(ref.current.getBoundingClientRect().width)
      changeHeight(ref.current.getBoundingClientRect().height)
    }
  })

  return (
    <div className={classnames(css.kpiChart, className)}>
      <svg className={css.svg} ref={ref} width={width} height={height}>
        <defs>
          <LinearGradient type="linear" status={status} id={linearGradientId} />
          <LinearGradient type="area" status={status} id={areaGradientId} />
        </defs>
        <ChartContent
          orientation="horizontal"
          lines={[
            {
              value: safeFactData,
              lineStyles: `stroke: url(#${linearGradientId});`,
              classNameLine: CLASS_LINE_FOREGROUND,
              background: true,
              areaStyles: `fill: url(#${areaGradientId});`,
              classNameBackground: CLASS_AREA_FOREGROUND,
              ...({
                widthDomain: [0, maxDuration],
                widthRange: [0, width],
                heightDomain: [minValue, maxValue],
                heightRange: [height - 1, 1],
              } as Params),
            },
            {
              value: safePlanData,
              classNameLine: CLASS_LINE_BACKGROUND,
              ...({
                widthDomain: [0, maxDuration],
                widthRange: [0, width],
                heightDomain: [minValue, maxValue],
                heightRange: [height - 1, 1],
              } as Params),
            },
          ]}
        />
      </svg>
      <Circle
        safeFactData={safeFactData}
        maxDuration={maxDuration}
        minValue={minValue}
        maxValue={maxValue}
        height={height}
      />
    </div>
  )
}
