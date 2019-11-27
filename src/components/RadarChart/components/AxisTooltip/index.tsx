import React from 'react'

import classnames from 'classnames'

import { Tooltip } from '@/components/Tooltip'

import { Axis, Figure, FigureColor } from '../..'

import css from './index.css'

type Props = {
  colors: readonly FigureColor[]
  figures: readonly Figure[]
  position: {
    x: number
    y: number
  }
  values: readonly string[]
  axis?: Axis
}

export const AxisTooltip: React.FC<Props> = ({ colors, figures, position, values, axis }) => {
  return (
    <Tooltip isVisible={!!axis} x={position.x} y={position.y} direction="top">
      {axis ? (
        <div className={css.container}>
          <div className={css.title}>{axis.label}</div>

          <div className={css.divider} />

          <div className={css.content}>
            <div className={css.labels}>
              {figures.map((figure, idx) => (
                <div key={idx} className={css.row}>
                  <span className={css.color} style={{ backgroundColor: colors[idx].lineColor }} />
                  <span className={css.label}>{figure.name}</span>
                </div>
              ))}
            </div>

            <div>
              {values.map((value, idx) => (
                <div key={idx} className={classnames(css.row, css.value)}>
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </Tooltip>
  )
}
