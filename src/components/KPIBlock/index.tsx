import React from 'react';

import { isNil } from 'lodash';

import { classname } from '../../utils/classname';
import { Badge } from '../Badge';
import { KPIChart, Status } from '../KPIChart';

import './styles.css';

type Props = {
  className?: string;
  deviation?: number;
  factData?: number[] | number;
  factValue?: number;
  legend?: number[];
  planData?: number[] | number;
  planValue?: number;
  status?: Status;
  title?: string;
  unit?: string;
  chartId: string;
};

const cn = classname('kpi-block');

export const KPIBlock = ({
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
  chartId,
}: Props) => (
  <div className={cn(null, null, className)}>
    <div className={cn('title')}>{title || '--'}</div>
    <div className={cn('indicators')}>
      <div className={cn('indicator', { fact: true })}>
        <div className={cn('value-line')}>
          <span className={cn('value')}>{isNil(factValue) ? '--' : factValue.toFixed(1)}</span>
          {!isNil(deviation) && (
            <Badge className={cn('deviation')} status={status}>
              {deviation}%
            </Badge>
          )}
        </div>
        <div className={cn('value-name')}>Факт</div>
      </div>
      <div className={cn('indicator', { plan: true })}>
        <div className={cn('value-line')}>
          <span className={cn('value')}>{isNil(planValue) ? '--' : planValue.toFixed(1)}</span>
        </div>
        <div className={cn('value-name')}>План</div>
      </div>
    </div>
    <div className={cn('chart')}>
      <KPIChart id={chartId} factData={factData} planData={planData} status={status} />
    </div>
    {!isNil(unit) && <div className={cn('unit')}>{unit}</div>}
    {!isNil(legend) && Boolean(legend.length) && (
      <div className={cn('legend')}>
        {legend.map(value => (
          <span key={value} className={cn('legend-item')}>
            {value}
          </span>
        ))}
      </div>
    )}
  </div>
);
