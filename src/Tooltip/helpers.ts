import _ from 'lodash'

import { Direction, Position } from './'

type Size = Pick<ClientRect, 'width' | 'height'>

type PositionsByDirection = Record<Direction, NonNullable<Position>>

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
  positionsByDirection: PositionsByDirection
  initialDirection: Direction
  tooltipSize: Size
  parentSize: Size
  possibleDirections: readonly Direction[]
  bannedDirections: readonly Direction[]
}): {
  direction: Direction
  position: Position
} => {
  const result = _.sortBy(orderOfDirections, dir => (dir === initialDirection ? -1 : 0))
    .filter(dir => possibleDirections.includes(dir) && !bannedDirections.includes(dir))
    .find(dir => {
      const pos = positionsByDirection[dir]
      const { width, height } = tooltipSize

      const isFittingDown = pos.y + height <= parentSize.height
      const isFittingUp = pos.y >= 0
      const isFittingVerticallyCenter = isFittingUp && isFittingDown

      const isFittingLeft = pos.x >= 0
      const isFittingRight = pos.x + width <= parentSize.width
      const isFittingHorizontallyCenter = isFittingLeft && isFittingRight

      switch (dir) {
        case 'left':
          return isFittingVerticallyCenter && isFittingLeft
        case 'right':
          return isFittingVerticallyCenter && isFittingRight
        case 'upCenter':
          return isFittingUp && isFittingHorizontallyCenter
        case 'upLeft':
          return isFittingUp && isFittingLeft
        case 'upRight':
          return isFittingUp && isFittingRight
        case 'downCenter':
          return isFittingDown && isFittingHorizontallyCenter
        case 'downLeft':
          return isFittingDown && isFittingLeft
        case 'downRight':
          return isFittingDown && isFittingRight
      }
    })

  const direction = result || initialDirection
  const position = positionsByDirection[direction]

  return {
    direction,
    position: {
      x: position.x + window.scrollX,
      y: position.y + window.scrollY,
    },
  }
}

type ComputedPositionAndDirectionParams = {
  position: Position
  tooltipSize: Size
  parentSize: Size
  anchorSize?: Size
  offset: number
  direction: Direction
  possibleDirections: readonly Direction[]
  bannedDirections: readonly Direction[]
}

export const getComputedPositionAndDirection = ({
  position,
  tooltipSize,
  parentSize,
  anchorSize = { width: 0, height: 0 },
  offset,
  direction: initialDirection,
  possibleDirections,
  bannedDirections,
}: ComputedPositionAndDirectionParams): {
  direction: Direction
  position: Position
} => {
  if (!position) {
    return { position, direction: initialDirection }
  }

  const { width: tooltipWidth, height: tooltipHeight } = tooltipSize
  const { width: anchorWidth, height: anchorHeight } = anchorSize

  const leftPositionX = Math.round(position.x - Math.abs(tooltipWidth - anchorWidth))
  const rightPositionX = Math.round(position.x)
  const centerPositionX = Math.round(position.x - Math.abs(tooltipWidth - anchorWidth) / 2)
  const upPositionY = Math.round(position.y - anchorHeight - tooltipHeight - offset)
  const downPositionY = Math.round(position.y + offset)
  const centerPositionY = Math.round(position.y - anchorHeight / 2 - tooltipHeight / 2)

  const positionsByDirection: PositionsByDirection = {
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
      x: Math.round(position.x + anchorWidth + offset),
      y: centerPositionY,
    },
    left: {
      x: Math.round(position.x - tooltipWidth - offset),
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
