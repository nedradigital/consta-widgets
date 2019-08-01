import React from 'react'

import { classname } from '@/utils/classname'

import './index.css'

const cn = classname('progress-line')

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
  <div className={cn(null, { status, type }, className)}>
    <div className={cn('progress')} style={{ left: `${normalizedProgress(progress)}%` }} />
    {children && type === 'hollow' && <div className={cn('content')}>{children}</div>}
  </div>
)
