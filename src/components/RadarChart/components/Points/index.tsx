import classnames from 'classnames'

import { Hint } from '@/ui/Hint'

import { Point } from '../../'

import css from './index.css'

type Props = {
  points: readonly Point[]
  lineColor: string
  activeAxis: string
  backgroundColor: string
  isHoverable: boolean
}

export const RadarChartPoints: React.FC<Props> = ({
  points,
  lineColor,
  activeAxis,
  backgroundColor,
  isHoverable,
}) => {
  return (
    <>
      {points.map((point, idx) => {
        const isActive = activeAxis === point.axisName

        return (
          <div
            key={idx}
            className={classnames(
              css.point,
              isActive && css.isActive,
              isHoverable && css.isHoverable
            )}
            style={{
              color: lineColor,
              top: `${point.yPercent}%`,
              left: `${point.xPercent}%`,
              borderColor: backgroundColor,
            }}
          >
            <Hint className={classnames(css.hint, isHoverable && css.isHoverable)} direction="top">
              {point.label}
            </Hint>
          </div>
        )
      })}
    </>
  )
}
