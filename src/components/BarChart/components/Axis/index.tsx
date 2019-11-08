import React, { useLayoutEffect } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

import { Orientation } from '../../'

import css from './index.css'

const TICK_PADDING = 15

enum AxisDirections {
  bottom = 'axisBottom',
  left = 'axisLeft',

  vertical = 'axisLeft',
  horizontal = 'axisBottom',
}

type Props = {
  width: number
  height: number
  onAxisSizeChange: (sizes: { xAxisHeight: number; yAxisWidth: number }) => void
  valuesTick: number
  valuesScale: d3.ScaleLinear<number, number>
  groupScale: d3.ScaleBand<string>
  orientation: Orientation
  valuesSpecifier?: string
}

export const Axis: React.FC<Props> = ({
  width,
  height,
  valuesTick,
  onAxisSizeChange,
  groupScale,
  valuesScale,
  orientation = 'vertical',
  valuesSpecifier,
}) => {
  const xLabelsRef = React.createRef<SVGGElement>()
  const yLabelsRef = React.createRef<SVGGElement>()
  const gridRef = React.createRef<SVGGElement>()
  const isHorizontal = orientation === 'horizontal'

  const labelsAxis = [
    {
      getEl: () => xLabelsRef.current,
      direction: AxisDirections.bottom,
      scale: isHorizontal ? valuesScale : groupScale,
      classes: classnames(
        css.labels,
        css.labels_x,
        css.labels_bottom,
        orientation === 'vertical' && css.hideLine
      ),
      transform: `translateY(${height}px)`,
      tickOn: isHorizontal,
    },
    {
      getEl: () => yLabelsRef.current,
      direction: AxisDirections.left,
      scale: isHorizontal ? groupScale : valuesScale,
      classes: classnames(css.labels, css.labels_y, css.labels_left, isHorizontal && css.hideLine),
      transform: '',
      tickOn: !isHorizontal,
    },
  ] as const

  // d3 некорректно обновляет направление оси, поэтому приходится удалять ось и пересоздавать заново
  // @see https://github.com/d3/d3-axis/issues/45
  useLayoutEffect(() => {
    labelsAxis.forEach(labels => {
      const labelsSelection = d3.select(labels.getEl())

      labelsSelection.select('g').remove()

      labelsSelection.append('g')
    })

    d3.select(gridRef.current)
      .selectAll('g')
      .remove()
  }, [orientation])

  useLayoutEffect(() => {
    // Labels
    labelsAxis.forEach(labels => {
      const axisSelection = d3.select(labels.getEl()).select('g') as d3.Selection<
        SVGGElement,
        unknown,
        null,
        undefined
      >
      const axis = labels.tickOn
        ? d3[labels.direction](labels.scale as d3.ScaleLinear<number, number>)
            .ticks(valuesTick)
            .tickSize(4)
            .tickPadding(TICK_PADDING)
            .tickFormat(d => {
              if (valuesSpecifier) {
                return d3.format(valuesSpecifier)(d)
              }

              return String(d)
            })
        : d3[labels.direction](labels.scale as d3.ScaleBand<string>)

      axisSelection
        .attr('class', labels.classes)
        .style('transform', labels.transform)
        .call(axis)
        .selectAll('text')
        .style('text-anchor', (_, index, el) => {
          if (isHorizontal && ['axisBottom', 'axisTop'].includes(labels.direction)) {
            if (index === 0) {
              return 'start'
            }
            if (index === el.length - 1) {
              return 'end'
            }
            return 'middle'
          } else {
            return ''
          }
        })
    })

    // Grid lines
    if (!d3[AxisDirections[orientation]]) {
      return
    }

    const gridBase = d3[AxisDirections[orientation]](valuesScale)
      .tickSize(isHorizontal ? height : -width)
      .tickFormat(() => '')

    if (gridRef.current) {
      d3.select(gridRef.current).call(gridBase.ticks(4))
    }
  })

  useLayoutEffect(() => {
    const xAxisHeight = xLabelsRef.current!.getBoundingClientRect().height
    const yAxisWidth = yLabelsRef.current!.getBoundingClientRect().width

    onAxisSizeChange({ xAxisHeight, yAxisWidth })
  })

  return (
    <g className={css.main}>
      <g className={css.grid} ref={gridRef} />
      <g ref={xLabelsRef} />
      <g ref={yLabelsRef} />
    </g>
  )
}
