import React from 'react'

import classnames from 'classnames'

import { Badge, Status } from '@/ui/Badge'

import css from './index.css'

export const valueTypes = ['default', 'text'] as const
export type ValueType = typeof valueTypes[number]

export type Data = {
  status: Status
  text?: string
}

export const sizes = ['s', 'm'] as const
export type Size = typeof sizes[number]

type Props = {
  data: Data
  size?: Size
  type?: ValueType
}

export const TrafficLight: React.FC<Props> = ({ type = 'default', size = 's', data }) => {
  const { status, text } = data
  const sizeClass = { s: css.sizeS, m: css.sizeM }[size]

  if (type === 'default') {
    const statusClass = {
      normal: css.normal,
      warning: css.warning,
      danger: css.danger,
      empty: css.empty,
    }[status]

    return (
      <div className={classnames(css.background, sizeClass)}>
        <div className={classnames(css.foreground, statusClass)} />
      </div>
    )
  }

  return (
    <Badge className={classnames(css.text, sizeClass)} status={status}>
      {text}
    </Badge>
  )
}
