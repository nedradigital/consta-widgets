import css from './index.css'

type Coords = {
  xPercent: number
  yPercent: number
}

type Props = {
  size: number
  points: readonly Coords[]
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
    <g>
      <path
        d={linePathD}
        className={css.line}
        style={{
          stroke: lineColor,
          fill: withFill ? lineColor : 'transparent',
        }}
      />
      {points.map((point, idx) => {
        return (
          <circle
            style={{ fill: lineColor }}
            key={idx}
            cx={`${point.xPercent}%`}
            cy={`${point.yPercent}%`}
            r={2}
          />
        )
      })}
    </g>
  )
}
