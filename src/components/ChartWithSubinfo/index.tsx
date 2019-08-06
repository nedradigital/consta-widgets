import * as React from 'react'

import { classname } from '@/utils/classname'

import './index.css'

export { ChartPopup } from './components/ChartPopup'

type ChartWithSubinfoPropsType = {
  chartComponent: React.ReactNode
  chartName: string
  chartPopup?: React.ReactNode
  chartUnits: string
  className?: string
  subinfoComponent: React.ReactNode
  chartPopupComponent: React.ReactNode
}

const cn = classname('chart-with-subinfo')

export const ChartWithSubinfo: React.FC<ChartWithSubinfoPropsType> = ({
  chartComponent,
  chartName,
  chartPopupComponent,
  chartUnits,
  className,
  subinfoComponent,
}) => (
  <div className={cn(null, null, className)}>
    <div className={cn('chart-wrapper')}>
      <div className={cn('chart-info-line')}>
        <div className={cn('chart-title')}>{chartName}</div>
        <div className={cn('chart-units')}>{chartUnits}</div>
      </div>
      <div className={cn('chart')}>{chartComponent}</div>
      {chartPopupComponent && (
        <div className={cn('chart-popup-wrapper')}>{chartPopupComponent}</div>
      )}
    </div>

    <div className={cn('subinfo-wrapper')}>{subinfoComponent}</div>
  </div>
)
