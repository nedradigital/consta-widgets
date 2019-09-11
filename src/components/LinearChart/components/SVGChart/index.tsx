import React from 'react'
import useDimensions from 'react-use-dimensions'

import classnames from 'classnames'

import { Line, Orientation } from '@/components/LinearChart'
import { LineGroup } from '@/components/LinearChart/components/LineGroup'

import css from './index.css'

const areaGradientId = 'areaGradientId'

export const SVGChart: React.FC<{
  lines: Line[]
  minValue: number
  maxValue: number
  orientation: Orientation
}> = ({ lines, minValue, maxValue, orientation }) => {
  const [svgRef, { width: svgWidth = 0, height: svgHeight = 0 }] = useDimensions()

  return (
    <svg className={css.main} ref={svgRef}>
      <defs>
        {lines.map((line, index) =>
          line.background ? (
            <linearGradient
              key={index}
              id={`${areaGradientId}_${index}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{
                  stopColor: line.colors.background && line.colors.background.start,
                }}
              />
              <stop
                offset="100%"
                className={classnames(css.area, css.isEnd)}
                style={{
                  stopColor: line.colors.background && line.colors.background.end,
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
