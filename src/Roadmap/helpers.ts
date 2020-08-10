import { differenceInCalendarMonths, getDaysInMonth } from 'date-fns'

import { getDayMonthYearFromTimestamp } from '@/_private/utils/time'

import { MonthItem } from '.'

export const MARGIN_BETWEEN_BARS = 1

export const MONTH_NAMES = [
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

export const PERIODS = {
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
} as const

export const getMonths = (startDate: number, endDate: number): readonly MonthItem[] => {
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

    const value = MONTH_NAMES[monthCounter]
    const isPeriod = i === 0 || monthCounter % 3 === 0

    mutableMonths.push({
      value,
      year: yearCounter,
      period: isPeriod ? PERIODS[value] : undefined,
    })

    monthCounter++
  }

  return mutableMonths
}

export const getXCoordByDate = ({
  startDate,
  monthWidth,
  graphStartDate,
}: {
  startDate: number
  monthWidth: number
  graphStartDate: number
}) => {
  const [day] = getDayMonthYearFromTimestamp(startDate)
  const countDaysInMonth = getDaysInMonth(startDate)
  const countMonths = differenceInCalendarMonths(startDate, graphStartDate)

  const startPrecent = monthWidth * countMonths

  return Math.round(startPrecent + (monthWidth / countDaysInMonth) * (day - 1))
}

export const getLineStyle = ({
  graphStartDate,
  startDate,
  endDate,
  monthWidth,
  withMargin,
}: {
  graphStartDate: number
  startDate: number
  endDate: number
  monthWidth: number
  withMargin: boolean
}) => {
  const startX = getXCoordByDate({ startDate, monthWidth, graphStartDate })
  const endX = getXCoordByDate({ startDate: endDate, monthWidth, graphStartDate })
  const offset = withMargin ? MARGIN_BETWEEN_BARS : 0
  const left = startX + offset
  const width = endX - left

  return { left, width }
}
