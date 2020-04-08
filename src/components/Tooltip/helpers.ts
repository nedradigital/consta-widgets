import { AttachedToPosition, Direction } from '@/components/Tooltip/index'
import { Position, PositionState } from '@/utils/tooltips'
import { isDefinedPosition } from '@/utils/type-guards'

type Size = Pick<ClientRect, 'width' | 'height'>

const isDirectionUp = (direction: Direction) => {
  return ['upLeft', 'upCenter', 'upRight'].includes(direction)
}

const isDirectionDown = (direction: Direction) => {
  return ['downLeft', 'downCenter', 'downRight'].includes(direction)
}

export const getIsInBorders = ({
  position,
  parentSize,
  tooltipSize,
  anchorSize = { width: 0, height: 0 },
  offset = 0,
}: {
  position: Position
  parentSize: Size
  tooltipSize: Size
  anchorSize?: Size
  offset?: number
}): {
  top: boolean
  bottom: boolean
  vertical: boolean
  right: boolean
  left: boolean
  horizontal: boolean
} => {
  const isInTopBorder = position.y - anchorSize.height <= tooltipSize.height + offset
  const isInBottomBorder = position.y >= parentSize.height - tooltipSize.height - offset
  const isInVerticalBorders = isInTopBorder && isInBottomBorder
  const isInLeftBorder = position.x <= tooltipSize.width + offset
  const isInRightBorder =
    position.x + anchorSize.width >= parentSize.width - tooltipSize.width - offset
  const isInHorizontalBorders = isInLeftBorder && isInRightBorder

  return {
    top: isInTopBorder,
    bottom: isInBottomBorder,
    vertical: isInVerticalBorders,
    left: isInLeftBorder,
    right: isInRightBorder,
    horizontal: isInHorizontalBorders,
  }
}

type ComputedPositionAndDirectionProps = {
  tooltipSize: Size
  parentSize: Size
  offset?: number
  direction: Direction
} & ({ anchorClientRect: ClientRect } | AttachedToPosition)

export const getComputedPositionAndDirection = (
  props: ComputedPositionAndDirectionProps
): {
  direction: Direction
  position: NonNullable<PositionState>
} => {
  const { offset = 0, parentSize, direction: initialDirection, tooltipSize } = props

  const initialPosition: NonNullable<PositionState> = {
    x: undefined,
    y: undefined,
  }

  if ('anchorClientRect' in props) {
    initialPosition.x = props.anchorClientRect.left
    initialPosition.y = props.anchorClientRect.bottom
  } else if ('position' in props && isDefinedPosition(props.position)) {
    initialPosition.x = props.position.x
    initialPosition.y = props.position.y
  }

  if (!isDefinedPosition(initialPosition)) {
    return { direction: initialDirection, position: initialPosition }
  }

  const { width: tooltipWidth, height: tooltipHeight } = tooltipSize
  const anchorWidth = ('anchorClientRect' in props && props.anchorClientRect.width) || 0
  const anchorHeight = ('anchorClientRect' in props && props.anchorClientRect.height) || 0

  const isInBorders = getIsInBorders({
    position: initialPosition,
    parentSize,
    tooltipSize,
    offset,
    anchorSize: { width: anchorWidth, height: anchorHeight },
  })

  const leftPositionX = Math.round(initialPosition.x - Math.abs(tooltipWidth - anchorWidth))
  const rightPositionX = Math.round(initialPosition.x)
  const centerPositionX = Math.round(initialPosition.x - Math.abs(tooltipWidth - anchorWidth) / 2)
  const upPositionY = Math.round(initialPosition.y - anchorHeight - tooltipHeight - offset)
  const downPositionY = Math.round(initialPosition.y + offset)
  const centerPositionY = Math.round(initialPosition.y - anchorHeight / 2)

  const positionsByDirection: Record<Direction, Position> = {
    upLeft: {
      x: leftPositionX,
      y: upPositionY,
    },
    upCenter: {
      x: centerPositionX,
      y: upPositionY,
    },
    upRight: {
      x: rightPositionX,
      y: upPositionY,
    },
    right: {
      x: Math.round(initialPosition.x + anchorWidth + offset),
      y: centerPositionY,
    },
    left: {
      x: Math.round(initialPosition.x - tooltipWidth - offset),
      y: centerPositionY,
    },
    downLeft: {
      x: leftPositionX,
      y: downPositionY,
    },
    downCenter: {
      x: centerPositionX,
      y: downPositionY,
    },
    downRight: {
      x: rightPositionX,
      y: downPositionY,
    },
  }

  const defaultPositionAndDirection = {
    direction: initialDirection,
    position: positionsByDirection[initialDirection],
  }

  if (isInBorders.vertical && isInBorders.horizontal) {
    return defaultPositionAndDirection
  }

  const direction: Direction | undefined = (inBorders => {
    switch (true) {
      case inBorders.vertical && inBorders.right: {
        return 'left'
      }
      case isInBorders.vertical && isInBorders.left: {
        return 'right'
      }
      case isInBorders.vertical: {
        return initialDirection.toLocaleLowerCase().includes('left') ? 'left' : 'right'
      }
      case isInBorders.horizontal && isInBorders.bottom: {
        return 'upCenter'
      }
      case isInBorders.horizontal: {
        return initialDirection.includes('up') ? 'upCenter' : 'downCenter'
      }
      case isInBorders.top && isInBorders.right: {
        return 'downLeft'
      }
      case isInBorders.top && isInBorders.left: {
        return 'downRight'
      }
      case isInBorders.bottom && isInBorders.right: {
        return 'upLeft'
      }
      case isInBorders.bottom && isInBorders.left: {
        return 'upRight'
      }
      case isInBorders.top: {
        if (['left', 'upLeft'].includes(initialDirection)) {
          return 'downLeft'
        }
        if (['right', 'upRight'].includes(initialDirection)) {
          return 'downRight'
        }
        if (initialDirection === 'upCenter') {
          return 'downCenter'
        }
        return initialDirection
      }
      case isInBorders.right: {
        if (isDirectionUp(initialDirection)) {
          return 'upLeft'
        }
        if (isDirectionDown(initialDirection)) {
          return 'downLeft'
        }
        return 'left'
      }
      case isInBorders.bottom: {
        if (['left', 'downLeft'].includes(initialDirection)) {
          return 'upLeft'
        }
        if (['right', 'downRight'].includes(initialDirection)) {
          return 'upRight'
        }
        if (initialDirection === 'downCenter') {
          return 'upCenter'
        }
        return initialDirection
      }
      case isInBorders.left: {
        if (isDirectionUp(initialDirection)) {
          return 'upRight'
        }
        if (isDirectionDown(initialDirection)) {
          return 'downRight'
        }
        return 'right'
      }
      default: {
        return undefined
      }
    }
  })(isInBorders)

  if (direction) {
    return {
      direction,
      position: positionsByDirection[direction],
    }
  } else {
    return defaultPositionAndDirection
  }
}
