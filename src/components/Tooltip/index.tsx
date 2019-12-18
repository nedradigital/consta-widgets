import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import { useClickOutside } from '@gaz/utils/lib/use-click-outside'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { Direction, Hint } from '@/ui/Hint'

import css from './index.css'

type Props = {
  isVisible: boolean
  direction: Direction
  x?: number
  y?: number
  className?: string
  onClickOutside?: (event: MouseEvent) => void
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

export const Tooltip: React.FC<Props> = ({
  children,
  isVisible,
  direction,
  x,
  y,
  className,
  onClickOutside,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const { width, height } = useComponentSize(ref)

  useClickOutside([ref], event => {
    onClickOutside && onClickOutside(event)
  })

  return ReactDOM.createPortal(
    <Hint
      ref={ref}
      className={classnames(css.tooltip, isVisible && css.open, className)}
      direction={direction}
      style={{
        ...convertCoordinatesToStyles({ width, height, x, y, direction }),
        transform: 'initial',
      }}
    >
      {children}
    </Hint>,
    window.document.body
  )
}
