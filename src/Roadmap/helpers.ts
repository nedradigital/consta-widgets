import { differenceInCalendarMonths, getDaysInMonth } from 'date-fns'

import { Filters, SelectedFilters } from '@/common/utils/table'
import { getDayMonthYearFromTimestamp } from '@/common/utils/time'

import { MonthItem, Row, TextAlign, Title } from '.'

export const TABLE_COLUMN_WIDTH = 186
export const TABLE_FAKE_COLUMN_WIDTH = 178
export const MARGIN_BETWEEN_BARS = 1
export const FACT_BLOCK_SIZE = 8

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

export const PERIOD_POSITIONS: readonly number[] = [0, 3, 6, 9]

export const filterRoadmapData = ({
  rows,
  filters,
  selectedFilters,
}: {
  rows: readonly Row[]
  filters: Filters
  selectedFilters: SelectedFilters
}) => {
  const filterColumn = ([key, value]: readonly [string, React.ReactNode]) => {
    const columnSelectedFilters = selectedFilters[key] || []
    if (columnSelectedFilters.length === 0) {
      return true
    }

    const columnFilters = filters.filter(filter => columnSelectedFilters.includes(filter.id))
    if (columnFilters.length === 0) {
      return false
    }

    // Если передали React компонент, то пропускаем проверку контента.
    if (typeof value !== 'string' && typeof value !== 'number') {
      return false
    }

    return columnFilters.some(filter => filter.filterer(value))
  }

  const filterRow = (row: Row) => {
    return Object.entries(row.columns).every(filterColumn)
  }

  return rows.filter(filterRow)
}

export const getAlignForColumns = (titles: readonly Title[]) => {
  return titles.reduce<Record<string, TextAlign>>((acc, item) => {
    acc[item.accessor] = item.align || 'left'
    return acc
  }, {})
}

export const getColumnCount = (rows: ReadonlyArray<Pick<Row, 'columns'>>) => {
  return rows.reduce((acc, row) => {
    const keys = Object.keys(row.columns)

    if (keys.length > acc) {
      return keys.length
    }

    return acc
  }, 0)
}

export const getGridTemplateColumns = (
  size: number,
  count: number
): React.CSSProperties['gridTemplateColumns'] => {
  return `${size * count}px auto`
}

export const getLongestTextFromColumns = (columns: Record<string, React.ReactNode>) => {
  return Object.values(columns).reduce<string>((acc, value) => {
    if (typeof value === 'string' && value.length > acc.length) {
      return value
    }

    return acc
  }, '')
}

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
    const isPeriod = i === 0 || PERIOD_POSITIONS.includes(monthCounter)

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
