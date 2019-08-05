import * as React from 'react'

import { isNil, round } from 'lodash'

import { classname } from '@/utils/classname'

import { npvDayType } from '../NDTBlock'

import './index.css'

type NDTTablePropsType = {
  className?: string
  npvList?: npvDayType[]
  currentDay?: number
}

const cn = classname('ndt-table')

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

  return days.reduce((acc: number, day: npvDayType) => acc + (day[type] || 0), 0)
}

const getTotalInPercents = (totalHours?: number | null, currentDay?: number) => {
  if (isNil(totalHours) || isNil(currentDay)) {
    return null
  }

  return Math.max(0, Math.min(100, round((totalHours / (currentDay * 24)) * 100, 1)))
}

export const NDTTable: React.FC<NDTTablePropsType> = ({ className, currentDay, npvList }) => (
  <div className={cn(null, null, className)}>
    <div className={cn('title-row')}>
      <div className={cn('title-cell')}>НПВ</div>
      <div className={cn('title-cell')}>Часы</div>
    </div>
    {typesList.map(({ type, name }, index) => {
      const totalHours =
        npvList && npvList.length
          ? getTotalHoursByType(currentDay ? npvList.slice(0, currentDay) : npvList, type)
          : null
      const totalInPercents = getTotalInPercents(totalHours, currentDay)

      return (
        <div className={cn('row')} key={index}>
          <span
            className={cn('progress')}
            style={{ width: `${isNil(totalInPercents) ? 0 : totalInPercents}%` }}
          />
          <div className={cn('cell', { name: true })}>{name}</div>
          <div className={cn('cell', { percent: true })}>
            {isNil(totalInPercents) ? '--' : totalInPercents.toFixed(1)}%
          </div>
          <div className={cn('cell', { hours: true })}>
            {isNil(totalHours) ? '--' : totalHours.toFixed(1)}
          </div>
        </div>
      )
    })}
  </div>
)
