import React from 'react'

import classnames from 'classnames'

import { Legend, Tick } from './components/Legend'
import css from './index.css'

const sizes = ['s', 'm', 'l'] as const
type Size = typeof sizes[number]

type Props = {
  size?: Size
  value: number
  valueMin: number
  valueMax: number
  ticks?: readonly Tick[]
  color?: string
  summary: string | number
}

export const getValueRatio = (val: number, valMin: number, valMax: number) => {
  return ((val - valMin) / (valMax - valMin)) * 100
}

export const ProgressBar: React.FC<Props> = ({
  size = 's',
  value,
  valueMin,
  valueMax,
  ticks = [],
  color = '#FFBA3B',
  summary,
}) => {
  const hasLegend = ticks.length
  const sizeClass = { s: css.sizeS, m: css.sizeM, l: css.sizeL }[size]
  const valueNowRatio = getValueRatio(value, valueMin, valueMax)
  const progressIsNotFull = valueNowRatio < 100

  return (
    <div className={classnames(css.progressBar, sizeClass)} style={{ color }}>
      <div className={css.chart}>
        <progress
          max={100}
          value={valueNowRatio}
          className={classnames(css.progress, progressIsNotFull ? css.isNotFull : '')}
          aria-valuemin={valueMin}
          aria-valuenow={value}
          aria-valuemax={valueMax}
        />
        {!!hasLegend && <Legend ticks={ticks} valueMin={valueMin} valueMax={valueMax} />}
      </div>
      <div className={css.summary}>{summary}</div>
    </div>
  )
}
