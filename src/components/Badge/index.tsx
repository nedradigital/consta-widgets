import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export const statuses = ['danger', 'normal', 'warning'] as const

type Props = {
  className?: string
  status?: typeof statuses[number]
  children?: React.ReactNode
}

export const Badge: React.FC<Props> = ({ className, status, children }) => (
  <span className={classnames(css.badge, status && css[status], className)}>{children}</span>
)
