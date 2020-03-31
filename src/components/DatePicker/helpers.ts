import { endOfMonth, startOfMonth } from 'date-fns'

import { DateRange, isDateRange } from './'

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
