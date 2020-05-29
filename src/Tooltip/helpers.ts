import _ from 'lodash'

import { Position, PositionState } from '@/common/utils/tooltips'
import { isDefinedPosition } from '@/common/utils/type-guards'
import { AttachedToPosition, Direction } from '@/Tooltip/index'

type Size = Pick<ClientRect, 'width' | 'height'>

/**
 * Порядок сторон, куда мы можем развернуть тултип.
 * Используется первая сторона, в которую смог вписаться тултип.
 */
const orderOfDirections: readonly Direction[] = [
  'downCenter',
  'upCenter',

  'downRight',
  'downLeft',
  'upRight',
  'upLeft',

  'left',
  'right',
]

const getDirectionAndPosition = ({
  positionsByDirection,
  initialDirection,
  tooltipSize,
  parentSize,
  bannedDirections,
  possibleDirections,
}: {
  positionsByDirection: Record<Direction, Position>
  initialDirection: Direction
  tooltipSize: Size
  parentSize: Size
  possibleDirections: readonly Direction[]
  bannedDirections: readonly Direction[]
}) => {
  const result = _.sortBy(orderOfDirections, dir => (dir === initialDirection ? -1 : 0))
    .filter(dir => possibleDirections.includes(dir) && !bannedDirections.includes(dir))
    .find(dir => {
      const pos = positionsByDirection[dir]
      const { width, height } = tooltipSize

      switch (dir) {
        case 'left': {
          return pos.x >= 0 && pos.y + height / 2 <= parentSize.height && pos.y - height / 2 >= 0
        }

        case 'right': {
          return (
            pos.x + width <= parentSize.width &&
            pos.y + height / 2 <= parentSize.height &&
            pos.y - height / 2 >= 0
          )
        }

        case 'upCenter': {
          return pos.x >= 0 && pos.x + width <= parentSize.width && pos.y >= 0
        }

        case 'upLeft': {
          return pos.x >= 0 && pos.y >= 0
        }

        case 'upRight': {
          return pos.x + width <= parentSize.width && pos.y >= 0
        }

        case 'downCenter': {
          return (
            pos.x >= 0 && pos.x + width <= parentSize.width && pos.y + height <= parentSize.height
          )
        }

        case 'downLeft': {
          return pos.x >= 0 && pos.y + height <= parentSize.height
        }

        case 'downRight': {
          return pos.x + width <= parentSize.width && pos.y + height <= parentSize.height
        }
      }
    })

  const direction = result || initialDirection

  return {
    direction,
    position: positionsByDirection[direction],
  }
}

type ComputedPositionAndDirectionProps = {
  tooltipSize: Size
  parentSize: Size
  offset?: number
  direction: Direction
  possibleDirections: readonly Direction[]
  bannedDirections: readonly Direction[]
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
    bannedDirections,
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

  return getDirectionAndPosition({
    positionsByDirection,
    initialDirection,
    tooltipSize,
    parentSize,
    bannedDirections,
    possibleDirections,
  })
}
