import * as React from 'react'

import classnames from 'classnames'
import { isNil, round } from 'lodash'

import { npvDayType } from '../NDTBlock'

import css from './index.css'

type Props = {
  className?: string
  npvList?: npvDayType[]
  currentDay?: number
}

const typesList = [
  {
    type: 'accident',
    name: 'Аварии',
  },
  {
    type: 'trouble',
    name: 'Осложнения',
  },
  {
    type: 'geology',
    name: 'Геология',
  },
  {
    type: 'throwaway',
    name: 'Ликв.Брака',
  },
  {
    type: 'downtime',
    name: 'Простои',
  },
  {
    type: 'meteo',
    name: 'Метео',
  },
  {
    type: 'repair',
    name: 'Ремонт',
  },
]

const getTotalHoursByType = (days?: npvDayType[], type?: string) => {
  if (isNil(days) || !days.length || !type) {
    return null
  }

  return days.reduce((acc, day) => acc + (day[type] || 0), 0)
}

const getTotalInPercents = (totalHours?: number | null, currentDay?: number) => {
  if (isNil(totalHours) || isNil(currentDay)) {
    return null
  }

  return Math.max(0, Math.min(100, round((totalHours / (currentDay * 24)) * 100, 1)))
}

export const NDTTable: React.FC<Props> = ({ className, currentDay, npvList }) => (
  <div className={classnames(css.main, className)}>
    <div className={css.rowTitle}>
      <div>НПВ</div>
      <div>Часы</div>
    </div>
    {typesList.map(({ type, name }, index) => {
      const totalHours =
        npvList && npvList.length
          ? getTotalHoursByType(currentDay ? npvList.slice(0, currentDay) : npvList, type)
          : null
      const totalInPercents = getTotalInPercents(totalHours, currentDay)

      return (
        <div className={css.row} key={index}>
          <span
            className={css.progress}
            style={{ width: `${isNil(totalInPercents) ? 0 : totalInPercents}%` }}
          />
          <div className={css.cellName}>{name}</div>
          <div className={css.cellPercent}>
            {isNil(totalInPercents) ? '--' : totalInPercents.toFixed(1)}%
          </div>
          <div className={css.cellHours}>{isNil(totalHours) ? '--' : totalHours.toFixed(1)}</div>
        </div>
      )
    })}
  </div>
)
