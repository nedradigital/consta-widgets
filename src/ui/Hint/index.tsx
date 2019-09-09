import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  children: React.ReactNode
  agle?: 'top' | 'left' | 'bottom' | 'right'
  styles?: React.CSSProperties
  className?: string
}

export const Hint: React.FC<Props> = ({ children, agle = 'bottom', styles, className }) => (
  <div className={classnames(css.hint, css[agle], className)} style={styles}>
    {children}
  </div>
)
