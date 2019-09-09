import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  className?: string
  children: React.ReactNode
  position?: 'left' | 'right'
  status?: 'danger' | 'warning'
  skin?: 'inside' | 'outside'
  title?: string
}

export const Pin: React.FC<Props> = ({
  className,
  children,
  position = 'left',
  status,
  skin = 'inside',
  title,
}) => (
  <div
    className={classnames([
      css.pin,
      status &&
        {
          danger: css.statusDanger,
          warning: css.statusWarning,
        }[status],
      {
        left: css.positionLeft,
        right: css.positionRight,
      }[position],
      {
        outside: css.skinOutside,
        inside: null,
      }[skin],
      className,
    ])}
  >
    <span className={css.edge} />
    <div className={css.content}>
      {title && <div className={css.title}>{title}</div>}
      <div>{children}</div>
    </div>
  </div>
)
