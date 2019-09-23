/* tslint:disable:readonly-array */
import React, { useEffect, useLayoutEffect, useState } from 'react'

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
  const zoomRef = React.createRef<HTMLDivElement>()
  const [zoom, setZoom] = useState(1)
  const zoomBehaviorRef = React.useRef<d3.ZoomBehavior<Element, unknown>>()

  const zoomHandleSize =
    ((xDomain[1] - xDomain[0]) / (originalXDomain[1] - originalXDomain[0])) * 100
  const zoomHandlePos = (xDomain[0] / (originalXDomain[1] - originalXDomain[0])) * 100

  const changeZoom = (modifier: number) => {
    setZoom(prevZoom => _.clamp(prevZoom * modifier, MIN_ZOOM, MAX_ZOOM))
  }

  useEffect(() => {
    d3.select(zoomRef.current as Element)
      .transition()
      .duration(TRANSITION_DURATIONS.ZOOM)
      .call(zoomBehaviorRef.current!.scaleTo, zoom)
  }, [zoom])

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
    d3.select(zoomRef.current as Element)
      .call(zoomBehaviorRef.current)
      .on('wheel.zoom', null)
      .on('dblclick.zoom', null)
  })

  return (
    <div className={css.zoom}>
      <div
        className={classnames(css.zoomHandle, zoomHandleSize >= 100 && css.isHidden)}
        ref={zoomRef}
        style={{
          right: `${zoomHandlePos}%`,
          width: `${zoomHandleSize}%`,
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
