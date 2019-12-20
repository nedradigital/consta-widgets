import { compact } from 'lodash'

import { Data, Filters, Row, SelectedFilters } from '@/components/TableLegend'

type SelectedFiltersList = ReadonlyArray<{
  id: string
  name: string
}>

export const getOptionsForFilters = (filters: Filters, field: string) => {
  return filters.filter(({ field: filterField }) => filterField === field)
}

export const getSelectedFiltersInitialState = (filters?: Filters) => {
  if (!filters) {
    return {}
  }

  return Object.keys(filters).reduce<SelectedFilters>((fieldAcc, fieldCur) => {
    fieldAcc[fieldCur] = []

    return fieldAcc
  }, {})
}

export const fieldFiltersPresent = (tableFilters: Filters, field: string) => {
  return tableFilters.some(({ field: filterField }) => filterField === field)
}
export const isSelectedFiltersPresent = (selectedFilters: SelectedFilters) =>
  Object.values(selectedFilters).some(filterGroup => filterGroup.length > 0)

export const getSelectedFiltersList = (
  filters: Filters,
  selectedFilters: SelectedFilters,
  columnNames: Data['columnNames']
) => {
  return columnNames.reduce<SelectedFiltersList>((acc, cur) => {
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

export const filterTableDatum = (
  datum: readonly Row[],
  filters: Filters,
  selectedFilters: SelectedFilters
) => {
  const mutableFilteredDatum = []

  for (const row of datum) {
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

      if (!rowIsValid) {
        break
      }
    }

    if (rowIsValid) {
      mutableFilteredDatum.push(row)
    }
  }

  return mutableFilteredDatum
}
