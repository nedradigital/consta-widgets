import React, { createRef, useLayoutEffect } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

const CLASS_LINE_BACKGROUND = 'CLASS_LINE_BACKGROUND'
const CLASS_LINE_FOREGROUND = 'CLASS_LINE_FOREGROUND'
const CLASS_AREA_FOREGROUND = 'CLASS_AREA_FOREGROUND'

type Data = number[]

type Props = {
  orientation: 'horizontal' | 'vertical'
  lineForeground: {
    data: Data
    widthDomain: [number, number]
    widthRange: [number, number]
    heightDomain: [number, number]
    heightRange: [number, number]
    styles?: string
    className?: string
  }
  lineBackground: {
    data: Data
    widthDomain: [number, number]
    widthRange: [number, number]
    heightDomain: [number, number]
    heightRange: [number, number]
    styles?: string
    className?: string
  }
  areaForeground?: {
    data: Data
    styles?: string
    className?: string
  }
}

export const ChartContent: React.FC<Props> = ({
  orientation,
  lineForeground,
  lineBackground,
  areaForeground,
}) => {
  const scaleHeightBackground = d3.scaleLinear()
  const scaleHeightForeground = d3.scaleLinear()
  const scaleWidthBackground = d3.scaleLinear()
  const scaleWidthForeground = d3.scaleLinear()
  const ref = createRef<SVGSVGElement>()

  useLayoutEffect(() => {
    scaleWidthBackground.domain(lineBackground.widthDomain).range(lineBackground.widthRange)
    scaleHeightBackground.domain(lineBackground.heightDomain).range(lineBackground.heightRange)

    scaleWidthForeground.domain(lineForeground.widthDomain).range(lineForeground.widthRange)
    scaleHeightForeground.domain(lineForeground.heightDomain).range(lineForeground.heightRange)

    const LineBackground = d3
      .line<number>()
      .x((value, index) => scaleWidthBackground(orientation === 'vertical' ? value : index))
      .y((value, index) => scaleHeightBackground(orientation === 'vertical' ? index : value))

    const LineForeground = d3
      .line<number>()
      .x((value, index) => scaleWidthForeground(orientation === 'vertical' ? value : index))
      .y((value, index) => scaleHeightForeground(orientation === 'vertical' ? index : value))

    d3.select(ref.current)
      .datum(lineBackground.data)
      .select(`.${CLASS_LINE_BACKGROUND}`)
      .attr('style', lineBackground.styles || '')
      .attr('d', LineBackground)

    d3.select(ref.current)
      .datum(lineForeground.data)
      .select(`.${CLASS_LINE_FOREGROUND}`)
      .attr('style', lineForeground.styles || '')
      .attr('d', LineForeground)

    if (areaForeground) {
      const AreaForeground = d3
        .area<number>()
        .x((_, index) => scaleWidthForeground(index))
        .y0(_ => scaleHeightForeground(0))
        .y1(value => scaleHeightForeground(value))

      d3.select(ref.current)
        .datum(areaForeground.data)
        .select(`.${CLASS_AREA_FOREGROUND}`)
        .attr('style', areaForeground.styles || '')
        .attr('d', AreaForeground)
    }
  })

  return (
    <g ref={ref}>
      {lineForeground.data.length > 0 && (
        <path className={classnames(lineForeground.className, CLASS_LINE_FOREGROUND)} />
      )}
      {lineBackground.data.length > 0 && (
        <path className={classnames(lineBackground.className, CLASS_LINE_BACKGROUND)} />
      )}
      {areaForeground && areaForeground.data.length > 0 && (
        <path className={classnames(areaForeground.className, CLASS_AREA_FOREGROUND)} />
      )}
    </g>
  )
}
