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

type IsInBorders = {
  top: boolean
  bottom: boolean
  vertical: boolean
  right: boolean
  left: boolean
  horizontal: boolean
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
}): IsInBorders => {
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

const getDirections = (
  isInBorders: IsInBorders,
  initialDirection: Direction
): readonly Direction[] => {
  const mutableDirections: Direction[] = []

  switch (true) {
    case isInBorders.vertical && isInBorders.right: {
      mutableDirections.push('left')
    }
    case isInBorders.vertical && isInBorders.left: {
      mutableDirections.push('right')
    }
    case isInBorders.vertical: {
      mutableDirections.push(
        initialDirection.toLocaleLowerCase().includes('left') ? 'left' : 'right'
      )
    }
    case isInBorders.horizontal && isInBorders.bottom: {
      mutableDirections.push('upCenter')
    }
    case isInBorders.horizontal: {
      mutableDirections.push(initialDirection.includes('up') ? 'upCenter' : 'downCenter')
    }
    case isInBorders.top && isInBorders.right: {
      mutableDirections.push('downLeft')
    }
    case isInBorders.top && isInBorders.left: {
      mutableDirections.push('downRight')
    }
    case isInBorders.bottom && isInBorders.right: {
      mutableDirections.push('upLeft')
    }
    case isInBorders.bottom && isInBorders.left: {
      mutableDirections.push('upRight')
    }
    case isInBorders.top: {
      if (['left', 'upLeft'].includes(initialDirection)) {
        mutableDirections.push('downLeft')
      }
      if (['right', 'upRight'].includes(initialDirection)) {
        mutableDirections.push('downRight')
      }
      if (initialDirection === 'upCenter') {
        mutableDirections.push('downCenter')
      }
      mutableDirections.push(initialDirection)
    }
    case isInBorders.right: {
      if (isDirectionUp(initialDirection)) {
        mutableDirections.push('upLeft')
      }
      if (isDirectionDown(initialDirection)) {
        mutableDirections.push('downLeft')
      }
      mutableDirections.push('left')
    }
    case isInBorders.bottom: {
      if (['left', 'downLeft'].includes(initialDirection)) {
        mutableDirections.push('upLeft')
      }
      if (['right', 'downRight'].includes(initialDirection)) {
        mutableDirections.push('upRight')
      }
      if (initialDirection === 'downCenter') {
        mutableDirections.push('upCenter')
      }
      mutableDirections.push(initialDirection)
    }
    case isInBorders.left: {
      if (isDirectionUp(initialDirection)) {
        mutableDirections.push('upRight')
      }
      if (isDirectionDown(initialDirection)) {
        mutableDirections.push('downRight')
      }
      mutableDirections.push('right')
    }
  }

  return mutableDirections
}

type ComputedPositionAndDirectionProps = {
  tooltipSize: Size
  parentSize: Size
  offset?: number
  direction: Direction
  possibleDirections: readonly Direction[]
} & ({ anchorClientRect: ClientRect } | AttachedToPosition)

export const getComputedPositionAndDirection = (
  props: ComputedPositionAndDirectionProps
): {
  direction: Direction
  position: NonNullable<PositionState>
} => {
  const {
    offset = 0,
    parentSize,
    direction: initialDirection,
    tooltipSize,
    possibleDirections,
  } = props

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

  const direction = getDirections(isInBorders, initialDirection).find(dir =>
    possibleDirections.includes(dir)
  )

  if (direction) {
    return {
      direction,
      position: positionsByDirection[direction],
    }
  } else {
    return defaultPositionAndDirection
  }
}
