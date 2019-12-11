import React from 'react'

import classnames from 'classnames'

import { Size } from '@/components/ProgressBar'

import css from './index.css'

export type Props = {
  size?: Size
  color?: string
  summary: string | number
  hasCaption?: boolean
}

export const Summary: React.FC<Props> = ({
  size = 'm',
  color = '#FFBA3B',
  summary,
  hasCaption,
}) => {
  const sizeClass = { s: css.sizeS, m: css.sizeM, l: css.sizeL }[size]

  return (
    <div
      className={classnames(css.summary, sizeClass, hasCaption && css.hasCaption)}
      style={{ color }}
    >
      {summary}
    </div>
  )
}
