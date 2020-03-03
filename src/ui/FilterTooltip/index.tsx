import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useClickOutside } from '@csssr/gpn-utils/lib/use-click-outside'
import { Button, Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { MultiSelect } from '@/ui/MultiSelect'
import { PositionState } from '@/utils/tooltips'
import { isDefinedPosition } from '@/utils/type-guards'

import { Props as MultiSelectProps } from '../MultiSelect'

import { ReactComponent as IconFilterSvg } from './images/filter-icon.svg'
import css from './index.css'

export type Props = Omit<MultiSelectProps, 'onChange'> & {
  field: string
  isOpened: boolean
  onCancel: () => void
  onSave: (field: string, values: MultiSelectProps['values']) => void
  handleFilterTogglerClick: () => void
  className?: string
}

export const FilterTooltip: React.FC<Props> = ({
  field,
  isOpened,
  options,
  values,
  className,
  onCancel,
  onSave,
  handleFilterTogglerClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [tooltipPosition, setTooltipPosition] = useState<PositionState>()
  const [selectedValues, setSelectedValues] = useState(values)

  useLayoutEffect(() => {
    if (buttonRef.current && isOpened) {
      const { left, bottom } = buttonRef.current.getBoundingClientRect()

      setTooltipPosition({ x: left, y: bottom })
    }
  }, [buttonRef, isOpened])

  useEffect(() => {
    setSelectedValues(values)
  }, [values])

  useClickOutside([tooltipRef, buttonRef], onCancel)

  return (
    <>
      <button
        ref={buttonRef}
        className={classnames(css.iconFilter, isOpened && css.isOpened, className)}
        onClick={() => handleFilterTogglerClick()}
      >
        <IconFilterSvg />
      </button>
      {isOpened &&
        isDefinedPosition(tooltipPosition) &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            className={classnames(css.tooltip)}
            style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
          >
            <Text tag="div" size="xs" view="primary" className={css.title}>
              Фильтровать по условию
            </Text>
            <MultiSelect options={options} values={selectedValues} onChange={setSelectedValues} />
            <div className={css.actionsRow}>
              <div className={css.action}>
                <Button
                  onClick={onCancel}
                  type="button"
                  wpSize="s"
                  view="ghost"
                  className={css.cancelButton}
                >
                  Отмена
                </Button>
              </div>
              <div className={css.action}>
                <Button
                  onClick={() => onSave(field, selectedValues)}
                  type="button"
                  wpSize="s"
                  view="primary"
                >
                  Ок
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
