import * as React from 'react'

import { isNil } from 'lodash'

import { classname } from '@/utils/classname'

import './index.css'

type ChartWithSubinfoPropsType = {
  chartComponent: React.ReactNode
  chartName: string
  chartPopup?: React.ReactNode
  chartUnits: string
  className?: string
  subinfoComponent: React.ReactNode
  chartPopupComponent: React.ReactNode
}

type ChartPopupPropsType = {
  children: React.ReactNode
  title?: React.ReactNode
  onCloseButtonClick?: () => void
  selectedDay?: number
  daysCount?: number
}

const cn = classname('chart-with-subinfo')

const getOffset = (selectedDay?: number, daysCount?: number) => {
  if (isNil(selectedDay) || isNil(daysCount) || daysCount === 0) {
    return 0
  }

  if (selectedDay >= daysCount) {
    return 100
  }

  return (selectedDay / daysCount) * 100
}

export const ChartPopup: React.FC<ChartPopupPropsType> = ({
  children,
  title,
  onCloseButtonClick,
  selectedDay,
  daysCount,
}) => {
  const offset = getOffset(selectedDay, daysCount)
  return (
    <div
      className={cn('chart-popup')}
      style={
        offset <= 50
          ? { left: `calc(${offset}% + 10px)` }
          : { right: `calc(${100 - offset}% + 10px)` }
      }
    >
      {!isNil(onCloseButtonClick) && (
        <button className={cn('close-button')} onClick={onCloseButtonClick} />
      )}
      {!isNil(title) && <div className={cn('chart-popup-title')}>{title}</div>}
      <div className={cn('chart-popup-body')}>{children}</div>
    </div>
  )
}

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
