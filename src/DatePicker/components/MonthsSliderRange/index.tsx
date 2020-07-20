import React, { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { Text } from '@gpn-design/uikit/Text'
import classnames from 'classnames'
import {
  addMonths,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  endOfYear,
  isSameMonth,
  isSameYear,
  startOfYear,
} from 'date-fns'
import { groupBy } from 'lodash'

import { DndItemTypes } from '@/common/constants'

import { DateLimitProps, DateRange, ValueProps } from '../../'
import { MonthsSliderWrapper } from '../MonthsSliderWrapper'

import {
  getBaseDate,
  getMonths,
  getSelectedBlockStyles,
  isSelectedWithinAllowedLimits,
} from './helpers'
import css from './index.css'

type Props = {
  currentVisibleDate: Date
  onChange: (date: Date) => void
} & DateLimitProps &
  ValueProps<DateRange>

const MOVE_STEP = 12
const TICK_WIDTH = 32
const MONTHS_AMOUNT_IN_RANGE = 2

const TickSelector: React.FC<{
  offsetLeft: number
}> = ({ offsetLeft }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [, dragRef] = useDrag({
    item: { type: DndItemTypes.DATE_RAGE },
  })

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      ref={dragRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={classnames(css.selector, isDragging && css.isDragging)}
      style={{
        left: TICK_WIDTH * offsetLeft,
      }}
    />
  )
}

export const MonthsSliderRange: React.FC<Props> = ({
  value,
  onChange,
  currentVisibleDate,
  minDate: initialMinDate,
  maxDate: initialMaxDate,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offsetRatio, setOffsetRatio] = useState(0)

  const [, dropRef] = useDrop({
    accept: DndItemTypes.DATE_RAGE,
    drop: (_, monitor) => {
      const monitorCoords = monitor.getDifferenceFromInitialOffset()

      if (!monitorCoords || !monitorCoords.x) {
        return
      }

      const { x } = monitorCoords
      const monthsAmountToMove = Math.floor(x / TICK_WIDTH)

      if (!monthsAmountToMove) {
        return
      }

      const newMonth = addMonths(currentVisibleDate, monthsAmountToMove)

      onChange(newMonth)
    },
  })

  const minDate = startOfYear(initialMinDate)
  const maxDate = addMonths(endOfYear(initialMaxDate), MONTHS_AMOUNT_IN_RANGE)
  const months = getMonths({ minDate, maxDate })
  const monthsGroupedByYear = groupBy(months, month => month.getFullYear())
  const maxOffsetRatio = isSameYear(minDate, maxDate)
    ? 0
    : differenceInCalendarYears(maxDate, minDate) - 1
  const selectedBlockStyles = getSelectedBlockStyles({
    value,
    minDate,
    tickWidth: TICK_WIDTH,
  })

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const tickIdx = months.findIndex(item => isSameMonth(item, currentVisibleDate))

    setOffsetRatio(Math.floor(tickIdx / 12))

    /**
     * Отключаем проверку, так как положение расчитывается при первой отрисовке
     * и при смене текущей отображаемой даты, а отслеживание массива месяцев не
     * требуется потому что меняется на каждую отрисовку.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, currentVisibleDate])

  const handleMovePrev = () => {
    offsetRatio > 0 && setOffsetRatio(offsetRatio - 1)
  }

  const handleMoveNext = () => {
    maxOffsetRatio > offsetRatio && setOffsetRatio(offsetRatio + 1)
  }

  return (
    <MonthsSliderWrapper
      onMovePrev={handleMovePrev}
      isMovePrevDisabled={offsetRatio === 0}
      onMoveNext={handleMoveNext}
      isMoveNextDisabled={offsetRatio === maxOffsetRatio}
    >
      <div
        ref={ref}
        className={css.timeline}
        style={{ ['--tick-width' as string]: `${TICK_WIDTH}px` }}
      >
        <div
          ref={dropRef}
          className={css.ticks}
          style={{ transform: `translateX(${-1 * offsetRatio * MOVE_STEP * TICK_WIDTH}px)` }}
        >
          <TickSelector
            offsetLeft={differenceInCalendarMonths(currentVisibleDate, startOfYear(minDate))}
          />
          {getBaseDate(value) && isSelectedWithinAllowedLimits({ value, minDate, maxDate }) && (
            <div className={css.selected} style={selectedBlockStyles} />
          )}
          {Object.entries(monthsGroupedByYear).map(([year, yearMonths], idxYear) => {
            const isYearActive = idxYear === offsetRatio
            const yearNameView = isYearActive ? 'primary' : 'ghost'

            return (
              <div className={css.year} key={idxYear}>
                <Text
                  size="s"
                  as="div"
                  view={yearNameView}
                  weight="bold"
                  className={classnames(css.yearName, isYearActive && css.isActive)}
                >
                  {year}
                </Text>
                {yearMonths.map((month, idxMonth) => {
                  const name = month.toLocaleDateString('ru', { month: 'short' }).replace('.', '')

                  return (
                    <div key={idxMonth} className={css.tick} onClick={() => onChange(month)}>
                      <Text as="div" size="2xs" view="ghost">
                        {name}
                      </Text>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </MonthsSliderWrapper>
  )
}
