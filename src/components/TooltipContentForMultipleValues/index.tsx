import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  title: string
  items: ReadonlyArray<{
    name: string
    value: string
    color: string
  }>
}

export const TooltipContentForMultipleValues: React.FC<Props> = ({ title, items }) => {
  return (
    <div className={css.container}>
      <div className={css.title}>{title}</div>

      <div className={css.divider} />

      <div className={css.content}>
        <div className={css.labels}>
          {items.map(({ name, color }, idx) => (
            <div key={idx} className={css.row}>
              <span className={css.color} style={{ backgroundColor: color }} />
              <span className={css.label}>{name}</span>
            </div>
          ))}
        </div>

        <div>
          {items.map(({ value }, idx) => (
            <div key={idx} className={classnames(css.row, css.value)}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
