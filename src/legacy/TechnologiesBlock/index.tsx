import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type TechnologiesBlockPropsType = {
  className?: string
  children: React.ReactNode
}

export const Separator = () => <div className={css.separator} />

export const TechnologiesBlock: React.FC<TechnologiesBlockPropsType> = ({
  children,
  className,
}) => <div className={classnames(css.block, className)}>{children}</div>
