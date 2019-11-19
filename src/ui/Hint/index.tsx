import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export type Direction = 'top' | 'left' | 'bottom' | 'right'

type Props = {
  children: React.ReactNode
  /** В какую сторону открывается */
  direction?: Direction
  styles?: React.CSSProperties
  className?: string
  containerRef?: React.Ref<HTMLDivElement>
}

export const Hint: React.FC<Props> = ({
  children,
  direction = 'bottom',
  styles,
  className,
  containerRef,
}) => (
  <div
    ref={containerRef}
    className={classnames(css.hint, css[direction], className)}
    style={styles}
  >
    {children}
  </div>
)
