import { useRef } from 'react'

import { useClickOutside } from '@csssr/gpn-utils/lib/use-click-outside'
import { IconFunnel, MultiSelect, Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Tooltip } from '@/components/Tooltip'
import { themeColorDisplay } from '@/utils/theme'
import { useTooltipReposition } from '@/utils/tooltips'

import css from './index.css'

type Values = readonly string[]

type Props = {
  options: Readonly<React.ComponentProps<typeof MultiSelect>['options']>
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
  const tooltipRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside({
    requiredRefs: [buttonRef, tooltipRef],
    optionalRefs: [menuRef],
    handler: onToggle,
  })

  useTooltipReposition({
    isVisible: isOpened,
    anchorRef: buttonRef,
    onRequestReposition: onToggle,
  })

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        className={classnames(css.button, isOpened && css.isOpened, className)}
        onClick={onToggle}
      >
        <IconFunnel size="xs" className={css.iconFilter} />
      </button>
      <Tooltip
        isContentHoverable
        isVisible={isOpened}
        className={classnames(css.tooltip, themeColorDisplay)}
        anchorRef={buttonRef}
        possibleDirections={['downRight', 'downLeft']}
        direction="downRight"
        withArrow={false}
        ref={tooltipRef}
      >
        <Text tag="div" size="xs" view="primary" className={css.title}>
          Фильтровать по условию
        </Text>
        <MultiSelect
          name={field}
          menuRef={menuRef}
          wpSize="xs"
          onChange={v => onChange(field, v || [])}
          onClearValue={() => onChange(field, [])}
          placeholder="Выберите пункт"
          options={[...options]}
          value={values ? [...values] : undefined}
          isHierarchical={false}
        />
      </Tooltip>
    </>
  )
}
