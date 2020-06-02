import _ from 'lodash'

import { FormatValue } from '@/common/types'
import { NumberRange } from '@/common/utils/scale'
import { getTotalByColumn } from '@/core/BarChart/helpers'
import { ShowPositions } from '@/BarChartAxis'

import { Group, XAxisShowPosition, YAxisShowPosition } from './'

export const getFormatter = (formatter?: FormatValue): FormatValue => value => {
  const positiveValue = Math.abs(value)

  return formatter ? formatter(positiveValue) : String(positiveValue)
}

export const getAxisShowPositions = (x: XAxisShowPosition, y: YAxisShowPosition): ShowPositions => {
  return {
    left: y === 'left' || y === 'both',
    right: y === 'right' || y === 'both',
    top: x === 'top' || x === 'both',
    bottom: x === 'bottom' || x === 'both',
  }
}

export const getGroupsDomain = (groups: readonly Group[]) => {
  const sumGroupValues = (group: Group) => _.sum(group.values.map(v => _.sum(Object.values(v))))

  return _.orderBy(groups, sumGroupValues, 'desc').map(g => g.groupName)
}

export const getValuesDomain = (groups: readonly Group[]): NumberRange => {
  const numbers = _.flattenDeep(groups.map(g => g.values.map(getTotalByColumn)))
  const maxNumber = Math.max(...numbers, 0)

  return [-maxNumber, maxNumber]
}
