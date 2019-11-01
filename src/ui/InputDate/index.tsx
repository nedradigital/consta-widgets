import React from 'react'

import { formatDateToInputString } from '@/utils/time'

type Props = {
  className?: string
  value?: Date
  onChange?: (value: Date) => void
}

export const InputDate: React.FC<Props> = ({ className, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && onChange && onChange(new Date(event.target.value))
  }

  return (
    <input
      className={className}
      type="date"
      value={formatDateToInputString(value)}
      onChange={handleChange}
    />
  )
}
