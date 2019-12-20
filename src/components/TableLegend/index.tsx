import React, { useRef, useState } from 'react'

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
  className: LocationClasses
}

type FieldSelectedValues = readonly string[]

export type SelectedFilters = { [field: string]: FieldSelectedValues }

type Props = {
  isShowLegend?: boolean
  data: Data
} & StyleProps

export const TableLegend: React.FC<Props> = ({ data, size = 'l', isShowLegend = false }) => {
  const { columnNames, legendFields, list, colorGroups, filters } = data

  const ref = useRef(null)
  const { height } = useComponentSize(ref)
  const [accessor, setAccessor] = useState('')
  const [isOrderByDesc, setOrderByDesc] = useState(false)
  const [visibleFilter, setVisibleFilter] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    getSelectedFiltersInitialState(filters)
  )

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
    const sort = accessor === obj.accessor

    return (
      <th
        key={idx}
        className={classnames(
          css[obj.className],
          visibleFilter === obj.accessor && css.isFilterOpened,
          (sort && (isOrderByDesc ? css.sortDesc : css.sortAsc)) || undefined
        )}
        data-accessor={obj.accessor}
        style={{ position: 'relative' }}
      >
        <div className={css.divHelper}>
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
          <span onClick={() => sortBy(obj.accessor)}>{obj.title}</span>
          <span>
            <IconSortSvg
              onClick={() => sortBy(obj.accessor)}
              className={classnames(css.icon, css.iconSort, css.iconNeutrally)}
              viewBox="0 0 500 500"
            />
            <IconSortDescSvg
              onClick={() => sortBy(obj.accessor)}
              className={classnames(css.icon, css.iconSort, css.iconDesc)}
              viewBox="0 0 500 500"
            />
            <IconSortAscSvg
              onClick={() => sortBy(obj.accessor)}
              className={classnames(css.icon, css.iconSort, css.iconAsc)}
              viewBox="0 0 500 500"
            />
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
