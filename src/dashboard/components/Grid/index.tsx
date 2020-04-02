import React from 'react'

import classnames from 'classnames'
import * as _ from 'lodash'

import {
  ColumnParams,
  Data,
  Dataset,
  GridContent,
  RowParams,
  SwitchItem,
  VerticalAlignment,
  WidgetItem,
} from '@/dashboard'
import { isSwitch, isWidget } from '@/utils/type-guards'

import { Box } from '../Box'

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
} from './helpers'
import css from './index.css'

type Props = {
  grid: GridContent
  data: Data
  datasets: readonly Dataset[]
  viewMode: boolean
  onChange: (grid: GridContent) => void
}

export const EMPTY_GRID_CONTENT: GridContent = _.flow(
  grid => addRow(grid, 'end'),
  grid => addColumn(grid, 'end'),
  grid => addColumn(grid, 'end')
)({
  items: [],
  columnParams: [],
  rowParams: [],
})

const verticalAlignmentNames: Record<VerticalAlignment, string> = {
  top: '↑ Наверху',
  middle: '↕ Посередине',
  bottom: '↓ Внизу',
}
const verticalAlignments = Object.keys(verticalAlignmentNames) as readonly VerticalAlignment[]

const GridButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  title,
  onClick,
}) => (
  <button type="button" onClick={onClick} className={css.button} title={title}>
    {children}
  </button>
)

const GrowRatioInput: React.FC<{
  type: 'column' | 'row'
  value: number
  onChange: (value: number) => void
}> = ({ type, value, onChange }) => (
  <input
    type="number"
    min={0}
    placeholder="Коэф. растяжения"
    title={`Коэффициент растяжения ${type === 'column' ? 'столбца' : 'строки'}`}
    className={css.input}
    value={value}
    onChange={e => onChange(e.target.valueAsNumber)}
    onMouseDown={e => /* чтобы не драгался бокс */ e.stopPropagation()}
  />
)

const DEFAULT_GROW_RATIO = 1

const ColumnButtons: React.FC<{
  rowIdx: number
  columnIdx: number
  grid: GridContent
  onChange: Props['onChange']
}> = ({ rowIdx, columnIdx, grid, onChange }) => {
  if (rowIdx > 0) {
    return null
  }

  const columnsCount = grid.columnParams.length
  const { growRatio = DEFAULT_GROW_RATIO, verticalAlignment } = grid.columnParams[columnIdx]

  return (
    <div className={classnames(css.buttons, css.forColumn)}>
      <span className={css.button}>…</span>
      {columnIdx === 0 ? (
        <GridButton
          children="➕"
          title="Добавить колонку в начале"
          onClick={() => onChange(addColumn(grid, 'start'))}
        />
      ) : (
        <GridButton
          children="⏮"
          title="Передвинуть колонку влево"
          onClick={() => onChange(moveColumn(grid, columnIdx, columnIdx - 1))}
        />
      )}
      {columnsCount > 2 ? (
        <GridButton
          children="☠"
          title="Удалить колонку"
          onClick={() => onChange(removeColumn(grid, columnIdx))}
        />
      ) : null}
      {columnIdx === columnsCount - 1 ? (
        <GridButton
          children="➕"
          title="Добавить колонку в конце"
          onClick={() => onChange(addColumn(grid, 'end'))}
        />
      ) : (
        <GridButton
          children="⏭"
          title="Передвинуть колонку вправо"
          onClick={() => onChange(moveColumn(grid, columnIdx, columnIdx + 1))}
        />
      )}
      <GrowRatioInput
        type="column"
        value={growRatio}
        onChange={newRatio =>
          onChange(updateColumnParams(grid, columnIdx, { growRatio: newRatio }))
        }
      />
      <select
        className={css.alignSelect}
        value={verticalAlignment}
        onChange={e =>
          onChange(
            updateColumnParams(grid, columnIdx, {
              verticalAlignment: e.target.value as VerticalAlignment,
            })
          )
        }
      >
        <optgroup label="Выравнивание содержимого по вертикали">
          {verticalAlignments.map(value => (
            <option key={value} value={value}>
              {verticalAlignmentNames[value]}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  )
}

const RowButtons: React.FC<{
  rowIdx: number
  columnIdx: number
  grid: GridContent
  onChange: Props['onChange']
}> = ({ rowIdx, columnIdx, grid, onChange }) => {
  if (columnIdx !== 0) {
    return null
  }

  const rowsCount = grid.rowParams.length
  const { growRatio = DEFAULT_GROW_RATIO } = grid.rowParams[rowIdx]

  return (
    <div className={classnames(css.buttons, css.forRow)}>
      <span className={css.button}>…</span>
      {rowIdx === 0 ? (
        <GridButton
          children="➕"
          title="Добавить строку в начале"
          onClick={() => onChange(addRow(grid, 'start'))}
        />
      ) : (
        <GridButton
          children="⏫"
          title="Передвинуть строку вверх"
          onClick={() => onChange(moveRow(grid, rowIdx, rowIdx - 1))}
        />
      )}
      {rowsCount > 1 && (
        <GridButton
          children="☠"
          title="Удалить строку"
          onClick={() => onChange(removeRow(grid, rowIdx))}
        />
      )}
      {rowIdx === rowsCount - 1 ? (
        <GridButton
          children="➕"
          title="Добавить строку в конце"
          onClick={() => onChange(addRow(grid, 'end'))}
        />
      ) : (
        <GridButton
          children="⏬"
          title="Передвинуть строку вниз"
          onClick={() => onChange(moveRow(grid, rowIdx, rowIdx + 1))}
        />
      )}
      <GrowRatioInput
        type="row"
        value={growRatio}
        onChange={newRatio => onChange(updateRowParams(grid, rowIdx, { growRatio: newRatio }))}
      />
    </div>
  )
}

const getGridTemplate = (params: ReadonlyArray<ColumnParams | RowParams>): string =>
  params
    .map(({ growRatio = DEFAULT_GROW_RATIO }) => (growRatio ? `${growRatio}fr` : 'auto'))
    .join(' ')

export const Grid: React.FC<Props> = ({ datasets, viewMode, onChange, data, grid }) => {
  return (
    <div
      className={classnames(css.main, viewMode && css.viewMode)}
      style={{
        gridTemplateColumns: getGridTemplate(grid.columnParams),
        gridTemplateRows: getGridTemplate(grid.rowParams),
      }}
    >
      {grid.items.map((row, rowIdx) => (
        <React.Fragment key={rowIdx}>
          {row.map((column, columnIdx) => (
            <div key={columnIdx} className={css.cell}>
              <Box
                datasets={datasets}
                viewMode={viewMode}
                onChange={items =>
                  onChange(
                    updateCellItems({
                      grid,
                      cellRow: rowIdx,
                      cellColumn: columnIdx,
                      items: items.filter(
                        (item): item is WidgetItem | SwitchItem => isWidget(item) || isSwitch(item)
                      ),
                    })
                  )
                }
                data={data}
                items={column}
                verticalAlign={grid.columnParams[columnIdx].verticalAlignment}
                parentName="grid"
              />
              {!viewMode && (
                <>
                  <ColumnButtons
                    rowIdx={rowIdx}
                    columnIdx={columnIdx}
                    grid={grid}
                    onChange={onChange}
                  />
                  <RowButtons
                    rowIdx={rowIdx}
                    columnIdx={columnIdx}
                    grid={grid}
                    onChange={onChange}
                  />
                </>
              )}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
