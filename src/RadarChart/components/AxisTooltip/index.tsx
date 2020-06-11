import React from 'react'

import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import * as _ from 'lodash'

import { FormatValue } from '@/common/types'
import { getFormattedValue } from '@/common/utils/chart'
import { TooltipContentForMultipleValues } from '@/core/TooltipContentForMultipleValues'
import { Tooltip } from '@/Tooltip'

import { Axis, ExtendedFigure } from '../..'

type Props = {
  extendedFigures: readonly ExtendedFigure[]
  axis: Axis
  formatValue?: FormatValue
  anchorEl: Element
}

export const AxisTooltip: React.FC<Props> = ({ extendedFigures, axis, formatValue, anchorEl }) => {
  const pointsOnAxis = extendedFigures
    .map(f => f.points.find(p => p.axisName === axis.name))
    .filter(isDefined)
  const values = pointsOnAxis.map(point => getFormattedValue(point.originalValue, formatValue))
  const itemWithMaxValue = _.maxBy(pointsOnAxis, item => item.originalValue || 0)

  if (!itemWithMaxValue) {
    return null
  }

  const { top, left, width, height } = anchorEl.getBoundingClientRect()
  const x = (width / 100) * itemWithMaxValue.xPercent + left
  const y = (height / 100) * itemWithMaxValue.yPercent + top

  return (
    <Tooltip isVisible position={{ x, y }}>
      {extendedFigures.length === 1 ? (
        values[0]
      ) : (
        <TooltipContentForMultipleValues
          title={axis.label}
          items={extendedFigures.map((f, idx) => ({
            name: f.name,
            color: f.color.lineColor,
            value: values[idx],
          }))}
        />
      )}
    </Tooltip>
  )
}
