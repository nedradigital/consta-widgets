import { updateAt } from '@csssr/gpn-utils/lib/array'
import { isDefined, isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import { IconAlignLeft } from '@gpn-design/uikit/IconAlignLeft'
import { IconSortDown } from '@gpn-design/uikit/IconSortDown'
import { IconSortUp } from '@gpn-design/uikit/IconSortUp'
import { Text } from '@gpn-design/uikit/Text'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import _ from 'lodash'

import {
  BasicTableColumn,
  BasicTableRow,
  fieldFiltersPresent,
  FieldSelectedValues,
  Filters,
  filterTableData,
  getOptionsForFilters,
  getSelectedFiltersList,
  isSelectedFiltersPresent,
  RowField,
  useSelectedFilters,
} from '@/common/utils/table'
import { isHtmlElement } from '@/common/utils/type-guards'
import { FilterTooltip } from '@/core/FilterTooltip'
import { SelectedOptionsList } from '@/core/SelectedOptionsList'
import { useBaseSize } from '@/BaseSizeContext'

import { Resizer } from './components/Resizer'
import { getColumnLeftOffset, getColumnsSize, getNewSorting } from './helpers'
import css from './index.css'

type VerticalAlign = 'top' | 'center' | 'bottom'
type HorizontalAlign = 'left' | 'center' | 'right'
type Size = 's' | 'm' | 'l'

type TableCSSCustomProperty = {
  '--table-width': string
  '--table-header-height': string
}

type ActiveRow = {
  id: string | undefined
  onChange: (id: string | undefined) => void
}

type Column<T extends BasicTableRow> = BasicTableColumn<T> & {
  align?: HorizontalAlign
} & ({ sortable?: false } | { sortable: true; sortByField?: RowField<T> })

export type Props<T extends BasicTableRow> = {
  columns: ReadonlyArray<Column<T>>
  rows: readonly T[]
  filters?: Filters<T>
  size?: Size
  stickyHeader?: boolean
  stickyColumns?: number
  isResizable?: boolean
  activeRow?: ActiveRow
  verticalAlign?: VerticalAlign
  isZebraStriped?: boolean
  borderBetweenRows?: boolean
  borderBetweenColumns?: boolean
  emptyRowsPlaceholder?: React.ReactNode
}

export type SortingState<T extends BasicTableRow> = {
  by: RowField<T>
  order: 'asc' | 'desc'
} | null

const sizeClasses: Record<Size, string> = {
  s: css.sizeS,
  m: css.sizeM,
  l: css.sizeL,
}

const verticalCellAlignClasses: Record<VerticalAlign, string> = {
  top: css.verticalAlignTop,
  center: css.verticalAlignCenter,
  bottom: css.verticalAlignBottom,
}

const horizontalCellAlignClasses: Record<HorizontalAlign, string> = {
  left: css.horizontalAlignLeft,
  center: css.horizontalAlignCenter,
  right: css.horizontalAlignRight,
}

const defaultEmptyRowsPlaceholder = (
  <Text as="span" view="primary" size="s" lineHeight="s">
    Нет данных
  </Text>
)

const headerShadow = (
  <div className={classnames(css.headerShadowWrapper)}>
    <div className={css.headerShadow} />
  </div>
)

const getColumnSortByField = <T extends BasicTableRow>(column: Column<T>): RowField<T> =>
  (column.sortable && column.sortByField) || column.accessor

const getHorizontalAlign = (align: HorizontalAlign = 'left') => {
  return horizontalCellAlignClasses[align]
}

export const Table = <T extends BasicTableRow>({
  columns,
  rows,
  size = 'l',
  filters,
  isResizable = true,
  stickyHeader = false,
  stickyColumns = 0,
  activeRow,
  verticalAlign = 'top',
  isZebraStriped = false,
  borderBetweenRows = false,
  borderBetweenColumns = false,
  emptyRowsPlaceholder = defaultEmptyRowsPlaceholder,
}: Props<T>): React.ReactElement => {
  const [resizedColumnWidths, setResizedColumnWidths] = React.useState<
    ReadonlyArray<number | undefined>
  >(columns.map(() => undefined))
  const [initialColumnWidths, setInitialColumnWidths] = React.useState<readonly number[]>([])
  const [sorting, setSorting] = React.useState<SortingState<T>>(null)
  const [visibleFilter, setVisibleFilter] = React.useState<string | null>(null)
  const [tableScroll, setTableScroll] = React.useState({ top: 0, left: 0 })
  const tableRef = React.useRef<HTMLDivElement>(null)
  const columnsRefs = React.useRef<Record<number, HTMLDivElement | null>>({})
  const firstHeaderColumnRef = React.useRef<HTMLDivElement>(null)
  const {
    selectedFilters,
    updateSelectedFilters,
    removeOneSelectedFilter,
    removeAllSelectedFilters,
  } = useSelectedFilters(filters)
  /*
    Подписываемся на изменения размеров таблицы, но не используем значения из
    хука так как нам нужна ширина и высота таблицы без размера скролла. Этот хук
    использует значения `offsetWidth` и `offsetHeight` которые включают размер
    скролл бара.
  */
  useComponentSize(tableRef)
  const tableHeight = tableRef.current?.clientHeight || 0
  const tableWidth = tableRef.current?.clientWidth || 0
  /*
    Так как настройки сетки адаптируют высоту всех ячеек строки по высоте
    самой большой ячейки, то для расчета высоты заголовка достаточно получить
    высоту первой ячейки.
  */
  const { height: tableHeaderHeight } = useComponentSize(firstHeaderColumnRef)
  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const showVerticalCellShadow = tableScroll.left > 0
  const showHorizontalCellShadow = tableScroll.top > 0
  const isRowsClickable = activeRow && activeRow.onChange

  const updateColumnWidth = (idx: number, newWidth: number) => {
    setResizedColumnWidths(updateAt(resizedColumnWidths, idx, newWidth))
  }

  React.useLayoutEffect(() => {
    const columnsElements = Object.values(columnsRefs.current).filter(isNotNil)
    if (columnsElements.length === 0) {
      return
    }

    setInitialColumnWidths(columnsElements.map(el => el.offsetWidth))
  }, [])

  const isSortedByColumn = (column: Column<T>) => getColumnSortByField(column) === sorting?.by

  const getSortIcon = (column: Column<T>) => {
    const IconSort =
      (isSortedByColumn(column) && (sorting?.order === 'desc' ? IconSortDown : IconSortUp)) ||
      // todo заменить на соответствующую иконку, когда добавят в ui-kit: https://github.com/gpn-prototypes/ui-kit/issues/212
      IconAlignLeft

    return <IconSort size="xs" />
  }

  const handleSortClick = (column: Column<T>) => {
    setSorting(getNewSorting(sorting, getColumnSortByField(column)))
  }

  const handleFilterTogglerClick = (id: string) => () => {
    setVisibleFilter(visibleFilter === id ? null : id)
  }

  const handleTooltipSave = (field: string, tooltipSelectedFilters: FieldSelectedValues) => {
    updateSelectedFilters(field, tooltipSelectedFilters)
  }

  const removeSelectedFilter = (tableFilters: Filters<T>) => (filter: string) => {
    removeOneSelectedFilter(tableFilters, filter)
  }

  const resetSelectedFilters = () => {
    if (filters && filters.length) {
      removeAllSelectedFilters(filters)
    }
  }

  const getRowStatus = (id: string) => {
    if (!activeRow || !activeRow.id) {
      return
    }

    return activeRow.id === id ? css.isActive : css.isDarkned
  }

  const getStickyLeftOffset = (columnIndex: number) => {
    if (columnIndex >= stickyColumns) {
      return
    }

    return getColumnLeftOffset({
      columnIndex,
      resizedColumnWidths,
      initialColumnWidths,
    })
  }

  const handleScroll: React.UIEventHandler = e => {
    if (!isHtmlElement(e.target)) {
      return
    }

    setTableScroll({
      top: e.target.scrollTop,
      left: e.target.scrollLeft,
    })
  }

  const handleSelectRow = (id: string) => {
    if (!activeRow || !activeRow.onChange) {
      return
    }

    return () => {
      activeRow.onChange(activeRow.id === id ? undefined : id)
    }
  }

  const handleColumnResize = (idx: number, delta: number) => {
    const columnMinWidth = Math.min(getCalculatedSizeWithBaseSize(150), initialColumnWidths[idx])
    const prevColumnWidth = resizedColumnWidths[idx] || initialColumnWidths[idx]
    const newColumnWidth = Math.max(columnMinWidth, prevColumnWidth + delta)

    updateColumnWidth(idx, newColumnWidth)

    // При расширении последней колонки скроллим таблицу вправо
    const containerEl = tableRef.current
    if (idx === resizedColumnWidths.length - 1 && delta > 0 && containerEl) {
      containerEl.scrollBy(delta, 0)
    }
  }

  const stickyColumnsWidth = getColumnLeftOffset({
    columnIndex: stickyColumns,
    resizedColumnWidths,
    initialColumnWidths,
  })

  const columnsWithMetaData = columns.map((column, columnIndex) => {
    const resizedColumnWidth = resizedColumnWidths[columnIndex]
    const initialColumnWidth = initialColumnWidths[columnIndex]
    const columnWidth = resizedColumnWidth || initialColumnWidth
    const columnLeftOffset = getColumnLeftOffset({
      columnIndex,
      resizedColumnWidths,
      initialColumnWidths,
    })
    const isResized = isDefined(columnWidth) && columnWidth !== initialColumnWidth
    const isSticky = stickyColumns > columnIndex
    const showResizer =
      stickyColumns > columnIndex ||
      stickyColumnsWidth + tableScroll.left < columnLeftOffset + columnWidth

    return {
      ...column,
      isSortingActive: isSortedByColumn(column),
      isResized,
      isSticky,
      showResizer,
      columnWidth,
      columnLeftOffset,
    }
  })

  const tableData = sorting ? _.orderBy(rows, sorting.by, sorting.order) : rows
  const filteredData =
    !filters || !isSelectedFiltersPresent(selectedFilters)
      ? tableData
      : filterTableData({ data: tableData, filters, selectedFilters })

  const tableStyle: React.CSSProperties & TableCSSCustomProperty = {
    gridTemplateColumns: getColumnsSize(resizedColumnWidths),
    /*
      Эта настройка необходима чтобы строки таблицы не растягивались на все
      доступное для таблицы пространство, а занимали необходимое количество
      места в зависимости от контента.
    */
    gridTemplateRows: `max-content repeat(${rows.length}, max-content)`,
    '--table-width': `${tableWidth}px`,
    '--table-header-height': `${tableHeaderHeight}px`,
  }

  return (
    <div
      ref={tableRef}
      className={classnames(
        css.table,
        sizeClasses[size],
        isResizable && css.isResizable,
        showVerticalCellShadow && css.showVerticalCellShadow,
        showHorizontalCellShadow && stickyHeader && css.showHorizontalCellShadow,
        isZebraStriped && css.isZebraStriped,
        borderBetweenRows && css.borderBetweenRows,
        borderBetweenColumns && css.borderBetweenColumns
      )}
      style={tableStyle}
      onScroll={handleScroll}
    >
      {/*
        Элементы Resizer рендерятся в отдельных ячейках нулевой высоты с шириной
        равной ширине колонки сетки, при этом у ячейки самый большой z-index в
        таблице чтобы элементы Resizer могли перекрывать ячейки заголовка и
        контента. Кроме того это позволяет зафиксировать вертикальное и
        горизонтальное положение Resizer, а также его высоту.

        Получение высоты Resizer элементов через свойство элемента таблицы
        scrollHeight не подходило, так как в таком случае Resizer растягивал
        таблицу по высоте, поэтому от этого способа отказались.
      */}
      {columnsWithMetaData.map((column, columnIdx) => (
        <div
          key={columnIdx}
          ref={ref => (columnsRefs.current[columnIdx] = ref)}
          className={classnames(
            css.cell,
            css.isResizer,
            css.withoutBorder,
            css.stickyOnTop,
            column.isSticky && css.stickyOnLeft
          )}
          style={{
            left: getStickyLeftOffset(columnIdx),
          }}
        >
          <div className={classnames(css.wrapper, css.withoutPadding)}>
            {isResizable && (
              <Resizer
                height={tableHeight}
                isVisible={column.showResizer}
                onResize={delta => handleColumnResize(columnIdx, delta)}
                onDoubleClick={() => updateColumnWidth(columnIdx, initialColumnWidths[columnIdx])}
              />
            )}
          </div>
        </div>
      ))}
      {columnsWithMetaData.map((column, columnIdx) => (
        <div
          key={column.accessor}
          ref={columnIdx === 0 ? firstHeaderColumnRef : undefined}
          className={classnames(
            css.cell,
            css.isHeader,
            stickyHeader && css.stickyOnTop,
            column.isResized && css.isResized,
            column.isSticky && css.stickyOnLeft,
            column.isSortingActive && css.isSortingActive
          )}
          style={{ left: getStickyLeftOffset(columnIdx) }}
        >
          <div className={classnames(css.wrapper, getHorizontalAlign(column.align))}>
            <div className={css.title}>
              {filters && fieldFiltersPresent(filters, column.accessor) && (
                <FilterTooltip
                  field={column.accessor}
                  isOpened={visibleFilter === column.accessor}
                  options={getOptionsForFilters(filters, column.accessor)}
                  values={selectedFilters[column.accessor]}
                  onChange={handleTooltipSave}
                  onToggle={handleFilterTogglerClick(column.accessor)}
                  className={classnames(css.icon, css.iconFilter)}
                />
              )}
              {column.title}
              {column.sortable && (
                <button
                  type="button"
                  className={classnames(css.icon, css.iconSort)}
                  onClick={() => handleSortClick(column)}
                >
                  {getSortIcon(column)}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {/*
        Рендерим тень заголовка отдельно чтобы избежать возможных наложений
        теней для ячеек заголовка и ячеек прикрепленных слева.
      */}
      {headerShadow}
      {filters && isSelectedFiltersPresent(selectedFilters) && (
        <div className={classnames(css.rowWithoutCells)}>
          <SelectedOptionsList
            className={css.selectedFilters}
            values={getSelectedFiltersList({ filters, selectedFilters, columns })}
            onRemove={removeSelectedFilter(filters)}
            onReset={resetSelectedFilters}
          />
        </div>
      )}
      {filteredData.length > 0 ? (
        filteredData.map(row => (
          <div key={row.id} className={css.cellsRow}>
            {columnsWithMetaData.map((column, columnIdx) => (
              <div
                key={column.accessor}
                className={classnames(
                  css.cell,
                  column.isSticky && css.stickyOnLeft,
                  isRowsClickable && css.isClickable,
                  column.isResized && css.isResized
                )}
                style={{ left: getStickyLeftOffset(columnIdx) }}
                onClick={handleSelectRow(row.id)}
              >
                <div
                  className={classnames(
                    css.wrapper,
                    verticalCellAlignClasses[verticalAlign],
                    getHorizontalAlign(column.align),
                    getRowStatus(row.id)
                  )}
                >
                  {row[column.accessor]}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className={css.rowWithoutCells}>
          <div className={classnames(css.wrapper, css.horizontalAlignCenter)}>
            {emptyRowsPlaceholder}
          </div>
        </div>
      )}
    </div>
  )
}
