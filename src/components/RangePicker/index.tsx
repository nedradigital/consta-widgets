import React from 'react'

import { InputDate } from '@/ui/InputDate'

import css from './index.css'

export type DateRange = readonly [Date?, Date?]

type Props = {
  value?: DateRange
  onChange: (value: DateRange) => void
}

export type Data = Props

export const RangePicker: React.FC<Props> = ({ value, onChange }) => {
  const [from, to] = value ? value : new Array(2)

  const handleChange = (target: 'from' | 'to') => (date: Date) => {
    if (!to || !from || (target === 'from' && date > to) || (target === 'to' && date < from)) {
      return onChange([date, date])
    }

    return onChange(target === 'from' ? [date, to] : [from, date])
  }

  const handleClear = () => onChange([])

  return (
    <div className={css.container}>
      <span className={css.label}>От:</span>
      <InputDate className={css.input} value={from} onChange={handleChange('from')} />
      <span className={css.label}>До:</span>
      <InputDate className={css.input} value={to} onChange={handleChange('to')} />
      <button className={css.button} type="button" onClick={handleClear}>
        ❌
      </button>
    </div>
  )
}
