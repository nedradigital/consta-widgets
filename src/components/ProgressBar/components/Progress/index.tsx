import React from 'react'

import classnames from 'classnames'

import { getValueRatio } from '../../'
import { Legend, Tick } from '../Legend'

import css from './index.css'

type Data = {
  value: number
  valueMin: number
  valueMax: number
  ticks?: readonly Tick[]
}

export type Props = {
  data: Data
  color: string
}

export const Progress: React.FC<Props> = ({
  data: { value, valueMin, valueMax, ticks = [] },
  color = '#FFBA3B',
}) => {
  const hasLegend = ticks.length
  const valueNowRatio = getValueRatio(value, valueMin, valueMax)
  const progressIsNotFull = valueNowRatio < 100

  return (
    <div className={css.progress} style={{ color }}>
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
