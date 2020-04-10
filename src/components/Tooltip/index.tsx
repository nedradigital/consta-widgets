import React from 'react'
import ReactDOM from 'react-dom'

import { Text } from '@gpn-design/uikit'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { themeColorLight } from '@/utils/theme'
import { PositionState } from '@/utils/tooltips'
import { isDefinedPosition } from '@/utils/type-guards'

import { getComputedPositionAndDirection } from './helpers'
import css from './index.css'

const TOOLTIP_PARENT_ELEMENT = window.document.body

export const directions = [
  'upLeft',
  'upCenter',
  'upRight',
  'left',
  'right',
  'downLeft',
  'downCenter',
  'downRight',
] as const

export type Direction = typeof directions[number]

type AttachedToAnchor = {
  anchorRef: React.RefObject<HTMLElement>
}

export type AttachedToPosition = {
  position: PositionState
}

type Props = {
  isVisible: boolean
  direction?: Direction
  className?: string
  isContentHoverable?: boolean
  offset?: number
  withArrow?: boolean
  possibleDirections?: readonly Direction[]
} & (AttachedToAnchor | AttachedToPosition) &
  (
    | {
        children: React.ReactNode
      }
    | {
        renderContent: (direction: Direction) => React.ReactNode
      }
  )

const directionClasses: Record<Direction, string> = {
  upLeft: css.upLeft,
  upCenter: css.upCenter,
  upRight: css.upRight,
  left: css.left,
  right: css.right,
  downLeft: css.downLeft,
  downCenter: css.downCenter,
  downRight: css.downRight,
}

export const Tooltip = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    isVisible,
    direction: passedDirection = 'upCenter',
    className,
    isContentHoverable,
    offset = 0,
    withArrow = true,
    possibleDirections = directions,
  } = props

  const mainRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(mainRef)
  const [position, setPosition] = React.useState<PositionState>()
  const [direction, setDirection] = React.useState<Direction>(passedDirection)

  React.useLayoutEffect(() => {
    if (isVisible && !mainRef.current && !isDefinedPosition(position)) {
      if ('anchorRef' in props && props.anchorRef && props.anchorRef.current) {
        const { left, top } = props.anchorRef.current.getBoundingClientRect()

        return setPosition({ x: left, y: top })
      }

      if ('position' in props && isDefinedPosition(props.position)) {
        return setPosition({ x: props.position.x, y: props.position.y })
      }

      return
    }

    if (mainRef.current && isDefinedPosition(position)) {
      let basePositionData

      if ('anchorRef' in props && props.anchorRef && props.anchorRef.current) {
        basePositionData = { anchorClientRect: props.anchorRef.current.getBoundingClientRect() }
      } else if ('position' in props && isDefinedPosition(props.position)) {
        basePositionData = { position: props.position }
      } else {
        return
      }

      const {
        position: computedPosition,
        direction: computedDirection,
      } = getComputedPositionAndDirection({
        tooltipSize: mainRef.current.getBoundingClientRect(),
        parentSize: TOOLTIP_PARENT_ELEMENT.getBoundingClientRect(),
        offset,
        direction: passedDirection,
        possibleDirections,
        ...basePositionData,
      })

      if (
        isDefinedPosition(computedPosition) &&
        (computedPosition.x !== position.x || computedPosition.y !== position.y)
      ) {
        setPosition(computedPosition)
      }

      if (direction !== computedDirection) {
        setDirection(computedDirection)
      }
    }
  }, [
    props,
    isVisible,
    mainRef,
    position,
    direction,
    passedDirection,
    offset,
    width,
    height,
    possibleDirections,
  ])

  if (!isVisible || !isDefinedPosition(position)) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      ref={mainRef}
      className={classnames(
        themeColorLight,
        css.main,
        directionClasses[direction],
        withArrow && css.withArrow,
        isContentHoverable && css.isHoverable
      )}
      style={{ top: position.y, left: position.x }}
    >
      <div ref={ref} className={classnames(css.tooltip, className)}>
        {'renderContent' in props ? (
          props.renderContent(direction)
        ) : (
          <Text tag="div" size="xs" view="primary">
            {children}
          </Text>
        )}
      </div>
    </div>,
    TOOLTIP_PARENT_ELEMENT
  )
})
