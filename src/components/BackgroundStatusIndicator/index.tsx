import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  className?: string
  status: 'danger' | 'important' | 'warning'
  styles?: React.CSSProperties
}

/** Фон под цвет статуса */
export const BackgroundStatusIndicator: React.FC<Props> = ({ className, status, styles = {} }) => (
  <div className={classnames(css.main, css[status], className)} style={styles} />
)
