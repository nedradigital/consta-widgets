import React from 'react'

import { Badge as UikitBadge, BadgeProps } from '@gpn-design/uikit/Badge'
import classnames from 'classnames'

import css from './index.css'

export type Status = BadgeProps['status']
export type Size = NonNullable<BadgeProps['size']>

const sizeClasses: Record<Size, string> = {
  s: css.sizeS,
  m: css.sizeM,
  l: css.sizeL,
}

// Обёртка над китовым виджетом, чтобы добавить поддержку скейлинга
// Избавимся в https://jira.csssr.io/browse/GDC-274
export const Badge: React.FC<BadgeProps & { children?: never }> = props => (
  <UikitBadge
    {...props}
    className={classnames(props.className, props.size && sizeClasses[props.size])}
  />
)
