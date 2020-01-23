import { getCalculatedSize } from '@gaz/utils/lib/css'
import classnames from 'classnames'
import * as d3 from 'd3'

import { ColorGroups } from '@/dashboard/types'

import { Data, getGroupScale, Orientation, Size } from '../../'

import css from './index.css'

type ValueFiltered = {
  colorGroupName: string
  value: number
}

type Props = {
  data: Data
  groupScale: d3.ScaleBand<string>
  valuesScale: d3.ScaleLinear<number, number>
  colorGroups: ColorGroups
  clipId: string
  orientation: Orientation
  size: Size
  showValues?: boolean
}

const getBarClassName = ({
  isHorizontal,
  isNegative,
  size,
}: {
  isHorizontal: boolean
  isNegative: boolean
  size: Size
}) => {
  return classnames(
    css.bar,
    isHorizontal && isNegative && css.borderLeft,
    isHorizontal && !isNegative && css.borderRight,
    !isHorizontal && isNegative && css.borderBottom,
    !isHorizontal && !isNegative && css.borderTop,
    size === 'm' && css.sizeM
  )
}

const getTransformTranslate = (x: number, y: number) => `translate(${x},${y})`

const getColumnWidth = (size: Size) => {
  if (size === 's') {
    return getCalculatedSize(4)
  }

  return getCalculatedSize(12)
}
const getColumnPadding = () => getCalculatedSize(4)

export const Bar: React.FC<Props> = ({
  data,
  groupScale,
  valuesScale,
  colorGroups,
  clipId,
  orientation,
  size,
  showValues,
}) => {
  const { label, values } = data
  const valuesFiltered = values.filter((v): v is ValueFiltered => v.value !== undefined)
  const columnWidth = getColumnWidth(size)
  const columnPadding = getColumnPadding()
  const halfColumnPadding = columnPadding / 2
  const isHorizontal = orientation === 'horizontal'

  const barDomains = valuesFiltered.length ? valuesFiltered.map(item => item.colorGroupName) : []
  const groupSize = (columnWidth + columnPadding) * valuesFiltered.length
  const barScale = getGroupScale(barDomains, groupSize, orientation)
  const textShiftY = barScale.bandwidth() / 2
  const zeroPoint = Math.ceil(valuesScale(0))

  const getBarHeight = (d: ValueFiltered) => {
    return Math.abs(zeroPoint - Math.floor(valuesScale(d.value)))
  }

  const getRectPositionByAxis = (item: ValueFiltered, axis: 'x' | 'y') => {
    const isAxisX = axis === 'x'
    const isAxisY = axis === 'y'

    if ((!isHorizontal && isAxisX) || (isHorizontal && isAxisY)) {
      return barScale(item.colorGroupName) || 0
    }

    if ((item.value > 0 && isAxisX) || (item.value < 0 && isAxisY)) {
      return zeroPoint
    }

    return Math.floor(valuesScale(item.value))
  }

  const getTextPositionOnX = (value: number, width: number) => {
    return value < 0 ? zeroPoint - width - columnPadding : zeroPoint + width + columnPadding
  }

  const translateOffset = groupScale.bandwidth() / 2 - (groupSize - columnPadding) / 2
  const translateLength = (groupScale(label) || 0) + translateOffset
  const transform = isHorizontal
    ? getTransformTranslate(0, translateLength)
    : getTransformTranslate(translateLength, 0)

  const items = valuesFiltered.map(d => ({
    value: d.value,
    color: colorGroups[d.colorGroupName],
    width: isHorizontal ? getBarHeight(d) : columnWidth,
    height: isHorizontal ? columnWidth : getBarHeight(d),
    x: getRectPositionByAxis(d, 'x'),
    y: getRectPositionByAxis(d, 'y'),
    isNegative: d.value < 0,
  }))

  return (
    <g>
      <g clipPath={`url(#${clipId})`} transform={transform}>
        {items.map(({ x, y, width, height, isNegative, color }) => (
          <foreignObject key={color} x={x} y={y} width={width} height={height}>
            <div
              className={getBarClassName({ isHorizontal, isNegative, size })}
              style={{ backgroundColor: color }}
            />
          </foreignObject>
        ))}
      </g>
      {isHorizontal && showValues && (
        <g transform={transform}>
          {items.map(d => {
            const x = getTextPositionOnX(d.value, d.width)
            const y = d.y + halfColumnPadding
            const textAnchor = d.isNegative ? 'end' : 'start'

            return (
              <text
                key={d.color}
                className={css.label}
                x={x}
                y={y}
                dy={textShiftY}
                textAnchor={textAnchor}
              >
                {d.value}
              </text>
            )
          })}
        </g>
      )}
    </g>
  )
}
