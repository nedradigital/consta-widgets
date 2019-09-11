import { isNil } from 'lodash'

import { ReactComponent as IconFlag } from './images/flag.svg'
import css from './index.css'

export type Props = {
  /** Текущий день строительства скважины */
  currentDay?: number
  endDate?: string
  /** Плановое время строительства (сутки) */
  planDaysCount?: number
}

export const ProgressTimeDate: React.FC<Props> = ({ currentDay, endDate, planDaysCount }) => (
  <>
    <div className={css.currentDay}>
      День {isNil(currentDay) ? '--' : currentDay} / {isNil(planDaysCount) ? '--' : planDaysCount}
    </div>
    <div className={css.content}>
      <IconFlag className={css.icon} />
      <span className={css.value}>{endDate}</span>
    </div>
  </>
)
