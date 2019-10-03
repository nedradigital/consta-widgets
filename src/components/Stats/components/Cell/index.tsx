import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export type StyleProps = {
  type?: 'label' | 'sublabel'
}

type Props = {
  className?: string
  children: React.ReactNode
} & StyleProps

export const Cell: React.FC<Props> = ({ children, className, type = 'label' }) => (
  <span className={classnames(css[type], className)}>{children}</span>
)
