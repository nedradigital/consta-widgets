import { useCallback, useLayoutEffect, useState } from 'react'
import useDimensions from 'react-use-dimensions'

import classnames from 'classnames'

import { ColorGroups } from '@/dashboard/types'

import css from './index.css'

type Item = {
  startDate: number
  endDate: number
  groupName: string
}

export type Data = {
  place: string
  complex: string
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

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate()
}

const getCoordsByDate = (ms: number, monthWidth: number) => {
  const d = new Date(ms)

  const month = d.getMonth()
  const day = d.getDate()
  const year = d.getFullYear()
  const countDaysInMonth = getDaysInMonth(month, year)

  const startPrecent = monthWidth * month

  return startPrecent + (monthWidth / countDaysInMonth) * (day - 1)
}

const renderItem = ({
  className,
  colorGroups,
  monthWidth,
}: {
  className: string
  index?: number
  colorGroups: ColorGroups
  monthWidth: number
}) => ({ startDate, endDate, groupName }: Item) => {
  const left = getCoordsByDate(startDate, monthWidth)
  const width = getCoordsByDate(endDate, monthWidth)

  return (
    <div
      className={classnames(className, false && css.hovered)}
      style={{
        left,
        width: `calc(${width}px - ${left}px)`,
        background: colorGroups[groupName],
      }}
    />
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
  renderTitle = title => <th>{title}</th>,
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
  const [dimensionRef, { height }, element] = useDimensions()
  const scrollHandler = useCallback(event => {
    changeShadowMode(event.target.scrollLeft > 0)
  }, [])

  useLayoutEffect(() => {
    if (element) {
      element.addEventListener('scroll', scrollHandler)

      changeMonthWidth(element.querySelector('th')!.offsetWidth)

      return () => {
        element.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [element])

  return (
    <div className={css.main}>
      <div className={classnames(css.left, shadow && css.shadow)}>
        <Table className={css.labelsTable} titles={titles}>
          <tbody>
            {data.map(item => (
              <tr key={name}>
                <td>{item.place}</td>
                <td>{item.complex}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div ref={dimensionRef} className={css.calendar}>
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
            {data.map(({ plan, fact, forecast, place }, index) => (
              <tr key={index}>
                <td colSpan={months.length}>
                  <div className={classnames(css.wrapper, false && css.hidden)}>
                    <div className={css.fakeBlock}>{place}</div>
                    {plan.map(renderItem({ className: css.plan, colorGroups, monthWidth }))}
                    {fact.map(renderItem({ className: css.fact, colorGroups, monthWidth }))}
                    {forecast.map(renderItem({ className: css.forecast, colorGroups, monthWidth }))}
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
