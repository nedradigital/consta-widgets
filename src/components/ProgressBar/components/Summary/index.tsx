import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export type Props = {
  color?: string
  summary: string | number
  hasCaption?: boolean
}

export const Summary: React.FC<Props> = ({ color = '#FFBA3B', summary, hasCaption }) => {
  return (
    <div className={classnames(css.summary, hasCaption && css.hasCaption)} style={{ color }}>
      {summary}
    </div>
  )
}
