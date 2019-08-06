import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  className?: string
  children: React.ReactNode
}

export const Label = ({ className, children }: Props) => (
  <div className={classnames(css.label, className)}>{children}</div>
)
