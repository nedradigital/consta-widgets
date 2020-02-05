import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

import { useClickOutside } from '@gaz/utils/lib/use-click-outside'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { useBaseSize } from '@/contexts'
import { Direction, Hint } from '@/ui/Hint'
import { themeColorLight } from '@/utils/theme'

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
  triangleSize: number
  width?: number
  height?: number
  x?: number
  y?: number
}

const TRIANGLE_SIZE = 10

const convertCoordinatesToStyles = ({
  direction,
  triangleSize,
  width = 0,
  height = 0,
  x = 0,
  y = 0,
}: CoordinatesOptions) => {
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
  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const { width, height } = useComponentSize(ref)
  const triangleSize = getCalculatedSizeWithBaseSize(TRIANGLE_SIZE)

  useClickOutside([ref], event => {
    onClickOutside && onClickOutside(event)
  })

  if (!isVisible) {
    return null
  }

  return ReactDOM.createPortal(
    <Hint
      ref={ref}
      className={classnames(themeColorLight, className)}
      direction={direction}
      style={{
        ...convertCoordinatesToStyles({ width, height, x, y, direction, triangleSize }),
        transform: 'initial',
      }}
    >
      {children}
    </Hint>,
    window.document.body
  )
}
