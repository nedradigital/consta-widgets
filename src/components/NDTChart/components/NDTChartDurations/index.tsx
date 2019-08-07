import * as React from 'react'

type NDTChartDurationsProps = {
  durations: number[]
  selectedDuration: number
  maxDuration: number
  height: number
  hasValidData: boolean
}

import css from './index.css'

export const NDTChartDurations: React.FC<NDTChartDurationsProps> = ({
  hasValidData,
  durations,
  maxDuration,
  selectedDuration,
  height,
}) => {
  return (
    <div className={css.main}>
      <div className={css.content}>
        {hasValidData &&
          durations.map((duration, index) => {
            return (
              <div
                className={css.duration}
                key={index}
                style={{ left: (duration / maxDuration) * 100 + '%' }}
              >
                <span className={css.durationLabel}>{Math.round(duration)}</span>
              </div>
            )
          })}
        {hasValidData && (
          <div
            className={css.selected}
            style={{ left: (selectedDuration / maxDuration) * 100 + '%' }}
          >
            <div className={css.selectedLine} style={{ height }} />
            <div className={css.selectedLabel}>{Math.floor(selectedDuration)}</div>
          </div>
        )}
      </div>
    </div>
  )
}
