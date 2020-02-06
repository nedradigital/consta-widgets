import { Button } from '@gpn-design/uikit'
import classnames from 'classnames'
import { addQuarters, differenceInQuarters, endOfQuarter, endOfYear, startOfYear } from 'date-fns'
import { times } from 'lodash'

import { DateRange } from '@/components/DatePicker'
import { themeColorLight } from '@/utils/theme'

import css from './index.css'

type Props = {
  currentVisibleDate: Date
  showQuartersSelector: boolean
  minDate: Date
  maxDate: Date
  onChangeVisibleDate: (value: Date) => void
  onSelect: (value: Date | DateRange) => void
}

const getQuarters = (date: Date, minDate: Date, maxDate: Date): readonly DateRange[] => {
  const startDate = startOfYear(date)
  const endDate = endOfYear(date)
  const quarterAmount = differenceInQuarters(endDate, startDate) + 1

  return times(quarterAmount, index => {
    const start = addQuarters(startDate, index)
    const end = endOfQuarter(start)

    if (start < minDate || end > maxDate) {
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
  onChangeVisibleDate,
  onSelect,
}) => {
  const currentYear = currentVisibleDate.getFullYear()
  const quarters = getQuarters(currentVisibleDate, minDate, maxDate)

  const handleClickOnToday = () => {
    onChangeVisibleDate(new Date())
  }

  return (
    <div className={classnames(css.main, themeColorLight)}>
      <Button wpSize="xs" view="secondary" onClick={handleClickOnToday}>
        Сегодня
      </Button>
      {showQuartersSelector && (
        <div className={css.quarters}>
          <div className={css.label}>Выбрать:</div>
          {quarters.map((quarter, idx) => (
            <Button
              key={idx}
              className={css.button}
              wpSize="xs"
              view="secondary"
              disabled={!quarter.length}
              onClick={() => onSelect(quarter)}
            >
              {idx + 1}кв. {currentYear}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
