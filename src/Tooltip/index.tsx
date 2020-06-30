import React from 'react'

import { Text } from '@gpn-design/uikit/Text'
import { useTheme } from '@gpn-design/uikit/Theme'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { PortalWithTheme } from '@/core/PortalWithTheme'

import { getComputedPositionAndDirection } from './helpers'
import css from './index.css'
import { useTooltipReposition } from './use-tooltip-reposition'

export { useTooltipReposition }

const ARROW_SIZE = 6

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

export type Position = { x: number; y: number } | undefined

type AttachedToAnchor = {
  anchorRef: React.RefObject<HTMLElement>
  position?: never
}

export type AttachedToPosition = {
  anchorRef?: never
  position: Position
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

export const Tooltip = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    isVisible,
    direction: passedDirection = 'upCenter',
    className,
    isContentHoverable,
    offset = 6,
    withArrow = true,
    possibleDirections = directions,
  } = props
  const passedPosition = 'position' in props ? props.position : undefined
  const anchorRef = 'anchorRef' in props ? props.anchorRef : undefined
  const mainRef = React.useRef<HTMLDivElement>(null)
  const { theme, themeClassNames } = useTheme()
  const [anchorClientRect, setAnchorClientRect] = React.useState<DOMRect | undefined>()
  const { width, height } = useComponentSize(mainRef)
  const previousDirectionRef = React.useRef<Direction | null>(null)
  const { current: previousDirection } = previousDirectionRef
  const [bannedDirections, setBannedDirections] = React.useState<readonly Direction[]>([])

  const resetBannedDirections = () => {
    setBannedDirections(state => (state.length ? [] : state))
    previousDirectionRef.current = null
  }

  const updateAnchorClientRect = React.useCallback(
    () => setAnchorClientRect(anchorRef?.current?.getBoundingClientRect()),
    [anchorRef]
  )

  React.useLayoutEffect(() => {
    if (isVisible) {
      updateAnchorClientRect()
    }
  }, [updateAnchorClientRect, isVisible])

  useTooltipReposition({
    isActive: isVisible,
    scrollAnchorRef: anchorRef || { current: null },
    onRequestReposition: () => {
      resetBannedDirections()
      updateAnchorClientRect()
    },
  })

  const { position, direction } = getComputedPositionAndDirection({
    tooltipSize: { width, height },
    parentSize: {
      // Размер вьюпорта без скроллбаров
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
    offset: offset + (withArrow ? ARROW_SIZE : 0),
    direction: passedDirection,
    possibleDirections,
    bannedDirections,
    position: anchorClientRect
      ? { x: anchorClientRect.left, y: anchorClientRect.bottom }
      : passedPosition,
    anchorSize: anchorClientRect
      ? { width: anchorClientRect.width, height: anchorClientRect.height }
      : undefined,
  })

  /**
   * Может возникнуть ситуация, когда перерасчет тултипа всегда будет выдавать 2 направления
   * и бесконечно зацикливать себя. Для избежания таких кейсов мы запоминаем стороны,
   * которые не подошли, чтобы не возвращаться к ним и предотвратить бесконечный ререндер.
   * См. TooltipBannedPositionsStory
   */
  if (previousDirection !== direction) {
    if (previousDirection && !bannedDirections.includes(previousDirection)) {
      setBannedDirections([...bannedDirections, previousDirection])
    }
    previousDirectionRef.current = direction
  }

  // Сбрасываем при любом изменении пропсов, чтобы заново начать перебор направлений
  // Главное не сбрасывать при изменении размеров тултипа, т.к. именно оно может вызвать бесконечный перебор
  React.useLayoutEffect(resetBannedDirections, [props])

  if (!isVisible) {
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
          top: position?.y || 0,
          left: position?.x || 0,
          visibility: position ? undefined : 'hidden',
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
