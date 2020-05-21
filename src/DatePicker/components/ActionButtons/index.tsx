import { Button } from '@gpn-design/uikit'

import { DateLimitProps, DateRange } from '../../'

import { getQuarters } from './helpers'
import css from './index.css'

type Props = {
  currentVisibleDate: Date
  showQuartersSelector: boolean
  onSelect: (value: DateRange) => void
  onApply: () => void
} & DateLimitProps

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
