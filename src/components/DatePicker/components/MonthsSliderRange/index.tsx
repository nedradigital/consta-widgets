import { useEffect, useRef, useState } from 'react'

import { Text } from '@gpn-design/uikit'
import {
  addMonths,
  differenceInCalendarMonths,
  differenceInMonths,
  getDaysInMonth,
  isSameMonth,
  isSameYear,
  isWithinInterval,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { groupBy, times } from 'lodash'

import { DateLimitProps, DateRange, ValueProps } from '../../'
import { MonthsSliderWrapper } from '../MonthsSliderWrapper'

import css from './index.css'

type Props = {
  currentVisibleDate: Date
  onChange: (date: Date) => void
} & DateLimitProps &
  ValueProps<DateRange>

const MOVE_STEP = 12
const TICK_WIDTH = 32
const NOT_ALLOWED_MONTHS_AMOUNT = 12

const getMonths = ({
  minDate,
  maxDate,
  ticksOutsideRange,
}: {
  ticksOutsideRange: number
} & DateLimitProps) => {
  const startDate = subMonths(minDate, ticksOutsideRange)
  const endDate = addMonths(maxDate, ticksOutsideRange)
  const monthAmount = differenceInMonths(endDate, startDate) + 1

  return times(monthAmount, i => addMonths(startDate, i))
}

const getBaseDate = (value?: DateRange) => {
  return value ? value[0] || value[1] : undefined
}

export const getDateOffsetOnTimeline = ({
  date,
  minDate,
  tickWidth,
  ticksOutsideRange,
}: {
  date: Date
  tickWidth: number
  ticksOutsideRange: number
} & Pick<DateLimitProps, 'minDate'>) => {
  const startDay = date.getDate()
  const monthsOffsetPx =
    (differenceInMonths(date, startOfMonth(minDate)) + ticksOutsideRange) * tickWidth
  const daysOffsetPx = (tickWidth * startDay) / getDaysInMonth(date)

  return Math.round(monthsOffsetPx + daysOffsetPx)
}

const getSelectedDayWidth = (date: Date, tickWidth: number) => {
  return Math.max(tickWidth / getDaysInMonth(date), 1)
}

const isSelectedWithinAllowedLimits = ({
  value,
  minDate,
  maxDate,
}: ValueProps<DateRange> & DateLimitProps) => {
  if (value && value[0] && value[1]) {
    return value[0].valueOf() >= minDate.valueOf() && value[1].valueOf() <= maxDate.valueOf()
  }

  const baseDate = getBaseDate(value)

  return baseDate ? isWithinInterval(baseDate, { start: minDate, end: maxDate }) : false
}

const getSelectedBlockStyles = ({
  value,
  minDate,
  tickWidth,
  ticksOutsideRange,
}: {
  tickWidth: number
  ticksOutsideRange: number
} & ValueProps<DateRange> &
  Pick<DateLimitProps, 'minDate'>) => {
  const baseDate = getBaseDate(value)

  if (!baseDate) {
    return {
      width: 0,
    }
  }

  if (value && value[0] && value[1]) {
    const leftCorner = getDateOffsetOnTimeline({
      date: value[0],
      minDate,
      tickWidth,
      ticksOutsideRange,
    })
    const rightCorner = getDateOffsetOnTimeline({
      date: value[1],
      minDate,
      tickWidth,
      ticksOutsideRange,
    })

    return {
      left: leftCorner,
      width: Math.max(rightCorner - leftCorner, 1) + getSelectedDayWidth(value[1], tickWidth),
    }
  }

  return {
    left: getDateOffsetOnTimeline({
      date: baseDate,
      minDate,
      tickWidth,
      ticksOutsideRange,
    }),
    width: Math.max(getSelectedDayWidth(baseDate, tickWidth), 1),
  }
}

const TickSelector: React.FC<{ offsetLeft: number }> = ({ offsetLeft }) => (
  <div
    className={css.selector}
    style={{
      left: TICK_WIDTH * offsetLeft,
    }}
  />
)

export const MonthsSliderRange: React.FC<Props> = ({
  currentVisibleDate,
  minDate,
  maxDate,
  value,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  const months = getMonths({ minDate, maxDate, ticksOutsideRange: NOT_ALLOWED_MONTHS_AMOUNT })
  const monthsGroupedByYear = groupBy(months, month => month.getFullYear())

  const getMaxOffset = () => {
    if (!ref.current) {
      return 0
    }

    const { width } = ref.current.getBoundingClientRect()

    return width - months.length * TICK_WIDTH
  }

  const maxOffset = getMaxOffset()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const index = months.findIndex(item => isSameMonth(item, currentVisibleDate))
    const { width } = ref.current.getBoundingClientRect()

    if (index !== -1) {
      setOffset(width / 2 - (index + 1) * TICK_WIDTH)
    }

    /**
     * Отключаем проверку так как центрировать значение необходимо только при
     * первом отображении линейки и при смене текущей отображаемой даты.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, currentVisibleDate])

  const handleMovePrev = () => {
    const nextOffset = offset + MOVE_STEP * TICK_WIDTH

    setOffset(nextOffset > 0 ? 0 : nextOffset)
  }

  const handleMoveNext = () => {
    const nextOffset = offset - MOVE_STEP * TICK_WIDTH

    setOffset(nextOffset < maxOffset ? maxOffset : nextOffset)
  }

  const selectedBlockStyles = getSelectedBlockStyles({
    value,
    minDate,
    tickWidth: TICK_WIDTH,
    ticksOutsideRange: NOT_ALLOWED_MONTHS_AMOUNT,
  })

  return (
    <MonthsSliderWrapper
      onMovePrev={handleMovePrev}
      isMovePrevDisabled={offset === 0}
      onMoveNext={handleMoveNext}
      isMoveNextDisabled={offset === maxOffset}
    >
      <div
        ref={ref}
        className={css.timeline}
        style={{ ['--tick-width' as string]: `${TICK_WIDTH}px` }}
      >
        <div className={css.ticks} style={{ transform: `translateX(${offset}px)` }}>
          {getBaseDate(value) && isSelectedWithinAllowedLimits({ value, minDate, maxDate }) && (
            <div className={css.selected} style={selectedBlockStyles} />
          )}
          {Object.entries(monthsGroupedByYear).map(([year, yearMonths], idxYear) => {
            const yearNameView = isSameYear(new Date(Number(year), 0, 1), currentVisibleDate)
              ? 'primary'
              : 'ghost'

            return (
              <div className={css.year} key={idxYear}>
                <Text size="s" tag="div" view={yearNameView} weight="bold" className={css.yearName}>
                  {year}
                </Text>
                {yearMonths.map((month, idx) => {
                  const name = month.toLocaleDateString('ru', { month: 'short' }).replace('.', '')

                  return (
                    <div key={idx} className={css.tick} onClick={() => onChange(month)}>
                      <Text tag="div" size="2xs" view="ghost">
                        {name}
                      </Text>
                    </div>
                  )
                })}
              </div>
            )
          })}
          <TickSelector
            offsetLeft={differenceInCalendarMonths(
              currentVisibleDate,
              subMonths(minDate, NOT_ALLOWED_MONTHS_AMOUNT)
            )}
          />
        </div>
      </div>
    </MonthsSliderWrapper>
  )
}
