import * as React from 'react'

import { isNil } from 'lodash'

import { classname } from '@/utils/classname'
import { getDayPlural } from '@/utils/pluralization'

import { ChartPopup, ChartWithSubinfo } from '../ChartWithSubinfo'
import { NDTChart } from '../NDTChart'
import { NDTInfo } from '../NDTInfo'
import { NDTTable } from '../NDTTable'

import './index.css'

export type npvDayType = {
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

  [index: string]: any
}

type NDTBlockPropsType = {
  className?: string
  /** Текущий день строительства скважины */
  currentDay?: number
  npvList?: npvDayType[]
  selectedDay?: number
  setDay?: () => void
  clearDay?: () => void
}

const cn = classname('ndt-block')

export const NDTBlock: React.FC<NDTBlockPropsType> = ({
  className,
  currentDay,
  npvList,
  selectedDay,
  setDay,
  clearDay,
}) => (
  <ChartWithSubinfo
    className={cn(null, null, className)}
    chartComponent={
      <NDTChart
        className={cn('chart')}
        currentDay={currentDay}
        npvList={npvList}
        onDayHover={setDay}
        selectedDay={selectedDay}
      />
    }
    subinfoComponent={
      <NDTInfo className={cn('subinfo')} currentDay={currentDay} npvList={npvList} />
    }
    chartPopupComponent={
      !isNil(selectedDay) &&
      selectedDay > 0 && (
        <ChartPopup
          title={getDayPlural(selectedDay)}
          onCloseButtonClick={clearDay}
          selectedDay={selectedDay}
          daysCount={Math.max(0, currentDay || 0, (npvList || []).length)}
        >
          <NDTTable className={cn('popup-body')} currentDay={selectedDay} npvList={npvList} />
        </ChartPopup>
      )
    }
    chartName="НПВ"
    chartUnits="Часы"
  />
)
