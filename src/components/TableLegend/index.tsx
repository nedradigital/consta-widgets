import React, { useState } from 'react'
import useDimensions from 'react-use-dimensions'

import classnames from 'classnames'
import { isNil, orderBy } from 'lodash'

import { LegendItem, Type as TypeLegend, types as defaultTypeLegend } from '@/components/LegendItem'

import { DivResizable } from './components/DivResizable'
import { ReactComponent as IconSortAscSvg } from './images/sort-asc.svg'
import { ReactComponent as IconSortDescSvg } from './images/sort-desc.svg'
import { ReactComponent as IconSortSvg } from './images/sort-icon.svg'
import css from './index.css'

export const sizes = ['l', 'm', 's'] as const
export type Size = typeof sizes[number]

const locationClasses = ['textRightPosition', 'textCenterPosition', 'textLeftPosition'] as const
type LocationClasses = typeof locationClasses[number]

export type StyleProps = {
  size: Size
}

type Row = {
  [key: string]: React.ReactNode
}

export type Data = {
  columnNames: readonly ColumnNames[]
  legendFields: ReadonlyArray<{ [key: string]: string }>
  list: readonly Row[]
}

type ColumnNames = {
  title: string
  accessor: string
  className: string
}

type Props = {
  isShowLegend?: boolean
  data: Data
} & StyleProps

export const TableLegend: React.FC<Props> = ({ data, size = 'l', isShowLegend = false }) => {
  const [refTable, { height }] = useDimensions()
  const [accessor, setAccessor] = useState('')
  const [isOrderByDesc, setOrderByDesc] = useState(false)
  const { columnNames, legendFields, list } = data

  const sortBy = (field: string) => {
    setAccessor(field)
    setOrderByDesc(accessor === field ? !isOrderByDesc : true)
  }

  const datum = accessor ? orderBy(list, accessor, isOrderByDesc ? 'desc' : 'asc') : list

  const thRender = columnNames.map((obj, idx) => {
    const sort = accessor === obj.accessor
    return (
      <th
        key={idx}
        className={classnames(
          css[obj.className as LocationClasses],
          sort ? (isOrderByDesc ? css.sortDesc : css.sortAsc) : ''
        )}
        data-accessor={obj.accessor}
        style={{ position: 'relative' }}
        onClick={() => sortBy(obj.accessor)}
      >
        <div className={css.divHelper}>
          <span>{obj.title}</span>
          <span>
            <IconSortSvg
              className={classnames(css.icon, css.iconNeutrally)}
              viewBox="0 0 500 500"
            />
            <IconSortDescSvg className={classnames(css.icon, css.iconDesc)} viewBox="0 0 500 500" />
            <IconSortAscSvg className={classnames(css.icon, css.iconAsc)} viewBox="0 0 500 500" />
          </span>
        </div>
        <DivResizable height={height} />
      </th>
    )
  })

  const renderTableRowWithData = (row: Row) =>
    columnNames.map((column, index) => {
      const text = isNil(row[column.accessor]) ? '–' : row[column.accessor]
      if (index === 0) {
        const legend = legendFields.find(obj => obj.field === row[column.accessor])
        return (
          <td
            key={column.accessor + index}
            className={classnames(css[column.className as LocationClasses])}
          >
            {isShowLegend ? (
              <LegendItem
                text={String(text)}
                color={(legend && legend.color) || ''}
                fontSize="s"
                type={(legend && (legend.typeLegend as TypeLegend)) || defaultTypeLegend[0]}
              />
            ) : (
              text
            )}
          </td>
        )
      } else {
        return (
          <td
            key={column.accessor + index}
            className={classnames(css[column.className as LocationClasses])}
          >
            {text}
          </td>
        )
      }
    })

  return (
    <div className={css.container}>
      <table className={classnames(css.table, css.striped)} ref={refTable}>
        <thead>
          <tr>{thRender}</tr>
        </thead>
        <tbody>
          {datum.map((row, idx) => (
            <tr
              key={idx}
              className={classnames(
                {
                  l: css.rowL,
                  m: css.rowM,
                  s: css.rowS,
                }[size]
              )}
            >
              {renderTableRowWithData(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
