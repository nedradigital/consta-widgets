import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export const sizes = ['small', 'big'] as const
export type Size = typeof sizes[number]

type Props = {
  size?: Size
  className?: string
  children: React.ReactNode
}

export const Title: React.FC<Props> = ({ children, size = 'small', className }) => (
  <div className={classnames(css.title, css[size], className)}>{children}</div>
)
