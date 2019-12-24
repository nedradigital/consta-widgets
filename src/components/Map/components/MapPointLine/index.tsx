import classnames from 'classnames'
import * as d3 from 'd3'
import { LineString } from 'geojson'

import { Coords } from '../../'

import css from './index.css'

type Props = {
  from: Coords
  to: Coords
  geoPath: d3.GeoPath
  isAnimating: boolean
  delay: number
  duration: number
}

export const MapPointLine: React.FC<Props> = ({
  from,
  to,
  geoPath,
  isAnimating,
  delay,
  duration,
}) => {
  const lineString: d3.ExtendedFeature<LineString> = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[...to], [...from]],
    },
    properties: {},
  }
  const d = geoPath(lineString)
  const measure = geoPath.measure(lineString)

  return d ? (
    <g>
      <path d={d} className={css.line} />
      <path
        d={d}
        className={classnames(css.line, css.isAnimated)}
        style={{
          ['--line-length' as string]: measure,
          animation: isAnimating ? undefined : 'none',
          animationDelay: isAnimating ? `${delay}ms` : undefined,
          animationDuration: isAnimating ? `${duration}ms` : undefined,
        }}
      />
    </g>
  ) : null
}
