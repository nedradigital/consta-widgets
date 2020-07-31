import React from 'react'

import { Text } from '@gpn-design/uikit/Text'
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

const Marking: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
  children,
}) => (
  <div className={classnames(css.marking, className)} style={style}>
    <div className={css.markingIcon} />
    <Text className={css.markingText} as="div" size="xs" view="secondary">
      {children}
    </Text>
  </div>
)

export const Legend: React.FC<Props> = ({ ticks, valueMin, valueMax }) => {
  const ticksWithRatio = ticks.map(tick => ({
    ...tick,
    ratio: getValueRatio({ value: tick.value, valueMin, valueMax }),
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
        <Marking
          key={i}
          className={getMarkingAlignClass(ticksAmount, i)}
          style={{ left: `${tick.ratio}%` }}
        >
          {tick.label}
        </Marking>
      ))}
      {/* Чтобы у элемента была фактическая высота */}
      <Marking className={css.isHidden}>
        {(ticksWithRatio.find(item => item.label !== '') || {}).label}
      </Marking>
    </div>
  )
}
