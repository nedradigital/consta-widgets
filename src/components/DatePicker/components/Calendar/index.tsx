import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import classnames from 'classnames'
import {
  addDays,
  addMonths,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameDay,
  isToday,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import * as _ from 'lodash'

import { DateRange, isDateRange } from '@/components/DatePicker'

import css from './index.css'

type Props = {
  minDate: Date
  maxDate: Date
  value?: Date | DateRange
  currentVisibleDate: Date
  onSelect: (value: Date | DateRange) => void
}

const getStartAndEndDate = (date1: Date, date2: Date) => {
  const [start, end] = _.sortBy([date1, date2])

  return { start, end }
}

const isDateHighlighted = ({
  date,
  value,
  hoveredDate,
}: {
  date: Date
  value?: Date | DateRange
  hoveredDate?: Date
}) => {
  if (!hoveredDate || !isDateRange(value) || !value[0] || value[1]) {
    return false
  }

  return isWithinInterval(date, getStartAndEndDate(value[0], hoveredDate))
}

const isDateSelected = ({
  date,
  value,
  minDate,
  maxDate,
}: {
  date: Date
  value?: Date
  minDate: Date
  maxDate: Date
}) => {
  return value
    ? isWithinInterval(date, { start: minDate, end: maxDate }) && isSameDay(value, date)
    : false
}

export const isValueSelected = ({
  date,
  value,
  minDate,
  maxDate,
}: {
  date: Date
  value?: Date | DateRange
  minDate: Date
  maxDate: Date
}) => {
  if (isDateRange(value)) {
    if (value[0] && value[1]) {
      const { start, end } = getStartAndEndDate(value[0], value[1])
      return (
        // при вводе с клавиатуры год может начинаться с 0, что крашит date-fns
        start.valueOf() >= minDate.valueOf() &&
        start.valueOf() <= end.valueOf() &&
        end.valueOf() >= start.valueOf() &&
        end.valueOf() <= maxDate.valueOf() &&
        isWithinInterval(date, { start, end })
      )
    }

    return isDateSelected({ date, value: value[0] || value[1], minDate, maxDate })
  } else {
    return isDateSelected({ date, value, minDate, maxDate })
  }
}

const getMonthTitle = (date: Date) => {
  const name = date.toLocaleDateString('ru', { month: 'long' })
  const year = date.getFullYear()

  return `${name} ${year}`
}

const getMonthWeeks = (date: Date) => {
  const currentMonth = date.getMonth()
  const startDate = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const endDate = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
  const diffDays = differenceInDays(endDate, startDate) + 1

  const days = _.times(diffDays).map((__, index) => {
    const day = addDays(startDate, index)

    if (day.getMonth() === currentMonth) {
      return day
    }

    return
  })

  return _.chunk(days, 7)
}

const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((dayName, idx) => (
  <div key={idx} className={classnames(css.cell, css.isWeekDay)}>
    <div className={css.cellContent}>{dayName}</div>
  </div>
))

export const Calendar: React.FC<Props> = ({
  onSelect,
  value,
  currentVisibleDate,
  minDate,
  maxDate,
}) => {
  const [hoveredDate, setHoveredDate] = React.useState<Date>()

  const handleHoverDate = (date: Date) => {
    if (isWithinInterval(date, { start: minDate, end: maxDate })) {
      return setHoveredDate(date)
    }

    return setHoveredDate(undefined)
  }

  const handleSelectDate = (date: Date) => {
    if (!isWithinInterval(date, { start: minDate, end: maxDate })) {
      return
    }

    if (!isDateRange(value)) {
      return onSelect(date)
    }

    const [startDate] = value

    if (!isDefined(startDate) || value.every(isDefined)) {
      return onSelect([date, undefined])
    }

    return onSelect(startDate > date ? [date, startDate] : [startDate, date])
  }

  const monthsAmount = isDateRange(value) ? 2 : 1

  const renderDay = (date: Date | undefined, dayIdx: number) => {
    if (!date) {
      return (
        <div key={dayIdx} className={css.cell}>
          <div className={css.cellContent} />
        </div>
      )
    }

    const isDateToday = isToday(date)
    const isDisabled = !isWithinInterval(date, { start: minDate, end: maxDate })
    const isHighlighted = isDateHighlighted({ date, value, hoveredDate })
    const isSelected = isValueSelected({ date, value, minDate, maxDate })
    const isSelectedBackwards =
      isDateRange(value) && hoveredDate && value[0] && !value[1] && isBefore(hoveredDate, value[0])
    const [firstDate, lastDate] = isDateRange(value) ? _.sortBy(value) : [undefined, undefined]
    const isFirstDate = isDateRange(value) && firstDate ? isSameDay(firstDate, date) : false
    const isLastDate = isDateRange(value) && lastDate ? isSameDay(lastDate, date) : false

    return (
      <div
        key={dayIdx}
        className={classnames(
          css.cell,
          isDateToday && css.isToday,
          isDisabled ? css.isDisabled : css.isSelectable,
          isSelected && css.isSelected,
          isFirstDate && css.isFirstDate,
          isLastDate && css.isLastDate,
          isSelectedBackwards && css.isSelectedBackwards,
          value && !isDateRange(value) && css.isSingleDate,
          value && isDateRange(value) && css.isRange,
          value && isDateRange(value) && isHighlighted && css.isHighlighted,
          value && isDateRange(value) && value[0] && !value[1] && css.isOnlyOneValue
        )}
        onMouseEnter={() => handleHoverDate(date)}
        onMouseLeave={() => setHoveredDate(undefined)}
        onClick={() => handleSelectDate(date)}
      >
        <div className={css.cellContent}>{date.getDate()}</div>
      </div>
    )
  }

  return (
    <div className={classnames(css.main)}>
      {_.times(monthsAmount, idx => {
        const month = addMonths(currentVisibleDate, idx)
        const weeks = getMonthWeeks(month)
        const title = getMonthTitle(month)

        return (
          <div key={idx} className={css.month}>
            <div className={css.title}>{title}</div>
            <div className={classnames(css.row, css.isWithDaynames)}>{weekDays}</div>
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className={css.row}>
                {week.map(renderDay)}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
