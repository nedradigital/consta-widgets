import css from './index.css'

type Coords = {
  xPercent: number
  yPercent: number
}

type Props = {
  color: string
  size: number
  points: readonly Coords[]
}

export const RadarChartFigure: React.FC<Props> = ({ size, color, points }) => {
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
    <g style={{ color }}>
      <path d={linePathD} className={css.line} />
      {points.map((point, idx) => {
        return (
          <circle
            className={css.point}
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
