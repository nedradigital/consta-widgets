import { Point } from '../../'

import css from './index.css'

type Props = {
  size: number
  points: readonly Point[]
  lineColor: string
  withFill: boolean
}

export const RadarChartFigure: React.FC<Props> = ({ size, points, lineColor, withFill }) => {
  const linePathD =
    points
      .map((point, idx) =>
        [
          idx === 0 ? 'M' : 'L',
          (point.xPercent / 100) * size,
          ' ',
          (point.yPercent / 100) * size,
        ].join('')
      )
      .join(' ') + ' Z'

  return (
    <path
      d={linePathD}
      className={css.line}
      style={{
        stroke: lineColor,
        fill: withFill ? lineColor : 'transparent',
      }}
    />
  )
}
