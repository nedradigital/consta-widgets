import React from 'react'

import { classname } from '@/utils/classname'

import { ElementWithIcon } from '../ElementWithIcon'
import { Timer } from '../Timer'

import { ReactComponent as IconTime } from './images/time.svg'
import './index.css'

const cn = classname('notice')

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
  <div className={cn(null, null, className)}>
    {startTime && (
      <div className={cn('timer')}>
        <ElementWithIcon icon={<IconTime />} children={<Timer startTime={startTime} />} />
      </div>
    )}
    {title && <div className={cn('title')}>{title}</div>}
    {description && <div className={cn('description')}>{description}</div>}
  </div>
)
