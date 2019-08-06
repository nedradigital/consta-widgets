import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export const colors = ['normal', 'danger', 'warning'] as const
type Color = typeof colors[number]

export const orders = ['normal', 'reverse'] as const
type Order = typeof orders[number]

type Props = {
  icon: React.ReactNode
  color?: Color
  order?: Order
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
  ]

  return (
    <div className={classnames(css.main, className)}>
      {order === 'reverse' ? items.reverse() : items}
    </div>
  )
}
