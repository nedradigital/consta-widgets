import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { Text } from '@gpn-design/uikit'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'
import { differenceInCalendarMonths, getDaysInMonth } from 'date-fns'
import { uniq } from 'lodash'

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
  TableColumn,
  useSelectedFilters,
} from '@/utils/table'
import { getDayMonthYearFromTimestamp } from '@/utils/time'

import { RoadmapTooltip } from './components/RoadmapTooltip'
import css from './index.css'

export type Item = {
  startDate: number
  endDate: number
  groupName: string
  comment?: string
}

export type Data = {
  firstColumn: string
  secondColumn: string
  plan: readonly Item[]
  fact: readonly Item[]
  forecast: readonly Item[]
}

type Props = {
  data: readonly Data[]
  titles: readonly [TableColumn, TableColumn]
  currentDay: number
  colorGroups: ColorGroups
  startDate: number
  endDate: number
  filters?: Filters
}

type ActiveLineState = {
  groupName?: string
  index?: number
  x: number
  y: number
}

const monthNames = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
] as const

const periods = {
  янв: 'I',
  фев: 'I',
  мар: 'I',
  апр: 'II',
  май: 'II',
  июн: 'II',
  июл: 'III',
  авг: 'III',
  сен: 'III',
  окт: 'IV',
  ноя: 'IV',
  дек: 'IV',
}

const periodPositions: readonly number[] = [0, 3, 6, 9]

type MonthItem = {
  value: typeof monthNames[number]
  year: number
  period?: string
}

const getMonths = (startDate: number, endDate: number): readonly MonthItem[] => {
  const [, startMonth, startYear] = getDayMonthYearFromTimestamp(startDate)
  const countMonths = differenceInCalendarMonths(endDate, startDate) + 1
  let monthCounter = startMonth
  let yearCounter = startYear
  const mutableMonths = []

  for (let i = 0; i < countMonths; i++) {
    if (monthCounter > 11) {
      monthCounter = 0
      yearCounter++
    }

    const value = monthNames[monthCounter]
    const isPeriod = i === 0 || periodPositions.includes(monthCounter)

    mutableMonths.push({
      value,
      year: yearCounter,
      period: isPeriod ? periods[value] : undefined,
    })

    monthCounter++
  }

  return mutableMonths
}

const getCoordsByDate = (ms: number, monthWidth: number, startDate: number) => {
  const [day] = getDayMonthYearFromTimestamp(ms)
  const countDaysInMonth = getDaysInMonth(ms)
  const countMonths = differenceInCalendarMonths(ms, startDate)

  const startPrecent = monthWidth * countMonths

  return startPrecent + (monthWidth / countDaysInMonth) * (day - 1)
}

const MARGIN_BETWEEN_BARS = 1

const getStyle = ({
  start,
  end,
  monthWidth,
  startDate,
  withMargin,
}: {
  start: number
  end: number
  monthWidth: number
  startDate: number
  withMargin: boolean
}) => {
  const left = getCoordsByDate(start, monthWidth, startDate)
  const width = getCoordsByDate(end, monthWidth, startDate)

  return {
    left: withMargin ? left + MARGIN_BETWEEN_BARS : left,
    width,
  }
}

const FACT_BLOCK_SIZE = 8

type RenderChartLine = {
  key: 'fact' | 'plan' | 'forecast'
  className: string
  rowIndex?: number
  colorGroups: ColorGroups
  monthWidth: number
  activeLine?: ActiveLineState
  startDate: number
}

type RenderInteractiveChartLine = {
  facts: readonly Item[]
  forecasts: readonly Item[]
  plans: readonly Item[]
  monthWidth: number
  startDate: number
  onClick?: ({
    event,
    index,
    groupName,
  }: {
    event: React.MouseEvent
    index: number
    groupName: string
  }) => void
  rowIndex: number
  activeLine?: ActiveLineState
  colorGroups: ColorGroups
}

const renderChartLine = ({
  key,
  className,
  rowIndex,
  colorGroups,
  monthWidth,
  activeLine,
  startDate,
}: RenderChartLine) => (item: Item, index: number) => {
  const withMargin = index !== 0
  const { startDate: start, endDate: end, groupName } = item
  const { left, width } = getStyle({ withMargin, start, end, monthWidth, startDate })
  const active = activeLine && activeLine.index === rowIndex && activeLine.groupName === groupName

  return (
    <div
      key={key + groupName}
      className={classnames(className, css.chartLine, active && css.isActive)}
      style={{
        left,
        width: `calc(${width}px - ${left}px)`,
        background: colorGroups[groupName],
      }}
    />
  )
}

const renderInteractiveChartLine = ({
  plans,
  forecasts,
  facts,
  monthWidth,
  startDate,
  onClick,
  rowIndex,
  activeLine,
  colorGroups,
}: RenderInteractiveChartLine) => (groupName: string, index: number) => {
  const withMargin = index !== 0
  const fact = facts.find(item => item.groupName === groupName)
  const forecast = forecasts.find(item => item.groupName === groupName)
  const plan = plans.find(item => item.groupName === groupName)

  const start = fact ? fact.startDate : forecast?.startDate
  const end = forecast ? forecast.endDate : fact?.endDate

  if (!start || !end) {
    return null
  }

  const { left, width } = getStyle({ withMargin, start, end, monthWidth, startDate })
  const active = activeLine && activeLine.index === rowIndex && activeLine.groupName === groupName

  return (
    <div
      key={groupName}
      className={classnames(css.chartLine, css.isInteractive)}
      style={{
        left,
        width: `calc(${width}px - ${left}px)`,
      }}
      onClick={
        onClick && rowIndex !== undefined
          ? event =>
              onClick({
                event,
                index: rowIndex,
                groupName,
              })
          : undefined
      }
    >
      {activeLine && active && plan ? (
        <RoadmapTooltip
          fact={fact}
          forecast={forecast}
          plan={plan}
          colorGroups={colorGroups}
          position={{
            x: activeLine.x,
            y: activeLine.y,
          }}
        />
      ) : null}
    </div>
  )
}

type TableProps<T = TableColumn | MonthItem> = {
  titles: readonly T[]
  className?: string
  renderTitle: (item: T, index: number) => React.ReactNode
  subTitle?: React.ReactNode
}

const Table: React.FC<TableProps> = ({ children, titles, className, renderTitle, subTitle }) => (
  <table className={classnames(css.table, className)}>
    <thead>
      <tr>{titles.map(renderTitle)}</tr>
      {subTitle && <tr>{subTitle}</tr>}
    </thead>
    {children}
  </table>
)

const TableWithStringTitles = Table as React.FC<TableProps<TableColumn>>
const TableWithMonthTitles = Table as React.FC<TableProps<MonthItem>>

const ThText: React.FC<{ className?: string }> = ({ className, children }) => (
  <Text
    tag="span"
    size="xs"
    transform="uppercase"
    weight="bold"
    spacing="xs"
    view="primary"
    className={className}
  >
    {children}
  </Text>
)

const TdText: React.FC = ({ children }) => (
  <Text tag="span" size="m" view="primary">
    {children}
  </Text>
)

export const Roadmap: React.FC<Props> = props => {
  const { currentDay, data, colorGroups, titles, startDate, endDate, filters } = props

  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const [shadow, changeShadowMode] = useState(false)
  const [monthWidth, changeMonthWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useComponentSize(ref)
  const calendarTbodyRef = useRef<HTMLTableSectionElement>(null)
  const { height: calendarTbodyHeight } = useComponentSize(calendarTbodyRef)
  const stringSubTitleRef = useRef<HTMLTableHeaderCellElement>(null)
  const { height: stringSubTitleHeight } = useComponentSize(stringSubTitleRef)
  const [activeLine, changeActiveLine] = useState<ActiveLineState>({
    index: undefined,
    groupName: undefined,
    x: 0,
    y: 0,
  })
  const [visibleFilter, setVisibleFilter] = useState<string | null>(null)
  const {
    selectedFilters,
    updateSelectedFilters,
    removeOneSelectedFilter,
    removeAllSelectedFilters,
  } = useSelectedFilters(filters)
  const factBlockSize = getCalculatedSizeWithBaseSize(FACT_BLOCK_SIZE)

  const scrollHandler = useCallback(event => {
    changeShadowMode(event.target.scrollLeft > 0)
    changeActiveLine({ index: undefined, groupName: undefined, y: 0, x: 0 })
  }, [])

  const handleWindowClick = useCallback(event => {
    if (!event.target.classList.contains(css.isInteractive)) {
      changeActiveLine({ index: undefined, groupName: undefined, y: 0, x: 0 })
    }
  }, [])

  const handleClick = useCallback(
    ({ event, index, groupName }) => {
      if (ref.current) {
        const elementRect = event.target.getBoundingClientRect()
        const tableRect = ref.current.getBoundingClientRect()

        changeActiveLine({
          index,
          groupName,
          x: Math.max(tableRect.left, elementRect.left),
          y: elementRect.top + factBlockSize / 2 + window.scrollY,
        })
      }
    },
    [factBlockSize]
  )

  const handleFilterTogglerClick = (id: string) => () => {
    setVisibleFilter(visibleFilter === id ? null : id)
  }

  const closeTooltip = () => {
    setVisibleFilter(null)
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

  useLayoutEffect(() => {
    if (ref.current) {
      const element = ref.current
      element.addEventListener('scroll', scrollHandler)
      window.addEventListener('click', handleWindowClick)

      return () => {
        window.removeEventListener('click', handleWindowClick)
        element.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [ref, handleWindowClick, scrollHandler])

  useLayoutEffect(() => {
    if (ref.current) {
      changeMonthWidth(ref.current.querySelector('th')!.offsetWidth)
    }
  }, [width, startDate, endDate, data])

  const months = getMonths(startDate, endDate)

  const filteredData: readonly Data[] =
    !filters || !isSelectedFiltersPresent(selectedFilters)
      ? data
      : filterTableData({ data, filters, selectedFilters })

  return (
    <div className={css.main}>
      <div className={classnames(css.left, shadow && css.shadow)}>
        <TableWithStringTitles
          className={css.labelsTable}
          titles={titles}
          renderTitle={({ title, accessor }) => (
            <th
              key={accessor}
              className={classnames(css.cell, visibleFilter === accessor && css.isFilterOpened)}
            >
              <ThText className={css.titleWrapper}>
                {filters && fieldFiltersPresent(filters, accessor) && (
                  <FilterTooltip
                    field={accessor}
                    isOpened={visibleFilter === accessor}
                    options={getOptionsForFilters(filters, accessor)}
                    values={selectedFilters[accessor]}
                    onSave={handleTooltipSave}
                    handleFilterTogglerClick={handleFilterTogglerClick(accessor)}
                    className={css.iconFilter}
                  />
                )}
                {title}
              </ThText>
            </th>
          )}
          subTitle={
            filters &&
            isSelectedFiltersPresent(selectedFilters) && (
              <th colSpan={2} className={css.isSubTitle} ref={stringSubTitleRef}>
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
            {filteredData.map(item => (
              <tr key={item.firstColumn}>
                <td>
                  <TdText>{item.firstColumn}</TdText>
                </td>
                <td>
                  <TdText>{item.secondColumn}</TdText>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWithStringTitles>
      </div>
      <div ref={ref} className={css.calendar}>
        <TableWithMonthTitles
          className={css.calendarTable}
          titles={months}
          renderTitle={(item, index) => {
            return (
              <th key={index}>
                <div className={classnames(css.titleWrapper, css.monthTitleWrapper)}>
                  {item.period ? (
                    <div className={css.periodWrapper}>
                      <Text
                        tag="div"
                        lineHeight="s"
                        view="primary"
                        spacing="xs"
                        className={css.periodText}
                      >
                        {item.period} {item.year}
                      </Text>
                    </div>
                  ) : null}
                  <ThText>{item.value}</ThText>
                </div>
              </th>
            )
          }}
          subTitle={
            stringSubTitleRef.current && (
              <th
                colSpan={months.length}
                className={css.subTitleHeightStub}
                style={{ height: stringSubTitleHeight }}
              />
            )
          }
        >
          <tbody style={{ backgroundSize: `${monthWidth}px 20px` }} ref={calendarTbodyRef}>
            {filteredData.map(({ plan, fact, forecast, firstColumn, secondColumn }, index) => (
              <tr key={index}>
                <td colSpan={months.length}>
                  <div
                    className={classnames(css.wrapper, activeLine.groupName && css.hideInactive)}
                  >
                    <div className={css.fakeBlock}>
                      {firstColumn.length > secondColumn.length ? firstColumn : secondColumn}
                    </div>
                    {plan.map(
                      renderChartLine({
                        key: 'plan',
                        className: css.isPlan,
                        colorGroups,
                        monthWidth,
                        startDate,
                      })
                    )}
                    {fact.map(
                      renderChartLine({
                        key: 'fact',
                        className: css.isFact,
                        rowIndex: index,
                        colorGroups,
                        monthWidth,
                        startDate,
                        activeLine,
                      })
                    )}
                    {forecast.map(
                      renderChartLine({
                        key: 'forecast',
                        className: css.isForecast,
                        colorGroups,
                        monthWidth,
                        activeLine,
                        startDate,
                        rowIndex: index,
                      })
                    )}
                    {uniq([...fact, ...forecast].map(item => item.groupName)).map(
                      renderInteractiveChartLine({
                        plans: plan,
                        facts: fact,
                        forecasts: forecast,
                        monthWidth,
                        startDate,
                        onClick: handleClick,
                        rowIndex: index,
                        colorGroups,
                        activeLine,
                      })
                    )}
                    {index === 0 && (
                      <div
                        className={css.currentDay}
                        style={{
                          left: getCoordsByDate(currentDay, monthWidth, startDate),
                          height: calendarTbodyHeight,
                        }}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWithMonthTitles>
      </div>
    </div>
  )
}
