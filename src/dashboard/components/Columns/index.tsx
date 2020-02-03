import React from 'react'

import { removeAt, updateAt } from '@gaz/utils/lib/array'
import classnames from 'classnames'

import { BoxItem, ColumnContent, ColumnsContent, Data, Dataset } from '@/dashboard/types'

import { Box } from '../Box'

import css from './index.css'

type Props = {
  columns: ColumnsContent
  data: Data
  datasets: readonly Dataset[]
  viewMode: boolean
  onChange: (columns: ColumnsContent) => void
}

export const emptyColumn: ColumnContent = { params: {}, items: [] }

export const Columns: React.FC<Props> = ({ datasets, viewMode, onChange, data, columns }) => {
  const addColumn = (type: 'start' | 'end') => {
    switch (type) {
      case 'start': {
        onChange([emptyColumn, ...columns])
        break
      }
      case 'end': {
        onChange([...columns, emptyColumn])
        break
      }
    }
  }

  const getColumnStyle = ({ growRatio = 1 }: ColumnContent['params']): React.CSSProperties => {
    return {
      flexGrow: growRatio,
      flexBasis: growRatio ? 0 : undefined,
    }
  }

  const changeColumn = (index: number, items: ColumnContent) => {
    onChange(updateAt(columns, index, items))
  }

  const removeColumn = (index: number) => {
    onChange(removeAt(columns, index))
  }

  return (
    <div className={classnames(css.main, viewMode && css.viewMode)}>
      {!viewMode ? (
        <>
          <button
            type="button"
            onClick={() => addColumn('start')}
            className={classnames(css.button, css.plus)}
            title="Добавить колонку в начале"
          >
            ➕
          </button>
          <button
            type="button"
            onClick={() => addColumn('end')}
            className={classnames(css.button, css.plus, css.right)}
            title="Добавить колонку в конце"
          >
            ➕
          </button>
        </>
      ) : null}
      {columns.map((column, index) => (
        <div key={index} className={css.column} style={getColumnStyle(column.params)}>
          <Box
            datasets={datasets}
            viewMode={viewMode}
            onChange={(items: readonly BoxItem[]) => {
              changeColumn(index, { ...column, items })
            }}
            data={data}
            items={column.items}
            isNestedBox
          />
          {columns.length > 2 && !viewMode ? (
            <button
              type="button"
              onClick={() => removeColumn(index)}
              children="☠"
              className={classnames(css.button, css.remove)}
              title="Удалить колонку"
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
