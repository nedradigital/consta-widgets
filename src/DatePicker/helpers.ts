import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import { endOfMonth, format, isWithinInterval, startOfMonth } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

import { DateLimitProps, DateRange, ValueProps } from './'
import { isDateFromInputIsFullyEntered } from './components/InputDate/helpers'

export const isDateRange: (value: ValueProps<Date | DateRange>['value']) => value is DateRange = (
  value
): value is DateRange =>
  Array.isArray(value) &&
  value.length === 2 &&
  value.every(date => date instanceof Date || !isDefined(date))

export const getCurrentVisibleDate = ({
  value,
  minDate,
  maxDate,
}: ValueProps<Date | DateRange> & DateLimitProps): Date => {
  const currentDate = new Date()
  const selectedDate = isDateRange(value) ? value[1] || value[0] : value

  if (!selectedDate) {
    if (endOfMonth(currentDate) >= minDate && startOfMonth(currentDate) <= maxDate) {
      return currentDate
    }

    return endOfMonth(currentDate) < minDate ? minDate : maxDate
  }

  return selectedDate
}

export const getMonthTitle = (date: Date) => {
  return format(date, 'LLLL', { locale: ruLocale })
}

export const isDateOutOfRange = ({
  date,
  minDate,
  maxDate,
}: {
  date?: Date
} & DateLimitProps) => {
  return !!date && !isWithinInterval(date, { start: minDate, end: maxDate })
}

export const isDateIsInvalid = ({
  date,
  minDate,
  maxDate,
}: {
  date?: Date
} & DateLimitProps) => {
  return (
    !!date &&
    isDateFromInputIsFullyEntered(date) &&
    isDateOutOfRange({
      date,
      minDate,
      maxDate,
    })
  )
}

export const isOnlyOneDateInRange = (range: DateRange) => {
  return Boolean((range[0] && !range[1]) || (!range[0] && range[1]))
}
