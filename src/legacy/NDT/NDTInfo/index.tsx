import * as React from 'react'

import classnames from 'classnames'
import { isNil, round, sum } from 'lodash'

import { getHourPlural } from '@/utils/pluralization'

import { NDTTable } from '../NDTTable'

import css from './index.css'

type npvItemType = {
  /** Аварии [час] */
  accident?: number

  /** Простой [час] */
  downtime?: number

  /** Геология [час] */
  geology?: number

  /** Метео [час] */
  meteo?: number

  /** Ремонт [час] */
  repair?: number

  /** Ликвидация брака [час] */
  throwaway?: number

  /** Осложнения [час] */
  trouble?: number
}

type NDTInfoPropsType = {
  className?: string
  currentDay?: number
  npvList?: npvItemType[]
}

const getTotalHours = (days?: npvItemType[]): number | null => {
  if (isNil(days) || !days.length) {
    return null
  }

  return days.reduce((acc, day) => acc + sum(Object.values(day)), 0)
}

const getTotalInPercents = (totalHours: number | null, currentDay?: number) => {
  if (isNil(totalHours) || isNil(currentDay)) {
    return null
  }

  return Math.max(0, Math.min(100, round((totalHours / (currentDay * 24)) * 100, 1)))
}

export const NDTInfo: React.FC<NDTInfoPropsType> = ({ className, currentDay, npvList }) => {
  const totalHours = getTotalHours(npvList)
  const totalInPercent = getTotalInPercents(totalHours, currentDay)

  return (
    <div className={classnames(css.main, className)}>
      <NDTTable className={css.table} currentDay={currentDay} npvList={npvList} />
      <div className={css.hours}>
        {getHourPlural(isNil(totalHours) ? '--' : totalHours.toFixed(1))}
      </div>
      <div className={css.percents}>
        {isNil(totalInPercent) ? '--' : totalInPercent.toFixed(1)}% от общего времени
      </div>
    </div>
  )
}
