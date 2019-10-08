import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export const types = ['dot', 'line'] as const
export type Type = typeof types[number]

export const positions = ['top', 'left'] as const
export type Position = typeof positions[number]

export const sizes = ['s', 'm'] as const
export type Size = typeof sizes[number]

type Props = {
  text: string
  color: string
  fontSize: Size
  type: Type
  position?: Position
  lineBold?: boolean
  className?: string
}

export const LegendItem: React.FC<Props> = ({
  type,
  position = 'left',
  text,
  color,
  lineBold,
  fontSize,
  className,
}) => {
  const sizeTextClass = { s: css.sizeS, m: css.sizeM }[fontSize]
  const positionClass = type === 'dot' ? css.left : css[position]

  return (
    <div className={classnames(css.main, positionClass, sizeTextClass, className)}>
      <div className={classnames(css[type], lineBold && css.bold)} style={{ background: color }} />
      <div className={classnames(css.text)}>{text}</div>
    </div>
  )
}
