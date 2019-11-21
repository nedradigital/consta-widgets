import React, { useRef, useState } from 'react'

import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import { isNil, orderBy } from 'lodash'

import { LegendItem, Type as TypeLegend, types as defaultTypeLegend } from '@/components/LegendItem'
import { ColorGroups } from '@/dashboard/types'

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

type LegendFields = {
  field: string
  colorGroupName: string
  typeLegend: TypeLegend
}

export type Data = {
  colorGroups: ColorGroups
  columnNames: readonly ColumnNames[]
  legendFields: readonly LegendFields[]
  list: readonly Row[]
}

type ColumnNames = {
  title: string
  accessor: string
  className: LocationClasses
}

type Props = {
  isShowLegend?: boolean
  data: Data
} & StyleProps

export const TableLegend: React.FC<Props> = ({ data, size = 'l', isShowLegend = false }) => {
  const ref = useRef(null)
  const { height } = useComponentSize(ref)
  const [accessor, setAccessor] = useState('')
  const [isOrderByDesc, setOrderByDesc] = useState(false)
  const { columnNames, legendFields, list, colorGroups } = data

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
          css[obj.className],
          (sort && (isOrderByDesc ? css.sortDesc : css.sortAsc)) || undefined
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
          <td key={column.accessor + index} className={classnames(css[column.className])}>
            {isShowLegend ? (
              <LegendItem
                text={String(text)}
                color={(legend && colorGroups[legend.colorGroupName]) || ''}
                fontSize="s"
                type={(legend && legend.typeLegend) || defaultTypeLegend[0]}
              />
            ) : (
              text
            )}
          </td>
        )
      } else {
        return (
          <td key={column.accessor + index} className={classnames(css[column.className])}>
            {text}
          </td>
        )
      }
    })

  return (
    <div className={css.container}>
      <table className={classnames(css.table, css.striped)} ref={ref}>
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
