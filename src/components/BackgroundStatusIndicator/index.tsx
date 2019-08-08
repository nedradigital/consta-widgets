import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export const statuses = ['danger', 'important', 'warning'] as const
type Status = typeof statuses[number]

type Props = {
  className?: string
  status: Status
  styles?: React.CSSProperties
}

/** Фон под цвет статуса */
export const BackgroundStatusIndicator: React.FC<Props> = ({ className, status, styles = {} }) => (
  <div className={classnames(css.main, css[status], className)} style={styles} />
)
