import * as React from 'react'

import { isNil } from 'lodash'

import css from './index.css'

type ChartPopupPropsType = {
  children: React.ReactNode
  title?: React.ReactNode
  onCloseButtonClick?: () => void
  selectedDay?: number
  daysCount?: number
}

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
      className={css.chartPopup}
      style={
        offset <= 50
          ? { left: `calc(${offset}% + 10px)` }
          : { right: `calc(${100 - offset}% + 10px)` }
      }
    >
      {!isNil(onCloseButtonClick) && (
        <button className={css.closeButton} onClick={onCloseButtonClick} />
      )}
      {!isNil(title) && <div className={css.title}>{title}</div>}
      <div>{children}</div>
    </div>
  )
}
