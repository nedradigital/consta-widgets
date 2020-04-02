import { move, removeAt, updateAt } from '@csssr/gpn-utils/lib/array'
import * as _ from 'lodash'

import { ColumnParams, GridContent, RowParams, SwitchItem, WidgetItem } from '@/dashboard'

export const updateCellItems = ({
  grid,
  cellRow,
  cellColumn,
  items,
}: {
  grid: GridContent
  cellRow: number
  cellColumn: number
  items: ReadonlyArray<SwitchItem | WidgetItem>
}): GridContent => {
  const newGridItems = grid.items.map((row, rowIdx) =>
    rowIdx === cellRow ? updateAt(row, cellColumn, items) : row
  )

  return {
    ...grid,
    items: newGridItems,
  }
}

export const addRow = (grid: GridContent, where: 'start' | 'end'): GridContent => {
  const newRowParams = {}
  const newRow = _.times(grid.columnParams.length, () => [])

  return where === 'start'
    ? {
        ...grid,
        rowParams: [newRowParams, ...grid.rowParams],
        items: [newRow, ...grid.items],
      }
    : {
        ...grid,
        rowParams: [...grid.rowParams, newRowParams],
        items: [...grid.items, newRow],
      }
}

export const removeRow = (grid: GridContent, rowIdx: number): GridContent => {
  return {
    ...grid,
    rowParams: removeAt(grid.rowParams, rowIdx),
    items: removeAt(grid.items, rowIdx),
  }
}

export const moveRow = (grid: GridContent, fromIdx: number, toIdx: number): GridContent => {
  return {
    ...grid,
    rowParams: move(grid.rowParams, fromIdx, toIdx),
    items: move(grid.items, fromIdx, toIdx),
  }
}

export const addColumn = (grid: GridContent, where: 'start' | 'end'): GridContent => {
  return where === 'start'
    ? {
        ...grid,
        columnParams: [{}, ...grid.columnParams],
        items: grid.items.map(row => [[], ...row]),
      }
    : {
        ...grid,
        columnParams: [...grid.columnParams, {}],
        items: grid.items.map(row => [...row, []]),
      }
}

export const removeColumn = (grid: GridContent, columnIdx: number): GridContent => {
  return {
    ...grid,
    columnParams: removeAt(grid.columnParams, columnIdx),
    items: grid.items.map(row => removeAt(row, columnIdx)),
  }
}

export const moveColumn = (grid: GridContent, fromIdx: number, toIdx: number): GridContent => {
  return {
    ...grid,
    columnParams: move(grid.columnParams, fromIdx, toIdx),
    items: grid.items.map(row => move(row, fromIdx, toIdx)),
  }
}

export const updateColumnParams = (
  grid: GridContent,
  columnIdx: number,
  newParams: ColumnParams
): GridContent => ({
  ...grid,
  columnParams: updateAt(grid.columnParams, columnIdx, {
    ...grid.columnParams[columnIdx],
    ...newParams,
  }),
})

export const updateRowParams = (
  grid: GridContent,
  rowIdx: number,
  newParams: RowParams
): GridContent => ({
  ...grid,
  rowParams: updateAt(grid.rowParams, rowIdx, {
    ...grid.rowParams[rowIdx],
    ...newParams,
  }),
})
