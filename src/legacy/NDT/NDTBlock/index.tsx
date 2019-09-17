import * as React from 'react'

import { isNil } from 'lodash'

import { ChartPopup, ChartWithSubinfo } from '@/legacy/ChartWithSubinfo'
import { getDayPlural } from '@/utils/pluralization'

import { NDTChart } from '../NDTChart'
import { NDTInfo } from '../NDTInfo'
import { NDTTable } from '../NDTTable'

import css from './index.css'

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
  npvList?: readonly npvDayType[]
  selectedDay?: number
  setDay?: () => void
  clearDay?: () => void
}

export const NDTBlock: React.FC<NDTBlockPropsType> = ({
  className,
  currentDay,
  npvList,
  selectedDay,
  setDay,
  clearDay,
}) => (
  <ChartWithSubinfo
    className={className}
    chartComponent={
      <NDTChart
        className={css.chart}
        currentDay={currentDay}
        npvList={npvList}
        onDayHover={setDay}
        selectedDay={selectedDay}
      />
    }
    subinfoComponent={<NDTInfo currentDay={currentDay} npvList={npvList} />}
    chartPopupComponent={
      !isNil(selectedDay) &&
      selectedDay > 0 && (
        <ChartPopup
          title={getDayPlural(selectedDay)}
          onCloseButtonClick={clearDay}
          selectedDay={selectedDay}
          daysCount={Math.max(0, currentDay || 0, (npvList || []).length)}
        >
          <NDTTable className={css.popupBody} currentDay={selectedDay} npvList={npvList} />
        </ChartPopup>
      )
    }
    chartName="НПВ"
    chartUnits="Часы"
  />
)
