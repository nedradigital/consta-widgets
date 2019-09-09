import React from 'react'

import classnames from 'classnames'
import { isNil, round } from 'lodash'

import { Badge } from '@/ui/Badge'

import css from './index.css'

type Props = {
  className?: string
  factCost?: number
  planCost?: number
  costDeviation: number
  percentCostDeviation: number
}

const getFormattedValue = (value: number) => Math.abs(round(value / 1000000, 1)).toFixed(1)

const getStatus = (percentGap: number) => {
  if (percentGap <= 5) {
    return 'normal'
  }

  return 'danger'
}

export const CostInfo: React.FC<Props> = ({
  className,
  factCost,
  planCost,
  costDeviation,
  percentCostDeviation,
}) => {
  const status = getStatus(percentCostDeviation)

  return (
    <div className={classnames(css.costInfo, className)}>
      {!isNil(costDeviation) && (
        <div className={css.statusLine}>
          {!isNil(percentCostDeviation) && (
            <Badge className={css.badge} status={status}>
              {Math.abs(percentCostDeviation).toFixed(1)}%
            </Badge>
          )}
          <div
            className={classnames(
              status &&
                {
                  normal: css.statusNormal,
                  danger: css.statusDanger,
                }[status]
            )}
          >
            {getFormattedValue(costDeviation)} млн ₽
          </div>
        </div>
      )}

      <div className={css.infoItem}>
        <div className={css.infoTitle}>
          {isNil(factCost) ? '--' : getFormattedValue(factCost)} млн ₽
        </div>
        <div className={css.lineDescription}>
          <div className={css.lineName}>Факт</div>
          <div className={classnames(css.line, css.lineFact)} />
        </div>
      </div>

      <div className={css.infoItem}>
        <div className={css.infoTitle}>
          {isNil(planCost) ? '--' : getFormattedValue(planCost)} млн ₽
        </div>
        <div className={css.lineDescription}>
          <div className={css.lineName}>План</div>
          <div className={classnames(css.line, css.linePlan)} />
        </div>
      </div>
    </div>
  )
}
