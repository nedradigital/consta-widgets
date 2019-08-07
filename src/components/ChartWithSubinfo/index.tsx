import * as React from 'react'

import classnames from 'classnames'

import css from './index.css'

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

export const ChartWithSubinfo: React.FC<ChartWithSubinfoPropsType> = ({
  chartComponent,
  chartName,
  chartPopupComponent,
  chartUnits,
  className,
  subinfoComponent,
}) => (
  <div className={classnames(css.main, className)}>
    <div className={css.wrapper}>
      <div className={css.infoLine}>
        <div className={css.title}>{chartName}</div>
        <div className={css.units}>{chartUnits}</div>
      </div>
      <div>{chartComponent}</div>
      {chartPopupComponent && <div className={css.popupWrapper}>{chartPopupComponent}</div>}
    </div>

    <div className={css.subinfoWrapper}>{subinfoComponent}</div>
  </div>
)
