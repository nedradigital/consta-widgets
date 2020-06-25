import React, { useState } from 'react'

import { compact, xor } from 'lodash'

export type BasicTableRow = {
  [key: string]: React.ReactNode
  id: string
}

export type RowField<T extends BasicTableRow> = Exclude<keyof T, symbol | number>

export type BasicTableColumn<T extends BasicTableRow> = {
  title: React.ReactNode
  accessor: RowField<T>
}

export type Filters<T extends BasicTableRow> = ReadonlyArray<{
  id: string
  name: string
  field: RowField<T>
  filterer: (value: any) => boolean
}>

export type FieldSelectedValues = readonly string[]

export type SelectedFilters = { [field: string]: FieldSelectedValues }

type SelectedFiltersList = ReadonlyArray<{
  id: string
  name: string
}>

export const getOptionsForFilters = <T extends BasicTableRow>(
  filters: Filters<T>,
  field: RowField<T>
) => {
  return filters
    .filter(({ field: filterField }) => filterField === field)
    .map(({ id, name }) => ({ value: id, label: name }))
}

export const getSelectedFiltersInitialState = <T extends BasicTableRow>(
  filters?: Filters<T>
): SelectedFilters => {
  if (!filters) {
    return {}
  }

  return filters.reduce<SelectedFilters>((fieldAcc, fieldCur) => {
    if (!fieldAcc[fieldCur.field]) {
      fieldAcc[fieldCur.field] = []
    }

    return fieldAcc
  }, {})
}

export const fieldFiltersPresent = <T extends BasicTableRow>(
  tableFilters: Filters<T>,
  field: RowField<T>
) => {
  return tableFilters.some(({ field: filterField }) => filterField === field)
}

export const isSelectedFiltersPresent = (selectedFilters: SelectedFilters) => {
  return Object.values(selectedFilters).some(filterGroup => filterGroup.length > 0)
}

export const getSelectedFiltersList = <T extends BasicTableRow>({
  filters,
  selectedFilters,
  columns,
}: {
  filters: Filters<T>
  selectedFilters: SelectedFilters
  columns: ReadonlyArray<BasicTableColumn<T>>
}): SelectedFiltersList => {
  return columns.reduce<SelectedFiltersList>((acc, cur) => {
    const currentFieldFilters = selectedFilters[cur.accessor] || []
    let orderedFilters: SelectedFiltersList = []

    if (currentFieldFilters.length) {
      orderedFilters = compact(
        currentFieldFilters.map(filter => {
          const option = filters.find(({ id: filterId }) => filterId === filter)

          return option
            ? {
                id: option.id,
                name: option.name,
              }
            : undefined
        })
      )
    }

    return currentFieldFilters.length ? [...acc, ...orderedFilters] : acc
  }, [])
}

export const filterTableData = <T extends BasicTableRow>({
  data,
  filters,
  selectedFilters,
}: {
  data: readonly T[]
  filters: Filters<T>
  selectedFilters: SelectedFilters
}) => {
  const mutableFilteredData = []

  for (const row of data) {
    const columnNames = Object.keys(row)
    let rowIsValid = true

    for (const columnName of columnNames) {
      const columnFilters = selectedFilters[columnName]

      if (columnFilters && columnFilters.length) {
        let cellIsValid = false

        for (const filterId of columnFilters) {
          const filter = filters.find(({ id }) => id === filterId)
          const cellContent = row[columnName]

          if (filter && filter.filterer(cellContent)) {
            cellIsValid = true
            break
          }
        }

        if (!cellIsValid) {
          rowIsValid = false
        }
      }

      if (!rowIsValid) {
        break
      }
    }

    if (rowIsValid) {
      mutableFilteredData.push(row)
    }
  }

  return mutableFilteredData
}

/* istanbul ignore next */
export const useSelectedFilters = <T extends BasicTableRow>(filters?: Filters<T>) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    getSelectedFiltersInitialState(filters)
  )

  const updateSelectedFilters = (field: string, tooltipSelectedFilters: FieldSelectedValues) => {
    setSelectedFilters({
      ...selectedFilters,
      [field]: [...tooltipSelectedFilters],
    })
  }

  const removeOneSelectedFilter = (availableFilters: Filters<T>, filter: string) => {
    const filterToDelete = availableFilters.find(({ id }) => id === filter)

    if (filterToDelete) {
      updateSelectedFilters(
        filterToDelete.field,
        xor(selectedFilters[filterToDelete.field], [filter])
      )
    }
  }

  const removeAllSelectedFilters = (availableFilters: Filters<T>) => {
    setSelectedFilters(getSelectedFiltersInitialState(availableFilters))
  }

  return {
    selectedFilters,
    updateSelectedFilters,
    removeOneSelectedFilter,
    removeAllSelectedFilters,
  }
}
