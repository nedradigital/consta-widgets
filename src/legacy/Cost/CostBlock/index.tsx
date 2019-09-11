import React from 'react'

import classnames from 'classnames'
import { isNil } from 'lodash'

import { ChartPopup, ChartWithSubinfo } from '@/legacy/ChartWithSubinfo'
import { getDayPlural } from '@/utils/pluralization'

import { CostChart, Day } from '../CostChart'
import { CostInfo } from '../CostInfo'

import css from './index.css'

type Props = {
  className?: string
  currentDay?: number
  daysSummary?: Day[]
  selectedDay?: number
}

const getDaySummary = (day: number, daysSummary: Day[]) => {
  if (!daysSummary.length) {
    return {
      planCost: 0,
      factCost: 0,
      planCostTotal: 0,
      factCostTotal: 0,
      costDeviationTotal: 0,
      percentCostDeviation: 0,
    }
  }

  return daysSummary[day - 1] || {}
}

export const CostBlock: React.FC<Props> = ({
  className,
  currentDay = 0,
  daysSummary = [],
  selectedDay = 0,
}) => {
  const currentDaySammary = getDaySummary(currentDay, daysSummary)
  const selectedDaySammary = getDaySummary(selectedDay, daysSummary)

  return (
    <ChartWithSubinfo
      className={classnames(className)}
      chartComponent={
        <CostChart currentDay={currentDay} daysSummary={daysSummary} selectedDay={selectedDay} />
      }
      subinfoComponent={
        <CostInfo
          className={css.subinfo}
          factCost={currentDaySammary.factCostTotal}
          planCost={currentDaySammary.planCostTotal}
          costDeviation={currentDaySammary.costDeviationTotal}
          percentCostDeviation={currentDaySammary.percentCostDeviation}
        />
      }
      chartPopupComponent={
        !isNil(selectedDay) &&
        selectedDay > 0 && (
          <ChartPopup
            title={getDayPlural(selectedDay)}
            selectedDay={selectedDay}
            daysCount={Math.max(0, daysSummary.length, currentDay)}
          >
            <CostInfo
              className={css.popupBody}
              factCost={selectedDaySammary.factCostTotal}
              planCost={selectedDaySammary.planCostTotal}
              costDeviation={selectedDaySammary.costDeviationTotal}
              percentCostDeviation={selectedDaySammary.percentCostDeviation}
            />
          </ChartPopup>
        )
      }
      chartName="Затраты"
      chartUnits="Млн ₽"
    />
  )
}
