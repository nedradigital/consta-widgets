import React from 'react'

import classnames from 'classnames'
import { reverse } from 'lodash'

import css from './index.css'

type Props = {
  icon: React.ReactNode
  color?: 'normal' | 'danger' | 'warning'
  order?: 'normal' | 'reverse'
  children: React.ReactNode
  className?: string
}

export const ElementWithIcon: React.FC<Props> = ({
  children,
  icon,
  color,
  order = 'normal',
  className,
}) => {
  const items = [
    <span key="icon" className={classnames(css.icon, color && css[color])}>
      {icon}
    </span>,
    <span key="element">{children}</span>,
  ] as const

  return (
    <div className={classnames(css.main, className)}>
      {order === 'reverse' ? reverse(items) : items}
    </div>
  )
}
