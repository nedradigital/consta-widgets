import { isNil } from 'lodash'

import { classname } from '@/utils/classname'

import './index.css'

const cn = classname('progress-time-block-chart')

export type ProgressTimeChartProps = {
  progress?: number
}

export const ProgressTimeChart: React.FC<ProgressTimeChartProps> = ({ progress }) => (
  <div className={cn()}>
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 136" className={cn('svg')}>
      <circle className={cn('svg-bg')} strokeWidth="11" fill="none" r="57" cy="68" cx="68" />

      {!isNil(progress) && (
        <circle
          className={cn('svg-line')}
          strokeWidth="11"
          strokeDasharray={`${(360 * progress) / 100} ${360 - (360 * progress) / 100}`}
          strokeDashoffset="90"
          fill="none"
          r="57"
          cy="68"
          cx="68"
        />
      )}
    </svg>
    <span className={cn('value')}>{isNil(progress) ? '--' : progress}%</span>
  </div>
)
