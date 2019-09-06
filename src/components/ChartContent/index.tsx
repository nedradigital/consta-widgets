import React, { createRef, Fragment, useLayoutEffect } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

const CLASS_LINE = 'CLASS_LINE'
const CLASS_AREA = 'CLASS_AREA'
const CLASS_CIRCLE = 'CLASS_CIRCLE'

type Lines = {
  value: number[]
  widthDomain: [number, number]
  widthRange: [number, number]
  heightDomain: [number, number]
  heightRange: [number, number]
  lineStyles?: React.CSSProperties
  areaStyles?: React.CSSProperties
  circleStyles?: React.CSSProperties
  background?: boolean
  circle?: boolean
  classNameLine?: string
  classNameBackground?: string
  classNameCircle?: string
  colors: {
    line: string
  }
}

type Props = {
  orientation: 'horizontal' | 'vertical'
  lines: Lines[]
}

export const ChartContent: React.FC<Props> = ({ orientation, lines }) => {
  const ref = createRef<SVGSVGElement>()

  useLayoutEffect(() => {
    lines.forEach((line, lineNumber) => {
      const scaleHeight = d3.scaleLinear()
      const scaleWidth = d3.scaleLinear()

      scaleWidth.domain(line.widthDomain).range(line.widthRange)
      scaleHeight.domain(line.heightDomain).range(line.heightRange)

      const LineBackground = d3
        .line<number>()
        .x((value, index) => scaleWidth(orientation === 'vertical' ? value : index))
        .y((value, index) => scaleHeight(orientation === 'vertical' ? index : value))

      d3.select(ref.current)
        .datum(line.value)
        .select(`.${CLASS_LINE}_${lineNumber}`)
        .attr('d', LineBackground)

      if (line.circle) {
        d3.select(ref.current)
          .datum(line.value[line.value.length - 1])
          .select(`.${CLASS_CIRCLE}_${lineNumber}`)
          .attr('r', 2)
          .attr('cx', line.widthRange[1])
          .attr('cy', value => scaleHeight(value))
      }

      if (line.background) {
        const AreaForeground = d3
          .area<number>()
          .x((_, index) => scaleWidth(index))
          .y0(line.heightRange[0] + 5)
          .y1(value => scaleHeight(value))

        d3.select(ref.current)
          .datum(line.value)
          .select(`.${CLASS_AREA}_${lineNumber}`)
          .attr('d', AreaForeground)
      }
    })
  })

  return (
    <g ref={ref}>
      {lines.map((item, index) => {
        return (
          <Fragment key={index}>
            <path
              className={classnames(item.classNameLine, `${CLASS_LINE}_${index}`)}
              style={{
                ...item.lineStyles,
                stroke: item.colors.line,
              }}
            />
            {item.background && (
              <path
                className={classnames(item.classNameBackground, `${CLASS_AREA}_${index}`)}
                style={item.areaStyles}
              />
            )}
            {item.circle && (
              <circle
                className={classnames(item.classNameCircle, `${CLASS_CIRCLE}_${index}`)}
                style={{
                  ...item.circleStyles,
                  fill: item.colors.line,
                }}
              />
            )}
          </Fragment>
        )
      })}
    </g>
  )
}
