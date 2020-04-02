import { useRef, useState } from 'react'

import { updateAt } from '@csssr/gpn-utils/lib/array'
import { Text } from '@gpn-design/uikit'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import { isNil, orderBy } from 'lodash'

import { LegendItem, Type as TypeLegend, types as defaultTypeLegend } from '@/components/LegendItem'
import { useBaseSize } from '@/contexts'
import { ColorGroups } from '@/dashboard'
import { FilterTooltip } from '@/ui/FilterTooltip'
import { SelectedOptionsList } from '@/ui/SelectedOptionsList'
import {
  fieldFiltersPresent,
  FieldSelectedValues,
  Filters,
  filterTableData,
  getOptionsForFilters,
  getSelectedFiltersList,
  isSelectedFiltersPresent,
  TableColumn as CommonTableColumn,
  TableRow,
  useSelectedFilters,
} from '@/utils/table'

import { Resizer } from './components/Resizer'
import { ReactComponent as IconSortAscSvg } from './images/sort-asc.svg'
import { ReactComponent as IconSortDescSvg } from './images/sort-desc.svg'
import { ReactComponent as IconSortSvg } from './images/sort-icon.svg'
import css from './index.css'

export const sizes = ['l', 'm', 's'] as const
export type Size = typeof sizes[number]

type LegendFields = {
  field: string
  colorGroupName: string
  typeLegend: TypeLegend
}

type Column = CommonTableColumn & {
  align: 'left' | 'center' | 'right'
}

export type Data = {
  colorGroups: ColorGroups
  columns: readonly Column[]
  legendFields: readonly LegendFields[]
  list: readonly TableRow[]
  filters?: Filters
}

const alignClasses = {
  left: css.alignLeft,
  center: css.alignCenter,
  right: css.alignRight,
}

type Props = {
  isShowLegend?: boolean
  data: Data
  size: Size
}

export const TableLegend: React.FC<Props> = ({ data, size = 'l', isShowLegend = false }) => {
  const { columns, legendFields, list, colorGroups, filters } = data

  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const { height: tableHeight } = useComponentSize(tableRef)
  const [accessor, setAccessor] = useState('')
  const [isOrderByDesc, setOrderByDesc] = useState(false)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  const [visibleFilter, setVisibleFilter] = useState<string | null>(null)
  const {
    selectedFilters,
    updateSelectedFilters,
    removeOneSelectedFilter,
    removeAllSelectedFilters,
  } = useSelectedFilters(filters)

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

  const tableData = accessor ? orderBy(list, accessor, isOrderByDesc ? 'desc' : 'asc') : list

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
    updateSelectedFilters(field, tooltipSelectedFilters)
    closeTooltip()
  }

  const removeSelectedFilter = (tableFilters: Filters) => (filter: string) => {
    removeOneSelectedFilter(tableFilters, filter)
  }
  const resetSelectedFilters = () => {
    if (filters && filters.length) {
      removeAllSelectedFilters(filters)
    }
  }

  const filteredData =
    !filters || !isSelectedFiltersPresent(selectedFilters)
      ? tableData
      : filterTableData({ data: tableData, filters, selectedFilters })

  const thRender = columns.map((obj, idx) => {
    const isSortingActive = accessor === obj.accessor
    const IconSort =
      (isSortingActive && (isOrderByDesc ? IconSortDescSvg : IconSortAscSvg)) || IconSortSvg
    const handleColumnResize = (delta: number) => {
      const columnMinWidth = Math.min(getCalculatedSizeWithBaseSize(150), initialColumnWidths[idx])
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
        <Text
          tag="div"
          size="xs"
          transform="uppercase"
          view="primary"
          spacing="xs"
          weight="bold"
          className={css.titleWrapper}
        >
          {filters && fieldFiltersPresent(filters, obj.accessor) && (
            <FilterTooltip
              field={obj.accessor}
              isOpened={visibleFilter === obj.accessor}
              options={getOptionsForFilters(filters, obj.accessor)}
              values={selectedFilters[obj.accessor]}
              onSave={handleTooltipSave}
              onCancel={handleTooltipCancel}
              handleFilterTogglerClick={handleFilterTogglerClick(obj.accessor)}
              className={css.iconFilter}
            />
          )}
          <span className={css.title} onClick={() => sortBy(obj.accessor)}>
            {obj.title}
          </span>
          <IconSort
            onClick={() => sortBy(obj.accessor)}
            className={classnames(css.icon, css.iconSort)}
          />
        </Text>
        <Resizer
          height={tableHeight}
          onResize={handleColumnResize}
          onDoubleClick={() => updateColumnWidth(idx, initialColumnWidths[idx])}
        />
      </th>
    )
  })

  const renderTableRowWithData = (row: TableRow) =>
    columns.map((column, index) => {
      const cellValue = row[column.accessor]
      const cellContent = isNil(cellValue) ? '–' : cellValue
      const legend = legendFields.find(obj => obj.field === row[column.accessor])

      return (
        <Text
          key={column.accessor + index}
          tag="td"
          size="s"
          view="primary"
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
        </Text>
      )
    })

  return (
    <div className={css.main} ref={containerRef}>
      <table className={classnames(css.table, columnWidths.length && css.isFixed)} ref={tableRef}>
        <thead>
          <tr>{thRender}</tr>
          {filters && isSelectedFiltersPresent(selectedFilters) && (
            <tr className={css.selectedFiltersRow}>
              <th colSpan={columns.length}>
                <SelectedOptionsList
                  values={getSelectedFiltersList({ filters, selectedFilters, columns })}
                  onRemove={removeSelectedFilter(filters)}
                  onReset={resetSelectedFilters}
                />
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
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
