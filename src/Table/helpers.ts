import _ from 'lodash'

import { BasicTableRow, RowField } from '@/common/utils/table'

import { SortingState } from './'

export const getColumnsSize = (sizes: ReadonlyArray<number | undefined>) => {
  return sizes.map(s => (s ? `${s}px` : 'minmax(min-content, 1fr)')).join(' ')
}

export const getColumnLeftOffset = ({
  columnIndex,
  resizedColumnWidths,
  initialColumnWidths,
}: {
  columnIndex: number
  resizedColumnWidths: ReadonlyArray<number | undefined>
  initialColumnWidths: readonly number[]
}) => {
  const selectedColumns = initialColumnWidths
    .slice(0, columnIndex)
    .map((size, index) => resizedColumnWidths[index] || size)

  return _.sum(selectedColumns)
}

export const getNewSorting = <T extends BasicTableRow>(
  currentSorting: SortingState<T>,
  newField: RowField<T>
): SortingState<T> => {
  if (!currentSorting || currentSorting.by !== newField) {
    return {
      by: newField,
      order: 'asc',
    }
  }

  if (currentSorting.order === 'asc') {
    return {
      by: newField,
      order: 'desc',
    }
  }

  return null
}
