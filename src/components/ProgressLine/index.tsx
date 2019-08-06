import React from 'react'

import classnames from 'classnames'

import css from './index.css'

export const statuses = ['danger', 'normal', 'warning'] as const
type Status = typeof statuses[number]

export const types = ['hollow', 'line'] as const
type Type = typeof types[number]

type Progress = number

type Props = {
  className?: string
  children?: React.ReactNode
  progress: Progress
  status: Status
  type: Type
}

const normalizedProgress = (progress: Progress): Progress => Math.min(Math.max(progress, 0), 100)

export const ProgressLine: React.FC<Props> = ({
  children,
  className,
  progress,
  status = 'normal',
  type = 'line',
}) => (
  <div
    className={classnames([
      css.progressLine,
      {
        normal: css.statusNormal,
        danger: css.statusDanger,
        warning: css.statusWarning,
      }[status],
      {
        hollow: css.typeHollow,
        line: css.typeLine,
      }[type],
      className,
    ])}
  >
    <div className={css.progress} style={{ left: `${normalizedProgress(progress)}%` }} />
    {children && type === 'hollow' && <div className={css.content}>{children}</div>}
  </div>
)
