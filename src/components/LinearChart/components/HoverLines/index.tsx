import React from 'react'

import classnames from 'classnames'

import { Line, ScaleLinear } from '../..'

import css from './index.css'

export type Function = (line?: number) => void

type Props = {
  line: Line
  width: number
  height: number
  isVertical: boolean
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  setActiveHoverLine: Function
  activeHoverLine?: number
}

type LineProps = {
  position: Position
  lineClassName: string | boolean
  value?: number
  onMouseHandler: Function
}

type Position = {
  x1: number
  y1: number
  x2: number
  y2: number
}

const LineComponent: React.FC<LineProps> = ({ position, lineClassName, value, onMouseHandler }) => {
  const { x1, y1, x2, y2 } = position

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={classnames(css.hoverLine, lineClassName)}
      onMouseLeave={() => onMouseHandler()}
      onMouseEnter={() => onMouseHandler(value)}
    />
  )
}

export const HoverLines: React.FC<Props> = ({
  scaleX,
  scaleY,
  line,
  height,
  width,
  isVertical,
  setActiveHoverLine,
  activeHoverLine,
}) => {
  const { values } = line
  const lineWidth = isVertical ? width : height
  const lineType = isVertical ? 'y' : 'x'

  return (
    <g>
      {values.map((value, index) => {
        const valueByLineType = value[lineType]
        const position = {
          x1: isVertical ? 0 : scaleX(valueByLineType),
          y1: isVertical ? scaleY(valueByLineType) : 0,
          x2: isVertical ? lineWidth : scaleX(valueByLineType),
          y2: isVertical ? scaleY(valueByLineType) : lineWidth,
        }
        const isActive = valueByLineType === activeHoverLine

        return (
          <React.Fragment key={index}>
            <LineComponent
              position={position}
              lineClassName={css.isSubstrate}
              value={valueByLineType}
              onMouseHandler={setActiveHoverLine}
            />
            <LineComponent
              position={position}
              lineClassName={isActive && css.isActive}
              value={valueByLineType}
              onMouseHandler={setActiveHoverLine}
            />
          </React.Fragment>
        )
      })}
    </g>
  )
}
