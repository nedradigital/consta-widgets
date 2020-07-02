import * as React from 'react'

import { Text } from '@gpn-design/uikit/Text'

import { FormatValue } from '@/common/types'
import { Tooltip as BaseTooltip } from '@/Tooltip'

import { SectionItem } from '../Column'

export type TooltipData = {
  x: number
  y: number
  sections: readonly SectionItem[]
}

type Props = {
  data: TooltipData
  isHorizontal: boolean
  formatValue?: FormatValue
}

export const Tooltip: React.FC<Props> = ({ data, isHorizontal, formatValue = String }) => {
  return (
    <BaseTooltip
      isVisible={true}
      size="s"
      position={{ x: data.x, y: data.y }}
      direction={isHorizontal ? 'upCenter' : 'leftCenter'}
      offset={0}
    >
      {data.sections.map(section =>
        section.value ? (
          <Text key={section.color} size="xs" style={{ color: section.color }}>
            {formatValue(section.value)}
          </Text>
        ) : null
      )}
    </BaseTooltip>
  )
}
