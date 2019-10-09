import React, { useLayoutEffect, useRef, useState } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { NumberRange, TRANSITION_DURATIONS } from '../../'
import { XLabelsPosition, YLabelsPosition } from '../Axis'

import css from './index.css'

type Props = {
  isVertical: boolean
  xRange: NumberRange
  yRange: NumberRange
  xLabelsPos?: XLabelsPosition
  yLabelsPos?: YLabelsPosition
  paddingX: number
  paddingY: number
  domain: NumberRange
  originalDomain: NumberRange
  onZoom: () => void
}

const ZOOM_STEP = 2
const MIN_ZOOM = 1
const MAX_ZOOM = ZOOM_STEP ** 3

export const Zoom: React.FC<Props> = ({
  isVertical,
  xRange,
  yRange,
  xLabelsPos,
  yLabelsPos,
  paddingX,
  paddingY,
  domain,
  originalDomain,
  onZoom,
}) => {
  const zoomRef = useRef({} as Element) // Фэйковый элемент для анимации зума
  const [zoom, setZoom] = useState(1)
  const zoomBehaviorRef = React.useRef<d3.ZoomBehavior<Element, unknown>>()
  const dragHandleRef = React.createRef<HTMLDivElement>()
  const previousDragPositionRef = useRef(0)

  const [domainStart, domainEnd] = _.sortBy(domain)
  const domainSize = domainEnd - domainStart
  const [originalDomainStart, originalDomainEnd] = _.sortBy(originalDomain)
  const originalDomainSize = originalDomainEnd - originalDomainStart

  const dragHandleSize = (domainSize / originalDomainSize) * 100
  const dragHandlePos = ((domainStart - originalDomainStart) / originalDomainSize) * 100

  const changeZoom = (modifier: number) => {
    setZoom(prevZoom => _.clamp(prevZoom * modifier, MIN_ZOOM, MAX_ZOOM))
  }

  useLayoutEffect(() => {
    const [xRangeStart, xRangeEnd] = _.sortBy(xRange)
    const [yRangeStart, yRangeEnd] = _.sortBy(yRange)
    const zoomExtent: readonly [NumberRange, NumberRange] = [
      [xRangeStart, yRangeStart],
      [xRangeEnd, yRangeEnd],
    ]
    zoomBehaviorRef.current = d3
      .zoom()
      .scaleExtent([MIN_ZOOM, MAX_ZOOM])
      .extent([[zoomExtent[0][0], zoomExtent[0][1]], [zoomExtent[1][0], zoomExtent[1][1]]])
      .translateExtent([[zoomExtent[0][0], zoomExtent[0][1]], [zoomExtent[1][0], zoomExtent[1][1]]])
      .on('zoom', onZoom)
  })

  useLayoutEffect(() => {
    d3.select(zoomRef.current)
      .transition()
      .duration(TRANSITION_DURATIONS.ZOOM)
      .call(zoomBehaviorRef.current!.scaleTo, zoom)
  }, [zoom])

  useLayoutEffect(() => {
    setZoom(1)
  }, [isVertical])

  // Drag
  useLayoutEffect(() => {
    const getDragPosition = () => d3.event[isVertical ? 'y' : 'x']
    const drag = d3
      .drag()
      .on('start', () => {
        previousDragPositionRef.current = getDragPosition()
      })
      .on('drag', () => {
        const currentDragPosition = getDragPosition()
        const dragDelta = previousDragPositionRef.current - currentDragPosition
        previousDragPositionRef.current = currentDragPosition
        const deltaCoords = isVertical ? [0, dragDelta] : [dragDelta, 0]
        d3.select(zoomRef.current).call(zoomBehaviorRef.current!.translateBy, ...deltaCoords)
      })
    d3.select(dragHandleRef.current as Element).call(drag)
  }, [isVertical])

  // Zoom bar position
  const xOnBottom = xLabelsPos === 'bottom'
  const yOnLeft = yLabelsPos === 'left'
  const style = isVertical
    ? {
        ...(xOnBottom ? { top: 0, bottom: paddingY } : { top: paddingY, bottom: 0 }),
        ...(yOnLeft ? { left: 0 } : { right: 0 }),
        width: paddingX,
      }
    : {
        ...(xOnBottom ? { bottom: 0 } : { top: 0 }),
        ...(yOnLeft ? { left: paddingX, right: 0 } : { left: 0, right: paddingX }),
        height: paddingY,
      }
  const handleStyle = isVertical
    ? {
        top: `${dragHandlePos}%`,
        [yOnLeft ? 'right' : 'left']: 'var(--axis-tick-offset)',
        height: `${dragHandleSize}%`,
      }
    : {
        left: `${dragHandlePos}%`,
        [xOnBottom ? 'top' : 'bottom']: 'var(--axis-tick-offset)',
        width: `${dragHandleSize}%`,
      }

  return (
    <div
      className={classnames(css.zoom, isVertical ? css.isVertical : css.isHorizontal)}
      style={style}
    >
      <div
        className={classnames(css.dragHandle, dragHandleSize >= 100 && css.isHidden)}
        ref={dragHandleRef}
        style={handleStyle}
      />
      <div className={css.buttons}>
        <div className={css.buttonGroup}>
          <button
            className={classnames(css.button, css.resetButton)}
            onClick={() => setZoom(1)}
            disabled={zoom === 1}
          >
            [ ]
          </button>
        </div>
        <div className={css.buttonGroup}>
          <button
            className={css.button}
            onClick={() => changeZoom(1 / ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
          >
            −
          </button>
          <button
            className={css.button}
            onClick={() => changeZoom(ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
