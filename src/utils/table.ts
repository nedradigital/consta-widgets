import React, { useState } from 'react'

import { compact, xor } from 'lodash'

export type TableRow = {
  [key: string]: React.ReactNode
}

export type TableColumn = {
  title: string
  accessor: string
}

type Filter = {
  id: string
  name: string
  filterer: (value: any) => boolean
  field: string
}

export type Filters = readonly Filter[]

export type FieldSelectedValues = readonly string[]

export type SelectedFilters = { [field: string]: FieldSelectedValues }

type SelectedFiltersList = ReadonlyArray<{
  id: string
  name: string
}>

/* istanbul ignore next */
export const getOptionsForFilters = (filters: Filters, field: string) => {
  return filters.filter(({ field: filterField }) => filterField === field)
}

export const getSelectedFiltersInitialState = (filters?: Filters) => {
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

/* istanbul ignore next */
export const fieldFiltersPresent = (tableFilters: Filters, field: string) => {
  return tableFilters.some(({ field: filterField }) => filterField === field)
}
/* istanbul ignore next */
export const isSelectedFiltersPresent = (selectedFilters: SelectedFilters) =>
  Object.values(selectedFilters).some(filterGroup => filterGroup.length > 0)

/* istanbul ignore next */
export const getSelectedFiltersList = ({
  filters,
  selectedFilters,
  columns,
}: {
  filters: Filters
  selectedFilters: SelectedFilters
  columns: readonly TableColumn[]
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

export const filterTableData = <T extends TableRow>({
  data,
  filters,
  selectedFilters,
}: {
  data: readonly T[]
  filters: Filters
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
          const cellContent = String(row[columnName])

          if (filter && filter.filterer(cellContent)) {
            cellIsValid = true
            break
          }
        }

        if (!cellIsValid) {
          rowIsValid = false
          break
        }
      }

      /* istanbul ignore next */
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
export const useSelectedFilters = (filters?: Filters) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    getSelectedFiltersInitialState(filters)
  )

  const updateSelectedFilters = (field: string, tooltipSelectedFilters: FieldSelectedValues) => {
    setSelectedFilters({
      ...selectedFilters,
      [field]: [...tooltipSelectedFilters],
    })
  }

  const removeOneSelectedFilter = (availableFilters: Filters, filter: string) => {
    const filterToDelete = availableFilters.find(({ id }) => id === filter)

    if (filterToDelete) {
      updateSelectedFilters(
        filterToDelete.field,
        xor(selectedFilters[filterToDelete.field], [filter])
      )
    }
  }

  const removeAllSelectedFilters = (availableFilters: Filters) => {
    setSelectedFilters(getSelectedFiltersInitialState(availableFilters))
  }

  return {
    selectedFilters,
    updateSelectedFilters,
    removeOneSelectedFilter,
    removeAllSelectedFilters,
  }
}
