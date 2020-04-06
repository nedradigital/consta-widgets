import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useClickOutside } from '@csssr/gpn-utils/lib/use-click-outside'
import { IconFunnel, MultiSelect, Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { PositionState } from '@/utils/tooltips'
import { isDefinedPosition } from '@/utils/type-guards'

import css from './index.css'

type Values = readonly string[]

type Props = {
  options: Readonly<React.ComponentProps<typeof MultiSelect>['options']>
  values: Values
  field: string
  isOpened: boolean
  onSave: (field: string, values: Values) => void
  handleFilterTogglerClick: () => void
  className?: string
}

export const FilterTooltip: React.FC<Props> = ({
  field,
  isOpened,
  options,
  values,
  className,
  onSave,
  handleFilterTogglerClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [tooltipPosition, setTooltipPosition] = useState<PositionState>()
  const [selectedValues, setSelectedValues] = useState<Values | undefined>(values)

  useLayoutEffect(() => {
    if (buttonRef.current && isOpened) {
      const { left, bottom } = buttonRef.current.getBoundingClientRect()

      setTooltipPosition({ x: left, y: bottom })
    }
  }, [buttonRef, isOpened])

  useEffect(() => {
    setSelectedValues(values)
  }, [values])

  useClickOutside({
    requiredRefs: [buttonRef, tooltipRef],
    optionalRefs: [menuRef],
    handler: () => onSave(field, selectedValues || []),
  })

  return (
    <>
      <button
        ref={buttonRef}
        className={classnames(css.button, isOpened && css.isOpened, className)}
        onClick={() => {
          onSave(field, selectedValues || [])
          handleFilterTogglerClick()
        }}
      >
        <IconFunnel size="xs" className={css.iconFilter} />
      </button>
      {isOpened &&
        isDefinedPosition(tooltipPosition) &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            className={css.tooltip}
            style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
          >
            <Text tag="div" size="xs" view="primary" className={css.title}>
              Фильтровать по условию
            </Text>
            <MultiSelect
              name={field}
              menuRef={menuRef}
              wpSize="xs"
              onChange={setSelectedValues}
              onClearValue={() => setSelectedValues(undefined)}
              placeholder="Выберите пункт"
              options={[...options]}
              value={selectedValues ? [...selectedValues] : undefined}
            />
          </div>,
          document.body
        )}
    </>
  )
}
