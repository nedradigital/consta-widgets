import React from 'react'

import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'
import classnames from 'classnames'

import { useBaseSize } from '@/contexts/baseSize'

import css from './index.css'

export type Data = {
  text: string
  value: string | number | null | undefined
}

export const sizes = ['xs', 's', 'm'] as const
export type Size = typeof sizes[number]

type Props = {
  data: readonly Data[]
  colors: readonly string[]
  constraint?: boolean
  fontSize?: Size
}

const PYRAMID_WIDTH = 312
const SECTION_HEIGHT = 45
const SECTION_TEXT_WIDTH = 300

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

  return new Array(countLines)
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
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  const pyramidWidth = getCalculatedSizeWithBaseSize(PYRAMID_WIDTH)
  const sectionHeight = getCalculatedSizeWithBaseSize(SECTION_HEIGHT)
  const sectionTextWidth = getCalculatedSizeWithBaseSize(SECTION_TEXT_WIDTH)

  const containerHeightResponsive = data.length * sectionHeight
  const pyramidWidthHalf = pyramidWidth / 2
  const tableWidthResponsive = constraint ? pyramidWidth : '100%'

  const items = data.map(item => {
    const value = isNotNil(item.value) ? item.value : '–'

    return {
      text: item.text,
      value,
    }
  })

  return (
    <div
      className={classnames(
        css.main,
        { xs: css.sizeXS, s: css.sizeS, m: css.sizeM }[fontSize],
        constraint && css.isConstraint
      )}
    >
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
          minWidth: pyramidWidth,
          maxWidth: pyramidWidthHalf + sectionTextWidth,
          width: tableWidthResponsive,
          height: containerHeightResponsive,
        }}
      >
        <tbody>
          {items.map((item, index) => (
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
