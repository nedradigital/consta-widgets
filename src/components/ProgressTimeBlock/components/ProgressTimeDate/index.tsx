import { isNil } from 'lodash'

import { classname } from '@/utils/classname'

import { ReactComponent as IconFlag } from './images/flag.svg'
import './index.css'

const cn = classname('progress-time-block-date')

export type ProgressTimeDateProps = {
  /** Текущий день строительства скважины */
  currentDay?: number
  endDate?: string
  /** Плановое время строительства (сутки) */
  planDaysCount?: number
}

export const ProgressTimeDate: React.FC<ProgressTimeDateProps> = ({
  currentDay,
  endDate,
  planDaysCount,
}) => (
  <>
    <div className={cn('current-day')}>
      День {isNil(currentDay) ? '--' : currentDay} / {isNil(planDaysCount) ? '--' : planDaysCount}
    </div>
    <div className={cn('content')}>
      <IconFlag className={cn('icon')} />
      <span className={cn('value')}>{endDate}</span>
    </div>
  </>
)
