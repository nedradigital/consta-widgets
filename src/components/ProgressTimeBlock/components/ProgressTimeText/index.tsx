import { isNil } from 'lodash'

import { classname } from '@/utils/classname'

import './index.css'

const cn = classname('progress-time-block-text')

export const statuses = ['danger', 'normal', 'warning'] as const

type ProgressTimeTextProps = {
  name: 'hse' | 'recommendations' | 'recommendations-refused' | 'deviation'
  value?: number
  unit: 'дн' | 'принято' | 'отклонено'
  title?: string
  status?: typeof statuses[number]
}

export const ProgressTimeText: React.FC<ProgressTimeTextProps> = ({
  name,
  value,
  unit,
  title,
  status,
}) => (
  <div className={cn(null, { name })}>
    {title && <div className={cn('title', { status })}>{title}</div>}
    <div className={cn('value-item')}>
      <span className={cn('value')}>{isNil(value) ? '--' : value}</span>{' '}
      <span className={cn('units')}>{unit}</span>
    </div>
  </div>
)
