import {
  addQuarters,
  differenceInQuarters,
  endOfDay,
  endOfQuarter,
  endOfYear,
  startOfDay,
  startOfYear,
} from 'date-fns'
import { times } from 'lodash'

import { DateLimitProps, DateRange } from '../../'

export const getQuarters = ({
  date,
  minDate,
  maxDate,
}: {
  date: Date
} & DateLimitProps): readonly DateRange[] => {
  const startDate = startOfYear(date)
  const endDate = endOfYear(date)
  const quarterAmount = differenceInQuarters(endDate, startDate) + 1

  return times(quarterAmount, index => {
    const start = startOfDay(addQuarters(startDate, index))
    const end = endOfDay(endOfQuarter(start))

    if (end < minDate || start > maxDate) {
      return []
    }

    return [start, end]
  })
}
