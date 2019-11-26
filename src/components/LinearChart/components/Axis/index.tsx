import React, { useLayoutEffect } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

import { ScaleLinear, TickValues } from '../..'

import css from './index.css'

const TICK_PADDING = 15

export type XLabelsPosition = 'top' | 'bottom'
export type YLabelsPosition = 'left' | 'right'

type GridConfigItem<Position> = {
  labels?: Position
  labelTicks?: number
  gridTicks?: number
  guide?: boolean
}

export type GridConfig = {
  x: GridConfigItem<XLabelsPosition>
  y: GridConfigItem<YLabelsPosition>
}

enum AxisDirections {
  top = 'axisTop',
  bottom = 'axisBottom',
  left = 'axisLeft',
  right = 'axisRight',
}

type Props = {
  width: number
  height: number
  lineClipPath: string
  scales: {
    [key in 'x' | 'y']: ScaleLinear
  }
  gridConfig: GridConfig
  onAxisSizeChange: (sizes: { xAxisHeight: number; yAxisWidth: number }) => void
  mainLabelTickValues: TickValues
  mainGridTickValues: TickValues
  secondaryLabelTickValues: TickValues
  secondaryGridTickValues: TickValues
  isVertical?: boolean
  formatLabel: (n: number) => string
  secondaryScaleUnit?: string
  xGuideValue: number
  yGuideValue: number
}

const getTransformForSecondaryScaleUnit = (
  labelsRef: React.RefObject<SVGGElement>,
  xOnBottom: boolean,
  yOnLeft: boolean,
  isVertical?: boolean
) => {
  const { height, width } = (labelsRef.current && labelsRef.current.getBoundingClientRect()) || {
    height: 0,
    width: 0,
  }

  const transformByVertical = xOnBottom ? height : (-1 * height) / 2
  const transformByHorizontal = yOnLeft ? -1 * width : width / 2

  return isVertical ? transformByVertical : transformByHorizontal
}

const defaultFormatLabel = (v: number) => String(v)

export const Axis: React.FC<Props> = ({
  width,
  height,
  lineClipPath,
  scales: { x: scaleX, y: scaleY },
  gridConfig: {
    x: { labels: xLabelsPos, labelTicks: xLabelTicks, gridTicks: xGridTicks, guide: xGuide },
    y: { labels: yLabelsPos, labelTicks: yLabelTicks, gridTicks: yGridTicks, guide: yGuide },
  },
  onAxisSizeChange,
  mainLabelTickValues,
  mainGridTickValues,
  isVertical,
  formatLabel,
  secondaryScaleUnit,
  xGuideValue,
  yGuideValue,
  secondaryLabelTickValues,
  secondaryGridTickValues,
}) => {
  const xLabelsRef = React.createRef<SVGGElement>()
  const yLabelsRef = React.createRef<SVGGElement>()
  const xGridRef = React.createRef<SVGGElement>()
  const yGridRef = React.createRef<SVGGElement>()
  const secondaryScaleUnitRef = React.createRef<SVGGElement>()

  const xOnBottom = xLabelsPos === 'bottom'
  const yOnLeft = yLabelsPos === 'left'
  const showXGrid = xGridTicks || xGuide
  const showYGrid = yGridTicks || yGuide

  const labelsAxis = [
    {
      getEl: () => xLabelsRef.current,
      visible: Boolean(xLabelsPos),
      direction: xOnBottom ? AxisDirections.bottom : AxisDirections.top,
      scale: scaleX,
      ticks: xLabelTicks,
      classes: classnames(
        css.labels,
        css.labels_x,
        xLabelsPos &&
          {
            bottom: css.labels_bottom,
            top: css.labels_top,
          }[xLabelsPos]
      ),
      transform: xOnBottom ? `translateY(${height}px)` : '',
      values: isVertical ? secondaryLabelTickValues : mainLabelTickValues,
      formatLabel: isVertical ? defaultFormatLabel : formatLabel,
    },
    {
      getEl: () => yLabelsRef.current,
      visible: Boolean(yLabelsPos),
      direction: yOnLeft ? AxisDirections.left : AxisDirections.right,
      scale: scaleY,
      ticks: yLabelTicks,
      classes: classnames(
        css.labels,
        css.labels_y,
        yLabelsPos &&
          {
            left: css.labels_left,
            right: css.labels_right,
          }[yLabelsPos]
      ),
      transform: yOnLeft ? '' : `translateX(${width}px)`,
      values: isVertical ? mainLabelTickValues : secondaryLabelTickValues,
      formatLabel: isVertical ? formatLabel : defaultFormatLabel,
    },
  ] as const

  // d3 некорректно обновляет направление оси, поэтому приходится удалять ось и пересоздавать заново
  // @see https://github.com/d3/d3-axis/issues/45
  useLayoutEffect(() => {
    labelsAxis.forEach(labels => {
      const labelsSelection = d3.select(labels.getEl())

      labelsSelection.select('g').remove()

      if (labels.visible) {
        labelsSelection.append('g')
      }
    })
  }, [xLabelsPos, yLabelsPos])

  useLayoutEffect(() => {
    // Labels
    labelsAxis.forEach(labels => {
      if (labels.visible) {
        const axisSelection = d3.select(labels.getEl()).select('g') as d3.Selection<
          SVGGElement,
          unknown,
          null,
          undefined
        >
        const axis = d3[labels.direction](labels.scale)
          .tickValues([...labels.values])
          .tickPadding(TICK_PADDING)
          .tickFormat(v => labels.formatLabel(v as number))

        axisSelection
          .attr('class', labels.classes)
          .style('transform', labels.transform)
          .call(axis)
          .selectAll('text')
          .style('text-anchor', (_, index, el) => {
            if (['axisBottom', 'axisTop'].includes(labels.direction)) {
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
      }
    })

    // Grid lines
    const xGridBase = d3
      .axisBottom(scaleX)
      .tickSize(height)
      .tickFormat(() => '')
    const yGridBase = d3
      .axisLeft(scaleY)
      .tickSize(-width)
      .tickFormat(() => '')

    const xAxis = xGridTicks
      ? xGridBase.tickValues([...secondaryGridTickValues])
      : xGridBase.tickValues([xGuideValue])
    const yAxis = yGridTicks
      ? yGridBase.tickValues([...secondaryGridTickValues])
      : yGridBase.tickValues([yGuideValue])

    const xTicks = !xGridTicks && xGuide ? [xGuideValue] : [...mainGridTickValues]
    const yTicks = !yGridTicks && yGuide ? [yGuideValue] : [...mainGridTickValues]

    const grids = [
      {
        el: xGridRef.current,
        axis: isVertical ? xAxis : xGridBase.tickValues(xTicks),
        withGuide: xGuide,
        guideValue: xGuideValue,
      },
      {
        el: yGridRef.current,
        axis: isVertical ? yGridBase.tickValues(yTicks) : yAxis,
        withGuide: yGuide,
        guideValue: yGuideValue,
      },
    ] as const

    grids.forEach(grid => {
      if (grid.el) {
        d3.select(grid.el)
          .call(grid.axis)
          .selectAll('.tick')
          .select('line')
          .attr('class', d => (grid.withGuide && d === grid.guideValue ? css.axisLine : ''))
      }
    })
  })

  useLayoutEffect(() => {
    const xAxisHeight = xLabelsRef.current!.getBoundingClientRect().height
    const yAxisWidth = yLabelsRef.current!.getBoundingClientRect().width

    onAxisSizeChange({ xAxisHeight, yAxisWidth })
  })

  useLayoutEffect(() => {
    const secondaryScaleUnitElement = d3.select(secondaryScaleUnitRef.current)
    secondaryScaleUnitElement.select('text').remove()

    const ticks = isVertical ? xLabelTicks : yLabelTicks

    if (!ticks) {
      return
    }

    if (secondaryScaleUnit) {
      const x = isVertical || !yOnLeft ? width : 0
      const y = !isVertical || !xOnBottom ? 0 : height

      secondaryScaleUnitElement
        .append('text')
        .text(secondaryScaleUnit)
        .attr('fill', 'currentColor')
        .attr('class', css.labels)
        .attr('x', x)
        .attr('y', y)

      const transform = getTransformForSecondaryScaleUnit(
        isVertical ? xLabelsRef : yLabelsRef,
        xOnBottom,
        yOnLeft,
        isVertical
      )

      secondaryScaleUnitElement.attr(
        'transform',
        isVertical ? `translate(0, ${transform})` : `translate(${transform}, -16)`
      )
    }
  })

  return (
    <g className={css.main}>
      <g clipPath={lineClipPath}>
        {showXGrid && <g className={css.grid} ref={xGridRef} />}
        {showYGrid && <g className={css.grid} ref={yGridRef} />}
      </g>

      <g ref={xLabelsRef} />
      <g ref={yLabelsRef} />
      <g ref={secondaryScaleUnitRef} />
    </g>
  )
}
