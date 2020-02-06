import { Input } from '@gpn-design/uikit'
import classnames from 'classnames'
import { format } from 'date-fns'

import { Size } from '@/components/DatePicker'
import { isValidDate } from '@/utils/type-guards'

import css from './index.css'

type Props = {
  size?: Size
  value?: Date
  onChange: (value?: Date) => void
}

export const getInputValue = (value?: Date) => {
  return value && isValidDate(value) ? format(value, 'yyyy-MM-dd') : ''
}

export const getDateMidnightFromString = (dateString: string) => {
  return new Date(`${dateString}T00:00:00`)
}

export const isParsedDateExists = (dateFromInput: string) => {
  return isValidDate(new Date(dateFromInput))
}

export const InputDate: React.FC<Props> = ({ value, size = 'm', onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isParsedDateExists(event.target.value)) {
      return onChange(undefined)
    }

    const date = getDateMidnightFromString(event.target.value)

    isValidDate(date) && onChange(date)
  }

  return (
    <Input
      className={classnames(css.input, { s: css.sizeS, m: css.sizeM, l: css.sizeL }[size])}
      type="date"
      wpSize={size}
      view="default"
      form="default"
      value={getInputValue(value)}
      onChange={handleChange}
    />
  )
}
