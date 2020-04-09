import * as _ from 'lodash'

import { GridContent, WidgetItem } from '@/dashboard'
import { widgetIdsByType } from '@/utils/widgets-list'

import {
  addColumn,
  addRow,
  moveColumn,
  moveRow,
  removeColumn,
  removeRow,
  updateCellItems,
  updateColumnParams,
  updateRowParams,
} from '../helpers'

const createWidget = (name: string): WidgetItem => ({
  type: 'widget',
  debugName: name,
  id: name,
  widgetType: widgetIdsByType.TextWidget,
  params: {
    text: 'text',
    type: 'text3',
  },
})

describe('Grid helpers', () => {
  const grid: GridContent = {
    columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
    rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
    items: [
      [
        [createWidget('w1.1'), createWidget('w1.1+')],
        [createWidget('w1.2')],
        [createWidget('w1.3')],
      ],
      [[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]],
    ],
  }

  describe('updateCellItems', () => {
    it('очищает ячейку', () => {
      const result = updateCellItems({
        grid,
        cellRow: 0,
        cellColumn: 0,
        items: [],
      })
      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [[], [createWidget('w1.2')], [createWidget('w1.3')]],
          [[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]],
        ],
      }

      expect(result).toEqual(expected)
    })

    it('обновляет пустую ячейку', () => {
      const gridWithEmptyCell = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [[], []],
          [[], []],
        ],
      }
      const newItems = [createWidget('newWidget1'), createWidget('newWidget2')] as const
      const result = updateCellItems({
        grid: gridWithEmptyCell,
        cellRow: 1,
        cellColumn: 1,
        items: newItems,
      })
      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [[], []],
          [[], newItems],
        ],
      }

      expect(result).toEqual(expected)
    })

    it('обновляет непустую ячейку', () => {
      const newItems = [createWidget('newWidget1'), createWidget('newWidget2')] as const
      const result = updateCellItems({
        grid,
        cellRow: 1,
        cellColumn: 1,
        items: newItems,
      })
      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.2')],
            [createWidget('w1.3')],
          ],
          [[createWidget('w2.1')], newItems, [createWidget('w2.3')]],
        ],
      }

      expect(result).toEqual(expected)
    })
  })

  describe('addRow', () => {
    it('добавляет строку в начало', () => {
      const result = addRow(grid, 'start')
      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{}, { growRatio: 1 }, { growRatio: 2 }],
        items: [
          [[], [], []],
          [
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.2')],
            [createWidget('w1.3')],
          ],
          [[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]],
        ],
      }

      expect(result).toEqual(expected)
    })

    it('добавляет 2 строки в конец', () => {
      const result = _.flow(
        g => addRow(g, 'end'),
        g => addRow(g, 'end')
      )(grid)

      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }, {}, {}],
        items: [
          [
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.2')],
            [createWidget('w1.3')],
          ],
          [[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]],
          [[], [], []],
          [[], [], []],
        ],
      }

      expect(result).toEqual(expected)
    })
  })

  describe('removeRow', () => {
    it('удаляет строку', () => {
      const result = removeRow(grid, 0)
      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 2 }],
        items: [[[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]]],
      }

      expect(result).toEqual(expected)
    })
  })

  describe('moveRow', () => {
    it('двигает строку наверх', () => {
      const result = moveRow(grid, 1, 0)
      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 2 }, { growRatio: 1 }],
        items: [
          [[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]],
          [
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.2')],
            [createWidget('w1.3')],
          ],
        ],
      }

      expect(result).toEqual(expected)
    })

    it('двигает строку вниз', () => {
      const result = moveRow(grid, 0, 1)
      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 2 }, { growRatio: 1 }],
        items: [
          [[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]],
          [
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.2')],
            [createWidget('w1.3')],
          ],
        ],
      }

      expect(result).toEqual(expected)
    })
  })

  describe('addColumn', () => {
    it('добавляет колонку в начало', () => {
      const result = addColumn(grid, 'start')
      const expected = {
        columnParams: [{}, { growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [
            [],
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.2')],
            [createWidget('w1.3')],
          ],
          [[], [createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]],
        ],
      }

      expect(result).toEqual(expected)
    })

    it('добавляет 2 колонки в конец', () => {
      const result = _.flow(
        g => addColumn(g, 'end'),
        g => addColumn(g, 'end')
      )(grid)
      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }, {}, {}],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.2')],
            [createWidget('w1.3')],
            [],
            [],
          ],
          [[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')], [], []],
        ],
      }

      expect(result).toEqual(expected)
    })
  })

  describe('removeColumn', () => {
    it('удаляет колонку в начале', () => {
      const result = removeColumn(grid, 0)
      const expected: GridContent = {
        columnParams: [{ growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [[createWidget('w1.2')], [createWidget('w1.3')]],
          [[createWidget('w2.2')], [createWidget('w2.3')]],
        ],
      }

      expect(result).toEqual(expected)
    })

    it('удаляет колонку в середине', () => {
      const result = removeColumn(grid, 1)
      const expected: GridContent = {
        columnParams: [{ growRatio: 1 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [[createWidget('w1.1'), createWidget('w1.1+')], [createWidget('w1.3')]],
          [[createWidget('w2.1')], [createWidget('w2.3')]],
        ],
      }

      expect(result).toEqual(expected)
    })

    it('удаляет колонку в конце', () => {
      const result = removeColumn(grid, 2)
      const expected: GridContent = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [[createWidget('w1.1'), createWidget('w1.1+')], [createWidget('w1.2')]],
          [[createWidget('w2.1')], [createWidget('w2.2')]],
        ],
      }

      expect(result).toEqual(expected)
    })
  })

  describe('moveColumn', () => {
    it('двигает колонку вправо', () => {
      const result = moveColumn(grid, 1, 2)
      const expected = {
        columnParams: [{ growRatio: 1 }, { growRatio: 3 }, { growRatio: 2 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.3')],
            [createWidget('w1.2')],
          ],
          [[createWidget('w2.1')], [createWidget('w2.3')], [createWidget('w2.2')]],
        ],
      }

      expect(result).toEqual(expected)
    })

    it('двигает колонку влево', () => {
      const result = moveColumn(grid, 1, 0)
      const expected = {
        columnParams: [{ growRatio: 2 }, { growRatio: 1 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [
            [createWidget('w1.2')],
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.3')],
          ],
          [[createWidget('w2.2')], [createWidget('w2.1')], [createWidget('w2.3')]],
        ],
      }

      expect(result).toEqual(expected)
    })
  })

  describe('updateColumnParams', () => {
    it('обновляет настройки колонки', () => {
      const result = updateColumnParams(grid, 1, { growRatio: 222 })
      const expected: GridContent = {
        columnParams: [{ growRatio: 1 }, { growRatio: 222 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 2 }],
        items: [
          [
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.2')],
            [createWidget('w1.3')],
          ],
          [[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]],
        ],
      }

      expect(result).toEqual(expected)
    })
  })

  describe('updateRowParams', () => {
    it('обновляет настройки строки', () => {
      const result = updateRowParams(grid, 1, { growRatio: 222 })
      const expected: GridContent = {
        columnParams: [{ growRatio: 1 }, { growRatio: 2 }, { growRatio: 3 }],
        rowParams: [{ growRatio: 1 }, { growRatio: 222 }],
        items: [
          [
            [createWidget('w1.1'), createWidget('w1.1+')],
            [createWidget('w1.2')],
            [createWidget('w1.3')],
          ],
          [[createWidget('w2.1')], [createWidget('w2.2')], [createWidget('w2.3')]],
        ],
      }

      expect(result).toEqual(expected)
    })
  })
})
