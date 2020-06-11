import React from 'react'

import { Text } from '@gpn-design/uikit/Text'
import { useTheme } from '@gpn-design/uikit/Theme'
import classnames from 'classnames'
import * as _ from 'lodash'

import { PositionState } from '@/common/utils/tooltips'
import { isDefinedPosition } from '@/common/utils/type-guards'
import { PortalWithTheme } from '@/core/PortalWithTheme'

import { getComputedPositionAndDirection } from './helpers'
import css from './index.css'

const ARROW_SIZE = 6
const ARROW_SIZE_OFFSET = ARROW_SIZE * 2

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

export type PositioningProps = AttachedToAnchor | AttachedToPosition

type Props = {
  isVisible: boolean
  direction?: Direction
  className?: string
  isContentHoverable?: boolean
  offset?: number
  withArrow?: boolean
  possibleDirections?: readonly Direction[]
} & PositioningProps &
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

const isAnchorRef = (
  p: AttachedToAnchor['anchorRef'] | AttachedToPosition['position']
): p is AttachedToAnchor['anchorRef'] => Boolean(p && 'current' in p)

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

  const positionOrAnchorRef = 'position' in props ? props.position : props.anchorRef

  const { theme, themeClassNames } = useTheme()
  const mainRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState<PositionState>()
  const [direction, setDirection] = React.useState<Direction>(passedDirection)
  const [bannedDirections, setBannedDirections] = React.useState<readonly Direction[]>([])

  const calculateLayout = React.useCallback(() => {
    if (mainRef.current && isDefinedPosition(position)) {
      let basePositionData

      if (isAnchorRef(positionOrAnchorRef) && positionOrAnchorRef.current) {
        basePositionData = { anchorClientRect: positionOrAnchorRef.current.getBoundingClientRect() }
      } else if (!isAnchorRef(positionOrAnchorRef) && isDefinedPosition(positionOrAnchorRef)) {
        basePositionData = { position: positionOrAnchorRef }
      } else {
        return
      }

      const {
        position: computedPosition,
        direction: computedDirection,
      } = getComputedPositionAndDirection({
        tooltipSize: mainRef.current.getBoundingClientRect(),
        parentSize: {
          // Размер вьюпорта без скроллбаров
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        },
        offset: offset + ARROW_SIZE_OFFSET,
        direction: passedDirection,
        possibleDirections,
        bannedDirections,
        ...basePositionData,
      })

      if (isDefinedPosition(computedPosition) && !_.isEqual(position, computedPosition)) {
        setPosition(computedPosition)
      }

      if (direction !== computedDirection) {
        if (isAnchorRef(positionOrAnchorRef)) {
          /**
           * Может возникнуть ситуация, когда перерасчет тултипа всегда будет выдавать 2 направления
           * и бесконечно зацикливать себя, отчего будет падать всё приложение. Для избежания таких кейсов
           * мы запоминаем стороны, которые не подошли, что бы не возвращаться к ним и предотвратить бесконечный ререндер.
           * При закрытии тултипа эти стороны сбрасываются.
           */
          setBannedDirections([...bannedDirections, direction])
        }

        setDirection(computedDirection)
      }
    }
  }, [
    position,
    direction,
    mainRef,
    offset,
    possibleDirections,
    passedDirection,
    positionOrAnchorRef,
    bannedDirections,
  ])

  React.useLayoutEffect(() => {
    if (isVisible && !mainRef.current && !isDefinedPosition(position)) {
      if (isAnchorRef(positionOrAnchorRef) && positionOrAnchorRef.current) {
        const { left, top } = positionOrAnchorRef.current.getBoundingClientRect()

        return setPosition({ x: left, y: top })
      }

      if (!isAnchorRef(positionOrAnchorRef) && isDefinedPosition(positionOrAnchorRef)) {
        return setPosition({ x: positionOrAnchorRef.x, y: positionOrAnchorRef.y })
      }

      return
    }

    if (mainRef.current && isDefinedPosition(position)) {
      calculateLayout()
    }

    setBannedDirections(state => (!isVisible && bannedDirections.length ? [] : state))
  }, [positionOrAnchorRef, isVisible, mainRef, position, calculateLayout, bannedDirections])

  if (!isVisible || !isDefinedPosition(position)) {
    return null
  }

  return (
    <PortalWithTheme theme={theme} container={window.document.body}>
      <div
        ref={mainRef}
        className={classnames(
          themeClassNames.color.invert,
          css.main,
          directionClasses[direction],
          withArrow && css.withArrow,
          isContentHoverable && css.isHoverable
        )}
        style={{
          top: position.y,
          left: position.x,
          ['--arrow-size' as string]: `${ARROW_SIZE}px`,
        }}
      >
        <div ref={ref} className={classnames(css.tooltip, className)}>
          {'renderContent' in props ? (
            props.renderContent(direction)
          ) : (
            <Text as="div" size="xs" view="primary">
              {children}
            </Text>
          )}
        </div>
      </div>
    </PortalWithTheme>
  )
})
