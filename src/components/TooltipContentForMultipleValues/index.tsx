import React from 'react'

import { LegendItem } from '@/components/LegendItem'

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
        {items.map(({ name, color, value }, idx) => (
          <React.Fragment key={idx}>
            <LegendItem className={css.label} color={color} fontSize="xs">
              {name}
            </LegendItem>
            <div className={css.value}>{value}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
