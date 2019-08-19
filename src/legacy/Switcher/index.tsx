import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  title?: React.ReactNode
  isEnabled: boolean
  onClick: (value: boolean) => void
}

export const Switcher = ({ onClick, isEnabled, title }: Props) => (
  <button
    type="button"
    className={classnames(css.switcher, { [css.isEnabled]: isEnabled })}
    onClick={() => onClick && onClick(!isEnabled)}
  >
    {title && <span className={css.title}>{title}</span>}
    <span className={css.wrapper}>
      <span className={css.icon} />
    </span>
  </button>
)
