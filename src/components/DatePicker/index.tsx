import React from 'react'

import { InputDate } from '@/ui/InputDate'

import css from './index.css'

type Props = {
  value?: Date
  onChange: (value: Date) => void
  onClear: () => void
}

export type Data = Props

export const DatePicker: React.FC<Props> = ({ value, onChange, onClear }) => (
  <div className={css.container}>
    <InputDate value={value} onChange={onChange} />
    <button className={css.button} type="button" onClick={onClear}>
      ❌
    </button>
  </div>
)
