import { useRef } from 'react'

import { Button } from '@gpn-design/uikit/Button'
import { IconFunnel } from '@gpn-design/uikit/IconFunnel'
import { Text } from '@gpn-design/uikit/Text'
import classnames from 'classnames'

import { Popover } from '@/Popover'

import css from './index.css'

type Values = readonly string[]

type Props = {
  options: ReadonlyArray<{
    value: Values[number]
    label: string
  }>
  values: Values
  field: string
  isOpened: boolean
  onChange: (field: string, values: Values) => void
  onToggle: () => void
  className?: string
}

export const FilterTooltip: React.FC<Props> = ({
  field,
  isOpened,
  options,
  values,
  className,
  onChange,
  onToggle,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button
        ref={buttonRef}
        size="xs"
        iconSize="s"
        view="clear"
        onlyIcon
        onClick={onToggle}
        className={classnames(css.button, isOpened && css.isOpened, className)}
        iconLeft={IconFunnel}
      />
      {isOpened && (
        <Popover
          anchorRef={buttonRef}
          possibleDirections={['downRight', 'downLeft']}
          direction="downRight"
          offset={4}
          arrowOffset={12}
          onClickOutside={onToggle}
        >
          <div className={css.popoverContent}>
            <Text as="div" size="xs" view="primary" className={css.title}>
              Фильтровать по условию
            </Text>
            <select
              className={css.select}
              value={[...values]}
              multiple
              onChange={e => {
                onChange(
                  field,
                  Array.from(e.target.selectedOptions).map(option => option.value)
                )
              }}
            >
              {options.map(option => (
                <option
                  key={option.value}
                  className={css.option}
                  value={option.value}
                  title={option.label}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </Popover>
      )}
    </>
  )
}
