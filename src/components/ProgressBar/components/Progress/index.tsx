import React from 'react'

import classnames from 'classnames'

import { getValueRatio, Size } from '@/components/ProgressBar'
import { Legend, Tick } from '@/components/ProgressBar/components/Legend'

import css from './index.css'

type Data = {
  value: number
  valueMin: number
  valueMax: number
  ticks?: readonly Tick[]
  color: string
}

export type Props = {
  size?: Size
  data: Data
}

export const Progress: React.FC<Props> = ({
  size = 'm',
  data: { value, valueMin, valueMax, ticks = [], color = '#FFBA3B' },
}) => {
  const hasLegend = ticks.length
  const sizeClass = { s: css.sizeS, m: css.sizeM, l: css.sizeL }[size]
  const valueNowRatio = getValueRatio(value, valueMin, valueMax)
  const progressIsNotFull = valueNowRatio < 100

  return (
    <div className={classnames(css.progress, sizeClass)} style={{ color }}>
      <div className={css.chart}>
        <progress
          max={100}
          value={valueNowRatio}
          className={classnames(css.chartLine, progressIsNotFull ? css.isNotFull : '')}
          aria-valuemin={valueMin}
          aria-valuenow={value}
          aria-valuemax={valueMax}
        />
        {!!hasLegend && <Legend ticks={ticks} valueMin={valueMin} valueMax={valueMax} />}
      </div>
    </div>
  )
}
