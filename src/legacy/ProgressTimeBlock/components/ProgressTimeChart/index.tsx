import { isNil } from 'lodash'

import css from './index.css'

export type Props = {
  progress?: number
}

export const ProgressTimeChart: React.FC<Props> = ({ progress }) => (
  <div className={css.main}>
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 136" className={css.svg}>
      <circle className={css.svgBg} strokeWidth="11" fill="none" r="57" cy="68" cx="68" />

      {!isNil(progress) && (
        <circle
          className={css.svgLine}
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
    <span className={css.value}>{isNil(progress) ? '--' : progress}%</span>
  </div>
)
