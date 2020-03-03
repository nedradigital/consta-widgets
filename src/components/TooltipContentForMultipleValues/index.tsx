import React from 'react'

import { Text } from '@gpn-design/uikit'

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
          <Text tag="div" size="xs" weight="bold" view="primary" className={css.title}>
            {title}
          </Text>
          <div className={css.divider} />
        </>
      )}

      <div className={css.content}>
        {items.map(({ name, color, value }, idx) => (
          <React.Fragment key={idx}>
            <LegendItem color={color} fontSize="xs">
              {name}
            </LegendItem>
            <Text tag="div" size="xs" weight="bold" view="primary">
              {value}
            </Text>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
