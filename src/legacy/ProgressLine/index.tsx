import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Progress = number

type Props = {
  className?: string
  children?: React.ReactNode
  progress: Progress
  status: 'danger' | 'normal' | 'warning'
  type: 'hollow' | 'line'
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
