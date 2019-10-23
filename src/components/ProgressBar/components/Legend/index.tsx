import React from 'react'

import classnames from 'classnames'

import { getValueRatio } from '../../'

import css from './index.css'

export type Tick = {
  label: string | number
  value: number
}

type Props = {
  ticks: readonly Tick[]
  valueMin: number
  valueMax: number
}

export const Legend: React.FC<Props> = ({ ticks, valueMin, valueMax }) => {
  const ticksWithRatio = ticks.map(tick => ({
    ...tick,
    ratio: getValueRatio(tick.value, valueMin, valueMax),
  }))
  const ticksAmount = ticks.length
  const getMarkingAlignClass = (length: number, index: number) => {
    if (length === 1) {
      return ''
    }
    if (index === 0) {
      return css.alignLeft
    } else if (index === length - 1) {
      return css.alignRight
    }
  }

  return (
    <div className={css.legend} aria-hidden="true">
      {ticksWithRatio.map((tick, i) => (
        <div
          className={classnames(css.marking, getMarkingAlignClass(ticksAmount, i))}
          key={i}
          style={{ left: `${tick.ratio}%` }}
        >
          <div className={css.markingIcon} />
          <div className={css.markingLabel}>{tick.label}</div>
        </div>
      ))}
    </div>
  )
}
