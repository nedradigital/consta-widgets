import React from 'react'
import useDimensions from 'react-use-dimensions'

import classnames from 'classnames'

import { ChartDirection, Line, Orientation } from '@/components/LinearChart'
import { LineGroup } from '@/components/LinearChart/components/LineGroup'

import css from './index.css'

const areaGradientId = 'areaGradientId'

const directionClasses = {
  'up-right': undefined,
  'up-left': css.upLeft,
  'down-right': css.downRight,
  'down-left': css.downLeft,
}

export const SVGChart: React.FC<{
  lines: readonly Line[]
  minValue: number
  maxValue: number
  orientation: Orientation
  chartDirection: ChartDirection
}> = ({ lines, minValue, maxValue, orientation, chartDirection }) => {
  const [svgRef, { width: svgWidth = 0, height: svgHeight = 0 }] = useDimensions()
  const isHorizontal = orientation === 'horizontal'

  return (
    <svg className={classnames(css.main, directionClasses[chartDirection])} ref={svgRef}>
      <defs>
        {lines.map((line, index) =>
          line.background ? (
            <linearGradient
              key={index}
              id={`${areaGradientId}_${index}`}
              x1={isHorizontal ? 0 : '100%'}
              y1="0%"
              x2="0%"
              y2={isHorizontal ? '100%' : 0}
            >
              <stop
                offset="0%"
                style={{
                  stopColor: line.background.start,
                }}
              />
              <stop
                offset="100%"
                className={classnames(css.area, css.isEnd)}
                style={{
                  stopColor: line.background.end,
                }}
              />
            </linearGradient>
          ) : null
        )}
      </defs>

      {lines.map((line, index) => (
        <LineGroup
          key={index}
          item={{
            ...line,
            areaStyles: {
              fill: `url(#${areaGradientId}_${index})`,
              ...line.areaStyles,
            },
          }}
          orientation={orientation}
          width={svgWidth}
          height={svgHeight}
          valueRange={[minValue, maxValue]}
        />
      ))}
    </svg>
  )
}
