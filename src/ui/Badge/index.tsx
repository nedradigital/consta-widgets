import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export const statuses = ['danger', 'normal', 'warning', 'empty'] as const
export type Status = typeof statuses[number]

type Props = {
  className?: string
  status?: Status
  children?: React.ReactNode
}

export const Badge: React.FC<Props> = ({ className, status, children }) => (
  <span className={classnames(css.badge, status && css[status], className)}>{children}</span>
)
