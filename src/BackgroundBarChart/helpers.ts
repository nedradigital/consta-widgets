import { isDefined, isNotNil } from '@consta/widgets-utils/lib/type-guards'
import { sum, sumBy } from 'lodash'

import { Threshold } from '@/_private/components/BarChart'
import { NumberRange } from '@/_private/utils/scale'

import { Column, Group } from '.'

export const getValuesDomain = (groups: readonly Group[], threshold?: Threshold) => {
  const numbers = groups
    .map(({ values, backgroundValues }) => [
      sumBy(values, v => v.value ?? 0),
      sumBy(backgroundValues, v => v.value ?? 0),
    ])
    .flat()
  const maxNumber = Math.max(...numbers, threshold?.value ?? 0)

  return [0, maxNumber] as NumberRange
}

const getColumn = (column: Column) => {
  const total = sum(column.map(item => item.value))
  const sections = column
    .map(({ value, color, name }) => {
      if (!isNotNil(value) || value < 0) {
        return
      }

      return {
        color,
        value,
        name,
      }
    })
    .filter(isDefined)

  return {
    total,
    sections,
  }
}

export const transformGroupsToCommonGroups = (groups: readonly Group[]) => {
  return groups.map(group => {
    const total = sum(group.values.map(({ value }) => value))
    const column = getColumn(group.values)
    const backgroundColumn = getColumn(group.backgroundValues)

    return {
      name: group.groupName,
      isDisabled: group.isDisabled,
      total,
      column,
      backgroundColumn,
    }
  })
}
