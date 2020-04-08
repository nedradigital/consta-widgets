import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import { endOfMonth, isWithinInterval, startOfMonth } from 'date-fns'

import { DateRange } from './'
import { isDateFromInputIsFullyEntered } from './components/InputDate/helpers'

export const isDateRange = (value?: Date | DateRange): value is DateRange =>
  Array.isArray(value) &&
  value.length === 2 &&
  value.every(date => date instanceof Date || !isDefined(date))

export const getCurrentVisibleDate = ({
  value,
  minDate,
  maxDate,
}: {
  value?: Date | DateRange
  minDate: Date
  maxDate: Date
}): Date => {
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

export const isDateOutOfRange = ({
  date,
  minDate,
  maxDate,
}: {
  date?: Date
  minDate: Date
  maxDate: Date
}) => {
  return !!date && !isWithinInterval(date, { start: minDate, end: maxDate })
}

export const isDateIsInvalid = ({
  date,
  minDate,
  maxDate,
}: {
  date?: Date
  minDate: Date
  maxDate: Date
}) => {
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
