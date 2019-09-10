import classnames from 'classnames'
import { isNil } from 'lodash'

import css from './index.css'

export const statuses = ['danger', 'normal', 'warning'] as const

type ProgressTimeTextProps = {
  name: 'hse' | 'recommendations' | 'recommendationsRefused' | 'deviation'
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
  <div className={classnames(css.main, css[name])}>
    {title && <div className={classnames(css.title, status && css[status])}>{title}</div>}
    <div className={css.valueItem}>
      <span className={css.value}>{isNil(value) ? '--' : value}</span>{' '}
      <span className={css.units}>{unit}</span>
    </div>
  </div>
)
