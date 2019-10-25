import React from 'react'

import classnames from 'classnames'

import { Size } from '@/components/ProgressBar'

import css from './index.css'

export type Props = {
  size?: Size
  color?: string
  summary: string | number
}

export const Summary: React.FC<Props> = ({ size = 'm', color = '#FFBA3B', summary }) => {
  const sizeClass = { s: css.sizeS, m: css.sizeM, l: css.sizeL }[size]

  return (
    <div className={classnames(css.summary, sizeClass)} style={{ color }}>
      {summary}
    </div>
  )
}
