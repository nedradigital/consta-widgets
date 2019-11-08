import { Hint } from '@/ui/Hint'

import { Point } from '../../'

import css from './index.css'

type Props = {
  points: readonly Point[]
  lineColor: string
}

export const RadarChartPoints: React.FC<Props> = ({ points, lineColor }) => {
  return (
    <>
      {points.map((point, idx) => (
        <div
          key={idx}
          className={css.point}
          style={{
            color: lineColor,
            top: `${point.yPercent}%`,
            left: `${point.xPercent}%`,
          }}
        >
          <Hint className={css.hint} direction="top">
            {point.label}
          </Hint>
        </div>
      ))}
    </>
  )
}
