import * as React from 'react'

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
      position={{ x: data.x, y: data.y }}
      direction={isHorizontal ? 'upCenter' : 'leftCenter'}
      offset={0}
    >
      {data.sections.map(section =>
        section.value ? (
          <div key={section.color} style={{ color: section.color }}>
            {formatValue(section.value)}
          </div>
        ) : null
      )}
    </BaseTooltip>
  )
}
