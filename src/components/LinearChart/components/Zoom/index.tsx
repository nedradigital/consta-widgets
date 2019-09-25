/* tslint:disable:readonly-array */
import React, { useLayoutEffect, useRef, useState } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { NumberRange, TRANSITION_DURATIONS } from '../../'

import css from './index.css'

type Props = {
  xRange: NumberRange
  yRange: NumberRange
  xDomain: NumberRange
  originalXDomain: NumberRange
  onZoom: () => void
}

const ZOOM_STEP = 2
const MIN_ZOOM = 1
const MAX_ZOOM = ZOOM_STEP ** 3

export const Zoom: React.FC<Props> = ({ xRange, yRange, xDomain, originalXDomain, onZoom }) => {
  const zoomRef = useRef({} as Element) // Фэйковый элемент для анимации зума
  const [zoom, setZoom] = useState(1)
  const zoomBehaviorRef = React.useRef<d3.ZoomBehavior<Element, unknown>>()
  const dragHandleRef = React.createRef<HTMLDivElement>()
  const dragPosition = useRef(0)

  const dragHandleSize =
    ((xDomain[1] - xDomain[0]) / (originalXDomain[1] - originalXDomain[0])) * 100
  const dragHandlePos = (xDomain[0] / (originalXDomain[1] - originalXDomain[0])) * 100

  const changeZoom = (modifier: number) => {
    setZoom(prevZoom => _.clamp(prevZoom * modifier, MIN_ZOOM, MAX_ZOOM))
  }

  useLayoutEffect(() => {
    const zoomExtent = [[xRange[0], yRange[0]], [xRange[1], yRange[1]]] as [
      NumberRange,
      NumberRange
    ]
    zoomBehaviorRef.current = d3
      .zoom()
      .scaleExtent([MIN_ZOOM, MAX_ZOOM])
      .extent(zoomExtent)
      .translateExtent(zoomExtent)
      .on('zoom', onZoom)
  })

  useLayoutEffect(() => {
    d3.select(zoomRef.current)
      .transition()
      .duration(TRANSITION_DURATIONS.ZOOM)
      .call(zoomBehaviorRef.current!.scaleTo, zoom)
  }, [zoom])

  // Drag
  useLayoutEffect(() => {
    const drag = d3
      .drag()
      .on('start', () => {
        dragPosition.current = d3.event.x
      })
      .on('drag', () => {
        const dragDelta = dragPosition.current - d3.event.x
        dragPosition.current = d3.event.x
        d3.select(zoomRef.current).call(zoomBehaviorRef.current!.translateBy, dragDelta, 0)
      })
    d3.select(dragHandleRef.current as Element).call(drag)
  }, [])

  return (
    <div className={css.zoom}>
      <div
        className={classnames(css.dragHandle, dragHandleSize >= 100 && css.isHidden)}
        ref={dragHandleRef}
        style={{
          left: `${dragHandlePos}%`,
          width: `${dragHandleSize}%`,
        }}
      />
      <div className={css.buttons}>
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
  )
}
