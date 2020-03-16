import { AttachedToPosition, Direction } from '@/components/Tooltip/index'
import { Position, PositionState } from '@/utils/tooltips'
import { isDefinedPosition } from '@/utils/type-guards'

type Size = Pick<ClientRect, 'width' | 'height'>

const getIsInBorders = ({
  position,
  parentSize,
  tooltipSize,
}: {
  position: Position
  parentSize: Size
  tooltipSize: Size
}): {
  top: boolean
  bottom: boolean
  vertical: boolean
  right: boolean
  left: boolean
  horizontal: boolean
} => {
  const isInTopBorder = position.y <= tooltipSize.height
  const isInBottomBorder = position.y >= parentSize.height - tooltipSize.height
  const isInVerticalBorders = isInTopBorder && isInBottomBorder
  const isInLeftBorder = position.x <= tooltipSize.width
  const isInRightBorder = position.x >= parentSize.width - tooltipSize.width
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
  const closestToCornerPosition: NonNullable<PositionState> = { ...initialPosition }

  if ('anchorClientRect' in props) {
    initialPosition.x = props.anchorClientRect.left
    initialPosition.y = props.anchorClientRect.bottom

    closestToCornerPosition.x =
      props.anchorClientRect.left < parentSize.width - props.anchorClientRect.right
        ? props.anchorClientRect.left
        : props.anchorClientRect.right
    closestToCornerPosition.y =
      props.anchorClientRect.top < parentSize.height - props.anchorClientRect.bottom
        ? props.anchorClientRect.top
        : props.anchorClientRect.bottom
  } else if ('position' in props && isDefinedPosition(props.position)) {
    initialPosition.x = props.position.x
    initialPosition.y = props.position.y
  }

  let positionToCheckIfIsInBorders

  if ('position' in props) {
    positionToCheckIfIsInBorders = initialPosition
  } else if ('anchorClientRect' in props) {
    positionToCheckIfIsInBorders = closestToCornerPosition
  }

  if (!isDefinedPosition(positionToCheckIfIsInBorders) || !isDefinedPosition(initialPosition)) {
    return { direction: initialDirection, position: initialPosition }
  }

  const { width: tooltipWidth, height: tooltipHeight } = tooltipSize
  const anchorWidth = ('anchorClientRect' in props && props.anchorClientRect?.width) || 0
  const anchorHeight = ('anchorClientRect' in props && props.anchorClientRect?.height) || 0

  const isInBorders = getIsInBorders({
    position: positionToCheckIfIsInBorders,
    parentSize,
    tooltipSize,
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
        return 'downCenter'
      }
      case isInBorders.right: {
        return 'left'
      }
      case isInBorders.bottom: {
        return 'upCenter'
      }
      case isInBorders.left: {
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
