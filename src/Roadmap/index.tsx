import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { ColorGroups } from '@/common/types'
import {
  BasicTableColumn,
  BasicTableRow,
  fieldFiltersPresent,
  FieldSelectedValues,
  Filters,
  getOptionsForFilters,
  getSelectedFiltersList,
  isSelectedFiltersPresent,
  useSelectedFilters,
} from '@/common/utils/table'
import { Position } from '@/common/utils/tooltips'
import { FilterTooltip } from '@/core/FilterTooltip'
import { SelectedOptionsList } from '@/core/SelectedOptionsList'
import { useBaseSize } from '@/BaseSizeContext'

import { GroupLines } from './components/GroupLines'
import { RoadmapText } from './components/RoadmapText'
import { Table } from './components/Table'
import {
  FACT_BLOCK_SIZE,
  filterRoadmapData,
  getAlignForColumns,
  getColumnCount,
  getGridTemplateColumns,
  getLongestTextFromColumns,
  getMonths,
  getXCoordByDate,
  MONTH_NAMES,
  TABLE_COLUMN_WIDTH,
  TABLE_FAKE_COLUMN_WIDTH,
} from './helpers'
import css from './index.css'

export type Item = {
  startDate: number
  endDate: number
}

export type Group = {
  groupName: string
  title?: string
  plan?: Item
  fact?: Item
  forecast?: Item
  comment?: string
}

export type TextAlign = 'left' | 'center' | 'right'

export type Row = BasicTableRow & {
  columns: Record<string, React.ReactNode>
  groups: readonly Group[]
}

export type Column = BasicTableColumn<Row> & {
  align?: TextAlign
}

export type Data = {
  titles: readonly Column[]
  rows: readonly Row[]
  currentDay: number
  startDate: number
  endDate: number
  filters?: Filters<Row>
}

type Props = Data & {
  colorGroups: ColorGroups
}

type ActiveRowState = {
  id?: string
  groupIndex?: number
  position?: Position
}

export type MonthItem = {
  value: typeof MONTH_NAMES[number]
  year: number
  period?: string
}

export const Roadmap: React.FC<Props> = props => {
  const { currentDay, rows, colorGroups, titles, startDate, endDate, filters } = props

  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const [shadow, changeShadowMode] = useState(false)
  const [monthWidth, changeMonthWidth] = useState(0)
  const calendarRef = useRef<HTMLDivElement>(null)
  const { width: calendarWidth } = useComponentSize(calendarRef)
  const calendarTbodyRef = useRef<HTMLTableSectionElement>(null)
  const { height: calendarTbodyHeight } = useComponentSize(calendarTbodyRef)
  const stringSubTitleRef = useRef<HTMLTableHeaderCellElement>(null)
  const { height: stringSubTitleHeight } = useComponentSize(stringSubTitleRef)
  const [activeRow, changeActiveRow] = useState<ActiveRowState>({
    id: undefined,
    groupIndex: undefined,
    position: undefined,
  })
  const [visibleFilter, setVisibleFilter] = useState<string | null>(null)
  const {
    selectedFilters,
    updateSelectedFilters,
    removeOneSelectedFilter,
    removeAllSelectedFilters,
  } = useSelectedFilters(filters)
  const isSelectedRow = isDefined(activeRow.id) && isDefined(activeRow.groupIndex)
  const alignForColumns = getAlignForColumns(titles)
  const factBlockSize = getCalculatedSizeWithBaseSize(FACT_BLOCK_SIZE)
  const tableColumnFakeBlockSize = getCalculatedSizeWithBaseSize(TABLE_FAKE_COLUMN_WIDTH)
  const columnCount = getColumnCount(rows)
  const months = getMonths(startDate, endDate)
  const currentDayOffsetTop = calendarRef.current
    ? calendarRef.current.clientHeight - calendarTbodyHeight
    : 0
  const filteredData =
    !filters || !isSelectedFiltersPresent(selectedFilters)
      ? rows
      : filterRoadmapData({ rows, filters, selectedFilters })

  const resetActiveLine = useCallback(
    () =>
      changeActiveRow({
        id: undefined,
        groupIndex: undefined,
        position: undefined,
      }),
    [changeActiveRow]
  )

  const scrollHandler = useCallback(event => {
    changeShadowMode(event.target.scrollLeft > 0)
  }, [])

  const handleClick = useCallback(
    ({ event, id, groupIndex }) => {
      event.stopPropagation()

      if (calendarRef.current) {
        const elementRect = event.target.getBoundingClientRect()
        const calendarRect = calendarRef.current.getBoundingClientRect()
        const position = {
          x: Math.max(calendarRect.left, elementRect.left),
          y: elementRect.top + factBlockSize / 2,
        }

        changeActiveRow({ id, groupIndex, position })
      }
    },
    [factBlockSize]
  )

  const handleFilterTogglerClick = (id: string) => () => {
    setVisibleFilter(visibleFilter === id ? null : id)
  }

  const handleTooltipSave = (field: string, tooltipSelectedFilters: FieldSelectedValues) => {
    updateSelectedFilters(field, tooltipSelectedFilters)
  }

  const removeSelectedFilter = (tableFilters: Filters<Row>) => (filter: string) => {
    removeOneSelectedFilter(tableFilters, filter)
  }
  const resetSelectedFilters = () => {
    if (filters && filters.length) {
      removeAllSelectedFilters(filters)
    }
  }

  useLayoutEffect(() => {
    if (calendarRef.current) {
      const element = calendarRef.current
      element.addEventListener('scroll', scrollHandler)
      window.addEventListener('click', resetActiveLine)

      return () => {
        window.removeEventListener('click', resetActiveLine)
        element.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [calendarRef, resetActiveLine, scrollHandler])

  useLayoutEffect(() => {
    if (calendarRef.current) {
      changeMonthWidth(calendarRef.current.querySelector('th')!.offsetWidth)
    }
  }, [calendarWidth, startDate, endDate, rows])

  const mainStyle: React.CSSProperties = {
    gridTemplateColumns: getGridTemplateColumns(
      getCalculatedSizeWithBaseSize(TABLE_COLUMN_WIDTH),
      columnCount
    ),
  }

  const currentDayLineStyle: React.CSSProperties = {
    marginTop: currentDayOffsetTop,
    left: getXCoordByDate({
      startDate: currentDay,
      monthWidth,
      graphStartDate: startDate,
    }),
    maxHeight: `calc(100% - ${currentDayOffsetTop}px)`,
  }

  return (
    <div className={css.main} style={mainStyle}>
      <div className={classnames(css.left, shadow && css.shadow)}>
        <Table
          className={css.labelsTable}
          titles={titles.map(({ accessor, title, align }) => (
            <th
              key={accessor}
              className={classnames(css.cell, visibleFilter === accessor && css.isFilterOpened)}
              style={{ textAlign: align || 'left' }}
            >
              <RoadmapText className={css.titleWrapper} tag="span" type="header">
                {filters && fieldFiltersPresent(filters, accessor) && (
                  <FilterTooltip
                    field={accessor}
                    isOpened={visibleFilter === accessor}
                    options={getOptionsForFilters(filters, accessor)}
                    values={selectedFilters[accessor]}
                    onChange={handleTooltipSave}
                    onToggle={handleFilterTogglerClick(accessor)}
                    className={css.iconFilter}
                  />
                )}
                {title}
              </RoadmapText>
            </th>
          ))}
          subTitle={
            filters &&
            isSelectedFiltersPresent(selectedFilters) && (
              <th ref={stringSubTitleRef} className={css.isSubTitle} colSpan={columnCount}>
                <SelectedOptionsList
                  values={getSelectedFiltersList({ filters, selectedFilters, columns: titles })}
                  onRemove={removeSelectedFilter(filters)}
                  onReset={resetSelectedFilters}
                  className={css.selectedOptions}
                />
              </th>
            )
          }
        >
          <tbody>
            {filteredData.map(row => (
              <tr key={row.id}>
                {Object.entries(row.columns).map(([key, text], columnIndex) => (
                  <RoadmapText key={columnIndex} tag="td" align={alignForColumns[key]}>
                    {text}
                  </RoadmapText>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div ref={calendarRef} className={css.calendar}>
        <Table
          className={css.calendarTable}
          titles={months.map((item, index) => (
            <th key={index} className={css.titleWrapper}>
              {item.period ? (
                <div className={css.periodWrapper}>
                  <RoadmapText className={css.periodText} tag="div" type="period">
                    {item.period} {item.year}
                  </RoadmapText>
                </div>
              ) : null}
              <RoadmapText tag="span" type="header" align="center">
                {item.value}
              </RoadmapText>
            </th>
          ))}
          subTitle={
            stringSubTitleRef.current && (
              <th
                className={css.subTitleHeightStub}
                colSpan={months.length}
                style={{ height: stringSubTitleHeight }}
              />
            )
          }
        >
          <tbody ref={calendarTbodyRef} style={{ backgroundSize: `${monthWidth}px 20px` }}>
            {filteredData.map(({ id, columns, groups }) => (
              <tr key={id}>
                <td colSpan={months.length}>
                  <div className={css.groups}>
                    {/*
                      Вставляем блок с самым длинным текстом из колонок, чтобы
                      высота строки таблицы групп совпадала с высотой строки в
                      таблице колонок.
                     */}
                    <div className={css.fakeBlock} style={{ width: tableColumnFakeBlockSize }}>
                      <RoadmapText tag="span">{getLongestTextFromColumns(columns)}</RoadmapText>
                    </div>
                    {groups.map((group, groupIndex) => {
                      const color = colorGroups[group.groupName]
                      const withMargin = groupIndex !== 0

                      const isActive = activeRow.id === id && activeRow.groupIndex === groupIndex
                      const isInactive =
                        isSelectedRow &&
                        (activeRow.id !== id || activeRow.groupIndex !== groupIndex)

                      return (
                        <GroupLines
                          key={`${id}-${groupIndex}`}
                          color={color}
                          graphStartDate={startDate}
                          group={group}
                          monthWidth={monthWidth}
                          isActive={isActive}
                          isInactive={isInactive}
                          withMargin={withMargin}
                          tooltipPosition={activeRow.position}
                          onClick={event => handleClick({ event, id, groupIndex })}
                          onTooltipRequestReposition={resetActiveLine}
                        />
                      )
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className={css.currentDay} style={currentDayLineStyle} />
      </div>
    </div>
  )
}
