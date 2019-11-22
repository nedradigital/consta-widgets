import classnames from 'classnames'

import { Hint } from '@/ui/Hint'

import { Point } from '../../'

import css from './index.css'

type Props = {
  points: readonly Point[]
  lineColor: string
  activeAxis: string
  backgroundColor: string
}

export const RadarChartPoints: React.FC<Props> = ({
  points,
  lineColor,
  activeAxis,
  backgroundColor,
}) => {
  return (
    <>
      {points.map((point, idx) => {
        const isActive = activeAxis === point.axisName

        return (
          <div
            key={idx}
            className={classnames(css.point, isActive && css.isActive)}
            style={{
              color: lineColor,
              top: `${point.yPercent}%`,
              left: `${point.xPercent}%`,
              borderColor: backgroundColor,
            }}
          >
            <Hint className={css.hint} direction="top">
              {point.label}
            </Hint>
          </div>
        )
      })}
    </>
  )
}
