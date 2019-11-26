import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { ColorGroups } from '@/dashboard/types'
import { getDayMonthYearFromTimestamp, getDaysInMonth } from '@/utils/time'

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
}

type ActiveLineState = {
  groupName?: string
  index?: number
}

const months = [
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

const periods: { [key: number]: string } = {
  0: 'I 2019',
  3: 'II 2019',
  6: 'III 2019',
  9: 'IV 2019',
}

const getCoordsByDate = (ms: number, monthWidth: number) => {
  const [day, month, year] = getDayMonthYearFromTimestamp(ms)
  const countDaysInMonth = getDaysInMonth(month, year)

  const startPrecent = monthWidth * month

  return startPrecent + (monthWidth / countDaysInMonth) * (day - 1)
}

const renderItem = ({
  key,
  className,
  index,
  colorGroups,
  monthWidth,
  activeLine,
  onClick,
  plans,
}: {
  key: string
  className: string
  index?: number
  colorGroups: ColorGroups
  monthWidth: number
  activeLine?: ActiveLineState
  onClick?: (v: ActiveLineState) => void
  plans?: readonly Item[]
}) => (item: Item) => {
  const { startDate, endDate, groupName } = item
  const left = getCoordsByDate(startDate, monthWidth)
  const width = getCoordsByDate(endDate, monthWidth)
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
      onClick={onClick ? () => onClick({ index, groupName }) : undefined}
    >
      {active && plan && key === 'fact' ? (
        <RoadmapTooltip
          fact={item}
          plan={plan}
          colorGroups={colorGroups}
          direction={index && index > 2 ? 'top' : 'bottom'}
        />
      ) : null}
    </div>
  )
}

type TableProps = {
  titles: readonly string[]
  className?: string
  renderTitle?: (title: string, index: number) => React.ReactNode
}

const Table: React.FC<TableProps> = ({
  children,
  titles,
  className,
  renderTitle = title => <th key={title}>{title}</th>,
}) => (
  <table className={classnames(css.table, className)}>
    <thead>
      <tr>{titles.map(renderTitle)}</tr>
    </thead>
    {children}
  </table>
)

export const Roadmap: React.FC<Props> = props => {
  const { currentDay, data, colorGroups, titles } = props

  const [shadow, changeShadowMode] = useState(false)
  const [monthWidth, changeMonthWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { height, width } = useComponentSize(ref)
  const [activeLine, changeActiveLine] = useState<ActiveLineState>({
    index: undefined,
    groupName: undefined,
  })

  const scrollHandler = useCallback(event => {
    changeShadowMode(event.target.scrollLeft > 0)
  }, [])

  const handleWindowClick = useCallback(event => {
    if (!event.target.classList.contains(css.fact)) {
      changeActiveLine({ index: undefined, groupName: undefined })
    }
  }, [])

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('scroll', scrollHandler)
      window.addEventListener('click', handleWindowClick)

      return () => {
        window.removeEventListener('click', handleWindowClick)
        ref.current!.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [ref])

  useLayoutEffect(() => {
    if (ref.current) {
      changeMonthWidth(ref.current.querySelector('th')!.offsetWidth)
    }
  }, [width])

  return (
    <div className={css.main}>
      <div className={classnames(css.left, shadow && css.shadow)}>
        <Table className={css.labelsTable} titles={titles}>
          <tbody>
            {data.map(item => (
              <tr key={item.firstColumn}>
                <td>{item.firstColumn}</td>
                <td>{item.secondColumn}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div ref={ref} className={css.calendar}>
        <Table
          className={css.calendarTable}
          titles={months}
          renderTitle={(title, index) => {
            return (
              <th key={title}>
                <div className={css.titleWrapper}>
                  {index in periods ? (
                    <div className={css.periodWrapper}>
                      <div className={css.periodText}>{periods[index]}</div>
                    </div>
                  ) : null}
                  {title}
                </div>
              </th>
            )
          }}
        >
          <tbody style={{ backgroundSize: `${monthWidth}px 20px` }}>
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
                        onClick: changeActiveLine,
                        plans: plan,
                      })
                    )}
                    {forecast.map(
                      renderItem({
                        key: 'forecast',
                        className: css.forecast,
                        colorGroups,
                        monthWidth,
                      })
                    )}
                    {index === 0 && (
                      <div
                        className={css.currentDay}
                        style={{ left: getCoordsByDate(currentDay, monthWidth), height }}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
