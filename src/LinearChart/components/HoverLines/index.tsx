import React from 'react'

import { isDefined, isNotNil } from '@consta/widgets-utils/lib/type-guards'
import classnames from 'classnames'
import * as _ from 'lodash'

import { HoveredMainValue, Line, ScaleLinear } from '../../'

import css from './index.css'

export type Handler = (newValue: HoveredMainValue) => void

type Props = {
  lines: readonly Line[]
  height: number
  scaleX: ScaleLinear
  hoveredMainValue: HoveredMainValue
  onChangeHoveredMainValue: Handler
  onClickLine?: (value: number) => void
}

type LineProps = {
  position: Position
  lineClassName: string | boolean
  value?: number
  onHover: Handler
  onClick?: () => void
}

type Position = {
  x1: number
  y1: number
  x2: number
  y2: number
}

const HoverLine: React.FC<LineProps> = ({ position, lineClassName, value, onHover, onClick }) => {
  const { x1, y1, x2, y2 } = position

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={classnames(css.hoverLine, lineClassName)}
      onMouseLeave={() => onHover(undefined)}
      onMouseEnter={() => onHover(value)}
      onClick={onClick}
    />
  )
}

export const HoverLines: React.FC<Props> = ({
  scaleX,
  lines,
  height,
  hoveredMainValue,
  onChangeHoveredMainValue,
  onClickLine,
}) => {
  const lineValues = _.uniqBy(_.flatten(lines.map(l => l.values)), v => v.x)

  return (
    <g>
      {lineValues
        .map((lineValue, index) => {
          const mainValue = lineValue.x

          if (!isNotNil(mainValue)) {
            return
          }

          const position = {
            x1: scaleX(mainValue),
            y1: 0,
            x2: scaleX(mainValue),
            y2: height,
          }
          const isActive = mainValue === hoveredMainValue
          const commonProps = {
            position,
            value: mainValue,
            onHover: onChangeHoveredMainValue,
            onClick: onClickLine ? () => onClickLine(mainValue) : undefined,
          }

          return (
            <React.Fragment key={index}>
              <HoverLine {...commonProps} lineClassName={css.isHoverable} />
              <HoverLine {...commonProps} lineClassName={isActive && css.isActive} />
            </React.Fragment>
          )
        })
        .filter(isDefined)}
    </g>
  )
}
