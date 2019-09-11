import * as React from 'react'

import classnames from 'classnames'
import isNil from 'lodash/isNil'
import round from 'lodash/round'

import { ElementWithIcon } from '@/legacy/ElementWithIcon'
import { ProgressLine } from '@/legacy/ProgressLine'

import { ReactComponent as IconCalendar } from './icons/calendar.svg'
import { ReactComponent as IconLiquid } from './icons/liquid.svg'
import { ReactComponent as IconMoneySign } from './icons/money-sign.svg'
import { ReactComponent as IconSpeedometer } from './icons/speedometer.svg'
import css from './index.css'

const statuses = ['normal', 'danger', 'warning'] as const
type Status = typeof statuses[number]

type Props = {
  className?: string
  /** Фактическая стоимость строительства */
  factCost: number
  /** Прогресс строительства (%) */
  progress?: number
  costStatus?: Status
  planDaysStatus?: Status
  /** Текущий день строительства */
  currentDay?: number
  /** Плановое время строительства (сутки) */
  planDaysCount?: number
  /** Удельное вермя строительства */
  specificDrillingTime?: number
  drillingTimeStatus?: Status
  /** Потенциальный дебит скважины */
  debit?: number
}

export const WellKPI: React.FC<Props> = React.memo(
  ({
    className,
    costStatus,
    currentDay,
    debit,
    drillingTimeStatus,
    factCost,
    planDaysCount,
    planDaysStatus,
    specificDrillingTime,
    progress = 0,
  }) => (
    <div className={classnames(css.main, className)}>
      <ElementWithIcon
        icon={
          <ProgressLine progress={isNil(progress) ? 0 : progress} type="line" status="normal" />
        }
      >
        {isNil(progress) ? '--' : `${progress}%`}
      </ElementWithIcon>
      <ElementWithIcon icon={<IconCalendar />} color={planDaysStatus}>
        {isNil(currentDay) ? '--' : currentDay} / {isNil(planDaysCount) ? '--' : planDaysCount} дн.
      </ElementWithIcon>

      <ElementWithIcon icon={<IconSpeedometer />} color={drillingTimeStatus}>
        {isNil(specificDrillingTime) ? '--' : specificDrillingTime} сут/1000м
      </ElementWithIcon>

      <ElementWithIcon icon={<IconMoneySign />} color={costStatus}>
        {isNil(factCost) ? '--' : round(factCost / 1000000, 1)} млн.
      </ElementWithIcon>

      <ElementWithIcon icon={<IconLiquid />} color={debit ? 'normal' : undefined}>
        {isNil(debit) ? '--' : debit} m<sup>3</sup>
      </ElementWithIcon>
    </div>
  )
)
