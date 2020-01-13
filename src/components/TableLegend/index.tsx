import React, { useRef, useState } from 'react'

import { updateAt } from '@gaz/utils/lib/array'
import { getCalculatedSize } from '@gaz/utils/lib/css'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import { isNil, orderBy, xor } from 'lodash'

import { LegendItem, Type as TypeLegend, types as defaultTypeLegend } from '@/components/LegendItem'
import { ColorGroups } from '@/dashboard/types'
import { FilterTooltip } from '@/ui/FilterTooltip'
import { SelectedOptionsList } from '@/ui/SelectedOptionsList'
import {
  fieldFiltersPresent,
  filterTableDatum,
  getOptionsForFilters,
  getSelectedFiltersInitialState,
  getSelectedFiltersList,
  isSelectedFiltersPresent,
} from '@/utils/table'

import { Resizer } from './components/Resizer'
import { ReactComponent as IconSortAscSvg } from './images/sort-asc.svg'
import { ReactComponent as IconSortDescSvg } from './images/sort-desc.svg'
import { ReactComponent as IconSortSvg } from './images/sort-icon.svg'
import css from './index.css'

export const sizes = ['l', 'm', 's'] as const
export type Size = typeof sizes[number]

export type Row = {
  [key: string]: React.ReactNode
}

type LegendFields = {
  field: string
  colorGroupName: string
  typeLegend: TypeLegend
}

type Filter = {
  id: string
  name: string
  filterer: (value: any) => boolean
  field: string
}

export type Filters = readonly Filter[]

export type Data = {
  colorGroups: ColorGroups
  columnNames: readonly ColumnNames[]
  legendFields: readonly LegendFields[]
  list: readonly Row[]
  filters?: Filters
}

type ColumnNames = {
  title: string
  accessor: string
  align: 'left' | 'center' | 'right'
}

const alignClasses = {
  left: css.alignLeft,
  center: css.alignCenter,
  right: css.alignRight,
}

type FieldSelectedValues = readonly string[]

export type SelectedFilters = { [field: string]: FieldSelectedValues }

type Props = {
  isShowLegend?: boolean
  data: Data
  size: Size
}

export const TableLegend: React.FC<Props> = ({ data, size = 'l', isShowLegend = false }) => {
  const { columnNames, legendFields, list, colorGroups, filters } = data

  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const { height: tableHeight } = useComponentSize(tableRef)
  const [accessor, setAccessor] = useState('')
  const [isOrderByDesc, setOrderByDesc] = useState(false)
  const [visibleFilter, setVisibleFilter] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    getSelectedFiltersInitialState(filters)
  )
  const [columnWidths, setColumnWidths] = useState<readonly number[]>([])
  const [initialColumnWidths, setInitialColumnWidths] = useState<readonly number[]>([])

  const updateColumnWidth = (idx: number, newWidth: number) =>
    setColumnWidths(updateAt(columnWidths, idx, newWidth))

  React.useLayoutEffect(() => {
    const refEl = tableRef.current

    if (!refEl) {
      return
    }

    const columnEls = Array.from(refEl.querySelectorAll('th'))
    const newColumnWidths = columnEls.map(el => el.offsetWidth)
    setColumnWidths(newColumnWidths)
    setInitialColumnWidths(newColumnWidths)
  }, [])

  const datum = accessor ? orderBy(list, accessor, isOrderByDesc ? 'desc' : 'asc') : list

  const sortBy = (field: string) => {
    setAccessor(field)
    setOrderByDesc(accessor === field ? !isOrderByDesc : true)
  }

  const handleFilterTogglerClick = (id: string) => () => {
    setVisibleFilter(visibleFilter === id ? null : id)
  }

  const closeTooltip = () => {
    setVisibleFilter(null)
  }
  const handleTooltipCancel = () => {
    closeTooltip()
  }
  const handleTooltipSave = (field: string, tooltipSelectedFilters: FieldSelectedValues) => {
    setSelectedFilters({
      ...selectedFilters,
      [field]: [...tooltipSelectedFilters],
    })
    closeTooltip()
  }

  const removeSelectedFilter = (tableFilters: Filters) => (filter: string) => {
    const filterToDelete = tableFilters.find(({ id }) => id === filter)

    if (filterToDelete) {
      setSelectedFilters({
        ...selectedFilters,
        [filterToDelete.field]: xor(selectedFilters[filterToDelete.field], [filter]),
      })
    }
  }
  const resetSelectedFilters = () => {
    setSelectedFilters(getSelectedFiltersInitialState(filters))
  }

  const filteredDatum =
    !filters || !isSelectedFiltersPresent(selectedFilters)
      ? datum
      : filterTableDatum(datum, filters, selectedFilters)

  const thRender = columnNames.map((obj, idx) => {
    const isSortingActive = accessor === obj.accessor
    const IconSort =
      (isSortingActive && (isOrderByDesc ? IconSortDescSvg : IconSortAscSvg)) || IconSortSvg
    const handleColumnResize = (delta: number) => {
      const columnMinWidth = Math.min(getCalculatedSize(150), initialColumnWidths[idx])
      const newColumnWidth = Math.max(columnMinWidth, columnWidths[idx] + delta)

      updateColumnWidth(idx, newColumnWidth)

      // При расширении последней колонки скроллим таблицу вправо
      const containerEl = containerRef.current
      if (idx === columnWidths.length - 1 && delta > 0 && containerEl) {
        containerEl.scrollBy(delta, 0)
      }
    }

    return (
      <th
        key={idx}
        className={classnames(
          css.cell,
          css.isHeader,
          alignClasses[obj.align],
          visibleFilter === obj.accessor && css.isFilterOpened
        )}
        style={{ width: columnWidths[idx] }}
      >
        <div className={css.titleWrapper}>
          {filters && fieldFiltersPresent(filters, obj.accessor) && (
            <FilterTooltip
              field={obj.accessor}
              isOpened={visibleFilter === obj.accessor}
              options={getOptionsForFilters(filters, obj.accessor)}
              values={selectedFilters[obj.accessor]}
              onSave={handleTooltipSave}
              onCancel={handleTooltipCancel}
              handleFilterTogglerClick={handleFilterTogglerClick(obj.accessor)}
              className={classnames(css.icon, css.iconFilter)}
            />
          )}
          <span className={css.title} onClick={() => sortBy(obj.accessor)}>
            {obj.title}
          </span>
          <IconSort
            onClick={() => sortBy(obj.accessor)}
            className={classnames(css.icon, css.iconSort)}
          />
        </div>
        <Resizer
          height={tableHeight}
          onResize={handleColumnResize}
          onDoubleClick={() => updateColumnWidth(idx, initialColumnWidths[idx])}
        />
      </th>
    )
  })

  const renderTableRowWithData = (row: Row) =>
    columnNames.map((column, index) => {
      const cellValue = row[column.accessor]
      const cellContent = isNil(cellValue) ? '–' : cellValue
      const legend = legendFields.find(obj => obj.field === row[column.accessor])

      return (
        <td
          key={column.accessor + index}
          className={classnames(css.cell, alignClasses[column.align])}
        >
          {isShowLegend && index === 0 ? (
            <LegendItem
              color={(legend && colorGroups[legend.colorGroupName]) || ''}
              fontSize="s"
              type={(legend && legend.typeLegend) || defaultTypeLegend[0]}
            >
              {cellContent}
            </LegendItem>
          ) : (
            cellContent
          )}
        </td>
      )
    })

  return (
    <div className={css.main} ref={containerRef}>
      <table className={classnames(css.table, columnWidths.length && css.isFixed)} ref={tableRef}>
        <thead>
          <tr>{thRender}</tr>
          {filters && isSelectedFiltersPresent(selectedFilters) && (
            <tr className={css.selectedFiltersRow}>
              <th colSpan={columnNames.length}>
                <SelectedOptionsList
                  values={getSelectedFiltersList(filters, selectedFilters, columnNames)}
                  onRemove={removeSelectedFilter(filters)}
                  onReset={resetSelectedFilters}
                />
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {filteredDatum.map((row, idx) => (
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
