import React from 'react'
import ReactDOM from 'react-dom'
import useDimensions from 'react-use-dimensions'

import { getCalculatedSize } from '@gaz/utils/lib/css'

import { Direction, Hint } from '@/ui/Hint'

type Props = {
  isVisible: boolean
  direction: Direction
  x?: number
  y?: number
}

type CoordinatesOptions = {
  direction: Direction
  width?: number
  height?: number
  x?: number
  y?: number
}

const getTriangleSize = () => getCalculatedSize(6)

const covertCoordinatesToStyles = ({
  direction,
  width = 0,
  height = 0,
  x = 0,
  y = 0,
}: CoordinatesOptions) => {
  const triangleSize = getTriangleSize()

  switch (direction) {
    case 'top':
      return {
        top: y - height + triangleSize,
        left: x - width,
      }
    case 'right':
      return {
        top: y,
        left: x - width - triangleSize,
      }
    case 'bottom':
      return {
        top: y - triangleSize,
        left: x - width,
      }
    case 'left':
      return {
        top: y,
        left: x - width + triangleSize,
      }
  }
}

export const Tooltip: React.FC<Props> = ({ children, isVisible, direction, x, y }) => {
  const [ref, { width, height }] = useDimensions()

  if (!isVisible || !x || !y) {
    return null
  }

  return ReactDOM.createPortal(
    <Hint
      containerRef={ref}
      direction={direction}
      styles={covertCoordinatesToStyles({ width, height, x, y, direction })}
    >
      {children}
    </Hint>,
    window.document.body
  )
}
