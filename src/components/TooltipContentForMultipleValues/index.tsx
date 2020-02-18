import React from 'react'

import classnames from 'classnames'

import { LegendItem } from '@/components/LegendItem'

import css from './index.css'

type Props = {
  title?: string
  items: ReadonlyArray<{
    name: string
    value: string
    color: string
  }>
}

export const TooltipContentForMultipleValues: React.FC<Props> = ({ title, items }) => {
  return (
    <div className={css.container}>
      {title && (
        <>
          <div className={css.title}>{title}</div>
          <div className={css.divider} />
        </>
      )}

      <div className={css.content}>
        {items.map(({ name, color, value }, idx) => (
          <React.Fragment key={idx}>
            <LegendItem
              className={classnames(css.label, title && css.withTitle)}
              color={color}
              fontSize="xs"
            >
              {name}
            </LegendItem>
            <div className={css.value}>{value}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
