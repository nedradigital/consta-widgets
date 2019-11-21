import { useRef } from 'react'

import { calcSize } from '@gaz/utils/lib/css'
import useComponentSize from '@rehooks/component-size'
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

const pyramidWidth = 312
const sectionHeight = 45
const sectionTextWidth = 300

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

const buildTriangleSectionPath = (
  data: readonly Data[],
  height: number,
  width: number,
  isGradient: boolean,
  colors: readonly string[]
) => {
  const fillBlackSemi = 'rgba(0,0,0,.5)'

  return getLineCoords(data.length, height, width, isGradient).map((item, index) => (
    <path key={index} d={`M${item}`} fill={isGradient ? fillBlackSemi : colors[index]} />
  ))
}

export const PyramidChart: React.FC<Props> = ({
  data,
  colors,
  constraint = true,
  fontSize = 's',
}) => {
  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  const containerHeightResponsive = calcSize(data.length * sectionHeight)
  const tableWidthResponsive = calcSize(
    constraint ? pyramidWidth : pyramidWidth / 2 + sectionTextWidth
  )

  return (
    <div className={classnames(css.main, { s: css.sizeS, m: css.sizeM }[fontSize])}>
      <div
        className={css.svgWrapper}
        ref={ref}
        style={{ width: calcSize(pyramidWidth), height: containerHeightResponsive }}
      >
        <svg width={calcSize(pyramidWidth)} height={containerHeightResponsive}>
          {buildTriangleSectionPath(data, height, width, false, colors)}
          {buildTriangleSectionPath(data, height, width, true, colors)}
        </svg>
      </div>
      <table
        className={css.table}
        style={{
          width: tableWidthResponsive,
          height: containerHeightResponsive,
        }}
      >
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ width: calcSize(pyramidWidth / 2) }}>{item.value}</td>
              <td>
                <div className={css.textEllipsis}>{item.text}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
