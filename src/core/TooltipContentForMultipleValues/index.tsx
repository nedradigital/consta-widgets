import React from 'react'

import { Text } from '@gpn-design/uikit/Text'
import classnames from 'classnames'
import _ from 'lodash'

import { FormatValue } from '@/common/types'
import { getFormattedValue } from '@/common/utils/chart'
import { LegendItem } from '@/LegendItem'

import css from './index.css'

type Props = {
  title?: string
  items: ReadonlyArray<{
    name?: string
    value: number | null
    color?: string
  }>
  formatValueForTooltip?: FormatValue
}

export const TooltipContentForMultipleValues: React.FC<Props> = ({
  title,
  items,
  formatValueForTooltip,
}) => {
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
        {items.map(({ name, color, value }, idx) => {
          const formattedValue = getFormattedValue(value, formatValueForTooltip)

          return (
            <React.Fragment key={idx}>
              <LegendItem
                type={_.isNumber(value) ? 'dot' : 'warning'}
                color={color}
                fontSize="xs"
                className={classnames(css.legendItem, !name && css.isSingleColumn)}
              >
                {name}
              </LegendItem>
              {name && (
                <Text as="span" size="xs" weight="bold" view="primary">
                  {formattedValue}
                </Text>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
