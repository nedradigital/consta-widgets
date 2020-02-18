import { useEffect, useRef, useState } from 'react'

import { isDefined } from '@csssr/gpn-utils/lib/type-guards'
import { Button } from '@gpn-design/uikit'
import classnames from 'classnames'
import {
  addMonths,
  differenceInCalendarMonths,
  differenceInMonths,
  getDaysInMonth,
  isSameMonth,
  isWithinInterval,
  subMonths,
} from 'date-fns'
import { times } from 'lodash'

import { DateRange, isDateRange } from '../..'

import { ReactComponent as IconNext } from './icons/arrow_next.svg'
import css from './index.css'

const MOVE_STEP = 6
const TICK_WIDTH = 20
const NOT_ALLOWED_MONTHS_AMOUNT = 12

const getMonths = ({
  minDate,
  maxDate,
  ticksOutsideRange,
}: {
  minDate: Date
  maxDate: Date
  ticksOutsideRange: number
}) => {
  const startDate = subMonths(minDate, ticksOutsideRange)
  const endDate = addMonths(maxDate, ticksOutsideRange)
  const monthAmount = differenceInMonths(endDate, startDate) + 1

  return times(monthAmount, i => addMonths(startDate, i))
}

type Props = {
  currentVisibleDate: Date
  minDate: Date
  maxDate: Date
  value?: Date | DateRange
  onChange: (date: Date) => void
}

const getBaseDate = (value?: Date | DateRange) => {
  return isDateRange(value) ? value[0] || value[1] : value
}

const getDateOffsetOnTimeline = ({
  date,
  minDate,
  tickWidth,
  ticksOutsideRange,
}: {
  date: Date
  minDate: Date
  tickWidth: number
  ticksOutsideRange: number
}) => {
  const startDay = date.getDate()
  const monthsOffsetPx = (differenceInMonths(date, minDate) + ticksOutsideRange) * tickWidth
  const daysOffsetPx = (tickWidth * startDay) / getDaysInMonth(startDay)

  return monthsOffsetPx + daysOffsetPx
}

const getSelectedDayWidth = (date: Date, tickWidth: number) => {
  return Math.max(tickWidth / getDaysInMonth(date), 1)
}

const isSelectedWithinAllowedLimits = ({
  value,
  minDate,
  maxDate,
}: {
  value?: Date | DateRange
  minDate: Date
  maxDate: Date
}) => {
  if (isDateRange(value) && value[0] && value[1]) {
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
  value?: Date | DateRange
  minDate: Date
  tickWidth: number
  ticksOutsideRange: number
}) => {
  const baseDate = isDateRange(value) ? value[0] || value[1] : value

  if (!baseDate) {
    return {
      width: 0,
    }
  }

  if (isDateRange(value) && value[0] && value[1]) {
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

export const Timeline: React.FC<Props> = ({
  currentVisibleDate,
  minDate,
  maxDate,
  value,
  onChange,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [activeTick, setActiveTick] = useState<number | undefined>(undefined)

  const ticksOutsideRange = isDateRange(value)
    ? NOT_ALLOWED_MONTHS_AMOUNT
    : NOT_ALLOWED_MONTHS_AMOUNT / 2
  const months = getMonths({ minDate, maxDate, ticksOutsideRange })

  const getMaxOffset = () => {
    if (!timelineRef.current) {
      return 0
    }

    const { width } = timelineRef.current.getBoundingClientRect()

    return width - months.length * TICK_WIDTH
  }

  const maxOffset = getMaxOffset()

  useEffect(() => {
    if (!timelineRef.current) {
      return
    }

    const index = months.findIndex(item => isSameMonth(item, currentVisibleDate))
    const { width } = timelineRef.current.getBoundingClientRect()

    if (index !== -1) {
      setOffset(width / 2 - (index + 1) * TICK_WIDTH)
    }

    /**
     * Отключаем проверку так как центрировать значение необходимо только при
     * первом отображении линейки и при смене текущей отображаемой даты.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineRef.current, currentVisibleDate])

  const handleMovePrev = () => {
    const nextOffset = offset + MOVE_STEP * TICK_WIDTH

    setOffset(nextOffset > 0 ? 0 : nextOffset)
  }

  const handleMoveNext = () => {
    const nextOffset = offset - MOVE_STEP * TICK_WIDTH

    setOffset(nextOffset < maxOffset ? maxOffset : nextOffset)
  }

  const baseDate = getBaseDate(value)

  const selectedBlockStyles = baseDate
    ? getSelectedBlockStyles({
        value,
        minDate,
        tickWidth: TICK_WIDTH,
        ticksOutsideRange,
      })
    : {}

  return (
    <div className={css.main}>
      <Button
        className={css.button}
        wpSize="s"
        view="secondary"
        disabled={offset === 0}
        onClick={handleMovePrev}
      >
        <IconNext className={css.iconPrev} />
      </Button>
      <div ref={timelineRef} className={css.timeline}>
        <div className={css.ticks} style={{ transform: `translateX(${offset}px)` }}>
          {baseDate && isSelectedWithinAllowedLimits({ value, minDate, maxDate }) && (
            <div className={css.selected} style={selectedBlockStyles} />
          )}
          {months.map((date, idx) => {
            const firstInYear = date.getMonth() === 0
            const isDisabled = date > maxDate || date < minDate

            return (
              <div
                key={idx}
                className={classnames(css.tick, isDisabled && css.isDisabled)}
                onMouseEnter={!isDisabled ? () => setActiveTick(idx) : undefined}
                onMouseLeave={!isDisabled ? () => setActiveTick(undefined) : undefined}
                onClick={!isDisabled ? () => onChange(date) : undefined}
              >
                {firstInYear && <div className={css.label}>{date.getFullYear()}</div>}
                <div className={classnames(css.line, firstInYear && css.isBig)} />
              </div>
            )
          })}
          {
            <div
              className={classnames(css.selector, isDateRange(value) && css.isWide)}
              style={{
                left:
                  TICK_WIDTH *
                  (isDefined(activeTick)
                    ? activeTick
                    : differenceInCalendarMonths(currentVisibleDate, minDate) + ticksOutsideRange),
              }}
            />
          }
        </div>
      </div>
      <Button
        className={css.button}
        wpSize="s"
        view="secondary"
        disabled={offset === maxOffset}
        onClick={handleMoveNext}
      >
        <IconNext />
      </Button>
    </div>
  )
}
