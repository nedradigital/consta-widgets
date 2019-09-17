import React from 'react'

import classnames from 'classnames'
import { isNil } from 'lodash'

import { Badge } from '@/ui/Badge'

import { KPIChart, Status } from '../KPIChart'

import css from './index.css'

type Props = {
  className?: string
  deviation?: number
  factData?: readonly number[] | number
  factValue?: number
  legend?: readonly number[]
  planData?: readonly number[] | number
  planValue?: number
  status?: Status
  title?: string
  unit?: string
}

export const KPIBlock: React.FC<Props> = ({
  className,
  deviation,
  factData,
  factValue,
  legend,
  planData,
  planValue,
  title,
  unit,
  status,
}) => (
  <div className={classnames(css.kpiBlock, className)}>
    <div className={css.title}>{title || '--'}</div>
    <div className={css.indicators}>
      <div className={classnames(css.indicator, css.isFact)}>
        <div className={css.valueLine}>
          <span className={css.value}>{isNil(factValue) ? '--' : factValue.toFixed(1)}</span>
          {!isNil(deviation) && (
            <Badge className={css.deviation} status={status}>
              {deviation}%
            </Badge>
          )}
        </div>
        <div className={css.valueName}>Факт</div>
      </div>
      <div className={classnames(css.indicator, css.isPlan)}>
        <div className={css.valueLine}>
          <span className={css.value}>{isNil(planValue) ? '--' : planValue.toFixed(1)}</span>
        </div>
        <div className={css.valueName}>План</div>
      </div>
    </div>
    <div className={css.chart}>
      <KPIChart factData={factData} planData={planData} status={status} />
      {!isNil(unit) && <div className={css.unit}>{unit}</div>}
    </div>
    {!isNil(legend) && Boolean(legend.length) && (
      <div className={css.legend}>
        {legend.map(value => (
          <span key={value} className={css.legendItem}>
            {value}
          </span>
        ))}
      </div>
    )}
  </div>
)
