import React from 'react'

import classnames from 'classnames'

import { Data, Dataset } from '@/dashboard/types'
import { removeAt, updateAt } from '@/utils/array'

import { Box, BoxItem } from '../Box'

import css from './index.css'

export type Items = ReadonlyArray<ReadonlyArray<BoxItem>>

export type ColumnsItem = {
  columns: Items
  type: 'columns'
}

type Props = {
  columns?: Items
  data: Data
  datasets: readonly Dataset[]
  viewMode: boolean
  onChange: (columns: Items) => void
}

const defaultColumns: Items = [[], []]

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
