import * as React from 'react'

import { Tooltip as BaseTooltip } from '@consta/uikit/Tooltip'
import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'

import {
  Item,
  TooltipContentForMultipleValues,
} from '@/_private/components/TooltipContentForMultipleValues'
import { FormatValue } from '@/_private/types'

export type TooltipData = {
  x: number
  y: number
  items: readonly Item[]
}

type Props = {
  data: TooltipData
  isHorizontal: boolean
  formatValue?: FormatValue
}

const itemHasValue = (item: Item): item is Item & { value: NonNullable<Item['value']> } =>
  isNotNil(item.value)

export const Tooltip: React.FC<Props> = ({ data, isHorizontal, formatValue = String }) => {
  return (
    <BaseTooltip
      size="s"
      position={{ x: data.x, y: data.y }}
      direction={isHorizontal ? 'upCenter' : 'leftCenter'}
      isInteractive={false}
    >
      <TooltipContentForMultipleValues
        items={data.items.filter(itemHasValue)}
        formatValueForTooltip={formatValue}
      />
    </BaseTooltip>
  )
}
