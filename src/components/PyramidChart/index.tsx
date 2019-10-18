import useDimensions from 'react-use-dimensions'

import { calcSize } from '@gaz/utils'
import classnames from 'classnames'

import css from './index.css'

export type Data = {
  text: string
  value: number
}

export const sizes = ['s', 'm'] as const
export type Size = typeof sizes[number]

type Props = {
  data: readonly Data[]
  colors: readonly string[]
  constraint?: boolean
  fontSize?: Size
}

const widthPyramid = 312

const getLineCoords = (
  countLines: number,
  height: number | undefined,
  width: number | undefined,
  isGradient: boolean
) => {
  if (!height || !width) {
    return []
  }

  const center = width / 2
  const widthPart = center / countLines
  const heightPart = height / countLines
  const startingPoint = isGradient ? 0 : 1

  return Array(countLines)
    .fill(null)
    .map((_, index) =>
      [
        [center - widthPart * index * startingPoint, heightPart * index].join(','),
        [center - widthPart * (index + 1) * startingPoint, heightPart * (index + 1)].join(','),
        [center + widthPart * (index + 1), heightPart * (index + 1)].join(','),
        [center + widthPart * index, heightPart * index].join(','),
      ].join('L')
    )
}

export const PyramidChart: React.FC<Props> = ({
  data,
  colors,
  constraint = true,
  fontSize = 's',
}) => {
  const [ref, { height, width }] = useDimensions()

  return (
    <div className={classnames(css.main, { s: css.sizeS, m: css.sizeM }[fontSize])}>
      <div className={css.svgWrapper} ref={ref} style={{ width: calcSize(widthPyramid) }}>
        <svg width={width} height={height}>
          {getLineCoords(data.length, height, width, false).map((item, index) => (
            <path key={index} d={`M${item}`} fill={colors[index]} />
          ))}
          {getLineCoords(data.length, height, width, true).map((item, index) => (
            <path key={index} d={`M${item}`} fill="rgba(0,0,0,.5)" />
          ))}
        </svg>
      </div>
      <table className={css.table} style={{ width: constraint ? calcSize(widthPyramid) : '100%' }}>
        <tbody>
          {data.map(item => (
            <tr key={item.value}>
              <td style={{ width: calcSize(widthPyramid / 2) }}>{item.value}</td>
              <td>{item.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
