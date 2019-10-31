import React from 'react'

import { removeAt, updateAt } from '@gaz/utils/lib/array'
import classnames from 'classnames'

import { BoxItem, ColumnsContent, Data, Dataset } from '@/dashboard/types'

import { Box } from '../Box'

import css from './index.css'

type Props = {
  columns?: ColumnsContent
  data: Data
  datasets: readonly Dataset[]
  viewMode: boolean
  onChange: (columns: ColumnsContent) => void
}

const defaultColumns: ColumnsContent = [[], []]

export const Columns: React.FC<Props> = ({
  datasets,
  viewMode,
  onChange,
  data,
  columns = defaultColumns,
}) => {
  const addColumn = (type: 'start' | 'end') => {
    switch (type) {
      case 'start':
        onChange([[], ...columns])
        break
      case 'end':
        onChange([...columns, []])
        break
    }
  }

  const changeColumn = (index: number, items: readonly BoxItem[]) => {
    onChange(updateAt(columns, index, items))
  }

  const removeColumn = (index: number) => {
    onChange(removeAt(columns, index))
  }

  return (
    <div className={classnames(css.main, viewMode && css.viewMode)}>
      {!viewMode ? (
        <>
          <button type="button" onClick={() => addColumn('start')} className={css.plus}>
            ➕
          </button>
          <button
            type="button"
            onClick={() => addColumn('end')}
            className={classnames(css.plus, css.right)}
          >
            ➕
          </button>
        </>
      ) : null}
      {columns.map((column, index) => (
        <div key={index} className={css.column}>
          <Box
            datasets={datasets}
            viewMode={viewMode}
            onChange={(items: readonly BoxItem[]) => {
              changeColumn(index, items)
            }}
            data={data}
            items={column}
            isNestedBox
          />
          {columns.length > 2 && !viewMode ? (
            <button
              type="button"
              onClick={() => removeColumn(index)}
              children="☠"
              className={css.remove}
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
