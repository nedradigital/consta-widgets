import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  children?: React.ReactNode
  className?: string
}

export const GeologicFeaturePlates: React.FC<Props> = ({ children, className }) => (
  <div className={classnames(css.geologicFeaturePlates, className)}>{children}</div>
)
