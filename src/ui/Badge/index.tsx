import React from 'react'

import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import css from './index.css'

export const statuses = ['danger', 'normal', 'warning', 'empty'] as const
export type Status = typeof statuses[number]

export type BadgeSize = 'xs' | 'l' | 'xl' | '2xl'

const sizeClasses: Record<BadgeSize, string> = {
  xs: css.sizeXS,
  l: css.sizeL,
  xl: css.sizeXL,
  '2xl': css.size2XL,
}

type Props = {
  size: BadgeSize
  className?: string
  status?: Status
  children?: React.ReactNode
}

export const Badge: React.FC<Props> = ({ className, size, status, children }) => (
  <Text
    tag="span"
    size={size}
    weight="bold"
    view={status === 'empty' ? 'secondary' : 'primary'}
    className={classnames(css.badge, status && css[status], sizeClasses[size], className)}
  >
    {children}
  </Text>
)
