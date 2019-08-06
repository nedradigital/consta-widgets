import * as React from 'react'

import { npvDayType } from '@/components/NDTBlock'

import { types } from '../../'

import css from './index.css'

type NDTChartBarProps = {
  maxDuration: number
  width: number
  height: number
  npvList?: npvDayType[]
}

export const NDTChartBar: React.FC<NDTChartBarProps> = ({
  maxDuration,
  width,
  height,
  npvList,
}) => {
  const sanitizedData = npvList ? npvList : []

  return (
    <div className={css.main} style={{ width, height }}>
      {types.map((type, index) =>
        sanitizedData.map((data, day) => {
          const value = data[type.name] || 0
          const bottom = Math.min(1, (types.length - index - 1) / types.length) * 100 + '%'
          const left = Math.min(1, day / maxDuration) * 100 + '%'
          const chartBarWidth = Math.min(1, 1 / maxDuration) * 100 + '%'
          const chartBarHeight = (Math.min(1, value / 24) / types.length) * 100 + '%'

          return (
            <div
              className={css.bar}
              key={index + '.' + day}
              style={{
                left: `calc(${left} + 1px)`,
                bottom,
                width: `calc(${chartBarWidth} - 1px)`,
                height: `calc(${chartBarHeight} - 1px)`,
              }}
            />
          )
        })
      )}
    </div>
  )
}
