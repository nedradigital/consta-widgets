import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  title: string
  nameLines: readonly string[]
  values: readonly string[]
  colors: readonly string[]
  secondaryScaleUnit?: string
}

export const TooltipContentForMultipleValues: React.FC<Props> = ({
  title,
  nameLines,
  values,
  colors,
  secondaryScaleUnit,
}) => {
  return (
    <div className={css.container}>
      <div className={css.title}>{title}</div>

      <div className={css.divider} />

      <div className={css.content}>
        <div className={css.labels}>
          {nameLines.map((name, idx) => (
            <div key={idx} className={css.row}>
              <span className={css.color} style={{ backgroundColor: colors[idx] }} />
              <span className={css.label}>{name}</span>
            </div>
          ))}
        </div>

        <div>
          {values.map((value, idx) => (
            <div key={idx} className={classnames(css.row, css.value)}>
              {value} {secondaryScaleUnit}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
