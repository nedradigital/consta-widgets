import React from 'react'

import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import classnames from 'classnames'

import { getValueRatio } from '../../'
import { Legend, Tick } from '../Legend'

import css from './index.css'

export type Data = {
  value: number | null
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
  const isWithData = isNotNil(value)
  const valueNowRatio = getValueRatio({ value: value || 0, valueMin, valueMax })
  const progressIsNotFull = valueNowRatio < 100

  return (
    <div className={css.progress} style={{ color }}>
      <div className={css.chart}>
        <progress
          max={100}
          value={valueNowRatio}
          className={classnames(
            css.chartLine,
            isWithData && css.isWithData,
            isWithData && progressIsNotFull && css.isNotFull
          )}
          aria-valuemin={valueMin}
          aria-valuenow={value || 0}
          aria-valuemax={valueMax}
        />
        {!!hasLegend && <Legend ticks={ticks} valueMin={valueMin} valueMax={valueMax} />}
      </div>
    </div>
  )
}
