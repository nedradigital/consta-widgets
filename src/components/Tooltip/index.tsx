import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { Direction, Hint } from '@/ui/Hint'

import css from './index.css'

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

const getTriangleSize = () => getCalculatedSize(10)

const convertCoordinatesToStyles = ({
  direction,
  width = 0,
  height = 0,
  x = 0,
  y = 0,
}: CoordinatesOptions) => {
  const triangleSize = getTriangleSize()

  switch (direction) {
    case 'top': {
      return {
        top: y - height - triangleSize,
        left: x - width / 2,
      }
    }
    case 'right': {
      return {
        top: y - height / 2,
        left: x + triangleSize,
      }
    }
    case 'bottom': {
      return {
        top: y + triangleSize,
        left: x - width / 2,
      }
    }
    case 'left': {
      return {
        top: y - height / 2,
        left: x - width - triangleSize,
      }
    }
  }
}

export const Tooltip: React.FC<Props> = ({ children, isVisible, direction, x, y }) => {
  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)

  return ReactDOM.createPortal(
    <Hint
      containerRef={ref}
      className={classnames(css.tooltip, isVisible && css.open)}
      direction={direction}
      styles={{
        ...convertCoordinatesToStyles({ width, height, x, y, direction }),
        transform: 'initial',
      }}
    >
      {children}
    </Hint>,
    window.document.body
  )
}
