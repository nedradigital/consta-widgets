import React from 'react'

import { useTheme } from '@gpn-design/uikit/Theme'
import classnames from 'classnames'

import { Popover, PositioningProps, Props as PopoverProps } from '@/Popover'

import css from './index.css'

export { Position, Direction } from '@/Popover'

const ARROW_SIZE = 6
const ARROW_OFFSET = 8

export const sizes = ['s', 'm', 'l'] as const

type Size = typeof sizes[number]

const sizeClasses: Record<Size, string> = {
  s: css.sizeS,
  m: css.sizeM,
  l: css.sizeL,
}

type Props = {
  size: Size
  children: React.ReactNode
} & Pick<PopoverProps, 'direction' | 'possibleDirections' | 'isInteractive' | 'onClickOutside'> &
  PositioningProps

export const Tooltip = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, size, ...rest } = props
  const { themeClassNames } = useTheme()

  return (
    <Popover arrowOffset={ARROW_OFFSET + ARROW_SIZE} offset={ARROW_SIZE + 4} {...rest}>
      {popoverDirection => (
        <div
          ref={ref}
          className={classnames(themeClassNames.color.invert, css.main, css[popoverDirection])}
          style={{
            ['--arrow-size' as string]: `${ARROW_SIZE}px`,
            ['--arrow-offset' as string]: `${ARROW_OFFSET}px`,
          }}
        >
          <div className={css.background} />
          <div className={css.arrow} />
          <div className={classnames(css.content, sizeClasses[size])}>{children}</div>
        </div>
      )}
    </Popover>
  )
})
