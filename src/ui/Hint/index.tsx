import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export type Direction = 'top' | 'left' | 'bottom' | 'right'

type Props = {
  children: React.ReactNode
  /** В какую сторону открывается */
  direction?: Direction
  className?: string
  style?: React.CSSProperties
}

export const Hint = React.forwardRef<HTMLDivElement, Props>(
  ({ direction, className, ...props }, ref) => (
    <div
      ref={ref}
      className={classnames(css.hint, direction && css[direction], className)}
      {...props}
    />
  )
)
