import { IconCalendar } from '@gpn-design/uikit/IconCalendar'
import { TextField, TextFieldPropOnChange } from '@gpn-design/uikit/TextField'

import { isValidDate } from '@/common/utils/type-guards'
import { Tooltip } from '@/Tooltip'

import { Size } from '../../'

import {
  getDateMidnightFromString,
  getInputValue,
  isDateFromInputIsFullyEntered,
  isParsedFromInputDateExists,
} from './helpers'
import css from './index.css'

type Props = {
  size?: Size
  value?: Date
  onChange: (value?: Date) => void
  isInvalid: boolean
  tooltipContent?: React.ReactNode
  isCalendarOpened: boolean
}

export const InputDate: React.FC<Props> = ({
  value,
  size = 'm',
  isInvalid,
  tooltipContent,
  onChange,
  isCalendarOpened,
}) => {
  const [isRealDate, setIsRealDate] = React.useState(true)
  const ref = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const checkIsRealDate = () => {
    if (inputRef.current) {
      const date = getDateMidnightFromString(inputRef.current.value)

      if (isValidDate(date) && isDateFromInputIsFullyEntered(date)) {
        return setIsRealDate(!inputRef.current.validity.badInput)
      }
    }
  }

  const handleBlur = () => {
    if (inputRef.current && !isCalendarOpened) {
      const date = getDateMidnightFromString(inputRef.current.value)

      if (!isValidDate(date) || !isDateFromInputIsFullyEntered(date)) {
        return setIsRealDate(false)
      }
    }
  }

  const handleChange: TextFieldPropOnChange = ({ value: newValue }) => {
    if (!newValue || !isParsedFromInputDateExists(newValue)) {
      return onChange(undefined)
    }

    const date = getDateMidnightFromString(newValue)

    isValidDate(date) && onChange(date)
  }

  React.useLayoutEffect(checkIsRealDate, [value])

  return (
    <>
      <TextField
        ref={ref}
        inputRef={inputRef}
        className={css.input}
        type="date"
        size={size}
        view="default"
        form="default"
        state={isInvalid || !isRealDate ? 'alert' : undefined}
        rightSide={IconCalendar}
        value={getInputValue(value)}
        onChange={handleChange}
        // ловим смену даты на onKeyUp, т.к. onChange не срабатывает, если первая введенная дата - невалидная
        onKeyUp={checkIsRealDate}
        onBlur={handleBlur}
      />
      <Tooltip size="m" isVisible={!!tooltipContent} anchorRef={ref} direction="rightCenter">
        {tooltipContent}
      </Tooltip>
    </>
  )
}
