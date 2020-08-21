import React from 'react'

import { Button } from '@gpn-design/uikit/Button'

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
              label={`${idx + 1} кв. ${currentYear}`}
              className={css.button}
              size="xs"
              view="ghost"
              disabled={!quarter.length}
              onClick={() => onSelect(quarter)}
            />
          ))}
      </div>
      <Button label="Выбрать" size="xs" view="primary" onClick={onApply} />
    </div>
  )
}
