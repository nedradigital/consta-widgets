import React from 'react'

import _ from 'lodash'

import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'

type Props<T> = {
  name: string
  value: T
  values: ReadonlyArray<{
    value: T
    name: string
    groupName?: string
  }>
  withEmptyValue?: boolean
  onChange: (value: T) => void
}

type DatasetsByGroups<T> = ReadonlyArray<{
  groupName?: string
  items: ReadonlyArray<{
    name: string
    value: T
  }>
}>

const UNGROUPED = 'Без группы'

export const WidgetSettingsDatasetSelect = <T extends string | number | undefined>({
  name,
  value,
  values,
  onChange,
  withEmptyValue,
}: Props<T>) => {
  const datasetGroups = _.sortedUniq(values.map(dataset => dataset.groupName))

  const datasetsByGroups = datasetGroups
    .reduce((acc: DatasetsByGroups<T>, cur) => {
      const datasetGroupItems = _.sortBy(
        values.filter(dataset => dataset.groupName === cur),
        ['name']
      )

      return [...acc, { groupName: cur || UNGROUPED, items: datasetGroupItems }]
    }, [])
    .filter(dataset => dataset.items.length > 0)

  return (
    <WidgetSettingsItem name={name}>
      <select value={value} onChange={e => onChange(e.target.value as T)}>
        {withEmptyValue && <option value={undefined}>--</option>}

        {datasetsByGroups.map(({ groupName, items }) => (
          <optgroup key={groupName} label={groupName}>
            {items.map(item => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </WidgetSettingsItem>
  )
}
