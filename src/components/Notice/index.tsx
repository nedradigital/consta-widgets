import React from 'react'

import classnames from 'classnames'

import { ElementWithIcon } from '../ElementWithIcon'
import { Timer } from '../Timer'

import { ReactComponent as IconTime } from './images/time.svg'
import css from './index.css'

export type Props = {
  className?: string
  description?: string
  startTime?: number
  title?: string
}

export const Notice: React.FunctionComponent<Props> = ({
  className,
  description,
  startTime,
  title,
}) => (
  <div className={classnames(css.notice, className)}>
    {startTime && (
      <div className={css.timer}>
        <ElementWithIcon icon={<IconTime />} children={<Timer startTime={startTime} />} />
      </div>
    )}
    {title && <div className={css.title}>{title}</div>}
    {description && <div>{description}</div>}
  </div>
)
