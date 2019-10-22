import { createRef, useLayoutEffect } from 'react'

import * as d3 from 'd3'

import { Colors, Data, Orientation } from '../../'

import css from './index.css'

type Props = {
  data: Data
  barSize: number
  barScale: d3.ScaleBand<string>
  groupScale: d3.ScaleBand<string>
  valuesScale: d3.ScaleLinear<number, number>
  colors: Colors
  clipId: string
  columnSize: number
  padding: number
  orientation: Orientation
  showValues?: boolean
}

// Нужно что бы обрезать скругление углов вначале чарта
const sizeBorderRadius = 5

export const Bar: React.FC<Props> = ({
  data,
  groupScale,
  valuesScale,
  barScale,
  barSize,
  orientation,
  colors,
  clipId,
  columnSize,
  padding,
  showValues,
}) => {
  const ref = createRef<SVGGElement>()
  const textRef = createRef<SVGGElement>()

  const { values } = data

  useLayoutEffect(() => {
    d3.select(textRef.current)
      .selectAll('text')
      .remove()
  }, [orientation, showValues])

  useLayoutEffect(() => {
    if (ref) {
      const transform =
        orientation === 'horizontal'
          ? `translate(0, ${(groupScale(data.groupName) || 0) +
              groupScale.bandwidth() / 2 -
              barSize / 2})`
          : `translate(${(groupScale(data.groupName) || 0) +
              groupScale.bandwidth() / 2 -
              barSize / 2}, 0)`

      d3.select(ref.current).attr('transform', transform)

      const rect = d3
        .select(ref.current)
        .selectAll('rect')
        .data([...values])
        .join('rect')
        .attr('rx', 3)
        .style('fill', (_, index) => colors[index])

      if (orientation === 'horizontal') {
        rect
          .attr('x', sizeBorderRadius * -1)
          .attr('y', (_, index) => barScale(String(index)) || 0)
          .attr('width', d => valuesScale(d) + sizeBorderRadius)
          .attr('height', columnSize)

        if (textRef.current && showValues) {
          d3.select(textRef.current).attr('transform', transform)

          d3.select(textRef.current)
            .selectAll('text')
            .data([...values])
            .join('text')
            .attr('x', d => valuesScale(d) + 4)
            .attr('y', (_, index) => (barScale(String(index)) || 0) + padding / 2)
            .attr('dy', barScale.bandwidth() / 2)
            .text(d => d)
            .attr('fill', 'currentColor')
            .attr('class', css.label)
        }
      } else {
        rect
          .attr('x', (_, index) => barScale(String(index)) || 0)
          .attr('y', d => valuesScale(d))
          .attr('width', columnSize)
          .attr('height', d => (d ? valuesScale(0) - valuesScale(d) + sizeBorderRadius : 0))
      }
    }
  })

  return (
    <g>
      <g clipPath={`url(#${clipId})`} ref={ref} />
      <g ref={textRef} />
    </g>
  )
}
