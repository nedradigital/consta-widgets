import React from 'react'

import * as _ from 'lodash'

import css from './index.css'

export const VerticalTicks: React.FC<{
  minValue: number
  maxValue: number
  ticks: number
  precision?: number
  marginLeft?: number
}> = ({ minValue, maxValue, ticks, precision = 0, marginLeft }) => (
  <div className={css.main} style={{ marginLeft }}>
    {_.times(ticks, idx => minValue + idx * ((maxValue - minValue) / (ticks - 1))).map(
      (value, index) => (
        <div key={index} className={css.label}>
          {_.round(value, precision)}
        </div>
      )
    )}
  </div>
)
