import React from 'react'

import { useComponentSize } from '@gpn-design/uikit/useComponentSize'
import classnames from 'classnames'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { TRANSITION_DURATIONS } from '../../'
import { XLabelsPosition, YLabelsPosition } from '../Axis'

import { scaleZoom, translateZoom } from './helpers'
import css from './index.css'

/** Точки начала и конца видимой области, каждая от 0 до 1 */
export type ZoomState = readonly [number, number]
export const defaultZoom: ZoomState = [0, 1]
export const isDefaultZoom = (zoom: ZoomState): boolean => _.isEqual(zoom, defaultZoom)
export const getZoomScale = ([start, end]: ZoomState): number => 1 / (end - start)

type Props = {
  isHorizontal: boolean
  xLabelsPos?: XLabelsPosition
  yLabelsPos?: YLabelsPosition
  paddingX: number
  paddingY: number
  value: ZoomState
  onChange: (newValue: ZoomState) => void
}

const ZOOM_SCALE_STEP = 2
const MIN_ZOOM_SCALE = 1
const MAX_ZOOM_SCALE = ZOOM_SCALE_STEP ** 3

export const Zoom: React.FC<Props> = ({
  isHorizontal,
  xLabelsPos,
  yLabelsPos,
  paddingX,
  paddingY,
  value,
  onChange,
}) => {
  const [isDragging, setDragging] = React.useState(false)
  const [isZooming, setIsZooming] = React.useState(false)
  const ref = React.useRef(null)
  const zoomTransitionRef = React.useRef({} as Element)
  const { width, height } = useComponentSize(ref)
  const [start, end] = value
  const zoomScale = getZoomScale(value)

  const changeZoomScale = (newZoomScale: number) => {
    const newZoom = scaleZoom(value, Math.round(newZoomScale))

    // Анимация зума
    d3.select(zoomTransitionRef.current)
      .transition()
      .duration(TRANSITION_DURATIONS.ZOOM)
      .tween('zoom', () => {
        const i = d3.interpolateArray([...value], [...newZoom])
        return (t: number) => {
          onChange([i(t)[0], i(t)[1]])
        }
      })
      .on('start', () => setIsZooming(true))
      .on('end', () => setIsZooming(false))
  }
  const handleZoomIn = () => changeZoomScale(zoomScale / ZOOM_SCALE_STEP)
  const handleZoomOut = () => changeZoomScale(zoomScale * ZOOM_SCALE_STEP)

  const handleDragStart = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
  }
  const handleDragStop = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    setDragging(false)
  }
  const handleDragMove = (e: React.PointerEvent) => {
    const movement = isHorizontal ? e.movementX : -1 * e.movementY
    const size = isHorizontal ? width : height
    if (movement) {
      onChange(translateZoom(value, movement / size))
    }
  }

  // Позиция и размеры скроллбара
  const xOnBottom = xLabelsPos === 'bottom'
  const yOnLeft = yLabelsPos === 'left'
  const style = isHorizontal
    ? {
        ...(xOnBottom ? { bottom: 0 } : { top: 0 }),
        ...(yOnLeft ? { left: paddingX, right: 0 } : { left: 0, right: paddingX }),
        height: paddingY,
      }
    : {
        ...(xOnBottom ? { top: 0, bottom: paddingY } : { top: paddingY, bottom: 0 }),
        ...(yOnLeft ? { left: 0 } : { right: 0 }),
        width: paddingX,
      }
  const zoomBarStyle = isHorizontal
    ? {
        left: `${start * 100}%`,
        right: `${(1 - end) * 100}%`,
        [xOnBottom ? 'top' : 'bottom']: 'var(--axis-tick-offset)',
      }
    : {
        top: `${(1 - end) * 100}%`,
        bottom: `${start * 100}%`,
        [yOnLeft ? 'right' : 'left']: 'var(--axis-tick-offset)',
      }

  return (
    <div
      className={classnames(css.zoom, isHorizontal ? css.isHorizontal : css.isVertical)}
      style={style}
      ref={ref}
    >
      <div
        className={classnames(css.zoomBar, isDefaultZoom(value) && css.isHidden)}
        style={zoomBarStyle}
        onPointerDown={handleDragStart}
        onPointerMove={isDragging ? handleDragMove : undefined}
        onPointerUp={handleDragStop}
      />
      <fieldset className={css.buttonsFieldset} disabled={isZooming}>
        <div className={css.buttons}>
          <div className={css.buttonGroup}>
            <button
              type="button"
              className={classnames(css.button, css.resetButton)}
              onClick={() => changeZoomScale(1)}
              disabled={zoomScale === 1}
            >
              [ ]
            </button>
          </div>
          <div className={css.buttonGroup}>
            <button
              type="button"
              className={css.button}
              onClick={handleZoomIn}
              disabled={zoomScale <= MIN_ZOOM_SCALE}
            >
              −
            </button>
            <button
              type="button"
              className={css.button}
              onClick={handleZoomOut}
              disabled={zoomScale >= MAX_ZOOM_SCALE}
            >
              +
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
