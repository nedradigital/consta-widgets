import React from 'react'

import { getCalculatedSize } from '@gaz/utils/lib/css'
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

const getPyramidWidth = () => getCalculatedSize(312)
const getSectionHeight = () => getCalculatedSize(45)
const getSectionTextWidth = () => getCalculatedSize(300)

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
  const pyramidWidth = getPyramidWidth()
  const sectionHeight = getSectionHeight()
  const sectionTextWidth = getSectionTextWidth()
  const containerHeightResponsive = data.length * sectionHeight
  const pyramidWidthHalf = pyramidWidth / 2
  const tableWidthResponsive = constraint ? pyramidWidth : pyramidWidthHalf + sectionTextWidth

  return (
    <div className={classnames(css.main, { s: css.sizeS, m: css.sizeM }[fontSize])}>
      <div
        className={css.svgWrapper}
        style={{ width: pyramidWidth, height: containerHeightResponsive }}
      >
        <svg viewBox={`0 0 ${pyramidWidth} ${containerHeightResponsive}`}>
          {buildTriangleSectionPath(data, containerHeightResponsive, pyramidWidth, false, colors)}
          {buildTriangleSectionPath(data, containerHeightResponsive, pyramidWidth, true, colors)}
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
              <td style={{ width: pyramidWidthHalf }}>{item.value}</td>
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
