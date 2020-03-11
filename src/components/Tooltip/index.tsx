import React from 'react'
import ReactDOM from 'react-dom'

import { Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { themeColorLight } from '@/utils/theme'
import { Position } from '@/utils/tooltips'
import { isDefinedPosition } from '@/utils/type-guards'

import css from './index.css'

export const horizontalDirections = ['left', 'center', 'right'] as const
export const verticalDirections = ['top', 'center', 'bottom'] as const

type Size = {
  width: number
  height: number
}

export type HorizontalDirection = typeof horizontalDirections[number]
export type VerticalDirection = typeof verticalDirections[number]

type Props = {
  children: React.ReactNode
  isVisible: boolean
  horizontalDirection?: HorizontalDirection
  verticalDirection?: VerticalDirection
  position: Partial<Position> | undefined
  className?: string
}

const PARENT_ELEMENT = window.document.body

const directionClasses: Record<HorizontalDirection | VerticalDirection, string> = {
  top: css.top,
  right: css.right,
  bottom: css.bottom,
  left: css.left,
  center: css.center,
}

export const getAutoDirection = ({
  elementSize,
  parentSize,
  position,
  selectedHorizontalDirection = 'center',
  selectedVerticalDirection = 'top',
}: {
  elementSize: Size
  parentSize: Size
  position: Position
  selectedHorizontalDirection?: HorizontalDirection
  selectedVerticalDirection?: VerticalDirection
}): { horizontal: HorizontalDirection; vertical: VerticalDirection } | undefined => {
  const elementWidth =
    selectedHorizontalDirection === 'center' ? elementSize.width / 2 : elementSize.width
  const elementHeight =
    selectedVerticalDirection === 'center' ? elementSize.height / 2 : elementSize.height
  const inTopBorder = position.y <= elementHeight
  const inRightBorder = position.x >= parentSize.width - elementWidth
  const inBottomBorder = position.y >= parentSize.height - elementHeight
  const inLeftBorder = position.x <= elementWidth
  const inBothHorizontalsBorders = inLeftBorder && inRightBorder
  const inBothVerticalsBorder = inTopBorder && inBottomBorder

  /**
   * Если позиция тултипа по горизонтали или вертикали, или сразу по всем
   * направлениям входит в границы, тогда мы не можем определить в какую
   * сторону перевернуть тултип.
   */
  if (inBothHorizontalsBorders || inBothVerticalsBorder) {
    return
  }

  if (inTopBorder && inRightBorder) {
    return {
      horizontal: 'left',
      vertical: 'bottom',
    }
  }

  if (inTopBorder && inLeftBorder) {
    return {
      horizontal: 'right',
      vertical: 'bottom',
    }
  }

  if (inBottomBorder && inRightBorder) {
    return {
      horizontal: 'left',
      vertical: 'top',
    }
  }

  if (inBottomBorder && inLeftBorder) {
    return {
      horizontal: 'right',
      vertical: 'top',
    }
  }

  if (inTopBorder) {
    return {
      horizontal: selectedHorizontalDirection,
      vertical: 'bottom',
    }
  }

  if (inRightBorder) {
    return {
      horizontal: 'left',
      vertical: selectedVerticalDirection,
    }
  }

  if (inBottomBorder) {
    return {
      horizontal: selectedHorizontalDirection,
      vertical: 'top',
    }
  }

  if (inLeftBorder) {
    return {
      horizontal: 'right',
      vertical: selectedVerticalDirection,
    }
  }
}

export const Tooltip = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    isVisible,
    horizontalDirection = 'center',
    verticalDirection = 'top',
    position,
    className,
  } = props

  const mainRef = React.useRef<HTMLDivElement>(null)
  const [direction, setDirection] = React.useState({
    horizontal: horizontalDirection,
    vertical: verticalDirection,
  })

  React.useLayoutEffect(() => {
    if (!mainRef.current || !isDefinedPosition(position)) {
      return
    }

    const computedDirection = getAutoDirection({
      elementSize: mainRef.current.getBoundingClientRect(),
      parentSize: PARENT_ELEMENT.getBoundingClientRect(),
      position,
      selectedHorizontalDirection: horizontalDirection,
      selectedVerticalDirection: verticalDirection,
    }) || {
      horizontal: horizontalDirection,
      vertical: verticalDirection,
    }

    setDirection(computedDirection)
  }, [isVisible, mainRef, position, horizontalDirection, verticalDirection])

  if (!isVisible || !isDefinedPosition(position)) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      ref={mainRef}
      className={classnames(
        themeColorLight,
        css.main,
        directionClasses[direction.horizontal],
        directionClasses[direction.vertical]
      )}
      style={{ top: position.y, left: position.x }}
    >
      <div ref={ref} className={classnames(css.tooltip, className)}>
        <Text tag="div" size="xs" view="primary">
          {children}
        </Text>
      </div>
    </div>,
    PARENT_ELEMENT
  )
})
