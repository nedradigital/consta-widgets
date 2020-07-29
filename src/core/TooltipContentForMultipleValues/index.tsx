import React from 'react'

import { Text } from '@gpn-design/uikit/Text'
import classnames from 'classnames'

import { LegendItem } from '@/LegendItem'

import css from './index.css'

type Props = {
  title?: string
  items: ReadonlyArray<{
    value: string
    name?: string
    color?: string
  }>
}

export const TooltipContentForMultipleValues: React.FC<Props> = ({ title, items }) => {
  return (
    <div className={css.container}>
      {title && (
        <>
          <Text as="div" size="xs" weight="bold" view="primary" className={css.title}>
            {title}
          </Text>
          <div className={css.divider} />
        </>
      )}

      <div className={css.content}>
        {items.map(({ name, color, value }, idx) => (
          <React.Fragment key={idx}>
            <LegendItem
              color={color}
              fontSize="xs"
              className={classnames(css.legendItem, !name && css.isSingleColumn)}
            >
              {name ?? value}
            </LegendItem>
            {name && (
              <Text as="span" size="xs" weight="bold" view="primary">
                {value}
              </Text>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
