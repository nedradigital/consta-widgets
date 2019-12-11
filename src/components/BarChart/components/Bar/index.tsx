import { createRef, useLayoutEffect } from 'react'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import * as d3 from 'd3'

import { ColorGroups } from '@/dashboard/types'

import { Data, getGroupScale, Orientation } from '../../'

import css from './index.css'

type ValuesFiltered = {
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
  showValues?: boolean
}

// Нужно что бы обрезать скругление углов вначале чарта
const sizeBorderRadius = 5
const getColumnSize = () => getCalculatedSize(12)
const getColumnPadding = () => getCalculatedSize(4)

export const Bar: React.FC<Props> = ({
  data,
  groupScale,
  valuesScale,
  orientation,
  colorGroups,
  clipId,
  showValues,
}) => {
  const ref = createRef<SVGGElement>()
  const textRef = createRef<SVGGElement>()
  const { label, values } = data
  const valuesFiltered = values.filter((v): v is ValuesFiltered => v.value !== undefined)
  const columnSize = getColumnSize()
  const columnPadding = getColumnPadding()

  const barDomains = valuesFiltered.length ? valuesFiltered.map(item => item.colorGroupName) : []
  const barSize = (columnSize + columnPadding) * (valuesFiltered.length ? valuesFiltered.length : 0)
  const barScale = getGroupScale(barDomains, barSize, orientation)

  useLayoutEffect(() => {
    d3.select(textRef.current)
      .selectAll('text')
      .remove()
  }, [textRef, orientation, showValues])

  useLayoutEffect(() => {
    if (ref) {
      const transform =
        orientation === 'horizontal'
          ? `translate(0, ${(groupScale(label) || 0) + groupScale.bandwidth() / 2 - barSize / 2})`
          : `translate(${(groupScale(label) || 0) + groupScale.bandwidth() / 2 - barSize / 2}, 0)`

      d3.select(ref.current).attr('transform', transform)

      const rect = d3
        .select(ref.current)
        .selectAll('rect')
        .data([...valuesFiltered])
        .join('rect')
        .attr('rx', 3)
        .style('fill', d => colorGroups[d.colorGroupName])

      if (orientation === 'horizontal') {
        rect
          .attr('x', sizeBorderRadius * -1)
          .attr('y', d => barScale(d.colorGroupName) || 0)
          .attr('width', d => valuesScale(d.value) + sizeBorderRadius)
          .attr('height', columnSize)

        if (textRef.current && showValues) {
          d3.select(textRef.current).attr('transform', transform)

          d3.select(textRef.current)
            .selectAll('text')
            .data([...valuesFiltered])
            .join('text')
            .attr('x', d => valuesScale(d.value) + 4)
            .attr('y', d => (barScale(d.colorGroupName) || 0) + columnPadding / 2)
            .attr('dy', barScale.bandwidth() / 2)
            .text(d => d.value)
            .attr('fill', 'currentColor')
            .attr('class', css.label)
        }
      } else {
        rect
          .attr('x', d => barScale(d.colorGroupName) || 0)
          .attr('y', d => valuesScale(d.value))
          .attr('width', columnSize)
          .attr('height', d => (d ? valuesScale(0) - valuesScale(d.value) + sizeBorderRadius : 0))
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
