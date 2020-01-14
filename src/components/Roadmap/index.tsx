import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { ColorGroups } from '@/dashboard/types'
import { getDayMonthYearFromTimestamp, getDaysInMonth, monthsDiff } from '@/utils/time'

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
  titles: readonly [string, string]
  currentDay: number
  colorGroups: ColorGroups
  startDate: number
  endDate: number
}

type ActiveLineState = {
  groupName?: string
  index?: number
  /**
   * Тут есть и top и bottom, потому что тултип можешь располгаться и сверху и снизу
   * Но внутри тултипа есть кнопки для раскрытия и если использовать только top
   * То тултипу придется перерасчитывать позицию
   */
  top: number
  bottom: number
  left: number
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
  const countMonths = monthsDiff(startDate, endDate) + 1
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
  const [day, month, year] = getDayMonthYearFromTimestamp(ms)
  const countDaysInMonth = getDaysInMonth(month, year)
  const countMonths = monthsDiff(startDate, ms)

  const startPrecent = monthWidth * countMonths

  return startPrecent + (monthWidth / countDaysInMonth) * (day - 1)
}

const getFactBlockSize = () => getCalculatedSize(6)

const renderItem = ({
  key,
  className,
  index,
  colorGroups,
  monthWidth,
  activeLine,
  onClick,
  plans,
  startDate,
}: {
  key: string
  className: string
  index?: number
  colorGroups: ColorGroups
  monthWidth: number
  activeLine?: ActiveLineState
  onClick?: (event: React.MouseEvent, index: number, groupName: string) => void
  plans?: readonly Item[]
  startDate: number
}) => (item: Item) => {
  const { startDate: start, endDate, groupName } = item
  const left = getCoordsByDate(start, monthWidth, startDate)
  const width = getCoordsByDate(endDate, monthWidth, startDate)
  const active = activeLine && activeLine.index === index && activeLine.groupName === groupName
  const plan = plans ? plans.find(i => i.groupName === groupName) : false

  return (
    <div
      key={key + groupName}
      className={classnames(className, active && css.active)}
      style={{
        left,
        width: `calc(${width}px - ${left}px)`,
        background: colorGroups[groupName],
      }}
      onClick={
        onClick && index !== undefined ? event => onClick(event, index, groupName) : undefined
      }
    >
      {activeLine && active && plan && key === 'fact' ? (
        <RoadmapTooltip
          fact={item}
          plan={plan}
          colorGroups={colorGroups}
          direction={index && index > 2 ? 'top' : 'bottom'}
          left={activeLine.left}
          top={index && index > 2 ? undefined : activeLine.top}
          bottom={index && index > 2 ? activeLine.bottom : undefined}
        />
      ) : null}
    </div>
  )
}

type TableProps<T extends string | MonthItem = string | MonthItem> = {
  titles: readonly T[]
  className?: string
  renderTitle: (item: T, index: number) => React.ReactNode
}

const Table: React.FC<TableProps> = ({ children, titles, className, renderTitle }) => (
  <table className={classnames(css.table, className)}>
    <thead>
      <tr>{titles.map(renderTitle)}</tr>
    </thead>
    {children}
  </table>
)

const TableWithStringTitles = Table as React.FC<TableProps<string>>
const TableWithMonthTitles = Table as React.FC<TableProps<MonthItem>>

export const Roadmap: React.FC<Props> = props => {
  const { currentDay, data, colorGroups, titles, startDate, endDate } = props

  const [shadow, changeShadowMode] = useState(false)
  const [monthWidth, changeMonthWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useComponentSize(ref)
  const calendarTbodyRef = useRef<HTMLTableSectionElement>(null)
  const { height: calendarTbodyHeight } = useComponentSize(calendarTbodyRef)
  const [activeLine, changeActiveLine] = useState<ActiveLineState>({
    index: undefined,
    groupName: undefined,
    top: 0,
    left: 0,
    bottom: 0,
  })

  const scrollHandler = useCallback(event => {
    changeShadowMode(event.target.scrollLeft > 0)
    changeActiveLine({ index: undefined, groupName: undefined, top: 0, left: 0, bottom: 0 })
  }, [])

  const handleWindowClick = useCallback(event => {
    if (!event.target.classList.contains(css.fact)) {
      changeActiveLine({ index: undefined, groupName: undefined, top: 0, left: 0, bottom: 0 })
    }
  }, [])

  const handleClick = useCallback((event, index, groupName) => {
    if (ref.current) {
      const elementRect = event.target.getBoundingClientRect()
      const tableRect = ref.current.getBoundingClientRect()

      changeActiveLine({
        index,
        groupName,
        left: Math.max(tableRect.left, elementRect.left),
        top: elementRect.top + getFactBlockSize() + window.scrollY,
        bottom: window.innerHeight - elementRect.top - window.scrollY,
      })
    }
  }, [])

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

  return (
    <div className={css.main}>
      <div className={classnames(css.left, shadow && css.shadow)}>
        <TableWithStringTitles
          className={css.labelsTable}
          titles={titles}
          renderTitle={title => <th key={title}>{title}</th>}
        >
          <tbody>
            {data.map(item => (
              <tr key={item.firstColumn}>
                <td>{item.firstColumn}</td>
                <td>{item.secondColumn}</td>
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
                <div className={css.titleWrapper}>
                  {item.period ? (
                    <div className={css.periodWrapper}>
                      <div className={css.periodText}>
                        {item.period} {item.year}
                      </div>
                    </div>
                  ) : null}
                  {item.value}
                </div>
              </th>
            )
          }}
        >
          <tbody style={{ backgroundSize: `${monthWidth}px 20px` }} ref={calendarTbodyRef}>
            {data.map(({ plan, fact, forecast, firstColumn, secondColumn }, index) => (
              <tr key={index}>
                <td colSpan={months.length}>
                  <div
                    className={classnames(css.wrapper, activeLine.groupName && css.hideInactive)}
                  >
                    <div className={css.fakeBlock}>
                      {firstColumn.length > secondColumn.length ? firstColumn : secondColumn}
                    </div>
                    {plan.map(
                      renderItem({
                        key: 'plan',
                        className: css.plan,
                        index,
                        colorGroups,
                        monthWidth,
                        activeLine,
                        startDate,
                      })
                    )}
                    {fact.map(
                      renderItem({
                        key: 'fact',
                        className: css.fact,
                        index,
                        colorGroups,
                        monthWidth,
                        activeLine,
                        onClick: handleClick,
                        plans: plan,
                        startDate,
                      })
                    )}
                    {forecast.map(
                      renderItem({
                        key: 'forecast',
                        className: css.forecast,
                        colorGroups,
                        monthWidth,
                        startDate,
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
