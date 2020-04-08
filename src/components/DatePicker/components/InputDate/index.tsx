import { IconCalendar, Input } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Size } from '@/components/DatePicker'
import { Tooltip } from '@/components/Tooltip'
import { isValidDate } from '@/utils/type-guards'

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isParsedFromInputDateExists(event.target.value)) {
      return onChange(undefined)
    }

    const date = getDateMidnightFromString(event.target.value)

    isValidDate(date) && onChange(date)
  }

  const iconSize = ({
    s: 'xs',
    m: 's',
    l: 'm',
  } as const)[size]

  React.useLayoutEffect(checkIsRealDate, [value])

  return (
    <div className={css.main} ref={ref}>
      <Input
        inputRef={inputRef}
        className={classnames(
          css.input,
          (isInvalid || !isRealDate) && css.isInvalid,
          { s: css.sizeS, m: css.sizeM, l: css.sizeL }[size]
        )}
        type="date"
        wpSize={size}
        view="default"
        form="default"
        value={getInputValue(value)}
        onChange={handleChange}
        // ловим смену даты на onKeyUp, т.к. onChange не срабатывает, если первая введенная дата - невалидная
        onKeyUp={checkIsRealDate}
        onBlur={handleBlur}
      />
      <IconCalendar size={iconSize} className={css.icon} />
      {tooltipContent && (
        <Tooltip
          isVisible
          anchorRef={ref}
          direction="right"
          offset={1}
          isContentHoverable
          className={css.tooltip}
        >
          {tooltipContent}
        </Tooltip>
      )}
    </div>
  )
}
