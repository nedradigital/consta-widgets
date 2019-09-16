import React from 'react'

import classnames from 'classnames'

import { Dataset } from '../../'
import { Box, BoxItem } from '../Box'

import css from './index.css'

type Items = BoxItem[][]

export type ColumnsItem = {
  columns: Items
  type: 'columns'
}

type Props = {
  columns?: Items
  datasets?: Dataset[]
  viewMode?: boolean
  onChange?: (columns: Items) => void
  data?: any
  className?: string
  isPreview?: boolean
}

const defaultColumns = [[], []]

export const Columns: React.FC<Props> = ({
  datasets,
  viewMode,
  onChange,
  data,
  className,
  isPreview,
  columns = defaultColumns,
}) => {
  const addColumn = (type: 'start' | 'end') => {
    switch (type) {
      case 'start':
        columns.unshift([])
        break
      case 'end':
        columns.push([])
        break
    }

    if (onChange) {
      onChange(columns)
    }
  }

  const changeColumn = (index: number, items: BoxItem[]) => {
    columns[index] = items

    if (onChange) {
      onChange(columns)
    }
  }

  const removeColumn = (index: number) => {
    const arr = [...columns]

    arr.splice(index, 1)

    if (onChange) {
      onChange(arr)
    }
  }

  return (
    <div className={classnames(css.main, className, viewMode && css.viewMode)}>
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
            onChange={(items: BoxItem[]) => {
              changeColumn(index, items)
            }}
            data={data}
            isPreview={isPreview}
            items={column}
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
