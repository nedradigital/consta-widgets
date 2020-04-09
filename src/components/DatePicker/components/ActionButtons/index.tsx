import { Button } from '@gpn-design/uikit'
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

import { DateRange } from '@/components/DatePicker'

import css from './index.css'

type Props = {
  currentVisibleDate: Date
  showQuartersSelector: boolean
  minDate: Date
  maxDate: Date
  onSelect: (value: DateRange) => void
  onApply: () => void
}

export const getQuarters = ({
  date,
  minDate,
  maxDate,
}: {
  date: Date
  minDate: Date
  maxDate: Date
}): readonly DateRange[] => {
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

export const ActionButtons: React.FC<Props> = ({
  currentVisibleDate,
  showQuartersSelector,
  minDate,
  maxDate,
  onSelect,
  onApply,
}) => {
  const currentYear = currentVisibleDate.getFullYear()
  const quarters = getQuarters({ date: currentVisibleDate, minDate, maxDate })

  return (
    <div className={css.main}>
      <div className={css.quarters}>
        {showQuartersSelector &&
          quarters.map((quarter, idx) => (
            <Button
              key={idx}
              className={css.button}
              wpSize="xs"
              view="ghost"
              disabled={!quarter.length}
              onClick={() => onSelect(quarter)}
            >
              {idx + 1} кв. {currentYear}
            </Button>
          ))}
      </div>
      <Button wpSize="xs" view="primary" onClick={onApply}>
        Выбрать
      </Button>
    </div>
  )
}
